import '@astrouxds/astro-web-components/dist/astro-web-components/astro-web-components.css'
import { RuxTimeline, RuxTrack, RuxRuler, RuxTimeRegion } from '@astrouxds/react'
import React, { useState, useEffect, useContext } from 'react';
import '../styles/Calendar.css'
import Schedule, { Panama, SevenTwo } from './Generator'
import { AuthContext } from "../App.js";
import { tracksToShifts, getStatus, shiftsToTracks, getStartStop } from './utils'

const schedules = {
  1: {
    numTeamsRequired: 4,
    schedule: Panama,
    name: 'panama'
  },
  2: {
    numTeamsRequired: 4,
    schedule: SevenTwo,
    name: 'seventwo'
  }
}

const Calendar = () => {

  const auth = useContext(AuthContext);
  const [shifts, setShifts] = useState(auth.shifts)
  const [tracks, setTracks] = useState(auth.tracks)
  const [start, setStart] = useState(auth.tracks ? getStartStop(auth.tracks)[0].toISOString() : undefined)
  const [stop, setStop] = useState(auth.tracks ? getStartStop(auth.tracks)[1].toISOString() : undefined)
  const [save, setSave] = useState(false)
  const [showDelete, setShowDelete] = useState(false)

  useEffect(() => {
    if (auth.tracks) {
      setTracks(auth.tracks)
      setStart(getStartStop(auth.tracks)[0].toISOString())
      setStop(getStartStop(auth.tracks)[1].toISOString())
      setShifts(auth.shifts)
    }


  }, [auth.tracks, auth.shifts, auth.teams]);

  let teams = auth.teams.filter(team => team.name).map(team => team.name)

  const handleGenerateSchedule = (event) => {
    event.preventDefault();
    let { schedule, start, stop } = event.target
    if (schedule.value === '') {
      alert('Choose a schedule type')
      return;
    }

    if (teams.length !== schedules[schedule.value].numTeamsRequired) {
      alert('Make sure you have the correct number of teams')
      return;
    }


    let newStart = new Date(start.value)
    let newStop = new Date(stop.value)
    setStart(newStart.toISOString())
    setStop(newStop.toISOString())

    let newSchedule = new schedules[schedule.value].schedule(schedules[schedule.value].name, start.value, stop.value, teams, schedule.value)
    let newTracks = newSchedule.generate()
    console.log(newTracks)
    setStart(getStartStop(newTracks)[0].toISOString())
    setStop(getStartStop(newTracks)[1].toISOString())
    setTracks(newTracks)
    setSave(true)
  };

  const saveTracks = async () => {

    let shifts = tracksToShifts(tracks, auth.teams.filter(team => team.name))

    for (let shift of shifts) {
      let request = {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(shift)
      }
      await fetch(`${auth.serverURL}/api/shifts/new-shift`, request)
    }

    auth.setTracks(tracks)

  };

  const cancelTracks = () => {
    setTracks()
    auth.setTracks()
    setSave(false)
  };

  const deleteAll = async () => {

    if (window.confirm("Are you sure you want to permanently delete all shifts? This action cannot be undone.")) {
      let request = {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      }
      fetch(`${auth.serverURL}/api/shifts/history`, request)
      setTracks()
      auth.setTracks()
    } else {
        setShowDelete(false)
    }

  }

    return (
      <div className='calendar' id='subpage'>
      {auth.tracks ? '' : !save ?
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
                <select className='input schedInput' name="schedule">
                  <option key="empty" value=""></option>
                  <option key="panama" value="1">Panama (4 teams, 12 hour shifts)</option>
                  <option key="7-2" value="2">7-2 (4 teams, 8 hour shifts)</option>
                </select>
                <input className='input schedInput' type='date' name='start' id='start' defaultValue={''}/>
                <input className='input schedInput' type='date' name='stop' id='stop' defaultValue={''}/>
                <input className='button generate' type="submit" value="Generate" />
              </form>
            </div>
          </div> : ''
        }

        {save && auth.tracks === undefined ?
          <div className='confirm-buttons'>
            <button className='button confirm' onClick={saveTracks}>Save</button>
            <button className='button confirm' onClick={cancelTracks}>Cancel</button>
          </div> :
          <></>}

      {tracks ?
      <>
      <RuxTimeline className='timeline' start={start} end={stop} interval='day' playhead={new Date()} zoom='4.5'>
          {tracks.map(team => (
            <RuxTrack className='track' key={team.name}>
              <div slot="label">
                  {team.name}
              </div>
              {team.tracks.map((track, index) => (
                <RuxTimeRegion key={index} start={track.start} end={track.stop} status={track.status}>
                  {track.description.split('\n').map(piece => <><br />{piece}</>)}
              </RuxTimeRegion>
              ))}
            </RuxTrack>
          ))}
          <RuxTrack slot='ruler'>
            <RuxRuler></RuxRuler>
          </RuxTrack>
        </RuxTimeline>
        {auth.user.is_admin === true ?
        <div className='deleteShifts'>
          <rux-icon icon="edit" style={{"color": "#cbdee9"}} size='4vh' onClick={() => setShowDelete(!showDelete)}></rux-icon>
          {showDelete ? <button className='button delete' onClick={deleteAll}>Delete all shifts</button> : ''}
        </div> : ''
        }


      </> : <></>}
      </div>

    )
}

export default Calendar;