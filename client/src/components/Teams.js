import React, {useState, useEffect, useContext} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Teams.css'

import { AuthContext } from "../App.js";

const handleSubmit = async (event, setEdit, auth, targetTeams) =>{
  event.preventDefault()
  //send a patch request to the backend
  let newTeams = []
  for (let i = 0; i < targetTeams.length; i++) {
    newTeams.push({
      name: event.target[i].value,
      position: i + 1,
      office_id: auth.user.office_id
    })
  }

  let remaining = 6 - targetTeams.length
  for (let i = 6 - remaining; i < 6; i++) {
    newTeams.push({
      name: '',
      position: i + 1,
      office_id: auth.user.office_id
    })
  }

  newTeams.forEach(async team => {

    let request = {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(team)
    }

    await fetch(`${auth.serverURL}/api/teams/new-team`, request)

  })

  setEdit(false)
  auth.setTeams(newTeams)
}



const Teams = () => {

  const auth = useContext(AuthContext);

  const [edit, setEdit] = useState(false)
  const [targetTeams, setTargetTeams] = useState(auth.teams)

  useEffect(() => {
    setTargetTeams(auth.teams)
    auth.setTeams(auth.teams)
  }, [auth.teams])

  const editHandler = () =>{
    if (edit) {
      let newTeams = [...targetTeams]
      for (let i = 0; i < targetTeams.length; i++) {
        if (targetTeams[i] === '') {
          newTeams.splice(i, 1)
        }
      }
      setTargetTeams(newTeams)
    }
    setEdit(!edit)
  }

  const addHandler = () =>{
    let newTeams = targetTeams.length < 6 ? [...targetTeams, {name: '', office_id: ''}] : targetTeams
    setTargetTeams(newTeams)
  }

  const removeHandler = (teamId) =>{
    let team = targetTeams.filter(team => team.position === teamId)[0]
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
                  <div className='teams-entry' key={team.position}>
                    <b>{index + 1}:&nbsp;</b>
                    <input className='input teams-info' type='text' name={team.position} id={team.position} defaultValue={team.name}/>
                    <div className='cancel-icon'><rux-icon type='button' icon="cancel" style={{"color": "#cbdee9"}} size='max(3vh, 25px)' onClick={() => removeHandler(team.position)}></rux-icon></div>
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
                  targetTeams.map((team, index) => team.name ? <div key={team.position}><b>{index + 1}:</b> {team.name}</div> : '') :
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