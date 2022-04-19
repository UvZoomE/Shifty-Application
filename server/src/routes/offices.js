const express = require('express');
const knex = require('knex')(require('../../knexfile.js')['development']);
const { verifyToken } = require('../../utils/verifyToken');
const router = express.Router();

// POST create an office
  // request body: {name: -------}
  // verify token
  // give office a name
  // set org chart url, curr_schedule_start and schedule_id to null
  // add the creating user to given office
  // set that user to admin

// GET office_information
  //  office_id as a param
  //  verify token
  //  verify the user from given token has the same office id as the one provided
  //  return everything except image url

router.post('/new-office', async (req, res) => {
  const { office_name } = req.body;
  const idToken = req.cookies['shifty']
  const userId = await verifyToken(idToken);
  if (userId === undefined) {
    res.sendStatus(401);
    return
  }

  const newOffice = {
    "name": office_name,
    "org_chart_img_url": null,
    "curr_schedule_start": null,
    "schedule_id": null
  }
  const officeId = await knex
    .insert(newOffice).into('offices').returning('id')
    .catch(err => {
      console.log(err)
      res.sendStatus(500)
      return
    })
  knex('users').where('id', userId).update({office_id: officeId[0].id, is_admin: true})
    .then(res.sendStatus(201))
    .catch(err => {
      console.log(err)
      res.sendStatus(500)
      return
    })
})

router.get('/:office_id', async (req, res) => {
  const idToken = req.cookies['shifty']
  const userId = await verifyToken(idToken);
  if(userId === undefined) res.sendStatus(401);
  const userData = await knex.select('*').from('users').where('user_id', userId);
  if(userData[0].office_id === req.params.office_id){
    knex.select('id', 'name', 'curr_schedule_start', 'schedule_id').from('offices').where('id', req.params.office_id)
    .then(data => res.status(200).send(data))
    .catch(() => res.sendStatus(500))
  } else{
    res.sendStatus(401);
  }
})

// patch request: { schedule_id: -, start_date: -, office_id: -}
router.patch('/set-schedule', async (req, res) => {
  const { scheduleId, startDate, officeId } = req.body;
  const idToken = req.cookies['shifty']
  const userId = await verifyToken(idToken);
  if(userId === undefined) res.sendStatus(401);
  knex('offices').where('office_id', officeId).update({curr_schedule_start: startDate, schedule_id: scheduleId})
  .then(() => res.sendStatus(201))
  .catch(() => res.sendStatus(500))
})


// TODO: POST request for org chart img
// TODO: GET request for org chart img

module.exports = router;

