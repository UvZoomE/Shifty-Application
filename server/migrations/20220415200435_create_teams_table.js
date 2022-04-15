/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable("teams", (table) => {
    table.increments('id')
    table.text('name')
    table.integer('office_id')
    table.foreign('office_id').references('offices.id')
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.alterTable('teams', (table) => {
    table.dropForeign('office_id')
  }).then(() => {
    return knex.schema.dropTableIfExists('teams')
  })
};
