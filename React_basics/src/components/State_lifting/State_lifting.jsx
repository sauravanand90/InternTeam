import React, { useState } from 'react'
import Card from './Card'
import './style.css'

const State_lifting = () => {
    //parent component
    //create,manage and change state here only so that it will get synced to all child components
    const [name , setName]=useState('');
  return (
    <div> 
      <Card title="Card 1" name={name} setName={setName}/> 
      <Card  title="Card 2" name={name} setName={setName}/> 
      {/* <p>Name inside parent component: {name}</p> */}
    </div>
    /*for single child create single card value for multiple child create the 
    same card again and each sibling can interact wth each other*/
  )
}

export default State_lifting
