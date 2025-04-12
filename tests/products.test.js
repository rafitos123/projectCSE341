
const request = require('supertest');
const app = require('../server');
const mongodb = require('../db/database');


let fakeProductId; 

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

  //insert a product to test
  const db = mongodb.getDatabase();
  const result = await db.collection('products').insertOne({
    name: 'Product Test',
    category: 'Category Test',
    price: 50.0,
    average_rating: 4.5,
  });
  fakeProductId = result.insertedId;
});

//close connection to database after all tests
// and delete all products in the collection
afterAll(async () => {
  const db = mongodb.getDatabase();
  await db.client.close();
});

  // Test cases for the products API
describe('Products API', () => {
    test('Should return all products', async () => {
      const response = await request(app).get('/products');
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true); 
    });
  
    test('Should return a spefic product', async () => {
      const response = await request(app).get(`/products/${fakeProductId}`);
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('name', 'Product Test'); 
      expect(response.body).toHaveProperty('category', 'Category Test');
      expect(response.body).toHaveProperty('price', 50.0);
      expect(response.body).toHaveProperty('average_rating', 4.5);    
    });
  });

  