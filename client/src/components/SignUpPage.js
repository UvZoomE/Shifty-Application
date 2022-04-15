import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import '../styles/LoginPage.css'

const SignUpPage = () => {

 return (
  <div className='loginWrapper'>
    <div className='login sign-up'>
      <div className='login_header'>
        Create Account
      </div>
      <form className='login-form'>
        <label htmlFor='email'>Email</label>
        <input className='input' type='text' name='email' id='email' placeholder='email@example.com' />

        <label htmlFor='password'>Password</label>
        <input className='input' type='password' name='password' id='password' placeholder='********' />

        <label htmlFor='confirm-password'>Confirm Password</label>
        <input className='input' type='password' name='confirm-password' id='confirm-password' placeholder='********' />

        <input className='button' type="submit" value="Sign Up" />
      </form>

      <div className='create-account' >
          Already have an account?
        <Link to='/' >
          Log In
        </Link>
      </div>
    </div>
  </div>
 )
}

export default SignUpPage