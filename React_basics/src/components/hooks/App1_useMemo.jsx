import {useState,useMemo} from 'react'
import './App1.css'

function App1_useMemo() {
    const [count,setCount]=useState(0);
    const [input,setInput]=useState(0);

    function expensiveTask(num){
        console.log("Inside expensive Task");
        for(let i=0;i<=1000000000;i++)
            {//
                }
        //depends on time , time makes it expensive operation , it is re-rendering 
        return num*2;
    }//rather than calculating again and again use useMemo hook

    let doubleValue=useMemo(()=>expensiveTask(input),[input]);

  return (
    <div>
        <button onClick={()=> setCount(count+1)}>
            Increment
        </button>  
        <div>
            Count : {count}
        </div>

        <input
        type='number'
        placeholder='enter the number'
        value={input}
        onChange={(e)=> setInput(e.target.value)}
        />

        <div>
            Double : {doubleValue}
        </div>
    </div>
  )
}

export default App1_useMemo
