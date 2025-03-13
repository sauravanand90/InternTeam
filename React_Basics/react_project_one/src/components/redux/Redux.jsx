import React, { useState } from 'react'
import { store } from './store'
import {useDispatch, useSelector} from 'react-redux'
import './Redux.css'
import { decrement, increment, increaseBy, reset } from '../features/counter/counterSlice';

function Redux() {
  const [amount, setAmount] = useState(0);
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  function handleIncrement(){
    dispatch(increment());
  }

  function handleDecrement(){
    dispatch(decrement());
  }

  function handleReset(){
    dispatch(reset());
  }

  function handleIncreaseBy(){
    dispatch(increaseBy(amount));
  }

  return (
    <div className='cont'>
      <h1>Let's calculate the count</h1>
      <br />
      <button className='btn' onClick={handleIncrement}>+</button>
      <h2>Count: {count}</h2>
      <button className='btn' onClick={handleDecrement}>-</button>
      <br />
      <input className='field' type='Number' value={amount} onChange={(e) => setAmount(e.target.value)} />
      <br />
      <button className='btn' onClick={handleIncreaseBy}>Increase By</button>
      <br />
      <button className='btn' onClick={handleReset}>Reset</button>
    </div>
  )
}

export default Redux


//
// create store
// wrap app component under Provider
// create slice
// register reducer in store