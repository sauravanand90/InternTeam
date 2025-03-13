import React from 'react'
import "./Navbar.css"
import { Outlet, useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  function handleClick(){
    navigate("/")
  }
  return (
    <div className='des'>
      <h1>Dashboard Page</h1>
      <br />
      <button className='btn' onClick={handleClick}>Move to Home Page</button>
    <Outlet />
    </div>
  )
}

export default Dashboard
