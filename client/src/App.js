
import React from 'react';
import SideNav from './SideNav';
import RoadMap from './RoadMap';
import './App.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      error: null
    };
  }

  componentDidMount() {
    this.loadRacesFromServer();
  }

  componentWillUnmount() {

  }

  loadRacesFromServer() {
    fetch('http://localhost:3001/api/races')
      .then(data => data.json())
      .then((res) => {
        if (!res.success) this.setState({ error: res.error });
        else this.setState({ data: res.data });
      });
  }

  render() {
    return (
      <div>
        <SideNav data={this.state.data} />
        <RoadMap data={this.state.data} />
      </div>
    );
  }
}

export default App;