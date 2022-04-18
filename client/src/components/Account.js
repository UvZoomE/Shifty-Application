import React, {useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Account.css'

// firstname
// lastname
// rank
// duty phone
// create office or wait to be added

const  handleSubmit = (event, setEdit, setUser) =>{
  event.preventDefault()
  let {firstname, lastname, rank, dutyphone, office} = event.target
  firstname = firstname.value
  lastname = lastname.value
  rank = rank.value
  dutyphone = dutyphone.value
  office = office.value

  //send a patch request to the backend
  const user = {
    firstname,
    lastname,
    rank,
    dutyphone,
    office
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



const Account = () => {

  const [edit, setEdit] = useState(false)

  const [user, setUser] = useState({
    firstname: "Bob",
    lastname: "Jenkins",
    rank: "Lieutenant General",
    dutyphone: "(555) 123-4567",
    office: "Arby's"
  })

  const clickHandler = () =>{
    setEdit(!edit)
  }

 return (
  <div className='accountWrapper'>
    <div className='account'>
        <div className='account_header'>
        Account Information <rux-icon icon="edit" style={{"color": "#cbdee9"}} size='4vh' onClick={clickHandler}></rux-icon>
        </div>
        <div className='infoWrapper'>
          <div className='labels'>
            <div>First Name</div>
            <div>Last Name</div>
            <div>Rank</div>
            <div>Duty Phone</div>
            <div>Office</div>
            <div>&nbsp;</div>
          </div>
          {edit ?
            <form  className='values' onSubmit={event => handleSubmit(event, setEdit, setUser) }>
              <input className='input info' type='text' name='firstname' id='firstname' defaultValue={user.firstname}/>
              <input className='input info' type='text' name='lastname' id='lastname' defaultValue={user.lastname}/>
              <input className='input info' type='text' name='rank' id='rank' defaultValue={user.rank}/>
              <input className='input info' type='text' name='dutyphone' id='dutyphone' defaultValue={user.dutyphone}/>
              <input className='input info' type='text' name='office' id='office' defaultValue={user.office}/>
              <input className='button save' type="submit" value="Save" />
            </form> :
            <div className='values'>
              <div>{user.firstname}</div>
              <div>{user.lastname}</div>
              <div>{user.rank}</div>
              <div>{user.dutyphone}</div>
              <div>{user.office}</div>
              <div>&nbsp;</div>
            </div>
          }
        </div>

      </div>
  </div>
 )
}

export default Account