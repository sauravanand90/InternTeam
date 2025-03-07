import React from 'react';
import ReactDOM from 'react-dom/client';

export class GetSnap extends React.Component {
    constructor(props) {
      super(props);
      this.state = {favoritecolor: "red"};// when component is mounting it is red
    }
    componentDidMount() {
      setTimeout(() => {
        this.setState({favoritecolor: "yellow"})
      }, 1000)// when the component is mounted the timer changes the state and after 1sec the color is yellow
    }

    getSnapshotBeforeUpdate(prevProps, prevState) {
      document.getElementById("div1").innerHTML =
      "Before the update, the favorite was " + prevState.favoritecolor;
    }// this is triggered and is written in the empty div1 and without this only componentDidMount() works and no div1 content is written

    componentDidUpdate() {
      document.getElementById("div2").innerHTML =
      "The updated favorite color is " + this.state.favoritecolor;
    }//called after the component is updated in the DOM so it is written in empty div 2

    render() {
      return (
        <div>
          <h1>My Favorite Color is {this.state.favoritecolor}</h1>
          <div id="div1"></div>
          <div id="div2"></div>
        </div>
      );
    }
  }