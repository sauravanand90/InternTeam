import { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";

// function Timer() {
//   const [count, setCount] = useState(0);

//   useEffect(() => {
//     setTimeout(() => {
//       setCount((count) => count + 1);
//     }, 1000);
//   });
// //without dependencies useEffect renders everytime
//   return <h1>I have rendered {count} times!</h1>;
// }


// function Timer() {
//   const [count, setCount] = useState(0);

//   useEffect(() => {
//     setTimeout(() => {
//       setCount((count) => count + 1);
//     }, 1000);
//   }, []); // empty array indicates useEffect  runs only on the 1st render
  
//   return <h1>I've rendered {count} times!</h1>;
// }

// export default Timer


function Counter() {
    const [count, setCount] = useState(0);
    const [calculation, setCalculation] = useState(0);
  
    useEffect(() => {
      setCalculation(() => count * 2);
    }, [count]); // with dependencies useEffect hook renders 1st and also when ever the component value changes
  
    return (
      <>
        <p>Count: {count}</p>
        <button onClick={() => setCount((c) => c + 1)}>+ plus</button>
        <p>Calculation: {calculation}</p>
      </>
    );
  }

  export default Counter