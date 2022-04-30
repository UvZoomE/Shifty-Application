// const knex = require('knex')(require('../knexfile.js')['development']);

import knexImport from 'knex'
import knexfile from '../knexfile.js'

const knex = knexImport(knexfile[process.env.NODE_ENV || 'development'])


export const getUserOfficeId = (userId) => {
  return knex.select('office_id').from('users').where({id: userId})
    .then(data => {
      return data[0].office_id
    })
    .catch(err => console.log(err))
  }

  export const getOfficeScheduleId = (officeId) => {
  return knex.select('schedule_id').from('office').where({id: officeId})
    .then(data => {
      return data[0].schedule_id
    })
    .catch(err => console.log(err))
}

export const isUserAdmin = (userId, officeId) => {
  return knex.select('is_admin').from('users').where({id: userId, office_id: officeId})
    .then(data => {
      return data[0].is_admin
    })
    .catch(err => console.log(err))
}