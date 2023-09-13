import { Link } from 'preact-router/match'
import * as db from '../utils/db.ts'

async function getGames(systemId: string) {
    const rows = await db.exec(`
select s.id      as system_id,
       s.name    as system_name,
       g.id      as game_uid,
       g.game_id as game_id,
       g.name    as game_name,
       g.version as game_version,
       g.qty     as game_qty,
       d.id      as device_id,
       d.name    as device_name
from games g
join systems s on s.id = g.system_id
join devices d on d.id = g.device_id
where g.qty > 0 and g.system_id in (select id from systems where group_id = ?)
order by g.name, g.version, g.id, s.name, s.name, d.name, d.id
`
        .trim(), [systemId])

    const devices: Record<string, IdName> = {}
    const systems: Record<string, IdName> = {}
    const games: Record<string, Game> = {}

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

        if ( ! (row.game_uid in games)) {
            const game: Game = games[row.game_uid] = {
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
    }

    return Object.values(games).sort((a, b) => {
        return a.name.localeCompare(b.name)
            || a.id - b.id
            || a.device.name.localeCompare(b.device.name)
            || a.device.id - b.device.id
    })
}

interface SystemProps {
    id: string
}

interface SystemState {
    games: Game[] | null
}

export default class SystemView extends React.Component<SystemProps, SystemState> {
    constructor(props: SystemProps) {
        super(props)
        this.state = { games: null }
    }

    async componentDidMount() {
        this.setState({ games: await getGames(this.props.id) })
    }

    render() {
        if ( ! this.state.games) {
            return (<p>Loading</p>)
        }

        if (this.state.games.length === 0) {
            return (<p>Not Found</p>)
        }

        const qty = this.state.games.reduce((sum, game) => sum + game.qty, 0)

        return (
            <div>
                <h1>{this.state.games[0].system.name}</h1>
                <p>{qty.toLocaleString()} codes</p>
                <table>
                    <thead>
                    <tr>
                        <th>System</th>
                        <th>Title</th>
                        <th>Version</th>
                        <th>Device</th>
                        <th>Codes</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.games.map(game => (
                        <tr>
                            <td>{game.system.name}</td>
                            <td style='max-width: 30rem'><Link href={`#!/games/${game.uid}`}>{game.name}</Link></td>
                            <td style='max-width: 10rem'>{game.version ?? ''}</td>
                            <td>{game.device.name}</td>
                            <td className='number'>{game.qty.toLocaleString()}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        )
    }
}
