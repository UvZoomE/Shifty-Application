/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable("users", (table) => {
    table.text('id')
    table.text('email')
    table.text('first_name')
    table.text('last_name')
    table.text('rank')
    table.text('duty_title')
    table.text('work_phone')
    table.boolean('isAdmin')
    table.integer('team_id').nullable()
    table.integer('office_id').nullable()
    table.foreign('team_id').references('teams.id')
    table.foreign('office_id').references('offices.id')
  })
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.alterTable('users', (table) => {
    table.dropForeign('team_id')
    table.dropForeign('office_id')
  }).then(() => {
    return knex.schema.dropTableIfExists('users')
  })
};
