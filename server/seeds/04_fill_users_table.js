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
  for(let i = 0; i < 5000; i++){
    let firstName = faker.name.firstName();
    let lastName = faker.name.lastName();
    let newUser = {
      id: makeid(8),
      email: faker.internet.email(firstName + i, lastName),
      first_name: firstName,
      last_name: lastName,
      rank: rankList[Math.floor(Math.random() * rankList.length)],
      duty_title: dutyTitle[Math.floor(Math.random() * dutyTitle.length)],
      work_phone: faker.phone.phoneNumber(),
      is_admin: isAdmin[Math.floor(Math.random() * isAdmin.length)],
      team_position: Math.ceil(Math.random() * 4),
      office_id: Math.ceil(Math.random() * 10) 
    }

    dummyUsers.push(newUser)

  }

  return dummyUsers;
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert(generateUsers());
};
