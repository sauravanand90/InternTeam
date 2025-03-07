import {useCallback, useState} from 'react'
import ReactDOM from "react-dom/client";
import Child from './Child';

function Callback_hook() {
    const[count,setCount]=useState(0);

    const handleClick=useCallback(()=>{
        setCount(count+1);
    }, [count]);
    //useCallback doesnt change the reference of the function therefore it will not re-render
    //function is freezed and will not re-create incase count is used as dependencies then it re-renders again

  return (
    <div>
      <div>
        <button onClick={handleClick}>
        Increment</button>
      </div>
      <div>
        Count : {count}
      </div>
      <div>
            <Child buttonName="click me" 
                handleClick={handleClick}
            />
      </div>
    </div>
  )
}

export default Callback_hook
