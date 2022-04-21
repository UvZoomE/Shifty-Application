const { faker } = require('@faker-js/faker');

const generateRandomId = () => {
  return Math.floor(Math.random() * 3)
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('offices').del()
  await knex('offices').insert([
    {id: 1, name: faker.name.firstName(), org_chart_img_url: null, curr_schedule_start: faker.date.past(), schedule_id: 1},
    {id: 2, name: faker.name.firstName(), org_chart_img_url: null, curr_schedule_start: faker.date.past(), schedule_id: 2},
    {id: 3, name: faker.name.firstName(), org_chart_img_url: null, curr_schedule_start: faker.date.past(), schedule_id: 1},
    {id: 4, name: faker.name.firstName(), org_chart_img_url: null, curr_schedule_start: faker.date.past(), schedule_id: 2},
    {id: 5, name: faker.name.firstName(), org_chart_img_url: null, curr_schedule_start: faker.date.past(), schedule_id: 1},
    {id: 6, name: faker.name.firstName(), org_chart_img_url: null, curr_schedule_start: faker.date.past(), schedule_id: 2},
    {id: 7, name: faker.name.firstName(), org_chart_img_url: null, curr_schedule_start: faker.date.past(), schedule_id: 1},
    {id: 8, name: faker.name.firstName(), org_chart_img_url: null, curr_schedule_start: faker.date.past(), schedule_id: 2},
    {id: 9, name: faker.name.firstName(), org_chart_img_url: null, curr_schedule_start: faker.date.past(), schedule_id: 1},
    {id: 10, name: faker.name.firstName(), org_chart_img_url: null, curr_schedule_start: faker.date.past(), schedule_id: 2}
  ]);
};
