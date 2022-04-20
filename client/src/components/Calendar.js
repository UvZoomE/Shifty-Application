import '@astrouxds/astro-web-components/dist/astro-web-components/astro-web-components.css'
import { RuxTimeline, RuxTrack, RuxRuler, RuxTimeRegion } from '@astrouxds/react'
import React, { useState, useEffect, useContext } from 'react';
import '../styles/Calendar.css'
import Schedule, { Panama } from './Generator'
import { AuthContext } from "../App.js";

const getStartStop = (tracks) => {
  let maxTime = new Date('01 January 1970 00:00 UTC');
  let minTime = new Date('01 January 2300 00:00 UTC');
  for (let team of tracks) {
    for (let track of team.tracks) {
      let start = new Date(track.start)
      let stop = new Date(track.stop)
      if (start < minTime) {
        minTime = start
      }
      if (stop > maxTime) {
        maxTime = stop
      }
    }
  }

  minTime = new Date(minTime.getTime() - 6 * 60 * 60 * 1000)
  maxTime = new Date(maxTime.getTime() + 6 * 60 * 60 * 1000)

  return [minTime, maxTime]
}


const Calendar = () => {

  const auth = useContext(AuthContext);
  const [shifts, setShifts] = useState([])
  const [tracks, setTracks] = useState(auth.tracks)
  const [start, setStart] = useState(tracks ? getStartStop(tracks)[0].toISOString() : undefined)
  const [stop, setStop] = useState(tracks ? getStartStop(tracks)[1].toISOString() : undefined)
  const [save, setSave] = useState(false)

  useEffect(() => {
    setTracks(auth.tracks)
  }, [auth.tracks]);

  let teams = auth.teams.filter(team => team.name).map(team => team.name)

  let office = {
    schedule_id: '',
    teams: teams
  };

  const handleGenerateSchedule = (event) => {
    event.preventDefault();
    let { schedule, start, stop } = event.target

    let newStart = new Date(start.value)
    let newStop = new Date(stop.value)
    setStart(newStart.toISOString())
    setStop(newStop.toISOString())

    let panama = new Panama("panama", start.value, stop.value, office.teams)
    console.log("Generate: ", panama.generate())
    setTracks([...panama.generate()])
    setSave(true)
  };

  const saveTracks = () => {
    console.log("Save: ", tracks)
    auth.setTracks(tracks)

  };

  const cancelTracks = () => {
    setTracks()
    auth.setTracks()
    setSave(false)
  };

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
                <select className='input info' name="schedule">
                  <option key="empty" value=""></option>
                  <option key="panama" value="panama">Panama</option>
                  <option key="7-2" value="7-2">7-2</option>
                </select>
                <input className='input info' type='date' name='start' id='start' defaultValue={''}/>
                <input className='input info' type='date' name='stop' id='stop' defaultValue={''}/>
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
        <RuxTimeline className='timeline' start={start} end={stop} interval='day' playhead={new Date()} zoom='4'>
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
        </RuxTimeline> : <></>}
      </div>

    )
}

export default Calendar;