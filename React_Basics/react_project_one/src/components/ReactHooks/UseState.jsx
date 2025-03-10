import React, { useState } from 'react'
import "./Hooks.css"
// function UseState() {
//     const [color, setColor] = useState('Red');
//     const changeColor = () => {
//         setColor('Blue')
//     }
//     return (
//         <div>
//             <h1>My favourite color is {color}!</h1>
//             <button className='btn' onClick={changeColor}>Blue</button>
//         </div>
//     )
// }

function UseState() {
    const [count, setCount] = useState(0);
    const changeCount = () => {
        setCount(count => count+1)
        setCount(count => count+1)
        setCount(count => count+1)
        setCount(count => count+1)
    }
    return (
        <div>
            <h1>Count: {count}</h1>
            <button className='btn' onClick={changeCount}>Increase by 4</button>
        </div>
    )
}

export default UseState;
