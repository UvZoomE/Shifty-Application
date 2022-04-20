const express = require('express');
const knex = require('knex')(require('../../knexfile.js')['development']);
const { verifyToken } = require('../../utils/verifyToken');
const { getUserOfficeId, isUserAdmin } = require('../../utils/getResources.js');

const router = express.Router();

// get the information of the requesting user
router.get('/current-user', async (req, res) => {
  if (req.cookies['shifty']) {
    const idToken = req.cookies['shifty']
    const uid = await verifyToken(idToken);

    if(uid === undefined) {
      res.sendStatus(401);
      return;
    }

    const userData = await knex.select('*').from('users').where('id', uid)
      .catch(() => res.sendStatus(500))
    knex.select('name').from('offices').where('id', userData[0].office_id)
      .then(officeData => {
        userData['office_name'] = officeData[0].name
        res.status(200).send(userData)
      })
      .catch(() => res.sendStatus(500))
    
    
    // knex.select('*').from('users').where('id', uid)
    //   .then(data => {
    //     knex.select('name').from('offices').where('id', data[0].office_id)
    //       .then(office_name => {
    //         if (office_name[0]) {
    //           data[0].office_name = office_name[0].name
    //         }
    //         res.status(200).send(data)
    //       })
    //   })
    //   .catch(() => res.sendStatus(404))
  } else {
    res.sendStatus(400)
  }

})

// insert new user into database
// request body: { email, first_name, last_name, rank, duty_title, work_phone }
router.post('/new-user', async (req, res) =>{
  if (req.cookies['shifty']) {
    const idToken = req.cookies['shifty']
    const uid = await verifyToken(idToken);
    if(uid === undefined) {
      res.sendStatus(401);
      return;
    }

    const newRecord = {
      id: uid,
      ...req.body,
      is_admin: false,
      team_id: null,
      office_id: null
    }

    knex.insert(newRecord).into('users').returning('*')
      .then(data => res.status(201).send(data))
      .catch(() => res.sendStatus(500))
  } else {
    res.sendStatus(400)
  }
})

// request body: {<vals to edit>: <val>}
router.patch('/edit-user', async (req, res) => {
  if (req.cookies['shifty']) {
    const idToken = req.cookies['shifty'];
    const uid = await verifyToken(idToken);
    if(uid === undefined) {
      res.sendStatus(401);
      return;
    }

    knex('users').where('id', uid).update(req.body)
      .then(() => res.sendStatus(201))
      .catch(() => res.sendStatus(500))
  } else {
    res.sendStatus(400)
  }
})

// get all users within a given office
router.get('/current-office', async (req, res) => {
  if (req.cookies['shifty']) {
    const idToken = req.cookies['shifty'];
    const uid = await verifyToken(idToken);
      if(uid === undefined) res.sendStatus(401);

    const officeId = await getUserOfficeId(uid);

    knex.select('*').from('users').where('id', officeId)
        .then(data => res.status(200).send(data))
        .catch(() => res.sendStatus(500))
  } else {
    res.sendStatus(400)
  }
})

// request body: {office_id, user_email}
router.patch('/edit-office', async (req, res) => {
  if (req.cookies['shifty']) {
    const {office_id, user_email} = req.body;

    const idToken = req.cookies['shifty']
    const uid = await verifyToken(idToken);

    if(uid === undefined) {
      res.sendStatus(401);
      return;
    }

    if(await !isUserAdmin(uid, office_id)) res.sendStatus(403);
    knex('users').where('email', user_email).update({office_id: office_id})
      .then(() => res.sendStatus(201))
      .catch(() => res.sendStatus(500))

    // if(await isUserAdmin(uid, office_id)){
    //   knex('users').where('email', user_email).update({office_id: office_id})
    //   .then(res.sendStatus(202))
    //   .catch((err) =>{
    //     res.sendStatus(500)
    //   })
    // } else {
    //   res.sendStatus(403)
    // }
  } else {
    res.sendStatus(400)
  }

})

// TODO: COULD CHANGE EMAIL TO ID
// request body: {team_id, user_email}
router.patch('/edit-team', async (req, res) => {
  if (req.cookies['shifty']) {
    const {team_id, user_email} = req.body;

    const idToken = req.cookies['shifty']
    const uid = await verifyToken(idToken);
    if(uid === undefined) {
      res.sendStatus(401);
      return;
    }

    const officeId = getUserOfficeId(uid);

    if(await !isUserAdmin(uid, officeId)) res.sendStatus(403);
    knex('users').where('email', user_email).update({team_id: team_id})
      .then(() => res.sendStatus(202))
      .catch(() => res.sendStatus(500))

    // if(await isUserAdmin(uid, office_id)){
    //   knex('users').where('email', user_email).update({team_id: team_id})
    //   .then(res.sendStatus(202))
    //   .catch((err) =>{
    //     res.sendStatus(500)
    //   })
    // } else {
    //   res.sendStatus(403)
    // }
  } else {
    res.sendStatus(400)
  }
})

module.exports = router;