import React, {useState, useContext} from 'react';
import '../styles/Account.css'

import { AuthContext } from "../App.js";


const  handleSubmit = (event, setEdit, auth) =>{
  event.preventDefault()
  let {first_name, last_name, rank, work_phone, duty_title} = event.target
  first_name = first_name.value
  last_name = last_name.value
  rank = rank.value
  duty_title = duty_title.value
  work_phone = work_phone.value

  const user = {
    first_name,
    last_name,
    rank,
    duty_title,
    work_phone
  }

  let request = {
    method: 'PATCH',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  }

  fetch(`${auth.serverURL}/api/users/edit-user`, request)


  setEdit(false)
  user.office_name = auth.user.office_name
  user.email = auth.user.email
  user.is_admin = auth.user.is_admin
  auth.setUser(user)
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
        setUser(user[0])
      })
  })
  setUser({
    ...user,
    office_name: event.target.office_name.value
  })

}



const Account = () => {

  const auth = useContext(AuthContext);

  const [edit, setEdit] = useState(false)
  const [createOffice, setCreateOffice] = useState(false)
  const [wait, setWait] = useState(false)

  const clickHandler = () =>{
    setEdit(!edit)
  }

  return ( auth.user ?
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
                <input className='input' type='text' name='office_name' id='office_name' defaultValue={auth.user.office_name}/>
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
              <div>Email</div>
              <div>Office</div>
              <div>Admin</div>
              <div>&nbsp;</div>
            </div>
            {edit ?
              <form  className='values' onSubmit={event => handleSubmit(event, setEdit, auth) }>
                <input className='input schedInput' type='text' name='first_name' id='first_name' defaultValue={auth.user.first_name}/>
                <input className='input schedInput' type='text' name='last_name' id='last_name' defaultValue={auth.user.last_name}/>
                <input className='input schedInput' type='text' name='rank' id='rank' defaultValue={auth.user.rank}/>
                <input className='input schedInput' type='text' name='duty_title' id='duty_title' defaultValue={auth.user.duty_title}/>
                <input className='input schedInput' type='text' name='work_phone' id='work_phone' defaultValue={auth.user.work_phone}/>
                {/* <input className='input info' type='text' name='office_name' id='office_name' defaultValue={auth.user.office_name} readOnly/> */}
                <div>{auth.user.email || <>&nbsp;</>}</div>
                <div>{auth.user.office_name || <>&nbsp;</>}</div>
                <div>{auth.user.is_admin.toString() || <>&nbsp;</>}</div>
                <input className='button save' type="submit" value="Save" />
              </form> :
              <div className='values'>
                <div>{auth.user.first_name || <>&nbsp;</>}</div>
                <div>{auth.user.last_name || <>&nbsp;</>}</div>
                <div>{auth.user.rank || <>&nbsp;</>}</div>
                <div>{auth.user.duty_title || <>&nbsp;</>}</div>
                <div>{auth.user.work_phone || <>&nbsp;</>}</div>
                <div>{auth.user.email || <>&nbsp;</>}</div>
                <div>{auth.user.office_name || <>&nbsp;</>}</div>
                <div>{auth.user.is_admin.toString() || "False"}</div>
                <div>&nbsp;</div>
              </div>
            }
          </div>

        </div>
    </div> : <></>
 )
}

export default Account