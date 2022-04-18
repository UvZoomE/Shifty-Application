import React, {useState, useEffect} from 'react';
import '../styles/Header.css'

const Header = () => {

 return (
  <div className='Header'>
    <div></div>
    <div className='title'>
      Shifty
    </div>
    <img className='logo' src='/shifty_logo.png' alt='logo' />
  </div>
 )
}

export default Header