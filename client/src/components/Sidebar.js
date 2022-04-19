import React, {useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import '../styles/Sidebar.css'



const Sidebar = ({ setShowSidebar }) => {

  function closeNav() {
    document.getElementById("sidebar").style.width = "0";
    document.getElementById("main-page").style.marginLeft = "0";
    let subPages = document.querySelectorAll('[id^="subpage"]')
    subPages.forEach(subpage => subpage.style.width = "100vw")
    setShowSidebar(false)
  }

 return (
  <div className='sidebar' id='sidebar'>
    <Link to='/account' onClick={closeNav}> Account </Link>
    <Link to='/calendar' onClick={closeNav}> Calendar </Link>
    <Link to='/teams' onClick={closeNav}> Teams </Link>
    <Link to='/users' onClick={closeNav}> Users </Link>
    <Link to='/org_chart' onClick={closeNav}> Org Chart </Link>
    <Link to='/reports' onClick={closeNav}> Reports </Link>
  </div>
 )
}

export default Sidebar