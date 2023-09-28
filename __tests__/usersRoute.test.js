const request = require('supertest');
const app = require('../app');

describe('GET /api/user/currentUser', () => {
    it('should return a 401 error', async () => {
        const res = await request(app)
        .get('/api/reservation')
        .expect('Content-Type', /json/)
        .expect(401);
    });
});