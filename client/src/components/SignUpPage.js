import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/LoginPage.css'

import { AuthContext } from "../App.js";

const  handleSubmit = (event, navigate, auth) =>{
  event.preventDefault()
  let {email, password, confirmPassword} = event.target
  email = email.value
  password = password.value
  confirmPassword = confirmPassword.value

  if (password === confirmPassword) {
    auth.authFunctions.createUserWithEmailAndPassword(auth.authInstance, email, password)
      .then(userCred => auth.authFunctions.getIdToken(userCred.user))
      .then(token => auth.cookie.setCookie(['shifty'], token))
      .then(() => {
        const user = {
          first_name: '',
          email: email,
          last_name: '',
          rank: '',
          duty_title: '',
          work_phone: ''
        }

        let request = {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(user)
        }

        fetch(`${auth.serverURL}/api/users/new-user`, request)
      })
      .then(() => navigate("/account"))
      .catch(() => '')
  } else {
    alert('Your passwords did not match. Try again')
  }
}

const SignUpPage = () => {
  const navigate = useNavigate()
  const auth = useContext(AuthContext);

  return (
    <div className='loginWrapper'>
      <div className='login sign-up'>
        <div className='login_header'>
          Create Account
        </div>
        <form className='login-form' onSubmit={event => handleSubmit(event, navigate, auth)}>
          <label htmlFor='email'>Email</label>
          <input className='input' type='text' name='email' id='email' placeholder='email@example.com' />

          <label htmlFor='password'>Password</label>
          <input className='input' type='password' name='password' id='password' placeholder='********' />

          <label htmlFor='confirmPassword'>Confirm Password</label>
          <input className='input' type='password' name='confirmPassword' id='confirmPassword' placeholder='********' />

          <input className='button' type="submit" value="Sign Up" />
        </form>

        <div className='create-account' >
            Already have an account?
          <Link to='/login' >
            Log In
          </Link>
        </div>
      </div>
    </div>
 )
}

export default SignUpPage