import React, { Component } from 'react';
import Die from "./Die.js";
import {range, random, uniqueId, sortBy, reduce} from "underscore";
import AddNewDieButton from "./AddNewDieButton";
import AddNewCustomDieButton from "./AddNewCustomDieButton";
import SimulateMultipleButton from "./SimulateMultipleButton";
import Graphs from "./Graphs";

class App extends Component {
  constructor(props) {
    this.state = {
      dice: [],
      rollsSoFar: [] // made up of an array (each roll) of arrays (each dice)
    }

    this.addDice = this.addDice.bind(this);
    this.rollDice = this.rollDice.bind(this);
    this.calculateAverage = this.calculateAverage.bind(this);
    this.calculateExpectedAverage = this.calculateExpectedAverage.bind(this);
    this.simulate = this.simulate.bind(this);
  }

  componentDidMount() {
    this.addDice({
      values: range(1, 7),
      currentValue: 1
    });
  }

  addDice(diceObj) {
    diceObj.values = sortBy(diceObj.values);
    diceObj.id = uniqueId();
    this.setState(prevState => ({dice: [...prevState.dice, diceObj]}))
  }

  rollDice() {
    this.setState(prevState => {
      let dice = prevState.dice;
      let rolls = [];

      for (let i = 0; i < dice.length; i++) {
        dice[i].currentValue = dice[i].values[random(0, dice[i].values.length - 1)];
        dice[i].id = uniqueId();
        rolls.push(dice[i].currentValue);
      }

      let rollsSoFar = prevState.rollsSoFar;
      rollsSoFar.push(rolls);

      return {
        dice,
        rollsSoFar
      }
    });
  }

  simulate(num) {
    for (let i = 0; i < num; i++) {
      this.rollDice();
    }
  }

  sum(arr) {
    return reduce(arr, (memo, item) => memo + item)
  }

  avg(arr) {
    return this.sum(arr) / arr.length;
  }

  calculateExpectedAverage() {
    const dice = this.state.dice;
    const totalAvg = reduce(dice, (memo, die) => { return memo + this.avg(die.values); }, 0);

    return (
      totalAvg
    );  
  }

  calculateAverage() {
    const rolls = this.state.rollsSoFar;
    const totalAvg = reduce(rolls, (memo, roll) => { return memo + this.sum(roll); }, 0) / rolls.length;

    if (!totalAvg) {
      totalAvg = 0;
    }

    return (
      totalAvg
    );  
  }

  render() {
    let d20 = {
      values: range(1, 21),
      currentValue: 1
    }
    let d6 = {
      values: range(1, 7),
      currentValue: 1
    }
    let d8 = {
      values: range(1, 9),
      currentValue: 1
    }
    let d10 = {
      values: range(1, 11),
      currentValue: 1
    }
    let d12 = {
      values: range(1, 13),
      currentValue: 1
    }
    let d4 = {
      values: range(1, 5),
      currentValue: 1
    }
    console.log("app rolls", this.state.rollsSoFar);
    return (
      <div className="p-5">
        {
          this.state.dice.map((die) => {
            return (
              <Die key={die.id} die={die} />
            );
          })
        }
        <div className="row align-items-center p-2">
          <button className="col-4 btn btn-primary" onClick={this.rollDice}>Roll the Dice</button>
          <SimulateMultipleButton simulate={this.simulate}/>
        </div>
        <div className="d-flex flex-wrap">
          <AddNewDieButton addDice={() => this.addDice(d4)} die={d4} />
          <AddNewDieButton addDice={() => this.addDice(d6)} die={d6} />
          <AddNewDieButton addDice={() => this.addDice(d8)} die={d8} />
          <AddNewDieButton addDice={() => this.addDice(d10)} die={d10} />
          <AddNewDieButton addDice={() => this.addDice(d12)} die={d12} />
          <AddNewDieButton addDice={() => this.addDice(d20)} die={d20} />
          <AddNewCustomDieButton addDice={this.addDice} />
        </div>
        <div>
        Expected Average Roll: {this.calculateExpectedAverage()}
        <br />
        Average Roll: {this.calculateAverage()}
        </div>
        <Graphs dice={this.state.dice} rolls={this.state.rollsSoFar}/>
      </div>
    )
  }
}

export default App;