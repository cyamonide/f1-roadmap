
import React from 'react';
import Util from './Util';
import './TrackGeo.css';

function getWikiLink(trackName) {
  if (trackName === "Circuit of The Americas") trackName = "Circuit of the Americas";
  if (trackName === "Circuit Gilles-Villeneuve") trackName = "Circuit Gilles Villeneuve";

  return "https://en.wikipedia.org/wiki/" + trackName.replace(' ', '_')
}

function TrackGeo(props) {
  return (
    <div>
      <a className="track-link" href={ getWikiLink(props.gp.track) } target="_blank">
        <div className="track-geo-container">
          <img src={ Util.getAssetsUrl('track_geometry/alpha/' + props.gp.country_code + '.png') } alt={props.gp.country_code} />
          <p>
            { props.gp.track }
          </p>
        </div>
      </a>
    </div>
  );
}

export default TrackGeo;