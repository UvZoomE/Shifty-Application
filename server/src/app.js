const express = require('express');
const knex = require('knex')(require('../knexfile.js')['development']);
const morgan = require('morgan');
const {firebaseAuth, authInstance} = require('../utils/firebaseAuth.js')

const PORT = 3000;
const app = express();

app.use(morgan('tiny'))
app.use(express.json())

app.post('/sign-up', (req, res) => {
  const { email, password } = req.body
  firebaseAuth.createUserWithEmailAndPassword(authInstance, email, password)
  .then(userCred => firebaseAuth.getIdToken(userCred, true))
  .then(token => {
    res.set('Authorization', token);
    res.sendStatus(201);
  })
  .catch(err => res.send(500))
})

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})