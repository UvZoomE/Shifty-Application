/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable("schedules", (table) => {
    table.increments('id')
    table.text('type')
    table.integer('num_teams')
    table.integer('shift_duration')
    table.integer('days_off_per_year')
    table.text('example_image_url')
    table.integer('cycle_length')
  })
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('schedules')
  
};
