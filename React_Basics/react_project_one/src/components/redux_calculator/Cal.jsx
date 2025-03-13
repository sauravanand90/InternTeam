import React, { useState } from 'react'
import { CalStore } from './CalStore'
import { add, sub, mul, div,reset } from '../features/counter/calSlice'
import './Cal.css'
import { useDispatch, useSelector } from 'react-redux';

function Cal() {
    const [value1, setValue1] = useState('');
    const [value2, setValue2] = useState('');
    const result = useSelector((state) => state.calculator.value);
    const dispatch = useDispatch();

    function handleAdd(){
        dispatch(add({value1, value2}));
    }

    function handleSub(){
        dispatch(sub({value1, value2}));
    }

    function handleMul(){
        dispatch(mul({value1, value2}));
    }

    function handleDiv(){
        dispatch(div({value1, value2}));
    }

    function handleReset(){
      dispatch(reset());
      setValue1(0);
      setValue2(0);
  }

  return (
    <div className='cont'>
      <h1>Basic Calculator</h1>
      <h2>Result = {result} </h2>
      Value 1:<input className='field' type='Number' value={value1} onChange={(e) => setValue1(e.target.value)} />
      <br />
      Value 2:<input className='field' type='Number' value={value2} onChange={(e) => setValue2(e.target.value)} />
      <br />
      <button className='btn' onClick={handleAdd}>+</button>
      <button className='btn' onClick={handleSub}>-</button>
      <button className='btn' onClick={handleMul}>*</button>
      <button className='btn' onClick={handleDiv}>/</button>
      <br />
      <button className='btn' onClick={handleReset}>Reset</button>
    </div>
  )
}

export default Cal
