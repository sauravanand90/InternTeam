import React from 'react'
import "./Navbar.css"
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate();
  function handleClick(){
    navigate("/about");
  }
  return (
    <div className='des'>
      <h1>Home Page</h1>
      <br />
      <button className='btn' onClick={handleClick}>Move to About Page</button>
    </div>
  )
}

export default Home
