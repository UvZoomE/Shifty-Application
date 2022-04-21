import express from 'express';
// const knex = require('knex')(require('../../knexfile.js')['development']);
import knexImport from 'knex'
import knexfile from '../../knexfile.js'
import { verifyToken } from '../../utils/verifyToken.js'
import { getUserOfficeId, isUserAdmin } from '../../utils/getResources.js'

const router = express.Router();
const knex = knexImport(knexfile[process.env.NODE_ENV || 'development'])

// get the information of the requesting user
router.get('/current-user', async (req, res) => {
  if (req.cookies['shifty']) {
    const idToken = req.cookies['shifty']
    const userId = await verifyToken(idToken);

    if(userId === undefined) {
      res.sendStatus(401);
      return;
    }

    const userData = await knex.select('*').from('users').where('id', userId)
      .catch(() => res.sendStatus(500))

    if (userData[0].office_id) {
      knex.select('name').from('offices').where('id', userData[0].office_id)
      .then(officeData => {
        console.log(officeData[0].name)
        userData[0]['office_name'] = officeData[0].name
        res.status(200).send(userData[0])
      })
      .catch(() => res.sendStatus(500))
    } else {
      res.status(200).send(userData[0])
    }
  } else {
    res.sendStatus(400)
  }

})

// insert new user into database
// request body: { email, first_name, last_name, rank, duty_title, work_phone }
router.post('/new-user', async (req, res) =>{
  if (req.cookies['shifty']) {
    const idToken = req.cookies['shifty']
    const userId = await verifyToken(idToken);
    if(userId === undefined) {
      res.sendStatus(401);
      return;
    }

    const newRecord = {
      id: userId,
      ...req.body,
      is_admin: false,
      team_position: null,
      office_id: null,
      office_id: null
    }

    knex.insert(newRecord).into('users').returning('*')
      .then(data => res.status(201).send(data))
      .catch(err => {
        console.log(err)
        res.sendStatus(500)
      })
  } else {
    res.sendStatus(400)
  }
})

// request body: {<vals to edit>: <val>}
router.patch('/edit-user', async (req, res) => {
  if (req.cookies['shifty']) {
    const idToken = req.cookies['shifty'];
    const userId = await verifyToken(idToken);
    if(userId === undefined) {
      res.sendStatus(401);
      return;
    }

    knex('users').where('id', userId).update(req.body)
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
    const userId = await verifyToken(idToken);
      if(userId === undefined) res.sendStatus(401);

    const officeId = await getUserOfficeId(userId);

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
    const userId = await verifyToken(idToken);

    if(userId === undefined) {
      res.sendStatus(401);
      return;
    }

    if(await !isUserAdmin(userId, office_id)) res.sendStatus(403);
    knex('users').where('email', user_email).update({office_id: office_id})
      .then(() => res.sendStatus(201))
      .catch(() => res.sendStatus(500))

    // if(await isUserAdmin(userId, office_id)){
    //   knex('users').where('email', user_email).update({office_id: office_id})
    //   .then(() => res.sendStatus(202))
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
    const userId = await verifyToken(idToken);
    if(userId === undefined) {
      res.sendStatus(401);
      return;
    }

    const officeId = getUserOfficeId(userId);

    if(await !isUserAdmin(userId, officeId)) res.sendStatus(403);
    knex('users').where('email', user_email).update({team_id: team_id})
      .then(() => res.sendStatus(202))
      .catch(() => res.sendStatus(500))

    // if(await isUserAdmin(userId, office_id)){
    //   knex('users').where('email', user_email).update({team_id: team_id})
    //   .then(() => res.sendStatus(202))
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

export default router;