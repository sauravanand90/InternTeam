import React, { useState } from 'react'

function UseState() {
    const [color, setColor] = useState('Red');
    const changeColor = () => {
        setColor('Blue')
    }
    return (
        <div>
            <h1>My favourite color is {color}!</h1>
            <button onClick={changeColor}>Blue</button>
        </div>
    )
}

export default UseState
