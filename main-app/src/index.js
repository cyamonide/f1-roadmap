import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as constants from './constants.js'

function resolveFilename(name) {
    return name.replace(" ", "_");
}

class RaceBlock extends React.Component {
    render() {
        const style = {
            backgroundImage: 'url(' + process.env.PUBLIC_URL + '/assets/background/gps/' + resolveFilename(this.props.gp.name) + '.jpg)',
        }

        return (
            <div className="race-block" id={this.props.gp.code} style={style}>
                <div>
                    <h1>{this.props.gp.ese} Grand Prix</h1>
                </div>
            </div>
        )
    }
}

class Roadmap extends React.Component {
    createRaceBlocks() {
        
        let list = [];

        for (let i = 0; i < constants.gps.length; i++) {
            let gp = constants.gps[i];
            list.push(
                <RaceBlock
                    key={gp.code}
                    gp={gp}
                />
            );
        }

        return list;
    }

    render() {
        return (
            this.createRaceBlocks()
        )
    }
}

class SideNavButton extends React.Component {
    render() {
        return (
            <a href={'#' + this.props.gp.code}>
                <div>
                    <p>{this.props.gp.code}</p>
                </div>
            </a>
        );
    }
}

class SideNav extends React.Component {
    createButtons() {
        return constants.gps.map((gp) => {
            return (
                <li key={gp.code}>
                    <SideNavButton gp={gp} />
                </li>
            )
        });
    }

    render () {
        return (
            <div className="side-nav">
                <ul>
                    { this.createButtons() }
                </ul>
            </div>
        );
    }
}

class App extends React.Component {
    render() {
        return (
            <div>
                <SideNav />
                <Roadmap />
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));