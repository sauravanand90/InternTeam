import React, { useEffect, useRef, useState } from 'react'
import "./Hooks.css"

function UseRef() {
    const [value, setValue] = useState(0);
    const count = useRef(0);

    useEffect(() => {
        count.current = count.current + 1;
    })

  return (
    <div className='cont'>
      <button className='btn' onClick={() => {setValue(prev => prev-1)}}>-1</button>
      <h1>{value}</h1>
      <button className='btn' onClick={() => {setValue(prev => prev+1)}}>+1</button>
      <h2>Render Count : {count.current}</h2>
    </div>
  )
}

// function UseRef() {
//     const inputElem = useRef();

//     const btnClicked = () => {
//         console.log(inputElem.current);
//         inputElem.current.style.background = "grey";
//     }

//     return (
//         <div className='cont'>
//             <input type="text" ref={inputElem} />
//             <button className='btn' onClick={btnClicked}>Click Here</button>
//         </div>
//     )
// }

export default UseRef;
