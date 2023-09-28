const request = require('supertest');
const app = require('../app');

describe('GET /api/reservations', () => {
it('should return a 401 error', async () => {
    const res = await request(app)
    .get('/api/reservations')
    .expect('Content-Type', /json/)
    .expect(401);
});
});


describe('POST /api/reservations', () => {
    it('should return a 401 error', async () => {
        const res = await request(app)
        .get('/api/reservations')
        .expect('Content-Type', /json/)
        .expect(401);
    });
    });
    
