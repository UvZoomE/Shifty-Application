const express = require('express');
const knex = require('knex')(require('../knexfile.js')['development']);

const router = express.Router();

router.post('/', (req, res) =>{
  // const { email, first_name, last_name, rank, duty_title, work_phone } = req.body;
  // const idToken = req.cookies['shifty']
  const { authorization } = req.headers;

  getAuth().verifyIdToken(authorization)
    .then(decodedToken => {
      const uid = decodedToken.uid;
      console.log('uid ' + uid)

      const newRecord = {
        id: uid,
        ...req.body,
        isAdmin: false,
        team_id: null,
        office_id: null,
      }

      console.log(newRecord)
    
      knex.insert(newRecord).into('users')
        .then(() => res.sendStatus(201))
        .catch((err) =>{
          console.log(err)
          res.sendStatus(500)
        })
    })
    .catch(() => res.sendStatus(401))
})

const checkIfIdInOffice = (uid) => {
  knex.select('id').from('users').where('office_id', office_id)
    .then(data => {
      if(data.includes(uid)){
        return true;
      }

      return false;
    })
}

router.get('/:office_id', (req, res) => {
  const { office_id } = req.params;
  // const idToken = req.cookies['shifty']
  const { Authorization } = req.header;
  getAuth().verifyIdToken(Authorization)
  .then(decodedToken => {
    const uid = decodedToken.uid;
    if(checkIfIdInOffice(uid)){
      knex.select('*').from('users').where('office_id', office_id)
        .then(data => res.status(200).send(data));
    } else {
      res.sendStatus(401)
    }
  })
  .catch(() => res.sendStatus(401));
})

module.exports = router;