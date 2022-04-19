import '@astrouxds/astro-web-components/dist/astro-web-components/astro-web-components.css'
import { RuxTimeline, RuxTrack, RuxRuler, RuxTimeRegion } from '@astrouxds/react'
import React from 'react';
import '../styles/Calendar.css'

const Calendar = () => {
    return (
        <div className='calendar' id='subpage'>

        <select name="schedule-selector">
          <option key="empty" value=""></option>
          <option key="panama" value="panama">Panama</option>
          <option key="5-2" value="5-2">5-2</option>
        </select>
          <button >
            Generate Schedule
          </button>

          <RuxTimeline className='timeline' start='2022-04-15T07:00:00Z' end='2022-04-19T07:00:00Z' interval='day' playhead='2022-04-16T05:00:00Z' zoom='3'>

            <RuxTrack className='track'>
              <div slot="label">
                  Team A
              </div>
              <RuxTimeRegion start='2022-04-15T07:00:00Z' end='2022-04-15T19:00:00Z' status='caution'>
                Day Shift
              </RuxTimeRegion>
              <RuxTimeRegion start='2022-04-16T07:00:00Z' end='2022-04-16T19:00:00Z' status='caution'>
                Day Shift
              </RuxTimeRegion>
            </RuxTrack>

            <RuxTrack>
              <div slot="label">
                  Team B
              </div>
              <RuxTimeRegion start='2022-04-15T19:00:00Z' end='2022-04-16T07:00:00Z' status='standby'>
                Night Shift
              </RuxTimeRegion>
              <RuxTimeRegion start='2022-04-16T19:00:00Z' end='2022-04-17T07:00:00Z' status='standby'>
                Night Shift
              </RuxTimeRegion>
            </RuxTrack>

            <RuxTrack>
              <div slot="label">
                  Team C
              </div>
              <RuxTimeRegion start='2022-04-17T07:00:00Z' end='2022-04-17T19:00:00Z' status='caution'>
                Day Shift
              </RuxTimeRegion>
              <RuxTimeRegion start='2022-04-18T07:00:00Z' end='2022-04-18T19:00:00Z' status='caution'>
                Day Shift
              </RuxTimeRegion>
            </RuxTrack>

            <RuxTrack>
              <div slot="label">
                  Team D
              </div>
              <RuxTimeRegion start='2022-04-17T19:00:00Z' end='2022-04-18T07:00:00Z' status='standby'>
                Night Shift
              </RuxTimeRegion>
              <RuxTimeRegion start='2022-04-18T19:00:00Z' end='2022-04-19T07:00:00Z' status='standby'>
                Night Shift
              </RuxTimeRegion>
            </RuxTrack>

            <RuxTrack slot='ruler'>
              <RuxRuler></RuxRuler>
            </RuxTrack>


          </RuxTimeline>
        </div>
    )
}

export default Calendar;