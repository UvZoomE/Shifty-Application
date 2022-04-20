const express = require('express');
const knex = require('knex')(require('../../knexfile.js')['development']);
const verifyToken = require('../../utils/verifyToken');
const { getUserOfficeId, getOfficeScheduleId, isUserAdmin } = require('../../utils/getResources.js');
const router = express.Router();

router.get('/:shift_id', (req, res) => {
  if (req.cookies['shifty']) {
    const idToken = req.cookies['shifty']
    const userId = await verifyToken(idToken);
    if (userId === undefined) {
      res.sendStatus(401);
      return;
    }

    const { shift_id } = req.params;

    const userOfficeId = await getUserOfficeId(userId);
    if(userOfficeId === undefined) {
      res.sendStatus(401);
      return;
    }

    knex.select('*').from('shifts').where({id: shift_id, office_id: userOfficeId})
      .then(data => res.status(200).send(data))
      .catch(() => res.sendStatus(500))
  } else {
    res.sendStatus(400)
  }

})

router.get('/current-shifts', async (req, res) => {
  if (req.cookies['shifty']) {
    const idToken = req.cookies['shifty']
    const userId = await verifyToken(idToken);
    if (userId === undefined) res.sendStatus(401);

    const officeId = await getUserOfficeId(userId);
    if(officeId === undefined) res.sendStatus(401);
    const scheduleId = await getOfficeScheduleId(officeId);
    if(scheduleId === undefined) res.sendStatus(401);

    knex.select('*').from('shifts').where({ office_id: officeId, schedule_id: scheduleId })
      .then(data => res.status(200).send(data))
      .catch(() => res.sendStatus(500))
  } else {
    res.sendStatus(400)
  }
})

router.get('/history', async (req, res) => {
  if (req.cookies['shifty']) {
    const idToken = req.cookies['shifty']
    const userId = await verifyToken(idToken);
    if (userId === undefined) res.sendStatus(401);

    const officeId = await getUserOfficeId(userId);
    if(officeId === undefined) res.sendStatus(401);

    knex.select('*').from('shifts').where({office_id: officeId})
      .then(data => res.status(200).send(data))
      .catch(() => res.sendStatus(500))
  } else {
    res.sendStatus(400)
  }
})

// request body: { start_time, schedule_id, office_id, team_id }
router.post('/new-shift', async (req, res) =>{
  if (req.cookies['shifty']) {
    const idToken = req.cookies['shifty']
    const userId = await verifyToken(idToken);
    if (userId === undefined) res.sendStatus(401);

    if(await !isUserAdmin(userId, req.body.office_id)) res.sendStatus(403);

    const newShift = {
      ...req.body,
      notes: null
    }

    knex.insert(newShift).into('shifts')
      .then(() => res.sendStatus(201))
      .catch(() => res.sendStatus(500))

    // if(isUserAdmin(userId, req.body.office_id)){
    //   const newShift = {
    //     ...req.body,
    //     notes: null
    //   }

    //   knex.insert(newShift).into('shifts')
    //     .then(() => res.sendStatus(201))
    //     .catch(() => res.sendStatus(500))
    // } else{
    //   res.sendStatus(401);
    // }
  } else {
    res.sendStatus(400)
  }
})

router.get('/:shift_id/notes', async (req, res) =>{
  if (req.cookies['shifty']) {
    const idToken = req.cookies['shifty']
    const userId = await verifyToken(idToken);
    if (userId === undefined) res.sendStatus(401);

    const { shift_id } = req.params;

    const userOfficeId = await getUserOfficeId(userId);
    if(userOfficeId === undefined) res.sendStatus(401);

    knex.select('notes').from('shifts').where({id: shift_id, office_id: userOfficeId})
      .then(() => res.status(200).send(data))
      .catch(() => res.sendStatus(500));
  } else {
    res.sendStatus(400)
  }
})

// request body: { notes }
// parameters: shift_id
router.patch('/:shift_id/edit-notes', async (req, res) => {
  if (req.cookies['shifty']) {
    const idToken = req.cookies['shifty']
    const userId = await verifyToken(idToken);
    if (userId === undefined) res.sendStatus(401);

    const { notes } = req.body;
    const { shift_id } = req.params;

    const userOfficeId = await getUserOfficeId(userId);

    if(await !isUserAdmin(userId, userOfficeId)) res.sendStatus(403);

    knex('shifts').where('id', shift_id).update({notes: notes, office_id: userOfficeId})
        .then(() => res.sendStatus(201))
        .catch(() => res.sendStatus(500));

    // if(isUserAdmin(userId, req.body.office_id)){
    //   knex('shifts').where('id', shift_id).update('notes', notes)
    //     .then(() =>{
    //       if(data[0].office_id === userOfficeId){
    //         res.sendStatus(201)
    //       } else {
    //         res.sendStatus(403)
    //       }
    //     })
    //     .catch(() => res.sendStatus(500));
    //   } else {
    //     res.sendStatus(401);
    //   }
  } else {
    res.sendStatus(400)
  }
})

module.exports = router;