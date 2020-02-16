import React, {Component} from "react";
import {Bar} from "react-chartjs-2";
import equal from "fast-deep-equal";

class Graphs extends Component {
  constructor(props) {
    console.log("Constructor");
    this.state = {
      dice: [],
      rolls: props.rolls
    }
  
    this.getRollHistogram = this.getRollHistogram.bind(this);
    this.getUsableDiceArray = this.getUsableDiceArray.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.rolls.length !== prevProps.rolls.length) { // not going to work for editing dice. Unless you delete them then readd them
      this.setState({
        rolls: this.props.rolls
      });
    }
    if (this.props.dice.length !== prevProps.dice.length) {
      this.setState({
        dice: this.props.dice
      })
    } 
  }

  getUsableDiceArray(dice) {
    let dice_values = []

    for (let i = 0; i < dice.length; i++) {
      dice_values.push(dice[i].values);
    }

    return dice_values;
  }

  getValues(valuesLeft, arrSoFar) {
    if (valuesLeft.length == 0) {
      return arrSoFar;
    }

    if (arrSoFar.length == 0) {
      arrSoFar = valuesLeft[0];
      valuesLeft.splice(0, 1);
    } else {
      let newArr = [];
      for (let i = 0; i < arrSoFar.length; i++) {
        for (let j = 0; j < valuesLeft[0].length; j++) {
          newArr.push(arrSoFar[i] + valuesLeft[0][j]);
        }
      } 
      valuesLeft.splice(0, 1);

      arrSoFar = newArr;
    }

    return this.getValues(valuesLeft, arrSoFar);
  }

  sum(arr) {
    let ans = 0;
    arr.forEach(item => ans += item);
    return ans;
  }

  countNumFrequences(arr) {
    let frequencies = {};

    for (let i = 0; i < arr.length; i++) {
      if (arr[i] in frequencies) {
        frequencies[arr[i]]++;
      } else {
        frequencies[arr[i]] = 1;
      }
    }
    return frequencies
  }

  getRollHistogram() {
    let diceArray = this.getUsableDiceArray(this.state.dice);
    const values = this.getValues(diceArray, []);

    let expectedFrequencies = this.countNumFrequences(values);
    console.log(expectedFrequencies);
    let sums = [];
    for (let i = 0; i < this.state.rolls.length; i++) {
      sums.push(this.sum(this.state.rolls[i]));
    }

    let frequenciesSoFar = this.countNumFrequences(sums);
    
    const color1 = "255,99,132";
    const color2 = "99,132,255";
    let rollsSoFarData = [];
    const labels = Object.keys(expectedFrequencies);
    console.log("labels", labels, "length", labels.length);

    // for every label key
    // if frequencies so far has that key
      // set rollsSoFar index that key to the value, otherwise set it to 0
    // then delete all of the undefineds at the start
    for (let i = labels[0]; i <= labels[labels.length - 1]; i++) {
      console.log(i);
      if (parseInt(i) in frequenciesSoFar) {
        console.log()
        rollsSoFarData[i] = frequenciesSoFar[parseInt(i)];
      } else {
        rollsSoFarData[i] = 0;
      }
    }

    while (rollsSoFarData.length !== 0 && rollsSoFarData[0] == undefined) {
      console.log("deleting");
      rollsSoFarData.splice(0, 1);
    }

    console.log("rolls so far", rollsSoFarData);

    // calculate and graph percentages

    return {
      labels: labels,
      datasets: [
        {
          label: 'Expected Rolls',
          backgroundColor: 'rgba(' + color1 + ',0.2)',
          borderColor: 'rgba(' + color1 + ',1)',
          hoverBackgroundColor: 'rgba(' + color1 + ',0.4)',
          borderWidth: 1,
          data: Object.values(expectedFrequencies)
        }, {
          label: "Current Roles",
          backgroundColor: 'rgba(' + color2 + ',0.2)',
          borderColor: 'rgba(' + color2 + ',1)',
          hoverBackgroundColor: 'rgba(' + color2 + ',0.4)',
          borderWidth: 1,
          data: rollsSoFarData
        }
      ]
    }
  }

  render() {
    return (
      <div>
        <Bar data={
          this.getRollHistogram()
        } 
        options={{
          title:{
            display:true,
            text:'Dice Expected Totals',
            fontSize:20,
            barPercentage:1,
          },
          legend:{
            display:false,
          },
          scales: {
            yAxes: [{
              display: true,
              ticks: {
                beginAtZero: true   // minimum value will be 0.
              }
            }]
          }
        }}/>
      </div>
    );
  }
}

export default Graphs;
