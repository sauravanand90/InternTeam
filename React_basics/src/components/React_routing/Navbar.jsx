import React from 'react'
import About from './About'
import Home from './Home'
import Dashboard from './Dashboard'
import { Link, NavLink } from 'react-router-dom'
import './Navbar.css'

const Navbar = () => {
  return (
    <div>
      <ul>
        <li>
            <NavLink to='/' className={({isActive})=> isActive? "active-link":""}>
                Home  
            </NavLink>
        </li>
        {/* can use <Link to=''> also which works like that of <NavLink to=''> both doesnt re-load the page
         but NavLink has an default active class which helps in marking up the current status of the navigation or others*/}
        <li>
            <NavLink to='/about' className={({isActive})=> isActive? "active-link":""}>
                About
            </NavLink>
        </li>
        <li>
            <NavLink to='/dashboard' className={({isActive})=> isActive? "active-link":""}>
                Dashboard
            </NavLink>
        </li>
      </ul>
    </div>
  )
}

export default Navbar
