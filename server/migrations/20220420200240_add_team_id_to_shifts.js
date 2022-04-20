/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function(knex) {
  return knex.schema.alterTable("shifts", (table) => {
    table.integer('team_id')
    table.foreign('team_id').references(['teams.position', 'teams.office_id'])
  })

};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.alterTable('shifts', (table) => {
    table.dropForeign('team_id')
  })

};
