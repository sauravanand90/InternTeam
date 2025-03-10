import React, { useCallback, useState } from 'react'
import Header from '../Header'
import "./Hooks.css"

function UseCallback() {
    const [count, setCount] = useState(0);

    // const newFn = ()=>{}     In this case, very time the page is re-rendered due to change in state value, 
                                //newFn will be passed as props to Header due to which it will again re-render the page.
    const newFn = useCallback(()=>{}, []);
    // const newFn = useCallback((count)=>{}, [count]);   In this case also, when we click on button count value changes 
                                                          // and when it changes new function is passed as props to Header
                                                          //  and props will change so it will re-render the page.

    return (
        <div className='cont'>
            <Header newFn={newFn}/>
            <h1>{count}</h1>
            <button className='btn' onClick={()=>setCount(prev=>prev+1)}>Click Here</button>
        </div>
    )
}

export default UseCallback;
