import React, {useState, useEffect, useContext} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Account.css'

import { AuthContext } from "../App.js";
// firstname
// lastname
// rank
// duty phone
// create office or wait to be added

const  handleSubmit = (event, setEdit, setUser) =>{
  event.preventDefault()
  let {first_name, last_name, rank, work_phone, duty_title, office_name} = event.target
  first_name = first_name.value
  last_name = last_name.value
  rank = rank.value
  duty_title = duty_title.value
  work_phone = work_phone.value
  office_name = office_name.value

  //send a patch request to the backend
  const user = {
    first_name,
    last_name,
    rank,
    duty_title,
    work_phone,
    office_name
  }

  let request = {
    method: 'PATCH',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  }
  setEdit(false)
  setUser(user)
  console.log(request)
}


const  handleSubmitOffice = (event, setCreateOffice, user, setUser, auth) =>{
  event.preventDefault()

  setCreateOffice(false)



  let request = {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      office_name: event.target.office_name.value,
    })
  }

  fetch(`${auth.serverURL}/api/offices/new-office`, request)
  .then(() => {
    let request = {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
    }
    fetch(`${auth.serverURL}/api/users/current-user`, request)
      .then(data => data.json())
      .then(user => {
        console.log(user)
        setUser(user)
      })
  })
  setUser({
    ...user,
    office_name: event.target.office_name.value
  })


  console.log(request)
}



const Account = () => {

  const auth = useContext(AuthContext);

  const [edit, setEdit] = useState(false)
  const [createOffice, setCreateOffice] = useState(false)
  const [wait, setWait] = useState(false)

  // const [user, setUser] = useState({
  //   first_name: "Bob",
  //   last_name: "Jenkins",
  //   rank: "Lieutenant General",
  //   duty_title: "Manager",
  //   work_phone: "(555) 123-4567",
  //   office_name: ""
  // })

  const clickHandler = () =>{
    setEdit(!edit)
  }

  console.log(auth.user)

 return (
  <div className='accountWrapper' id='subpage'>

      {auth.user.office_name || createOffice || wait ? '' :
        <div  className='office-create'>
          <h2>No Office Detected</h2>
          <p>Create an office now, OR wait for an admin to add you to an office</p>
          <div className='teams-buttons'>
            <button className='button' type='button' onClick={() => setCreateOffice(true)}>Create Office</button>
            <button className='button' type='button' onClick={() => setWait(true)}>Wait</button>
          </div>
        </div>
      }

      {createOffice ?
        <div className='office-create'>
          <div className='account_header'>
          Create Office
          </div>
          <div className='infoWrapper'>
            <div className='labels'>
              <div>Name</div>
              <div>&nbsp;</div>
            </div>
            <form  className='values' onSubmit={event => handleSubmitOffice(event, setCreateOffice, auth.user, auth.setUser, auth) }>
              <input className='input info' type='text' name='office_name' id='office_name' defaultValue={auth.user.office_name}/>
              <input className='button save' type="submit" value="Save" />
            </form>
          </div>
        </div> :
        ''
      }

    <div className='account'>
        <div className='account_header'>
        Account Information <rux-icon icon="edit" style={{"color": "#cbdee9"}} size='max(4vh, 40px)' onClick={clickHandler}></rux-icon>
        </div>
        <div className='infoWrapper'>
          <div className='labels'>
            <div>First Name</div>
            <div>Last Name</div>
            <div>Rank</div>
            <div>Duty Title</div>
            <div>Work Phone</div>
            <div>Office</div>
            <div>&nbsp;</div>
          </div>
          {edit ?
            <form  className='values' onSubmit={event => handleSubmit(event, setEdit, auth.setUser) }>
              <input className='input info' type='text' name='first_name' id='first_name' defaultValue={auth.user.first_name}/>
              <input className='input info' type='text' name='last_name' id='last_name' defaultValue={auth.user.last_name}/>
              <input className='input info' type='text' name='rank' id='rank' defaultValue={auth.user.rank}/>
              <input className='input info' type='text' name='duty_title' id='duty_title' defaultValue={auth.user.duty_title}/>
              <input className='input info' type='text' name='work_phone' id='work_phone' defaultValue={auth.user.work_phone}/>
              <input className='input info' type='text' name='office_name' id='office_name' value={auth.user.office_name}/>
              <input className='button save' type="submit" value="Save" />
            </form> :
            <div className='values'>
              <div>{auth.user.first_name}</div>
              <div>{auth.user.last_name}</div>
              <div>{auth.user.rank}</div>
              <div>{auth.user.duty_title}</div>
              <div>{auth.user.work_phone}</div>
              <div>{auth.user.office_name || <>&nbsp;</>}</div>
              <div>&nbsp;</div>
            </div>
          }
        </div>

      </div>
  </div>
 )
}

export default Account