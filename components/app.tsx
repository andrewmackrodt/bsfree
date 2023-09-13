import Router from 'preact-router'
import { createHashHistory } from 'history'
import Game from '../views/game.tsx'
import Home from '../views/home.tsx'
import System from '../views/system.tsx'

export default class App extends React.Component {
    render() {
        return (
            <Router history={createHashHistory()}>
                <Game path="!/games/:uid" />
                <Home path="/" />
                <System path="!/systems/:id" />
            </Router>
        )
    }
}

React.render(<App/>, document.getElementById('app')!)
