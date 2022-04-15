import './App.css';
import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';
import Header from './components/Header';

function App() {
  return (
    <div className="App">
      <Router>
      <Header />
        <Routes>
          <Route path='/' element={<LoginPage />} />
          <Route path='/create-account' element={<SignUpPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
