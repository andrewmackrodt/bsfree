import * as db from '../utils/db.ts'

async function getGame(gameUid: string): Promise<Game | false> {
    const rows = await db.exec(`
select s.id      as system_id,
       s.name    as system_name,
       g.id      as game_uid,
       g.game_id as game_id,
       g.name    as game_name,
       g.version as game_version,
       g.qty     as game_qty,
       d.id      as device_id,
       d.name    as device_name,
       sc.id     as section_id,
       sc.name   as section_name,
       c.id      as code_id,
       c.name    as code_name,
       c.note    as code_note,
       c.code    as code_code,
       a.id      as author_id,
       a.name    as author_name
from games g
join codes c on c.game_uid = g.id
join devices d on d.id = g.device_id
join systems s on s.id = g.system_id
left join sections sc on sc.id = c.section_id
left join authors a on a.id = c.author_id
where g.id = ?
order by g.name, g.id, d.name, d.id, c.id
`
        .trim(), [gameUid])

    if (rows.length === 0) {
        return false
    }

    const authors: Record<string, IdName> = {}
    const devices: Record<string, IdName> = {}
    const sections: Record<string, Section> = {}
    const systems: Record<string, IdName> = {}
    let game: Game

    for (const row of rows as Record<string, any>[]) {
        // cache device
        if ( ! (row.device_id in devices)) {
            devices[row.device_id] = {
                id: row.device_id,
                name: row.device_name,
            }
        }

        // cache system
        if ( ! (row.system_id in systems)) {
            systems[row.system_id] = {
                id: row.system_id,
                name: row.system_name,
            }
        }

        if ( ! game) {
            game = {
                uid: row.game_uid,
                id: row.game_id,
                name: row.game_name,
                system: systems[row.system_id],
                device: devices[row.device_id],
                codes: [],
                qty: row.game_qty,
            }

            if (row.game_version !== null) {
                game.version = row.game_version
            }
        }

        const code: Code = {
            id: row.code_id,
            name: row.code_name,
            code: row.code_code,
        }

        if (row.code_note !== null) {
            code.note = row.code_note
        }

        if (row.author_id) {
            // cache author
            if ( ! (row.author_id in authors)) {
                authors[row.author_id] = {
                    id: row.author_id,
                    name: row.author_name,
                }
            }
            code.author = authors[row.author_id]
        }

        if (row.section_id) {
            // cache section
            if ( ! (row.section_id in sections)) {
                sections[row.section_id] = {
                    id: row.section_id,
                    name: row.section_name,
                    codes: [],
                }
                game.codes.push(sections[row.section_id])
            }
            sections[row.section_id].codes.push(code)
        } else {
            game.codes.push(code)
        }
    }

    return game
}

function getGameTitle(game: Game): string {
    let title = game.name + ' '
    if (game.version) {
        title += `(${game.version})`
    }
    return title + `[${game.device.name}]`
}

function codeNameColStyle(name: string) {
    const style: Record<string, string> = { minWidth: '12rem', maxWidth: '20rem' }
    if (name.match(/\[M\]]|must be/i)) {
        style.fontWeight = 'bold'
    }
    return style
}

function renderCodeRow(code: Code | Section) {
    if ('codes' in code) {
        return
    } else {
        return (<tr className='monospace'>
            <td style={codeNameColStyle(code.name)}>{code.name}</td>
            <td style={{ minWidth: '12rem', maxWidth: '20rem' }}>{code.note ?? ''}</td>
            <td style={{ minWidth: '12rem', maxWidth: '16rem' }}>{code.code}</td>
            <td style={{ minWidth: '12rem', maxWidth: '16rem' }}>{code.author?.name ?? ''}</td>
        </tr>)
    }
}

function renderCodesTable(codes: Code[], section?: Section) {
    const codesTable = (<table style={{  }}>
        <thead>
        <tr>
            <th>Description</th>
            <th>Notes</th>
            <th>Code</th>
            <th>Author</th>
        </tr>
        </thead>
        <tbody>
        {codes.map(renderCodeRow)}
        </tbody>
    </table>)

    if (section) {
        return [
            <div style={{ display: 'table', margin: '1rem 0', border: 'solid 2px rgba(0, 0, 0, 0.1)' }}>
                <h3 style={{ marginTop: '0.33rem' }}>{section.name}</h3>
                {codesTable}
            </div>
        ]
    } else {
        return codesTable
    }
}

function renderCodesTables(items: (Code | Section)[]) {
    const groups: [Code[], Section | undefined][] = []
    let group: Code[] | null = null
    for (const item of items) {
        if ('codes' in item) {
            group = null
            groups.push([item.codes, item])
        } else {
            if ( ! group) {
                group = []
                groups.push([group, undefined])
            }
            group.push(item)
        }
    }
    return groups.map(([codes, section]) => renderCodesTable(codes, section))
}

interface GameProps {
    uid: string
}

interface GameState {
    game: Game | null | false
}

export default class GameView extends React.Component<GameProps, GameState> {
    constructor(props: GameProps) {
        super(props)
        this.state = {game: null}
    }

    async componentDidMount() {
        this.setState({game: await getGame(this.props.uid)})
    }

    render() {
        if (this.state.game === null) {
            return (<p>Loading</p>)
        }

        if ( ! this.state.game || this.state.game.codes.length === 0) {
            return (<p>Not Found</p>)
        }

        const game = this.state.game

        return (<div>
            <h1>{game.system.name} > {getGameTitle(game)}</h1>
            <p>{game.qty.toLocaleString()} codes</p>
            {renderCodesTables(game.codes)}
        </div>)
    }
}
