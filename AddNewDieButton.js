import React, {Component} from "react";

class AddNewDieButton extends Component {
  constructor(props) {
    this.state = {
      dieToAdd: props.die
    }
  }

  render() {
    const vals = this.state.dieToAdd.values;
    return (
      <button onClick={this.props.addDice} className="align-self-start m-2 btn btn-primary">{
        vals[vals.length - 1]
      }</button>
    );
  }
}

export default AddNewDieButton;
