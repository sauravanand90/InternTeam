import { useReducer } from "react"
import React, { useState } from 'react'
import "./Hooks.css"

function UseReducer() {
    const initialState = {count: 0}
    const reducer = (state, action) =>{
        switch(action.type){
            case 'increase' : {
                return {count: state.count + 1}
            }
            case 'decrease' : {
                return {count: state.count - 1}
            }
            case 'input' : {
                return {count: action.payload}
            }
            default : {
                return state
            }
        }
        
    }
    const [state, dispatch] = useReducer(reducer, initialState)

    return (
        <div className='cont'>
            <h1>{state.count}</h1>
            <button className='btn' onClick={()=>dispatch({type: 'increase'})}>Increase</button>
            <button className='btn' onClick={()=>dispatch({type: 'decrease'})}>Decrease</button>
            <br />
            <input className='btn' value={state.count}
            onChange={(e)=>{dispatch({type: 'input', payload:Number(e.target.value)})}} type="number" />
        </div>
    )
}

export default UseReducer
