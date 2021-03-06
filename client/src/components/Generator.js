
class Schedule  {

  constructor (type, start, stop, teams, schedule_id) {
    this.type = type
    this.start = new Date(start)
    this.stop = new Date(stop)
    this.teams = teams
    this.schedule_id = schedule_id
  }

}


export class Panama extends Schedule {

  constructor (type, start, stop, teams, schedule_id) {
    super(type, start, stop, teams, schedule_id)
    this.shift_duration_hrs = 12
    this.shift_duration_millis = this.shift_duration_hrs * 3600 * 1000
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
      schedule_id: this.schedule_id,
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

export class SevenTwo extends Schedule {

  constructor (type, start, stop, teams, schedule_id) {
    super(type, start, stop, teams, schedule_id)
    this.shift_duration_hrs = 8
    this.shift_duration_millis = this.shift_duration_hrs * 3600 * 1000
    this.shift_start_hr = 7
    this.shift_start_millis = this.start.getTime()  + this.shift_start_hr * 3600 * 1000
    this.cycle_length_days = 28
    let days = (this.stop.getTime() - this.start.getTime()) / 1000 / 60/ 60 / 24
    this.num_cycles = Math.ceil(days / this.cycle_length_days)
  }

  generate () {

    let team1 = [1, 1, 1, 1, 1, 1, 1, 0, 0, 2, 2, 2, 2, 2, 2, 2, 0, 0, 3, 3, 3, 3, 3, 3, 3, 0, 0]
    let team2 = [...team1].splice(7).concat([...team1].splice(0, 7))
    let team3 = [...team1].splice(14).concat([...team1].splice(0, 14))
    let team4 = [...team1].splice(21).concat([...team1].splice(0, 21))

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
      schedule_id: this.schedule_id,
      tracks: []
    }))

    for (let i = 0; i < finalTeam1.length; i++) {
      let dayStart = new Date();
      let swingStart = new Date();
      let nightStart = new Date();
      let nightStop = new Date();

      dayStart.setTime(this.shift_start_millis + this.shift_duration_millis * 3 * i)
      swingStart.setTime(this.shift_start_millis + this.shift_duration_millis * 3 * i + this.shift_duration_millis)

      nightStart.setTime(this.shift_start_millis + this.shift_duration_millis * 3 * i + 2 * this.shift_duration_millis)

      nightStop.setTime(this.shift_start_millis + this.shift_duration_millis * 3 * i + 3 * this.shift_duration_millis)

      for (let j = 0; j < 4; j++) {
        let team = [finalTeam1, finalTeam2, finalTeam3, finalTeam4][j]
        if (team[i] === 1) {
          teamInfo[j].tracks.push({
            start: dayStart.toISOString(),
            stop: swingStart.toISOString(),
            status: "caution",
            description: `Day Shift\nStart: ${dayStart.toDateString()}\nStop: ${swingStart.toDateString()}`
          })
        }
      }

      for (let j = 0; j < 4; j++) {
        let team = [finalTeam1, finalTeam2, finalTeam3, finalTeam4][j]
        if (team[i] === 2) {
          teamInfo[j].tracks.push({
            start: swingStart.toISOString(),
            stop: nightStart.toISOString(),
            status: "serious",
            description: `Swing Shift\nStart: ${swingStart.toDateString()}\nStop: ${nightStart.toDateString()}`
          })
        }
      }

      if (nightStop > this.stop) {
        break
      }

      for (let j = 0; j < 4; j++) {
        let team = [finalTeam1, finalTeam2, finalTeam3, finalTeam4][j]
        if (team[i] === 3) {
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