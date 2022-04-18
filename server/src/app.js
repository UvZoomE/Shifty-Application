var cors = require('cors')
const cookieParser = require('cookie-parser')
const express = require('express');
const knex = require('knex')(require('../knexfile.js')['development']);
const morgan = require('morgan');

const PORT = 3001;
const app = express();

app.use(morgan('tiny'))
app.use(express.json())
app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser())

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})