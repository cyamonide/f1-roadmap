
import React from 'react';
import Util from './Util';
import './TrackGeo.css';

class TrackGeo extends React.Component {
  render() {
    return (
      <div className="track-geo-container">
        <img src={ Util.getAssetsUrl('track_geometry/' + this.props.gp.country_code + '.jpg') } />
        <p>
          {/* {this.props.gp.trackName} */}
          { this.props.gp.track }
        </p>
      </div>
    );
  }
}

export default TrackGeo;