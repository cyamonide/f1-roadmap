
import React from 'react';
import Util from './Util';
import TrackGeo from './TrackGeo';
import './RaceBlock.css';

class RaceBlock extends React.Component {
  render() {
    const style = {
      backgroundImage: Util.getAssetsUrl('background/gps/' + Util.resolveFilename(this.props.gp.country) + '.jpg', true),
    }

    return (
      <div className="race-block" id={this.props.gp.country_code} style={style}>
        <h1>{this.props.gp.country_ese} Grand Prix</h1>
        <div className="row parent">
          <div className="col-2">
            <p>test</p>
          </div>
          <div className="col-3">
            <p>test2</p>
          </div>
          <div className="col-7">
            <div className="row">
              <div className="col-7">
              </div>
              <div className="col-5">
                <TrackGeo gp={this.props.gp} />
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <p>Test</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default RaceBlock;