/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable("shifts", (table) => {
    table.increments('id')
    table.text('notes')
    table.dateTime('start_time')
    table.dateTime('stop_time')
    table.integer('schedule_id')
    table.foreign('schedule_id').references('schedules.id')
  })

};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.alterTable('shifts', (table) => {
    table.dropForeign('schedule_id')
  }).then(() => {
    return knex.schema.dropTableIfExists('shifts')
  })

};
