import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/LoginPage.css'

const handleSubmit = (event, navigate) => {
  event.preventDefault()
  // alert(`Email: ${event.target.email.value}\nPassword: ${event.target.password.value}`)
  /*
    Send POST request to server with email and password to login
  */

  //verify if input password matches password in database.
  //if not, make an alert for invalid password

  // Navigate to Main Page
  navigate("/")
}

const LoginPage = () => {
  const navigate = useNavigate();

  return (
    <div className='loginWrapper'>
      <div className='login'>
        <div className='login_header'>
          Log In
        </div>
        <form className='login-form' onSubmit={event => handleSubmit(event, navigate)}>
          <label htmlFor='email'>Email</label>
          <input className='input' type='text' name='email' id='email' placeholder='email@example.com' />

          <label htmlFor='password'>Password</label>
          <input className='input' type='password' name='password' id='password' placeholder='********' />
          <input className='button' type="submit" value="Log In" />
        </form>

        <div className='create-account' >
            Don't have an account?
          <Link to='/create-account' >
            Create Account
          </Link>
        </div>
      </div>
    </div>
  )
}

export default LoginPage