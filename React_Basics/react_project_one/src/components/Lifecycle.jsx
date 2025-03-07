import React, { Component } from "react";

// class Lifecycle extends Component {
//     constructor(props) {
//         super(props);
//         this.state = { count: 10 };
//         console.log("Constructor: Component is being created");
//     }

//     componentDidMount() {
//         console.log("componentDidMount: Component is mounted");
//     }

//     render() {
//         console.log("Render: Rendering UI");
//         return (
//             <div>
//                 <h1>Lifecycle Method</h1>
//                 <h2>Mounting Example</h2>
//                 <p>Count: {this.state.count}</p>
//                 <button className='btn' onClick={() => this.setState({ count: this.state.count + 1 })}>
//                     Increment
//                 </button>
//             </div>
//         );
//     }
// }

class Updating extends Component {
  constructor(props) {
    super(props);
    this.state = { message: "Hello" };
  }
 
  componentDidUpdate(prevProps, prevState) {
    console.log("componentDidUpdate: Component updated");
    if (prevState.message !== this.state.message) {
      console.log("Message state changed!");
    }
  }
 
  render() {
    console.log("Render: Re-rendering UI");
    return (
      <div>
        <h2>Updating Example</h2>
        <p>Message: {this.state.message}</p>
        <button className="btn" onClick={() => this.setState({ message: "Hello, React!" })}>
          Update Message
        </button>
      </div>
    );
  }
}

//export default Lifecycle;
export default Updating;