
import React from 'react';
import './SideNav.css';

function SideNavButton(props) {
  return (
    <a href={'#' + props.gp.country_code}>
      <div>
        <p>{props.gp.country_code}</p>
      </div>
    </a>
  );
}

class SideNav extends React.Component {
  createButtons() {
    return this.props.data.map((gp) => {
      return (
        <li key={gp.country_code}>
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

export default SideNav;