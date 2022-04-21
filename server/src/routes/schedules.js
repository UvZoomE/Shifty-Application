import express from 'express'
// const knex = require('knex')(require('../../knexfile.js')['development']);
import knexImport from 'knex'
import knexfile from '../../knexfile.js'
const router = express.Router()
const knex = knexImport(knexfile['development'])

// get all schedules
router.get('/', (req, res) =>{
  knex.select('*').from('schedules')
    .then(data => res.status(200).send(data))
    .catch(() => res.sendStatus(404))
})

router.get('/:schedule_id', (req, res) => {
  const { schedule_id } = req.params;
  knex.select('*').from('schedules').where('id', schedule_id)
    .then(data => res.status(200).send(data))
    .catch(() => res.sendStatus(404))
})

export default router;