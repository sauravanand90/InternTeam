import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

const Dashboard = () => {
    const navigate=useNavigate();
    function handleClick(){
        navigate('/')
    }

  return (
    <div>
       Dashboard page
       <button onClick={handleClick}>
        Home page
       </button>
       <Outlet />
    </div>
      /*outlets should be used when a parent reoute elements to render the child route elements */
  )
}

export default Dashboard
