import React, {useState, useEffect, useContext} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Teams.css'

import { AuthContext } from "../App.js";

const  handleSubmit = async (event, setEdit, auth, targetTeams) =>{
  event.preventDefault()

  //send a patch request to the backend
  let newTeams = []
  for (let i = 0; i < targetTeams.length; i++) {
    newTeams.push({
      name: event.target[i].value,
      office_id: auth.user.office_id
    })
  }

  auth.teams.forEach(async team =>{
    console.log("DELETING Team", team.id)
    let request = {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    }

    await fetch(`${auth.serverURL}/api/teams/${team.id}`, request)
  })



  newTeams.forEach(team => {

    let request = {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(team)
    }

    fetch(`${auth.serverURL}/api/teams/new-team`, request)

  })

  setEdit(false)
  auth.setTeams(newTeams)
}



const Teams = () => {

  const auth = useContext(AuthContext);

  const [edit, setEdit] = useState(false)
  const [targetTeams, setTargetTeams] = useState(auth.teams)

  console.log("auth.teams: ",auth.teams)
  console.log("targetTeams: ", targetTeams)

  useEffect(() => {
    setTargetTeams(auth.teams)
    auth.setTeams(auth.teams)
  }, [auth.teams])

  console.log("Teams: ", targetTeams)

  const editHandler = () =>{
    if (edit) {
      let newTeams = [...targetTeams]
      for (let i = 0; i < targetTeams.length; i++) {
        if (targetTeams[i] === '') {
          newTeams.splice(i, 1)
        }
      }
      targetTeams(newTeams)
    }
    setEdit(!edit)
  }

  const addHandler = () =>{
    let newTeams = targetTeams.length < 6 ? [...targetTeams, {name: '', office_id: ''}] : targetTeams
    setTargetTeams(newTeams)
  }

  const removeHandler = (teamId) =>{
    let team = targetTeams.filter(team => team.id === teamId)[0]
    let index = targetTeams.indexOf(team)
    let newTeams = [...targetTeams]
    newTeams.splice(index, 1)

    setTargetTeams(newTeams)
  }

 return (
  <div className='teamsWrapper' id='subpage'>
    <div className='teams'>
        <div className='teams_header'>
        Teams <rux-icon icon="edit" style={{"color": "#cbdee9"}} size='4vh' onClick={editHandler}></rux-icon>
        </div>
        <div className='teams-infoWrapper'>
          {edit ?
            <>
              <form  className='teams-values' onSubmit={event => handleSubmit(event, setEdit, auth, targetTeams) }>
                {targetTeams.map((team, index) => {
                  return (
                  <div className='teams-entry' key={team.id}>
                    <b>{index + 1}:&nbsp;</b>
                    <input className='input teams-info' type='text' name={team.id} id={team.id} defaultValue={team.name}/>
                    <div className='cancel-icon'><rux-icon type='button' icon="cancel" style={{"color": "#cbdee9"}} size='max(3vh, 25px)' onClick={() => removeHandler(team.id)}></rux-icon></div>
                  </div>
                )})}
                <div className='teams-buttons'>
                  <button className='button' type='button' onClick={addHandler}>Add Team</button>
                  <input className='button save' type="submit" value="Save" />
                </div>

              </form>
            </>
             :
            <div className='teams-values'>
                { targetTeams.length ?
                  targetTeams.map((team, index) => <div key={team.id}><b>{index + 1}:</b> {team.name}</div>) :
                  <div className='no-Teams'>
                    No teams found. Click the edit button to add teams!
                  </div>
                }
              <div>&nbsp;</div>
            </div>
          }
        </div>

      </div>
  </div>
 )
}

export default Teams