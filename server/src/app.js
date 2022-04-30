import cors from 'cors';
import cookieParser from 'cookie-parser'
import express from 'express';
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
import knex from 'knex'
import knexfile from '../knexfile.js'

const myknex = knex(knexfile[process.env.NODE_ENV || 'development'])

(async () => {
  try {
    await myknex.migrate.rollback()
    await myknex.migrate.latest()
    await myknex.seed.run()
  } catch (err) {
    console.log(err)
  }
})();


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})

const app = express();
app.set('trust proxy', 1)

app.use(morgan('tiny'))
app.use(express.json())
app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser());

app.use('/api/users', users);
app.use('/api/offices', offices);
app.use('/api/schedules', schedules);
app.use('/api/teams', teams);
app.use('/api/shifts', shifts);

export default app;