// const knex = require('knex')(require('../knexfile.js')['development']);

import knexImport from 'knex'
import knexfile from '../knexfile.js'

const knex = knexImport(knexfile['development'])



export const getUserOfficeId = (userId) => {
  return knex.select('office_id').from('users').where('id', userId)
    .then(data => {
      return data[0].office_id
    })
    .catch(() => undefined)
  }

  export const getOfficeScheduleId = (officeId) => {
  return knex.select('schedule_id').from('office').where('id', officeId)
    .then(data => {
      return data[0].schedule_id
    })
    .catch(() => undefined)
}

export const isUserAdmin = (userId, officeId) => {
  return knex.select('is_admin').from('users').where({id: userId, office_id: officeId})
    .then(data => {
      return data[0].is_admin
    })
}