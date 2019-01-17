
import React from 'react';
import './FrontRow.css';

class FrontRow extends React.Component {
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
    fetch('/api/startingGrid/' + this.state.country_code)
      .then(data => data.json())
      .then((res) => {
        if (!res.success) this.setState({ error: res.error });
        else this.setState({ data: res.data });
      });
  }

  createFrontRow() {
    let list = [];
    for (let i = 0; i < this.state.data.length && i < 2; i++) {
      let result = this.state.data[i];
      list.push(
        <div className={ "p" + (i+1) } key={i}>
          { i+1 } - { result.driver_first + " " + result.driver_last } 
          <span className={ 'car color-' + (result.car).toLowerCase().split(' ').join('-') }> | { result.car }</span>
        </div>
      )
    }

    return list;
  }

  createLapTimes() {
    let list = [];
    for (let i = 0; i < this.state.data.length && i < 2; i++) {
      let result = this.state.data[i];
      list.push(
        <div className={ "lap-time" } key={i}>
          { result.time } 
        </div>
      )
    }

    return list;
  }

  createFullStartingGrid() {
    let list = [];
    for (let i = 0; i < this.state.data.length; i++) {
      let result = this.state.data[i];
      list.push(
        <div className="full-starting-grid-entry row" key={i} style={ result.position === "10" || result.position === "15" ? { borderBottom: "solid 1px grey" } : {} }>
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
      <div className="front-row">
        <h3>FRONT ROW</h3>

        <div className="row">
          <div className="col-xl-10">
            { this.createFrontRow() }
          </div>
          <div className="col-xl-2 xl-hide">
            { this.createLapTimes() }
          </div>
        </div>
        
        <p>
          <button type="button" className="btn btn-info btn-lg" data-toggle="modal" data-target={ "#fullStartGrid" + this.state.country_code }>
            VIEW FULL STARTING GRID &gt;
          </button>
        </p>

        {/* Start modal */}
        <div className="modal fade" id={ "fullStartGrid" + this.state.country_code } role="dialog">
          <div className="modal-dialog">
          
            {/* Modal content */}
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">{ "FULL STARTING GRID | " + (this.state.data[0] && (this.state.data[0].country).toUpperCase()) }</h4>
                <button type="button" className="close" data-dismiss="modal">&times;</button>
              </div>
              <div className="modal-body">
                { this.createFullStartingGrid() }
              </div>
              {/* <div className="modal-footer">
                <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
              </div> */}
            </div>
            
          </div>
        </div>
        {/* End modal */}

      </div>
    );
  }
}

export default FrontRow;