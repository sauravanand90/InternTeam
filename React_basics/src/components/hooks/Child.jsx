import React from 'react'

const Child=React.memo(
(props)=>{
    console.log("child re-render");
    return (
      <div>
        <button onClick={props.handleClick}>
        {props.buttonName}
        </button>
      </div>
    )
  }

);

export default Child
//react memo re-renders only when props changes therwise no re-render
//react.memo re-renders if its a function it doesnt re-render if its a value bcs the function is re created and function reference changes 