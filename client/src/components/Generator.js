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
    this.cycle_length_days = 56
    let days = (this.stop.getTime() - this.start.getTime()) / 1000 / 60/ 60 / 24
    this.num_cycles = Math.ceil(days / this.cycle_length_days)
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

    let finalTeam1 = []
    let finalTeam2 = []
    let finalTeam3 = []
    let finalTeam4 = []
    let teams = [team1, team2, team3, team4]
    let finalTeams = [finalTeam1, finalTeam2, finalTeam3, finalTeam4]
    for (let teamIndex = 0; teamIndex < teams.length; teamIndex++ ) {
      for (let i = 0; i < this.num_cycles; i++) {
        finalTeams[teamIndex].push(...teams[teamIndex])
      }
    }

    let teamInfo = this.teams.map(team => ({
      name: team,
      tracks: []
    }))

    for (let i = 0; i < finalTeam1.length; i++) {
      let dayStart = new Date();
      let nightStart = new Date();
      let nightStop = new Date();

      dayStart.setTime(this.shift_start_millis + this.shift_duration_millis * 2 * i)

      nightStart.setTime(this.shift_start_millis + this.shift_duration_millis * 2 * i + this.shift_duration_millis)

      nightStop.setTime(this.shift_start_millis + this.shift_duration_millis * 2 * i + 2 * this.shift_duration_millis)

      for (let j = 0; j < 4; j++) {
        let team = [finalTeam1, finalTeam2, finalTeam3, finalTeam4][j]
        if (team[i] === 1) {
          teamInfo[j].tracks.push({
            start: dayStart.toISOString(),
            stop: nightStart.toISOString(),
            status: "caution",
            description: `Day Shift\nStart: ${dayStart.toDateString()}\nStop: ${nightStart.toDateString()}`
          })
        }
      }

      if (nightStop > this.stop) {
        break
      }

      for (let j = 0; j < 4; j++) {
        let team = [finalTeam1, finalTeam2, finalTeam3, finalTeam4][j]
        if (team[i] === -1) {
          teamInfo[j].tracks.push({
            start: nightStart.toISOString(),
            stop: nightStop.toISOString(),
            status: "standby",
            description: `Night Shift\nStart: ${nightStart.toDateString()}\nStop: ${nightStop.toDateString()}`
          })
        }
      }


    }



    return teamInfo
  }
};

export default Schedule;