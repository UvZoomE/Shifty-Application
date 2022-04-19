const express = require('express');
const knex = require('knex')(require('../../knexfile.js')['development']);

const router = express.Router()

// get all schedules
router.get('/', (req, res) =>{
  knex.select('*').from('schedules')
    .then(data => res.status(200).send(data))
    .catch(() => res.sendStatus(404))
})

module.exports = router;