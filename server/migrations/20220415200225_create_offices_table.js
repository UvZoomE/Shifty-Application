/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable("offices", (table) => {
    table.increments('id')
    table.text('name')
    table.text('org_chart_img_url')
    table.datetime('curr_schedule_start')
    table.integer('schedule_id')
    table.foreign('schedule_id').references('schedules.id')
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.alterTable('offices', (table) => {
    table.dropForeign('schedule_id')
  }).then(() => {
    return knex.schema.dropTableIfExists('offices')
  })
};
