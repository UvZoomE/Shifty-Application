import './App.css';
import React, {useState, useEffect, createContext} from 'react';
import {Routes, Route, useNavigate} from 'react-router-dom';
import { shiftsToTracks } from './components/utils'
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
  const [serverURL] = useState('https://peaceful-wildwood-88195.herokuapp.com')
  const [user, setUser] = useState()
  const [teams, setTeams] = useState([])
  const [tracks, setTracks] = useState()
  const [shifts, setShifts] = useState()

  const navigate = useNavigate()

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
    },
    serverURL: serverURL,
    user: user,
    setUser: setUser,
    teams: teams,
    setTeams: setTeams,
    tracks: tracks,
    setTracks: setTracks,
    shifts: shifts,
    setShifts: setShifts
  }

  useEffect(() => {

    let request = {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
    }
    const setValues = async () => {
      await fetch(`${serverURL}/api/users/current-user`, request)
        .then(data => data.json())
        .then(user => {
          setUser(user)
        })
        .catch()

      await fetch(`${serverURL}/api/teams/all`, request)
        .then(data => data.json())
        .then(async teams => {
          let positions = teams.map(team => team.position).sort()
          let teamIndices = positions.map(position => teams.findIndex(team => team.position === position))
          let sortedTeams = teamIndices.map(ix => teams[ix])
          setTeams(sortedTeams)

          await fetch(`${serverURL}/api/shifts/history`, request)
          .then(data => data.json())
          .then(shifts => {
            setShifts(shifts)
            setTracks(shiftsToTracks(shifts, sortedTeams.filter(team => team.name)))
          })
          .catch(() => '')

        })
        .catch(() => '')


    }

    setValues()

  }, [])



  return (
    <div className="App">
      <AuthContext.Provider value={contextVals}>

          <Header />
          <Routes>
            <Route path='/login' element={<LoginPage />} />
            <Route path='/create-account' element={<SignUpPage />} />
            <Route path='/' element={<MainPage />} >
              {/* <Route path='/' element={<Calendar />} /> */}
              <Route path='account' element={<Account />} />
              <Route path='calendar' element={<Calendar />} />
              <Route path='teams' element={<Teams />} />
              <Route path='users' element={<Users />} />
              <Route path='org_chart' element={<OrgCharts />} />
              <Route path='reports' element={<Reports />} />
            </Route>

          </Routes>
        {/* </Router> */}
      </AuthContext.Provider>
    </div>
  );
}

export default App;
