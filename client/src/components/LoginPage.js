import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import '../styles/LoginPage.css'

const LoginPage = () => {

 return (
  <div className='loginWrapper'>
    <div className='login'>
      <div className='login_header'>
        Log In
      </div>
      <form className='login-form'>
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