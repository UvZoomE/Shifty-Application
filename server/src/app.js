import cors from 'cors';
import cookieParser from 'cookie-parser'
import express from 'express';
// import knex from 'knex'(require('../knexfile.js')['development']);

import knexImport from 'knex'
import knexfile from '../knexfile.js'

import morgan from 'morgan';
import admin from 'firebase-admin';
import { createRequire } from 'module';
const require = createRequire(import.meta.url)
const serviceAccount = require('../utils/adminKey.json');
import users from './routes/users.js';
import offices from './routes/offices.js';
import schedules from './routes/schedules.js';
import teams from './routes/teams.js';
import shifts from './routes/shifts.js';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})

const PORT = 3001;
const app = express();
const knex = knexImport(knexfile['development'])

app.use(morgan('tiny'))
app.use(express.json())
app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser());

app.use('/api/users', users);
app.use('/api/offices', offices);
app.use('/api/schedules', schedules);
app.use('/api/teams', teams);
app.use('/api/shifts', shifts);


app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})