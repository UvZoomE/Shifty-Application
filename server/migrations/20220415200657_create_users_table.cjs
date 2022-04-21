/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable("users", (table) => {
    table.text('id').primary()
    table.text('email').unique()
    table.text('first_name').nullable()
    table.text('last_name').nullable()
    table.text('rank').nullable()
    table.text('duty_title').nullable()
    table.text('work_phone').nullable()
    table.boolean('is_admin').nullable()
    table.integer('team_position')
    table.integer('office_id')
    table.foreign(['team_position', 'office_id']).references(['position', 'office_id']).on('teams')
  })

};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.alterTable('users', (table) => {
    table.dropForeign(['team_position', 'office_id'])
  }).then(() => {
    return knex.schema.dropTableIfExists('users')
  })
};
