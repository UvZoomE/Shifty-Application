import express from 'express';
// const knex = require('knex')(require('../../knexfile.js')['development']);
import knexImport from 'knex'
import knexfile from '../../knexfile.js'
import {verifyToken} from '../../utils/verifyToken.js'
import {isUserAdmin, getUserOfficeId} from '../../utils/getResources.js'

const router = express.Router()
const knex = knexImport(knexfile['development'])


router.get('/all', async (req, res) => {
  if (req.cookies['shifty']) {
    const idToken = req.cookies['shifty']
    const userId = await verifyToken(idToken);
    if(userId === undefined) {
      res.sendStatus(401);
      return;
    }

    const officeId = await getUserOfficeId(userId);

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
    const userId = await verifyToken(idToken);
    if(userId === undefined) {
      res.sendStatus(401);
      return;
    }

    const { team_id } = req.params
    const officeId = await getUserOfficeId(userId);

    if(await !isUserAdmin(userId, officeId)) {
      res.sendStatus(403);
      return;
    }

    await knex('users').where({team_id: team_id, office_id: officeId}).update('team_id', null)
      .catch(() => res.sendStatus(500))

    knex('teams').where('id', team_id).del()
      .then(() => res.sendStatus(200))
      .catch(() => res.sendStatus(500))

    // if(await isUserAdmin(userId, officeId)){
    //   await knex('users').where('team_id', team_id).update('team_id', null)
    //     .catch(() => res.sendStatus(500))

    //   knex('teams').where('team_id', team_id).del()
    //     .then(() => res.sendStatus(200))
    //     .catch(() => res.sendStatus(500))
    // } else {
    //   res.sendStatus(403)
    // }

  } else {
    res.sendStatus(400)
  }
})

router.get('/:team_id', async (req, res) => {
  if (req.cookies['shifty']) {
    const idToken = req.cookies['shifty']
    const userId = await verifyToken(idToken);
    if(userId === undefined) res.sendStatus(401);

    const { team_id } = req.params
    const officeId = await getUserOfficeId(userId);

    knex.select('*').from('teams').where({id: team_id, office_id: officeId})
      .then(data => res.status(200).send(data))
      .catch(() => res.sendStatus(500))

    // const userData = await knex.select('*').from('users').where('user_id', userId);
    // if(userData[0].team_id === req.params.team_id){
    //   knex.select('id', 'name', 'office_id').from('teams').where('id', req.params.team_id)
    //   .then(data => res.status(200).send(data))
    //   .catch(() => res.sendStatus(500))
    // } else{
    //   res.sendStatus(401);
    // }
  } else {
    res.sendStatus(400)
  }
})

router.post('/new-team', async (req, res) => {
  if (req.cookies['shifty']) {
    const idToken = req.cookies['shifty']
    const userId = await verifyToken(idToken);
    if(userId === undefined) res.sendStatus(401);

    const { position, name } = req.body
    const officeId = await getUserOfficeId(userId);

    if(await !isUserAdmin(userId, officeId)) {
      res.sendStatus(403);
      return;
    }

    const newTeam = {
      name,
      position,
      office_id: officeId
    }

    let teamData = await knex.select('*').from('teams').where('office_id', officeId)
    console.log(teamData)

    // [
    //   { position: 4, name: 'Save', office_id: 1 },
    //   { position: 1, name: 'Team A', office_id: 1 },
    //   { position: 3, name: null, office_id: 1 },
    //   { position: 5, name: null, office_id: 1 },
    //   { position: 2, name: 'Team B', office_id: 1 },
    //   { position: 6, name: null, office_id: 1 }
    // ]

    let matches = teamData.filter(team => team.position === position)

    if (matches.length > 0) {
      knex('teams').where({position: position, office_id: officeId}).update({name: name})
        .then(() => res.sendStatus(201))
        .catch(() => res.sendStatus(500))
    } else{
      knex.insert(newTeam).into('teams')
        .then(() => res.sendStatus(201))
        .catch(err => {
          console.log(err)
          res.sendStatus(500)
        })
    }

  } else {
    res.sendStatus(400)
  }
})


router.patch('/new-team-name', async (req, res) => {
  const idToken = req.cookies['shifty']
  const userId = await verifyToken(idToken);
  if(userId === undefined) res.sendStatus(401);

  const { name, id } = req.body
  const officeId = await getUserOfficeId(userId);

  if(await !isUserAdmin(userId, officeId)) res.sendStatus(403);

  knex('teams').where({id: team_id, office_id: officeId}).update({name: name})
  .then(() => res.sendStatus(201))
  .catch(() => res.sendStatus(500))
})



export default router;