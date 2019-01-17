
import React from 'react';
import './Leaders.css';

class Leaders extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      country_code: props.country_code,
      data: [],
      error: null
    };
  }

  componentDidMount() {
    this.loadDataFromServer();
  }

  loadDataFromServer() {
    fetch('/api/points/leaders/' + this.state.country_code)
      .then(data => data.json())
      .then((res) => {
        if (!res.success) this.setState({ error: res.error });
        else this.setState({ data: res.data });
      });
  }

  createLeaders() {
    let list = [];
    for (let i = 0; i < this.state.data.length && i < 3; i++) {
      let result = this.state.data[i];
      list.push(
        <div className={ "p" + (i+1) } key={i}>
          { i+1 } - { result.driver_code } 
          <span className="driver-points"> | { result.points }</span>
        </div>
      )
    }

    return list;
  }

  createfullLeaders() {
    let list = [];
    for (let i = 0; i < this.state.data.length; i++) {
      let result = this.state.data[i];
      list.push(
        <div className="full-standings-entry row" key={i} style={ result.position === "10" || result.position === "15" ? { borderBottom: "solid 1px grey" } : {} }>
          <div className="col-md-1" style={ {textAlign: "center"} }>{ result.position }</div>
          <div className="col-md-2" style={ {textAlign: "right"} }>
            { result.driver_code }
            <span className={ 'color-' + (result.car).toLowerCase().split(' ').join('-') }> ▐</span>
          </div>
          <div className="col-md-3">{ result.driver_first + " " + result.driver_last }</div>
          <div className="col-md-4">{ result.car }</div>
          <div className="col-md-2">{ (result.time).length === 0 ? "DNF" : result.time }</div>
        </div>
      )
    }

    return list;
  }

  render() {
    return (
      <div className="podium">
        <h3>POINTS LEADERS</h3>
        { this.createLeaders() }
        <p>
          <button type="button" class="btn btn-info btn-lg" data-toggle="modal" data-target={ "#fullLeaders" + this.state.country_code }>
            VIEW ALL POINTS &gt;
          </button>
        </p>

        {/* Start modal */}
        <div class="modal fade" id={ "fullLeaders" + this.state.country_code } role="dialog">
          <div class="modal-dialog">
          
            {/* Modal content */}
            <div class="modal-content">
              <div class="modal-header">
                {/* <h4 class="modal-title">{ "FULL STANDINGS | " + (this.state.data[0] && (this.state.data[0].country).toUpperCase()) }</h4> */}
                <h4>Harry eats ass</h4>
                <button type="button" class="close" data-dismiss="modal">&times;</button>
              </div>
              <div class="modal-body">
                {/* { this.createfullLeaders() } */}
              </div>
              {/* <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
              </div> */}
            </div>
            
          </div>
        </div>
        {/* End modal */}
      </div>
    );
  }
}

export default Leaders;