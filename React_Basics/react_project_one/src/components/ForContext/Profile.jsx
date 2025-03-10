import React, { useContext } from 'react'
import Contact from './Contact'
import { AppContext } from '../../context/AppContext'

const Profile = () => {
    const {phone, name} = useContext(AppContext)
  return (
    <div>
      <h2>Profile</h2>
      <h3>Name: {name}</h3>
      <Contact/>
    </div>
  )
}

export default Profile
