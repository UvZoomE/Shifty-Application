const express = require('express');
const knex = require('knex')(require('../../knexfile.js')['development']);

const router = express.Router()

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

module.exports = router;