import express from 'express';
// const knex = require('knex')(require('../../knexfile.js')['development']);
import knexImport from 'knex'
import knexfile from '../../knexfile.js'
import {verifyToken} from '../../utils/verifyToken.js'
import {isUserAdmin, getUserOfficeId} from '../../utils/getResources.js'

const router = express.Router()
const knex = knexImport(knexfile[process.env.NODE_ENV || 'development'])


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

  } else {
    res.sendStatus(400)
  }
})

router.post('/new-team', async (req, res) => {
  if (req.cookies['shifty']) {
    const idToken = req.cookies['shifty']
    const userId = await verifyToken(idToken);
    if(userId === undefined) {
      res.sendStatus(401);
      return
    }

    const { position, name } = req.body
    const officeId = await getUserOfficeId(userId);

    if (await !isUserAdmin(userId, officeId)) {
      res.sendStatus(403);
      return;
    }

    const newTeam = {
      name,
      position,
      office_id: officeId
    }


    let teamData = await knex.select('*').from('teams').where({office_id: officeId})
      .catch((err) => console.log(err))

    let matches = teamData ? teamData.filter(team => team.position === position) : []

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