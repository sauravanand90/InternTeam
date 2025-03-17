import React from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const navigate=useNavigate(); // navigates to different pages without re-loading the page
    function handleClick(){
        navigate('/about');
    }

  return (
    <div>
      Home Page
      <button onClick={handleClick}>
        About page
      </button>
    </div>
  )
}

export default Home
