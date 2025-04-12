
const request = require('supertest');
const app = require('../server');
const mongodb = require('../db/database');


let fakeUserId; 

//initialize connection to database before all tests
beforeAll(async () => {
  await new Promise((resolve) => {
    mongodb.initDb((err) => {
      if (err) {
        console.error('Error to connect database:', err);
      } else {
        console.log('Database initialized for testing!');
        resolve();
      }
    });
  });

  //insert a user to test
  const db = mongodb.getDatabase();
  const result = await db.collection('users').insertOne({
        firstName: 'Rafa',
        lastName: 'Test',
        email: 'test@test.com'
  });
  fakeUserId = result.insertedId;
});

//close connection to database after all tests
// and delete all users in the collection
afterAll(async () => {
    const db = mongodb.getDatabase();
    await db.client.close();
  });

  // Test cases for the users API
describe('users API', () => {
    test('Should return all users', async () => {
      const response = await request(app).get('/users');
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true); 
    });
  
    test('Should return a spefic user', async () => {
      const response = await request(app).get(`/users/${fakeUserId}`);
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('firstName', 'Rafa');
      expect(response.body).toHaveProperty('lastName', 'Test');
      expect(response.body).toHaveProperty('email', 'test@test.com');
    });
  });

  