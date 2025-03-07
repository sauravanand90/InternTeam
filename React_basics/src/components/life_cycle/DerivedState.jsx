import React from 'react';
import ReactDOM from 'react-dom/client';

export class HeaderDerive extends React.Component {
  constructor(props) {
    super(props);
    this.state = {favoritecolor: "red"};
  }
//   static getDerivedStateFromProps(props, state) {
//     return {favoritecolor: props.favcol };
//  } // having this takes the update from favcol during render therey remaining as yellow 

 shouldComponentUpdate(){
    return true;
 }//usually its true , it determines whether React shoould continue rendering or not true:rendering ,false:not rendering

  changeColor = () => {
    this.setState({favoritecolor: "blue"});
  }
  render() {
    return (
      <div>
      <h1>My Favorite Color is {this.state.favoritecolor}</h1>
      <button type="button" onClick={this.changeColor}>Change color</button>
      </div>
    );
  }
}