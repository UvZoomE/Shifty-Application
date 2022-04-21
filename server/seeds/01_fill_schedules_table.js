/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('schedules').del()
  await knex('schedules').insert([
    {id: 1, type: 'Panama', num_teams: 4, shift_duration: 12, days_off_per_year: 182, example_image_url: null, cycle_length: 56},
    {id: 2, type: 'SevenTwo', num_teams: 4, shift_duration: 8, days_off_per_year: 91, example_image_url: null, cycle_length: 28 }
  ]);
};
