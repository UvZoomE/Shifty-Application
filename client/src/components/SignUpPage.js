import React, {useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/LoginPage.css'


const  handleSubmit = (event, navigate) =>{
  event.preventDefault()
  let {email, password, confirmPassword} = event.target
  email = email.value
  password = password.value
  confirmPassword = confirmPassword.value
  // alert(`Email: ${email}\nPassword: ${password} \nConfirm Password: ${confirmPassword}`)
  /*
    Check if password and confirm password are the same.

    If they are:
    Send a POST request with email, and password to server
  */
  if (password === confirmPassword) {
    //send the post request to server to create account

    navigate("/")
  } else {
    alert('Your passwords did not match. Try again')
  }




  //navigate to home page

}

const SignUpPage = () => {
  const navigate = useNavigate()

  return (
    <div className='loginWrapper'>
      <div className='login sign-up'>
        <div className='login_header'>
          Create Account
        </div>
        <form className='login-form' onSubmit={event => handleSubmit(event, navigate)}>
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
          <Link to='/' >
            Log In
          </Link>
        </div>
      </div>
    </div>
 )
}

export default SignUpPage