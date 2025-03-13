import React from 'react'
import "./Navbar.css"
import { useNavigate } from 'react-router-dom'

const About = () => {
  const navigate = useNavigate();
  function handleClick(){
    navigate("/dashboard")
  }
  return (
    <div className='des'>
      <h1>About Page</h1>
      <br />
      <button className='btn' onClick={handleClick}>Move to Dashboard Page</button>
    </div>
  )
}

export default About
