var cors = require('cors')
const cookieParser = require('cookie-parser')
const express = require('express');
const knex = require('knex')(require('../knexfile.js')['development']);
const morgan = require('morgan');
const admin = require('firebase-admin');
const serviceAccount = require('../utils/shifty-da09a-firebase-adminsdk-vwrct-0a4e73b2e8.json');
const users = require('./routes/users.js');
const offices = require('./routes/offices.js');
const schedules = require('./routes/schedules.js');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)  
})

const PORT = 3001;
const app = express();

app.use(morgan('tiny'))
app.use(express.json())
app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser());

app.use('/api/users', users);
app.use('/api/offices', offices);
app.use('/api/schedules', schedules);


app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})