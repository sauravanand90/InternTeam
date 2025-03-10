import React, { useEffect, useState } from 'react'

function UseEffect() {
    const [count, setCount] = useState(0);

    useEffect(() => {
        setTimeout(() => {
            setCount(count => count+1);
        }, 2000);
    }) 
    //Without any dependencies useEffect renders every time the state changes in that particular component.
    //Since the count state is changing every 2 seconds, the callback function is rendered every time.
  return (
    <div>
        <h1>I've rendered {count} times!</h1>
    </div>
  )
}

// function UseEffect() {
//     const [count, setCount] = useState(0);

//     useEffect(() => {
//         setTimeout(() => {
//             setCount(count => count+1);
//         }, 2000);
//     }, []) 
//     // This empty array shows that the function is rendered only once.
//   return (
//     <div>
//         <h1>I've rendered {count} times!</h1>
//     </div>
//   )
// }

// function UseEffect() {
//     const [count, setCount] = useState(0);

//     useEffect(() => {
//         setTimeout(() => {
//             setCount(count => count+1);
//         }, 2000);
//     }, [count]) 
//     //It will execute the function once the component is loaded and will render every time when the variable state changes.
//   return (
//     <div>
//         <h1>I've rendered {count} times!</h1>
//     </div>
//   )
// }

export default UseEffect;

