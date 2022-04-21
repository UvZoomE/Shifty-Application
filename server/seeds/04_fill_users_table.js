const { faker } = require('@faker-js/faker');

const rankList = ['Spc1', 'Spc2', 'Spc3', 'Spc4', 'Sgt', 'TSgt', 'MSgt', 'SMSgt', 'CMSgt']
const dutyTitle = ['Signals Intel Analyst', 'Satellite operator', 'Programmer', 'Fusion Analyst', 'Targeting Analyst', 'Acquisition Manager', 'Developmental Engineer']
const isAdmin = [true, false]

function makeid(length) {
  let result           = '';
  let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
 }
 return result;
}

const generateUsers = () => {
  const dummyUsers = []
  for(let i = 0; i < 10000; i++){
    let fullName = faker.name().split(' ');
    let firstName = fullName[0];
    let lastName = fullName[1];
    let newUser = {
      id: makeid(8),
      email: faker.internet.email(firstName, lastName),
      first_name: firstName,
      last_name: lastName,
      rank: rankList[Math.floor(Math.random() * 10)],
      duty_title: dutyTitle[Math.floor(Math.random() * 8)],
      work_phone: faker.phone.phoneNumber(),
      isAdmin: dutyTitle[Math.floor(Math.random() * 3)],
      team_id: Math.floor(Math.random() * 4),
      office_id: Math.floor(Math.random() * 11) 
    }

    dummyUsers.push(newUser)

  }
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('table_name').del()
  await knex('table_name').insert(generateUsers());
};
