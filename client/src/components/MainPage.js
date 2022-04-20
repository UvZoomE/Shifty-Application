import React, {useState, useEffect, useContext} from 'react';
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from './Sidebar'
import '../styles/MainPage.css'

import { AuthContext } from "../App.js";

/* Set the width of the sidebar to 250px and the left margin of the page content to 250px */
function openNav() {
  document.getElementById("sidebar").style.width = "250px";
  document.getElementById("main-page").style.marginLeft = "250px";
  let subPages = document.querySelectorAll('[id^="subpage"]')
  subPages.forEach(subpage => subpage.style.width = "calc(100vw - 250px)")
}

/* Set the width of the sidebar to 0 and the left margin of the page content to 0 */
function closeNav() {
  document.getElementById("sidebar").style.width = "0";
  document.getElementById("main-page").style.marginLeft = "0";
  let subPages = document.querySelectorAll('[id^="subpage"]')
  subPages.forEach(subpage => subpage.style.width = "100vw")
}


const MainPage = () => {

  const navigate = useNavigate()
  const auth = useContext(AuthContext);

  // if auth.user is undefined, navigate to /login
  if (auth.user === undefined) {
    let request = {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
    }
    fetch(`${auth.serverURL}/api/users/current-user`, request)
      .then(data => data.json())
      .then(user => {
        auth.setUser(user)
      })
      .catch(() => navigate('/login'))
  }

  if (window.location.pathname === "/") {
    navigate('/calendar')
  }

  const [showSidebar, setShowSidebar] = useState(false)

  const handleClick = () =>{
    showSidebar && closeNav();
    !showSidebar && openNav();
    setShowSidebar(!showSidebar)
  }

  return (
    <div className='main-page' id='main-page'>
      <div className='hamburger-button' onClick={handleClick}>
        &#9776;
      </div>
      <Sidebar setShowSidebar={setShowSidebar}/>
      <Outlet />
    </div>
 )
}

export default MainPage