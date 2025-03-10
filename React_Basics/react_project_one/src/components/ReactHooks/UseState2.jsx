import React, {useState} from 'react'
import "./Hooks.css"

function UseState2() {
    const [car, setCar] = useState({
        brand: "Ferrari",
        model: "Roma",
        color: "red",
        year:   2023
    });

    return (
        <div>
            <h1>My {car.brand}</h1>
            <h2>It is a {car.color} {car.model} from {car.year}</h2>
            <button className="btn" onClick={() => {
                setCar((prev) => {
                    return {...prev, color: "blue"}          //... It's a spread operator which helps preserve previous state values
                })
            }}>Blue</button>
        </div>
    )
}

export default UseState2;
