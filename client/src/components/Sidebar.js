import React, {useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import '../styles/Sidebar.css'

const Sidebar = () => {
 return (
  <div className='sidebar' id='sidebar'>
    <Link to='/account'> Account </Link>
    <Link to='/calendar'> Calendar </Link>
    <Link to='/teams'> Teams </Link>
    <Link to='/users'> Users </Link>
    <Link to='/org_chart'> Org Chart </Link>
    <Link to='/reports'> Reports </Link>
  </div>
 )
}

export default Sidebar