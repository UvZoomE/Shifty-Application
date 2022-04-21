const request = require('supertest');
const users = require('../src/app.js');
const { firebase, authInstance } = require('../utils/clientFbInstance.js');
const { faker } = require('@faker-js/faker');

const EMAIL = faker.internet.email();
const PASSWORD = faker.internet.password();

const createRandomUserInFb = async () => {
  return await firebase.createUserWithEmailAndPassword(authInstance, EMAIL, PASSWORD)
  .then((userCred) => firebase.getIdToken(userCred.user, true))
}

let shiftyToken = createRandomUserInFb()

describe('POST /api/users/new-user', () => {
  // let shiftyToken;
  // beforeAll(async () => {
  //   shiftyToken = await createRandomUserInFb()
  // });

  test('returns status of 400 if cookie value not defined', (done) =>{
    request(users)
      .post('/new-user')
      .expect(400)
      .end((err, res) =>{
        if(err) throw err;
        done();
      })
  })

  //test('returns status of 201 when user created', ())
  // test('returns new user record after creation')
})