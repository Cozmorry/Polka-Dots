// authController.test.js (with Jest)
const request = require('supertest');
const app = require('../server'); // Import your Express app
const db = require('../config/db'); // Import database connection

describe('POST /api/auth/login', () => {
  it('should log in a user with correct credentials', async () => {
    const userCredentials = { username: 'john', password: 'password123' };
    
    const response = await request(app)
      .post('/api/auth/login')
      .send(userCredentials);
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  });

  it('should return 401 with incorrect credentials', async () => {
    const userCredentials = { username: 'john', password: 'wrongpassword' };
    
    const response = await request(app)
      .post('/api/auth/login')
      .send(userCredentials);
    
    expect(response.status).toBe(401);
    expect(response.body.message).toBe('Incorrect password');
  });
});
