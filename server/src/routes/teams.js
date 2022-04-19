const express = require('express');
const knex = require('knex')(require('../knexfile.js')['development']);
const verifyToken = require('../../utils/verifyToken');
const router = express.Router()

router.get('/', (req, res) => {
  const idToken = req.cookies['shifty']
  const userId = await verifyToken(idToken);
  if (userId === undefined) res.sendStatus(401);

  
})