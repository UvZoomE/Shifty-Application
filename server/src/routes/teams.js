const express = require('express');
const knex = require('knex')(require('../../knexfile.js')['development']);
const { verifyToken } = require('../../utils/verifyToken');
const router = express.Router()
const { isUserAdmin, getUserOfficeId } = require('../../utils/getResources');


router.get('/all', async (req, res) => {
  if (req.cookies['shifty']) {
    const idToken = req.cookies['shifty']
    const uid = await verifyToken(idToken);

    if(uid === undefined) {
      res.sendStatus(401);
      return;
    }
    
    const officeId = await getUserOfficeId(uid);

    knex.select('*').from('teams').where('office_id', officeId)
      .then(data => res.status(200).send(data))
      .catch(() => res.sendStatus(500))
    
    
  } else {
    res.sendStatus(400)
  }
})

router.delete('/:team_id', async (req, res) => {
  if (req.cookies['shifty']) {
    const idToken = req.cookies['shifty']
    const uid = await verifyToken(idToken);

    if(uid === undefined) {
      res.sendStatus(401);
      return;
    }

    const { team_id } = req.params
    const officeId = await getUserOfficeId(uid);

    if(isUserAdmin(uid, officeId)){
      await knex('users').where('team_id', team_id).update('team_id', null)
        .catch(() => res.sendStatus(500))

      knex('teams').where('team_id', team_id).del()
        .then(() => res.sendStatus(200))
        .catch(() => res.sendStatus(500))
    } else {
      res.sendStatus(403)
    }
    
  } else {
    res.sendStatus(400)
  }
})

router.get('/:team_id', async (req, res) => {
  const idToken = req.cookies['shifty']
  const userId = await verifyToken(idToken);
  if(userId === undefined) res.sendStatus(401);

  // const { team_id } = req.params
  // knex.select('*').from('teams').where('id', team_id)
  // .then(data => res.status(200).send(data))
  // .catch(() => res.sendStatus(500))

  const userData = await knex.select('*').from('users').where('user_id', userId);
  if(userData[0].team_id === req.params.team_id){
    knex.select('id', 'name', 'office_id').from('teams').where('id', req.params.team_id)
    .then(data => res.status(200).send(data))
    .catch(() => res.sendStatus(500))
  } else{
    res.sendStatus(401);
  }
})

router.post('/new-team', async (req, res) => {
  const { team_name, office_id } = req.body
  const idToken = req.cookies['shifty']
  const userId = await verifyToken(idToken);
  if(userId === undefined) res.sendStatus(401);
  const admin = await isUserAdmin(userId, office_id)
  if(!admin) res.sendStatus(403);

  const newTeam = {
    team_name,
    office_id
  }

  knex.insert(newTeam).into('teams')
    .then(() => res.sendStatus(201))
    .catch(res.sendStatus(500))
})


router.patch('/new-team-name', async (req, res) => {
  const { team_name, team_id} = req.body
  const idToken = req.cookies['shifty']
  const userId = await verifyToken(idToken);
  if(userId === undefined) res.sendStatus(401);
  const admin = await isUserAdmin(userId, office_id)
  if(!admin) res.sendStatus(403);
  knex('teams').where('team_id', team_id).update({name: team_name})
  .then(() => res.sendStatus(201))
  .catch(() => res.sendStatus(500))
})



module.exports = router;