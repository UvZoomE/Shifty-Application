import React from 'react'
import { RuxTimeline, RuxTrack, RuxRuler, RuxTimeRegion } from '@astrouxds/react'

class Schedule  {

  constructor (type, start, stop, teams) {
    this.type = type
    this.start = new Date(start)
    this.stop = new Date(stop)
    this.teams = teams
  }

}


export class Panama extends Schedule {

  constructor (type, start, stop, teams) {
    super(type, start, stop, teams)
    this.shift_duration_hrs = 12
    this.shift_duration_millis = 12 * 3600 * 1000
    this.shift_start_hr = 7
    this.shift_start_millis = this.start.getTime()  + this.shift_start_hr * 3600 * 1000
  }

  generate () {
    let week1 = [1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0];
    let week3 = week1.map(day => day === 0 ? 0 : day * -1);
    let team1 = [...week1, ...week1, ...week3, ...week3];
    let team2 = team1.map(day => day === 0 ? 0 : day * -1);

    week1 = week1.map(day => day === 0 ? 1 : 0);
    week3 = week1.map(day => day === 0 ? 0 : day * -1);
    let team3 = [...week1, ...week1, ...week3, ...week3];
    let team4 = team3.map(day => day === 0 ? 0 : day * -1);

    let teamInfo = this.teams.map(team => ({
      name: team,
      tracks: []
    }))

    for (let i = 0; i < team1.length; i++) {
      let dayStart = new Date();
      let nightStart = new Date();
      let nightStop = new Date();

      dayStart.setTime(this.shift_start_millis + this.shift_duration_millis * 2 * i)
      dayStart = dayStart.toISOString()

      nightStart.setTime(this.shift_start_millis + this.shift_duration_millis * 2 * i + this.shift_duration_millis)
      nightStart = nightStart.toISOString()

      nightStop.setTime(this.shift_start_millis + this.shift_duration_millis * 2 * i + 2 * this.shift_duration_millis)

      if (nightStop > this.stop) {
        break
      }

      nightStop = nightStop.toISOString()



      for (let j = 0; j < 4; j++) {
        let team = [team1, team2, team3, team4][j]
        if (team[i] === -1) {
          teamInfo[j].tracks.push({
            start: nightStart,
            stop: nightStop,
            status: "standby",
            description: "Night Shift"
          })
        } else if (team[i] === 1) {
          teamInfo[j].tracks.push({
            start: dayStart,
            stop: nightStart,
            status: "caution",
            description: "Day Shift"
          })
        }
      }
    }
    console.log(teamInfo)
    console.log(this.shift_duration_millis, this.shift_start_millis)

    return teamInfo.map(team => (
      <RuxTrack className='track' key={team.name}>
        <div slot="label">
            {team.name}
        </div>
        {team.tracks.map((track, index) => (
          <RuxTimeRegion key={index} start={track.start} end={track.stop} status={track.status}>
            {track.description}
        </RuxTimeRegion>
        ))}
      </RuxTrack>
    ))

  }
}

export default Schedule;