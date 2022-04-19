const express = require('express');
const knex = require('knex')(require('../../knexfile.js')['development']);
const { verifyToken } = require('../../utils/verifyToken');
const { getUserOfficeId } = require('../../utils/getResources.js');

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

    knex.select('*').from('users').where('id', uid)
      .then(data => {
        console.log(data)
        knex.select('name').from('offices').where('id', data[0].office_id)
        .then(office_name => {
          data[0].office_name = office_name[0].name
          res.status(200).send(data)
        })
      })
      .catch(() => res.sendStatus(404))
  } else {
    res.sendStatus(400)
  }

})

// insert new user into database
// request body: { email, first_name, last_name, rank, duty_title, work_phone }
router.post('/current-user', async (req, res) =>{
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

  knex.insert(newRecord).into('users').returning('id')
        .then(id => {
          // console.log(id)
          res.sendStatus(201)
        })
        .catch((err) =>{
          console.log(err)
          res.sendStatus(500)
        })
})

// get all users within a given office
router.get('/current-office', async (req, res) => {
  const idToken = req.cookies['shifty']
  const uid = await verifyToken(idToken);
    if(uid === undefinied) res.sendStatus(401);
  const officeId = await getUserOfficeId(uid)
  knex.select('*').from('users').where('office_id', officeId)
      .then(data => res.status(200).send(data))
      .catch(() => res.sendStatus(500))
})

router.patch('/:user-id/new-team/:team-id', async (req, res) =>{
  const { user_id, team_id } = req.params;
  const idToken = req.cookies['shifty']
  const uid = await verifyToken(idToken);
    if(uid === undefinied) res.sendStatus(401);

  knex('users').where('id', user_id).update({team_id: team_id})
    .then(() => res.sendStatus(202))
    .catch(() => res.sendStatus(500))
})

// /add-to-office/

router.patch('/:user-id/new-office/:office-id', async (req, res) =>{
  const { user_id, office_id } = req.params;
  const idToken = req.cookies['shifty']
  const uid = await verifyToken(idToken);
    if(uid === undefinied) res.sendStatus(401);

  knex('users').where('id', user_id).update({office_id: office_id})
    .then(res.sendStatus(202))
    .catch((err) =>{
      res.sendStatus(500)
    })
})

// const checkIfIdInOffice = (uid) => {
//   knex.select('id').from('users').where('office_id', office_id)
//     .then(data => {
//       if(data.includes(uid)){
//         return true;
//       }

//       return false;
//     })
// }

module.exports = router;