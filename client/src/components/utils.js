export const tracksToShifts = (tracks, teams) => {

  let shifts = []
  for (let team of tracks) {
    let teamInfo = teams.filter(t => t.name === team.name)[0]
    for (let track of team.tracks) {
      shifts.push({
        team_position: teamInfo.position,
        office_id: teamInfo.office_id,
        notes: track.description,
        start_time: track.start,
        stop_time: track.stop,
        schedule_id: team.schedule_id
      })
    }
  }
  return shifts;
}

export const getStatus = (shift) => {
  if (shift.notes.indexOf('Day Shift') > -1) {
    return 'caution'
  } else if (shift.notes.indexOf('Night Shift') > -1) {
    return 'standby'
  } else if (shift.notes.indexOf('Swing Shift') > -1) {
    return 'serious'
  }
}

export const shiftsToTracks = (shifts, teams) => {
  let tracks = []
  for (let team of teams) {
    let teamTracks = []
    tracks.push({
      name: team.name,
      schedule_id: shifts[0].schedule_id,
      tracks: teamTracks
    })

    for (let shift of shifts) {
      if (shift.team_position === team.position) {
        teamTracks.push({
          start: shift.start_time,
          stop: shift.stop_time,
          description: shift.notes,
          status: getStatus(shift)
        })
      }
    }
  }
  return tracks
}

export const getStartStop = (tracks) => {
  if (tracks) {
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
    maxTime = new Date(maxTime.getTime() + 24 * 60 * 60 * 1000)

    return [minTime, maxTime]
  }

}