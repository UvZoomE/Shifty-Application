const express = require('express');
const knex = require('knex')(require('../../knexfile.js')['development']);
const verifyToken = require('../../utils/verifyToken');
const { getUserOfficeId, getOfficeScheduleId, isUserAdmin } = require('../../utils/getResources.js');
const router = express.Router();

router.get('/:shift_id', (req, res) => {
  const { shift_id } = req.params;
  const idToken = req.cookies['shifty']
  const userId = await verifyToken(idToken);
  if (userId === undefined) res.sendStatus(401);
  
  const userOfficeId = await getUserOfficeId(userId);
  if(userOfficeId === undefined) res.sendStatus(401);

  knex.select('*').from('shifts').where('shift_id', shift_id)
    .then(data => {
      if(data[0].office_id === userOfficeId){
        res.status(200).send(data)
      } else{
        res.sendStatus(403)
      }
    })
    .catch(() => res.sendStatus(500))

})

router.get('/current-shifts', async (req, res) => {
  const idToken = req.cookies['shifty']
  const userId = await verifyToken(idToken);
  if (userId === undefined) res.sendStatus(401);

  const officeId = await getUserOfficeId(userId);
  if(officeId === undefined) res.sendStatus(401);
  const scheduleId = await getOfficeScheduleId(officeId);
  if(scheduleId === undefined) res.sendStatus(401);

  knex.select('*').from('shifts').where({ office_id: officeId, schedule_id: scheduleId})
    .then(data => res.status(200).send(data))
    .catch(() => res.sendStatus(500))
})

router.get('/history', async (req, res) => {
  const idToken = req.cookies['shifty']
  const userId = await verifyToken(idToken);
  if (userId === undefined) res.sendStatus(401);

  const officeId = await getUserOfficeId(userId);
  if(officeId === undefined) res.sendStatus(401);

  knex.select('*').from('shifts').where('office_id', officeId)
    .then(data => res.status(200).send(data))
    .catch(() => res.sendStatus(500))
})

// request body: { start_time, schedule_id, office_id, team_id }
router.post('/new-shift', async (req, res) =>{
  const idToken = req.cookies['shifty']
  const userId = await verifyToken(idToken);
  if (userId === undefined) res.sendStatus(401);
  if(isUserAdmin(userId, req.body.office_id)){
    const newShift = {
      ...req.body,
      notes: null
    }
  
    knex.insert(newShift).into('shifts')
      .then(() => res.sendStatus(201))
      .catch(() => res.sendStatus(500))
  } else{
    res.sendStatus(401);
  }
})

router.get('/:shift_id/notes', async (req, res) =>{
  const { shift_id } = req.params;
  
  const idToken = req.cookies['shifty']
  const userId = await verifyToken(idToken);
  if (userId === undefined) res.sendStatus(401);

  const userOfficeId = await getUserOfficeId(userId);
  if(userOfficeId === undefined) res.sendStatus(401);

  knex.select('notes').from('shifts').where('shift_id', shift_id)
    .then(() => {
      if(data[0].office_id === userOfficeId){
        res.status(200).send(data)
      } else {
        res.sendStatus(403)
      }
    })
    .catch(() => res.sendStatus(500));
})

// request body: { notes, office_id }
// parameters: shift_id
router.patch('/:shift_id/edit-notes', async (req, res) => {
  const { notes } = req.body;
  const { shift_id } = req.params;

  const idToken = req.cookies['shifty']
  const userId = await verifyToken(idToken);
  if (userId === undefined) res.sendStatus(401);

  if(isUserAdmin(userId, req.body.office_id)){
    knex('shifts').where('id', shift_id).update('notes', notes)
      .then(() =>{
        if(data[0].office_id === userOfficeId){
          res.sendStatus(201)
        } else {
          res.sendStatus(403)
        }
      })
      .catch(() => res.sendStatus(500));
    } else {
      res.sendStatus(401);
    }
})

module.exports = router;