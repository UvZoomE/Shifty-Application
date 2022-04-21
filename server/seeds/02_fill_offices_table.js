const { faker } = require('@faker-js/faker');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('offices').del()
  await knex('offices').insert([
    {id: 1, name: faker.name(), org_chart_img_url: null, curr_schedule_start: faker.date(), schedule_id: Math.floor(Math.random() * 3)},
    {id: 2, name: faker.name(), org_chart_img_url: null, curr_schedule_start: faker.date(), schedule_id: Math.floor(Math.random() * 3)},
    {id: 3, name: faker.name(), org_chart_img_url: null, curr_schedule_start: faker.date(), schedule_id: Math.floor(Math.random() * 3)},
    {id: 4, name: faker.name(), org_chart_img_url: null, curr_schedule_start: faker.date(), schedule_id: Math.floor(Math.random() * 3)},
    {id: 5, name: faker.name(), org_chart_img_url: null, curr_schedule_start: faker.date(), schedule_id: Math.floor(Math.random() * 3)},
    {id: 6, name: faker.name(), org_chart_img_url: null, curr_schedule_start: faker.date(), schedule_id: Math.floor(Math.random() * 3)},
    {id: 7, name: faker.name(), org_chart_img_url: null, curr_schedule_start: faker.date(), schedule_id: Math.floor(Math.random() * 3)},
    {id: 8, name: faker.name(), org_chart_img_url: null, curr_schedule_start: faker.date(), schedule_id: Math.floor(Math.random() * 3)},
    {id: 9, name: faker.name(), org_chart_img_url: null, curr_schedule_start: faker.date(), schedule_id: Math.floor(Math.random() * 3)},
    {id: 10, name: faker.name(), org_chart_img_url: null, curr_schedule_start: faker.date(), schedule_id: Math.floor(Math.random() * 3)},
  ]);
};
