import React from 'react'
import { useSelector } from 'react-redux'
import './MySetting.css'
import PasswordChange from './PasswordChange'
import UpdateProfile from './UpdateProfile'
const MySetting = () => {
  const { currentUser } = useSelector(state => state.user)
  return (
    <div className='setting'>
      <h3>Your Account Settings</h3>
      <UpdateProfile currentUser={currentUser} />
      <hr />
      <h3>Password Change</h3>
      <PasswordChange currentUser={currentUser} />
    </div>
  )
}

export default MySetting