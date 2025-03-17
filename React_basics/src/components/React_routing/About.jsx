import React from 'react'
import { useNavigate } from 'react-router-dom'

const About = () => {
    const navigate=useNavigate();
    function handleClick(){
        navigate('/dashboard')
    }

  return (
    <div>
        About page
        <button onClick={handleClick}>
            Dashboard page
        </button>
    </div>
  )
}

export default About
