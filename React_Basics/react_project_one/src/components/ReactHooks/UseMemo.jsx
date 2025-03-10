import React, { useState, useMemo } from 'react'
import "./Hooks.css"

function UseMemo() {
    const [number, setNumber] = useState(0);
    const [counter, setCounter] = useState(0);

    function cubeNum(num) {
        console.log("Calculation Done!");
        return Math.pow(num, 3);
    }

    const result = useMemo(() => cubeNum(number), [number]);

    return (
        <div className='cont'>
            <input type="number" className='btn' value={number} onChange={(e) => { setNumber(e.target.value) }} />
            <h1>Cube of the number: {result}</h1>
            <button className='btn' onClick={() => { setCounter(counter + 1) }}>Counter++</button>
            <h1>Counter: {counter}</h1>
        </div>
    )
}

// function UseMemo() {
//     const [number, setNumber] = useState(0);
//     const [counter, setCounter] = useState(0);

//     function cubeNum(num){
//         // console.log("Calculation Done!");   //This function is executed every time the state value(counter value) changes as the page is re-rendered even though we are not calculating the cube
//         return Math.pow(num, 3);
//     }

//     const result = cubeNum(number);

//   return (
//     <div className='cont'>
//       <input type="number" className='btn' value={number} onChange={(e)=>{setNumber(e.target.value)}} />
//       <h1>Cube of the number: {result}</h1>
//       <button className='btn' onClick={()=>{setCounter(counter+1)}}>Counter++</button>
//       <h1>Counter: {counter}</h1>
//     </div>
//   )
// }

export default UseMemo;
