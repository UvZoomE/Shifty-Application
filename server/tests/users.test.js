import request from 'supertest';
import users from '../src/app.js';
import { faker } from '@faker-js/faker';

const EMAIL = faker.internet.email();
const PASSWORD = faker.internet.password();

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

  test('returns status of 201 when user created', (done) => {
    request(users)
    .post('/new-user')
    .expect(201)
    .end((err, res) => {
      if(err) throw err;
      done();
    })
  })
  // test('returns new user record after creation')
})