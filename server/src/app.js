const express = require('express');
const knex = require('knex')(require('../knexfile.js')['development']);
const morgan = require('morgan');

const PORT = 3000;
const app = express();

app.use(morgan('tiny'))
app.use(express.json())

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})