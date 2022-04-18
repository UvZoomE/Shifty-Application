import React, {useState, useEffect} from 'react';
import { Outlet } from "react-router-dom";
import Sidebar from './Sidebar'
import '../styles/MainPage.css'

/* Set the width of the sidebar to 250px and the left margin of the page content to 250px */
function openNav() {
  document.getElementById("sidebar").style.width = "250px";
  document.getElementById("main-page").style.marginLeft = "250px";
}

/* Set the width of the sidebar to 0 and the left margin of the page content to 0 */
function closeNav() {
  document.getElementById("sidebar").style.width = "0";
  document.getElementById("main-page").style.marginLeft = "0";
}


const MainPage = () => {
  const [showSidebar, setShowSidebar] = useState(false)

  const handleClick = () =>{
    console.log(showSidebar)
    showSidebar && closeNav();
    !showSidebar && openNav();
    setShowSidebar(!showSidebar)
  }

  return (
    <div className='main-page' id='main-page'>
      <div className='hamburger-button' onClick={handleClick}>
        &#9776;
      </div>
      <Sidebar/>
      <Outlet />
    </div>
 )
}

export default MainPage