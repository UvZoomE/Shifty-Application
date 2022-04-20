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
    table.integer('team_id').nullable()
    table.integer('office_id').nullable()
    table.foreign('team_id').references(['teams.position', 'teams.office_id'])
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
