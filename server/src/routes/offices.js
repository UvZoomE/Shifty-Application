import express from 'express'
// const knex = require('knex')(require('../../knexfile.js')['development']);
import knexImport from 'knex'
import knexfile from '../../knexfile.js'
import { verifyToken } from '../../utils/verifyToken.js'
import { getUserOfficeId, getOfficeScheduleId, isUserAdmin } from '../../utils/getResources.js'
const router = express.Router();
const knex = knexImport(knexfile['development'])

router.post('/new-office', async (req, res) => {
  if (req.cookies['shifty']) {
    const idToken = req.cookies['shifty']
    const userId = await verifyToken(idToken);
    if (userId === undefined) {
      res.sendStatus(401);
      return
    }

    const { office_name } = req.body;

    const newOffice = {
      "name": office_name,
      "org_chart_img_url": null,
      "curr_schedule_start": null,
      "schedule_id": null
    }
    const officeId = await knex
      .insert(newOffice).into('offices').returning('id')
      .catch(() => {
        res.sendStatus(500)
        return
      })
    knex('users').where('id', userId).update({office_id: officeId[0].id, is_admin: true})
      .then(() => res.sendStatus(201))
      .catch(() => {
        res.sendStatus(500)
        return
      })
  } else {
      res.sendStatus(400)
    }
})

router.get('/my-office', async (req, res) => {
  if (req.cookies['shifty']) {
    const idToken = req.cookies['shifty'];
    const userId = await verifyToken(idToken);
    if(userId === undefined) res.sendStatus(401);

    const officeId = getUserOfficeId(userId);

    knex.select('id', 'name', 'curr_schedule_start', 'schedule_id').from('offices').where('id', officeId)
      .then(data => res.status(200).send(data))
      .catch(() => res.sendStatus(500))
  } else {
    res.sendStatus(400)
  }
})

// patch request: { schedule_id: -, start_date: - }
router.patch('/set-schedule', async (req, res) => {
  if (req.cookies['shifty']) {
    const idToken = req.cookies['shifty']
    const userId = await verifyToken(idToken);
    if(userId === undefined) res.sendStatus(401);

    const { scheduleId, startDate } = req.body;
    const officeId = getUserOfficeId(userId);

    knex('offices').where('id', officeId).update({curr_schedule_start: startDate, schedule_id: scheduleId})
    .then(() => res.sendStatus(201))
    .catch(() => res.sendStatus(500))
  } else {
    res.sendStatus(400)
  }
})


// TODO: POST request for org chart img
// TODO: GET request for org chart img

export default router;

