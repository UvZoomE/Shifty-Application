import './App.css';
import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';
import Header from './components/Header';
import Calendar from './components/Calendar';
import MainPage from './components/MainPage';
import Teams from './components/Teams';
import Users from './components/Users';
import OrgCharts from './components/OrgCharts';
import Reports from './components/Reports';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path='/login' element={<LoginPage />} />
          <Route path='/create-account' element={<SignUpPage />} />
          <Route path='/' element={<MainPage />} >
            <Route path='calendar' element={<Calendar />} />
            <Route path='teams' element={<Teams />} />
            <Route path='users' element={<Users />} />
            <Route path='org_chart' element={<OrgCharts />} />
            <Route path='reports' element={<Reports />} />
          </Route>

        </Routes>
      </Router>
    </div>
  );
}

export default App;
