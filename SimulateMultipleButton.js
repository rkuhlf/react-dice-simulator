import React, {Component} from "react";

class SimulateMultipleButton extends Component {
  constructor(props) {
    this.state = {
      numberToSim: 10
    }
  }

  render() {
    return (
      <div className="col row">
        <button onClick={() => this.props.simulate(this.state.numberToSim)} className="col-7 mx-2 btn btn-primary">Simulate Multiple</button>
        <input className="col form-control m-0" onChange={(e) => this.setState({numberToSim: e.target.value})}value={this.state.numberToSim} type="number"/>
      </div>
    );
  }
}

export default SimulateMultipleButton;
