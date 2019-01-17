
import React from 'react';
import Util from './Util';
import TrackGeo from './TrackGeo';
import Podium from './Podium';
import FrontRow from './FrontRow';
import Leaders from './Leaders';
import './RaceBlock.css';

function RaceBlock(props) {
  const style = {
    backgroundImage: Util.getAssetsUrl('background/gps/' + Util.resolveFilename(props.gp.country) + '.jpg', true),
  }
  return (
    <div className="race-block" id={props.gp.country_code} style={style}>
      <h1>{props.gp.country_ese} Grand Prix</h1>
      
      <div className="row parent">
        <div className="col-xl-4">
          <Leaders country_code={props.gp.country_code} />
        </div>
        <div className="col-xl-5"></div>
        <div className="col-xl-3">
          <TrackGeo gp={props.gp} />
        </div>
      </div>

      <div className="row parent">
        <div className="col-md-6">
          <FrontRow country_code={props.gp.country_code} />
        </div>
        <div className="col-md-6">
          <Podium country_code={props.gp.country_code} />
        </div>
      </div>

    </div>
  )
}

export default RaceBlock;