
import React from 'react';
import RaceBlock from './RaceBlock';

class RoadMap extends React.Component {

  createRaceBlocks() {
    let list = [];
    for (let i = 0; i < this.props.data.length; i++) {
      let gp = this.props.data[i];
      list.push(
        <RaceBlock
          key={gp.country_code}
          gp={gp}
        />
      );
    }

    return list;
  }

  render() {
    return (
      this.createRaceBlocks()
    );
  }
}

export default RoadMap;