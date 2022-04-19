const knex = require('knex')(require('../knexfile.js')['development']);

module.exports.getUserOfficeId = (userId) => {
  knex.select('office_id').from('users').where('user_id', userId)
    .then(data => {
      return data[0].office_id
    })
  }

modules.exports.getOfficeScheduleId = (officeId) => {
  knex.select('schedule_id').from('office').where('office_id', officeId)
    .then(data => {
      return data[0].schedule_id
    })
}

module.exports.isUserAdmin = (userId, officeId) => {
  return knex.select('isAdmin').from('users').where({id: userId, office_id: officeId})
    .then(data => {
      return data[0].isAdmin
    })
}