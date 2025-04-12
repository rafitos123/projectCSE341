
const request = require('supertest');
const app = require('../server');
const mongodb = require('../db/database');



let fakeReviewId; 

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

  //insert a review to test
  const db = mongodb.getDatabase();
  const result = await db.collection('reviews').insertOne({
    user_id: '1234567890',
    product_id: '123',
    rating: 4,
    comment: 'Great product!',
    verified: true,
    verified_date: '2023-10-01'
  });
  fakeReviewId = result.insertedId;
});

//close connection to database after all tests
// and delete all reviews in the collection
afterAll(async () => {
    const db = mongodb.getDatabase();
    await db.collection('reviews').deleteMany({}); 
    await db.client.close();
  });

  // Test cases for the reviews API
describe('reviews API', () => {
    test('Should return all reviews', async () => {
      const response = await request(app).get('/reviews');
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true); 
    });
  
    test('Should return a spefic product', async () => {
      const response = await request(app).get(`/reviews/${fakeReviewId}`);
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('user_id', '1234567890');
      expect(response.body).toHaveProperty('product_id', '123');
      expect(response.body).toHaveProperty('rating', 4);
      expect(response.body).toHaveProperty('comment', 'Great product!');
      expect(response.body).toHaveProperty('verified', true);
      expect(response.body).toHaveProperty('verified_date', '2023-10-01');
    });
  });

  