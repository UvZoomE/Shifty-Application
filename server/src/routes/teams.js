const express = require('express');
const knex = require('knex')(require('../../knexfile.js')['development']);
const verifyToken = require('../../utils/verifyToken');
const router = express.Router()

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
  if (userId === undefined) res.sendStatus(401);

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
  knex('teams').where('team_id', team_id).update({name: team_name})
  .then(() => res.sendStatus(201))
  .catch(() => res.sendStatus(500))
})



module.exports = router;