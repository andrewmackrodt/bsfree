import { Link } from 'preact-router/match'
import * as db from '../utils/db.ts'

interface System extends IdName {
    qty: number
}

async function getSystems(): Promise<System[]> {
    return await db.exec(`
select s1.id, min(s1.name) as name, sum(s2.qty) as qty
from systems s1
join systems s2 on s2.group_id = s1.id
where s1.id in (select distinct group_id from systems)
group by s1.id
order by name, s1.id
`
        .trim())
}

interface HomeState {
    systems: System[] | null
}

export default class HomeView extends React.Component<{}, HomeState> {
    constructor() {
        super()
        this.state = { systems: null }
    }

    async componentDidMount() {
        this.setState({ systems: await getSystems() })
    }

    render() {
        if ( ! this.state.systems) {
            return (<p>Loading</p>)
        }

        if (this.state.systems.length === 0) {
            return (<p>Not Found</p>)
        }

        const qty = this.state.systems.reduce((sum, game) => sum + game.qty, 0)

        return (
            <div>
                <h1>Home</h1>
                <p>{qty.toLocaleString()} codes</p>
                <table>
                    <thead>
                    <tr>
                        <th>System</th>
                        <th>Codes</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.systems.map(system => (
                        <tr>
                            <td><Link href={`#!/systems/${system.id}`}>{system.name}</Link></td>
                            <td className='number'>{system.qty.toLocaleString()}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        )
    }
}
