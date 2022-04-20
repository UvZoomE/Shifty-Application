import '@astrouxds/astro-web-components/dist/astro-web-components/astro-web-components.css'
import { RuxTimeline, RuxTrack, RuxRuler, RuxTimeRegion } from '@astrouxds/react'
import React, { useState, useEffect } from 'react';
import '../styles/Calendar.css'
import Schedule, { Panama } from './Generator'



const Calendar = () => {

  const [start, setStart] = useState()

  const [stop, setStop] = useState()

  const [shifts, setShifts] = useState([])

  const [tracks, setTracks] = useState()


  let office = {
    schedule_id: '',
    teams: ["Team A", "Team B", "Team C", "Team D"]
  }

  const handleSubmitSchedule = (event) => {
    event.preventDefault();
    let { schedule, start, stop } = event.target

    let newStart = new Date(start.value)
    let newStop = new Date(stop.value)
    setStart(newStart.toISOString())
    setStop(newStop.toISOString())

    let panama = new Panama("panama", start.value, stop.value, office.teams)
    setTracks(panama.generate())
  }

    return (
      <div className='calendar' id='subpage'>
      {office.schedule_id ? '' :
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
              <form  className='values' onSubmit={event => handleSubmitSchedule(event /* Parameter reperesenting list of teams */) }>
                <select className='input info' name="schedule">
                  <option key="empty" value=""></option>
                  <option key="panama" value="panama">Panama</option>
                  <option key="5-2" value="5-2">5-2</option>
                </select>
                <input className='input info' type='date' name='start' id='start' defaultValue={''}/>
                <input className='input info' type='date' name='stop' id='stop' defaultValue={''}/>
                <input className='button save' type="submit" value="Save" />
              </form>
            </div>
          </div>
        }
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