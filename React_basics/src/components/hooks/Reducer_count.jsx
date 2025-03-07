import {useReducer} from 'react'

const Reducer_count=()=> {
    const reducer=(state,action)=>{
        console.log(state,action);
        if(action.type==='increment'){
            return state+1;
        }
        if(action.type==='decrement'){
            return state-1;
        }
    };

    const[count,dispatch]=useReducer(reducer,0);
  return (
    <div>
      <div>Count : {count}</div>
      <div>
        <button onClick={()=>dispatch({type:'increment'})}>Increment</button>
        <button onClick={()=>dispatch({type:'decrement'})}>Decrement</button>
      </div>
    </div>
  )
}

export default Reducer_count
