import React, { useState } from 'react'
import './FavColor_hooks.css'

function FavouriteColor() {
    const[color,setColor]=useState("black"); 
    // initializing useState accepts initial state and returns the current state and the function that updates the state
    // useState allows us to track the state in a function component
    //first value = color is the current state and setColor is the function used to update the state
  return (
    <div className='container'>
      <h1>My favorite color is {color}!</h1>
      <div id='buttons'>
      <button
      type='button'
      onClick={()=>setColor("red")}//updates the current state from black to red
      >Red</button>
      <button
      type='button'
      onClick={()=>setColor("blue")}
      >blue</button>
      <button
      type='button'
      onClick={()=>setColor("pink")}
      >pink</button>
      <button
      type='button'
      onClick={()=>setColor("green")}
      >green</button>
      </div>
    </div>
  )
}

export default FavouriteColor
