import React, {useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Teams.css'

// firstname
// lastname
// rank
// duty phone
// create office or wait to be added

const  handleSubmit = (event, setEdit, teams, setTeams) =>{
  event.preventDefault()

  //send a patch request to the backend
  let newTeams = []
  for (let i = 0; i < teams.length; i++) {
    newTeams.push(event.target[i].value)
  }

  let request = {
    method: 'PATCH',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newTeams)
  }
  setEdit(false)
  setTeams(newTeams)
  console.log(request)
}



const Teams = () => {

  const [edit, setEdit] = useState(false)

  const [teams, setTeams] = useState([
    'Team A', 'Team B'
  ])

  const editHandler = () =>{
    setEdit(!edit)
  }

  const addHandler = () =>{
    let newTeams = teams.length < 6 ? [...teams, ''] : teams
    setTeams(newTeams)
  }

  const removeHandler = (team) =>{
    let index = teams.indexOf(team)
    let newTeams = [...teams]
    newTeams.splice(index, 1)

    setTeams(newTeams)
  }

 return (
  <div className='teamsWrapper'>
    <div className='teams'>
        <div className='teams_header'>
        Teams <rux-icon icon="edit" style={{"color": "#cbdee9"}} size='4vh' onClick={editHandler}></rux-icon>
        </div>
        <div className='teams-infoWrapper'>
          {edit ?
            <>
              <form  className='teams-values' onSubmit={event => handleSubmit(event, setEdit, teams, setTeams) }>
                {teams.map((team, index) => {
                  return (
                  <div className='teams-entry'>
                    <input className='input teams-info' type='text' name={team} id={team} defaultValue={team}/>
                    <rux-icon className='cancel-icon' type='button' icon="cancel" style={{"color": "#cbdee9"}} size='4vh' onClick={() => removeHandler(team)}></rux-icon>
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
              {teams.map(team => <div>{team}</div>)}
              <div>&nbsp;</div>
            </div>
          }
        </div>

      </div>
  </div>
 )
}

export default Teams