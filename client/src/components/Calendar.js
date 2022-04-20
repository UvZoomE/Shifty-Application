import '@astrouxds/astro-web-components/dist/astro-web-components/astro-web-components.css'
import { RuxTimeline, RuxTrack, RuxRuler, RuxTimeRegion } from '@astrouxds/react'
import React, { useState, useEffect, useContext } from 'react';
import '../styles/Calendar.css'
import Schedule, { Panama } from './Generator'
import { AuthContext } from "../App.js";


const Calendar = () => {

  const auth = useContext(AuthContext);

  const [start, setStart] = useState()
  const [stop, setStop] = useState()
  const [shifts, setShifts] = useState([])
  const [tracks, setTracks] = useState()
  const [save, setSave] = useState(false)

  let teams = auth.teams.filter(team => team.name).map(team => team.name)

  let office = {
    schedule_id: '',
    teams: teams
  }

  const handleGenerateSchedule = (event) => {
    event.preventDefault();
    let { schedule, start, stop } = event.target

    let newStart = new Date(start.value)
    let newStop = new Date(stop.value)
    setStart(newStart.toISOString())
    setStop(newStop.toISOString())

    let panama = new Panama("panama", start.value, stop.value, office.teams)
    setTracks(panama.generate())
    setSave(true)
  }

  const saveTracks = () => {

  }

  const cancelTracks = () => {
    setTracks()
    setSave(false)
  }

    return (
      <div className='calendar' id='subpage'>
      {office.schedule_id ? '' : !save ?
          <div className='schedule-create'>
            <div className='account_header'>
            Generate Schedule
            </div>
            <div className='infoWrapper'>
              <div className='labels'>
                <div>Name</div>
                <div>Start Date</div>
                <div>Stop Date</div>
                <div>&nbsp;</div>
              </div>
              <form  className='values' onSubmit={event => handleGenerateSchedule(event) }>
                <select className='input info' name="schedule">
                  <option key="empty" value=""></option>
                  <option key="panama" value="panama">Panama</option>
                  <option key="5-2" value="5-2">5-2</option>
                </select>
                <input className='input info' type='date' name='start' id='start' defaultValue={''}/>
                <input className='input info' type='date' name='stop' id='stop' defaultValue={''}/>
                <input className='button generate' type="submit" value="Generate" />
              </form>
            </div>
          </div> : ''
        }

        {save ?
          <div className='confirm-buttons'>
            <button className='button confirm' onClick={saveTracks}>Save</button>
            <button className='button confirm' onClick={cancelTracks}>Cancel</button>
          </div> :
          <></>}

      {tracks ?
        <RuxTimeline className='timeline' start={start} end={stop} interval='day' playhead={new Date()} zoom='4'>
          {tracks}
          <RuxTrack slot='ruler'>
            <RuxRuler></RuxRuler>
          </RuxTrack>
        </RuxTimeline> : <></>}
      </div>

    )
}

export default Calendar;