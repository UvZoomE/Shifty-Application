const { faker } = require('@faker-js/faker');

const positions = () => {
  return Math.floor(Math.random() * 6)
}

exports.seed = async function(knex) {
  await knex('teams').del()
  await knex('teams').insert([
    {position: 1, name: faker.name(), office_id: 1},
    {position: 2, name: faker.name(), office_id: 1},
    {position: 3, name: faker.name(), office_id: 1},
    {position: 1, name: faker.name(), office_id: 2},
    {position: 2, name: faker.name(), office_id: 2},
    {position: 3, name: faker.name(), office_id: 2},
    {position: 1, name: faker.name(), office_id: 3},
    {position: 2, name: faker.name(), office_id: 3},
    {position: 3, name: faker.name(), office_id: 3},
    {position: 1, name: faker.name(), office_id: 4},
    {position: 2, name: faker.name(), office_id: 4},
    {position: 3, name: faker.name(), office_id: 4},
    {position: 1, name: faker.name(), office_id: 5},
    {position: 2, name: faker.name(), office_id: 5},
    {position: 3, name: faker.name(), office_id: 5},
    {position: 1, name: faker.name(), office_id: 6},
    {position: 2, name: faker.name(), office_id: 6},
    {position: 3, name: faker.name(), office_id: 6},
    {position: 1, name: faker.name(), office_id: 7},
    {position: 2, name: faker.name(), office_id: 7},
    {position: 3, name: faker.name(), office_id: 7},
    {position: 1, name: faker.name(), office_id: 8},
    {position: 2, name: faker.name(), office_id: 8},
    {position: 3, name: faker.name(), office_id: 8},
    {position: 1, name: faker.name(), office_id: 9},
    {position: 2, name: faker.name(), office_id: 9},
    {position: 3, name: faker.name(), office_id: 9},
    {position: 1, name: faker.name(), office_id: 10},
    {position: 2, name: faker.name(), office_id: 10},
    {position: 3, name: faker.name(), office_id: 10}
  ])
}

