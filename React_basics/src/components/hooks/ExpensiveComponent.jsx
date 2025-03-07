import {useCallback,useEffect,useRef, useState} from 'react'

function ExpensiveComponent() {
    const [count,setCount]=useState(0);
    const [text,setText]=useState("");
    const previousFunction=useRef(null);

    const expensiveTask= useCallback(()=>{
        console.log("Running");
        let result=0;
        for(let i=0;i<=1000000000;i++)
            { result +=i;}
        return result;
    },[]);

    useEffect(()=>{
        if(previousFunction.current){
            if(previousFunction.current===expensiveTask){
                console.log("function not re-created");
            }
            else{
                console.log("function got re-created");
            }
        }
        else{
            previousFunction.current=expensiveTask;
        }
    },[expensiveTask]);

  return (
    <div>
         <input
        type='text'
        placeholder='enter something'
        value={text}
        onChange={(e)=> setText(e.target.value)}
        />
        <p>Expensive Calculation Result: {expensiveTask()}</p>
        <button onClick={()=>setCount(count+1)}>Increment Count</button>
    </div>
  )
}

export default ExpensiveComponent
