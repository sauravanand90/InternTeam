import React, { useState } from 'react'
import './style.css'
import { useDispatch, useSelector } from 'react-redux'
import { decrement, increment,reset,incrementByAmount } from './features/counter/counterSlice';

const Redux = () => {

    const [amount,setAmount]=useState(0);
    const count=useSelector((state)=> state.counter.value);
    const dispatch=useDispatch();


    function handleIncrementClick(){
        dispatch(increment());

    }
    function handleDecrementClick(){
        dispatch(decrement());
    }

    function handleResetClick(){
        dispatch(reset());
    }
    function handleIncAmountClick(){
        dispatch(incrementByAmount(amount)); // sending amount as the payload in counterSlice
    }

  return (
    <div className='container'>
        <button className='button' onClick={handleIncrementClick}>+</button>
        <p>Count : {count}</p>
        <button className='button' onClick={handleDecrementClick}>-</button>
        <br/>
        <button className='button' onClick={handleResetClick}>Reset</button>
        <br/>
        <input 
            type='Number'
            value={amount}
            placeholder='Enter Amount'
            onChange={(e)=>setAmount(e.target.value)}
        />
        <button className='button' onClick={handleIncAmountClick}>Inc by Amount</button>
    </div>
  )
}

export default Redux
