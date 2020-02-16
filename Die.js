import React, { Component } from "react";

class Die extends Component {
  constructor(props) {
    this.state = {
      value: props.die.currentValue
    }
  }

  render() {
    return (
      <div className="m-2 d-inline-block">
        {this.state.value}
      </div>
    );
  }
}

export default Die;