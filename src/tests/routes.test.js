const request = require('supertest');
const app = require('../app');

describe('Login Page', () => {
  test('Should return 200', async () => {
    const response = await request(app).get('/login');
    expect(response.statusCode).toBe(200);
  });
});
