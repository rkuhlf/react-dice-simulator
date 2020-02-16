import React, {Component} from "react";

class AddNewCustomDieButton extends Component {
  constructor(props) {
    this.state = {
      inputActivated: false,
      inputValue: ""
    }

    this.getInput = this.getInput.bind(this);
    this.activateInput = this.activateInput.bind(this);
    this.handleTextAreaType = this.handleTextAreaType.bind(this);
    this.closeInput = this.closeInput.bind(this);
    this.addCustomDie = this.addCustomDie.bind(this);
  }

  activateInput() {
    this.setState({
      inputActivated: true
    })
  }

  closeInput() {
    this.setState({
      inputActivated: false
    })
  }

  addCustomDie() {
    this.closeInput();

    let newDice = {};
    newDice.values = this.state.inputValue.split(/[\n ,]+/).map(num => parseInt(num, 10));
    newDice.currentValue = newDice.values[0];
    this.props.addDice(newDice);
  }

  handleTextAreaType(e) {
    let newText = e.target.value;
    newText = newText.split("").filter((char) => "1234567890\n ,".includes(char)).join('');
    this.setState({
      inputValue: newText
    })
  }

  getInput() {
    if (!this.state.inputActivated) {
      return;
    }

    return (
      <div>
        <textarea onChange={this.handleTextAreaType} value={this.state.inputValue} className="mb-2 form-control" placeholder="write your custom dice faces separated by a comma or a new line"/>
        <button onClick={this.addCustomDie} className="mr-2 btn btn-primary">Add</button>
        <button onClick={this.closeInput} className="btn btn-secondary">Cancel</button>
      </div>
    )
  }

  render() {
    return (
      <div>
        <button onClick={this.activateInput} className="m-2 align-self-start btn btn-primary">Add Custom Die</button>
        {this.getInput()}
      </div>
    );
  }
}

export default AddNewCustomDieButton;