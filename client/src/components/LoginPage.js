import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/LoginPage.css'
import { AuthContext } from '../App.js'

const  handleSubmit = (event, navigate, auth) =>{
  event.preventDefault()
  let {email, password} = event.target
  email = email.value
  password = password.value

  auth.authFunctions.signInWithEmailAndPassword(auth.authInstance, email, password)
    .then(userCred => auth.authFunctions.getIdToken(userCred.user))
    .then(token => auth.cookie.setCookie(['shifty'], token))
    .then(() => navigate("/"))
    .catch(err => console.log(err))
}


const LoginPage = () => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  return (
    <div className='loginWrapper'>
      <div className='login'>
        <div className='login_header'>
          Log In
        </div>
        <form className='login-form' onSubmit={event => handleSubmit(event, navigate, auth)}>
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