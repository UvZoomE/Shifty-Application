/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function(knex) {
  return knex.schema.alterTable("shifts", (table) => {
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
  return knex.schema.alterTable('shifts', (table) => {
    table.dropForeign(['team_position', 'office_id'])
  })

};
