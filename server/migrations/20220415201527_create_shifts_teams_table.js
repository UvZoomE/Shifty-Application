/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable("shifts_teams", (table) => {
    table.integer('shift_id')
    table.integer('team_id')
    table.foreign('shift_id').references('shifts.id')
    table.foreign('team_id').references('teams.id')
    table.primary(['shift_id', 'team_id'])
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.alterTable('shifts_teams', (table) => {
    table.dropForeign('shift_id')
    table.dropForeign('team_id')
  }).then(() => {
    return knex.schema.dropTableIfExists('shifts_teams')
})
};
