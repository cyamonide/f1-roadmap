import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const gps = [
    "Australia",
    "Bahrain",
    "China",
    "Azerbaijan",
    "Spain",
    "Monaco",
    "Canada",
    "France",
    "Austria",
    "Great Britain",
    "Germany",
    "Hungary",
    "Belgium",
    "Italy",
    "Singapore",
    "Russia",
    "Japan",
    "USA",
    "Mexico",
    "Brazil",
    "Abu Dhabi",
];

const ese = {
    "Australia": "Australian",
    "Bahrain": "Bahraini", 
    "China": "Chinese",
    "Azerbaijan": "Azerbaijani",
    "Spain": "Spanish",
    "Monaco": "Monacan",
    "Canada": "Canadian",
    "France": "French",
    "Austria": "Austrian",
    "Great Britain": "British",
    "Germany": "German",
    "Hungary": "Hungarian",
    "Belgium": "Belgian",
    "Italy": "Italian",
    "Singapore": "Singapore",
    "Russia": "Russian",
    "Japan": "Japanese",
    "USA": "American",
    "Mexico": "Mexican",
    "Brazil": "Brazilian",
    "Abu Dhabi": "Abu Dhabi"
}

function resolveFilename(name) {
    return name.replace(" ", "_");
}

class RaceBlock extends React.Component {
    render() {
        const style = {
            backgroundImage: 'url(' + process.env.PUBLIC_URL + this.props.backgroundImageUrl + ')',
        }

        return (
            <div class="race-block" style={style}>
                <div>
                    <h1>{ese[this.props.country]} Grand Prix</h1>
                </div>
            </div>
        )
    }
}

class Roadmap extends React.Component {
    createRaceBlocks() {
        
        let list = [];

        for (let i = 0; i < gps.length; i++) {
            list.push(
                <RaceBlock
                    country={gps[i]}
                    backgroundImageUrl={"/assets/background/gps/" + resolveFilename(gps[i]) + ".jpg"}
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

ReactDOM.render(<Roadmap />, document.getElementById('root'));