import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as data from './data.js'

function resolveFilename(name) {
    return name.replace(" ", "_");
}

function getAssetsUrl(path, withUrl=false) {
    if (withUrl) {
        return 'url(' + process.env.PUBLIC_URL + '/assets/' + path + ')';
    }
    return process.env.PUBLIC_URL + '/assets/' + path;
}

class TrackGeometry extends React.Component {
    render() {
        return (
            <div className="track-geo-container">
                <img src={getAssetsUrl('track_geometry/' + this.props.gp.code + '.png')} />
                <p>
                    {/* {this.props.gp.trackName} */}
                    { data.get_track(this.props.gp.name) }
                </p>
            </div>
        );
    }
}

class RaceBlock extends React.Component {
    render() {
        const style = {
            backgroundImage: getAssetsUrl('background/gps/' + resolveFilename(this.props.gp.name) + '.jpg', true),
        }

        return (
            <div className="race-block" id={this.props.gp.code} style={style}>
                <div>
                    <h1>{this.props.gp.ese} Grand Prix</h1>
                    <TrackGeometry gp={this.props.gp} />
                </div>
            </div>
        )
    }
}

class Roadmap extends React.Component {
    createRaceBlocks() {
        
        let list = [];

        for (let i = 0; i < data.gps.length; i++) {
            let gp = data.gps[i];
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
        return data.gps.map((gp) => {
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