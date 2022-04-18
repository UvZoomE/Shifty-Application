import './App.css';
import React, {useState, useEffect, useContext, createContext} from 'react';
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
import Account from './components/Account';


import firebaseConfig from './firebaseConfig.json'
import { initializeApp } from 'firebase/app'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, getIdToken } from 'firebase/auth'

import { useCookies } from 'react-cookie';

// must initialize firebase app before using other services
const fbAuthApp = initializeApp(firebaseConfig);

// create instance of specified firebase service
const authInstance = getAuth(fbAuthApp)

export const AuthContext = createContext(null);


function App() {
  const [cookies, setCookie, removeCookie] = useCookies(['shifty']);

  const contextVals = {
    authInstance: authInstance,
    authFunctions: {
      createUserWithEmailAndPassword: createUserWithEmailAndPassword,
      signInWithEmailAndPassword: signInWithEmailAndPassword,
      getIdToken: getIdToken
    },
    cookie: {
      cookies: cookies,
      setCookie: setCookie,
      removeCookie: removeCookie
    }
  }

  return (
    <div className="App">
      <AuthContext.Provider value={contextVals}>
        <Router>
          <Header />
          <Routes>
            <Route path='/login' element={<LoginPage />} />
            <Route path='/create-account' element={<SignUpPage />} />
            <Route path='/' element={<MainPage />} >
              <Route path='account' element={<Account />} />
              <Route path='calendar' element={<Calendar />} />
              <Route path='teams' element={<Teams />} />
              <Route path='users' element={<Users />} />
              <Route path='org_chart' element={<OrgCharts />} />
              <Route path='reports' element={<Reports />} />
            </Route>

          </Routes>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
