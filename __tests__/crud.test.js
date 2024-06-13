const request = require("supertest");
const app = require("../app"); // Ensure this points to your Express app
let adminToken, userToken; // Tokens for testing different roles

// Mock user data
const adminUser = {
  email: 'admin@example.com',
  password: 'Admin123',
  isAdmin: true
};

const normalUser = {
  email: 'user@example.com',
  password: 'User123',
  isAdmin: false
};

// Function to login users and retrieve tokens
async function loginUser(user) {
  const response = await request(app)
    .post('/auth/signin')
    .send({
      email: user.email,
      password: user.password
    });
  return response.body.jwt;
}

beforeAll(async () => {
  // Create users and login to get tokens
  adminToken = await loginUser(adminUser);
  userToken = await loginUser(normalUser);
});


// *-------------------- TEST POST reservation --------------------*
describe('POST /reservation', () => {
  it('should create a new reservation with a valid token', async () => {
    const res = await request(app)
      .post('/api/reservation')
      .set('Authorization', `Bearer ${token}`)
      .send({
        date: '2024-12-24T19:00:00.000Z',
        note: 'Holiday Dinner',
        numberOfGuests: 5
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');  // Assuming your response includes the reservation ID
  });

  it('should not create a reservation with an invalid token', async () => {
    const res = await request(app)
      .post('/api/reservatios')
      .set('Authorization', `Bearer wrongtoken`)
      .send({
        date: '2024-12-25T19:00:00.000Z',
        note: 'Holiday Lunch',
        numberOfGuests: 4
      });

    expect(res.statusCode).toEqual(400);  // Unauthorized
  });
});

// *-------------------- TEST GET reservation --------------------*

describe('GET /reservation', () => {
  it('should retrieve reservation with a valid token', async () => {
    const res = await request(app)
      .get('/api/reservation')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });
});

// *-------------------- TEST UPDATE reservation --------------------*

describe('PUT /reservation/:id', () => {
  it('should update an existing reservation', async () => {
    const res = await request(app)
      .put('/api/reservation/1') // Assuming 1 is a valid reservation ID
      .send({
        note: 'Updated note',
        numberOfGuests: 7,
        date: '2024-07-02T19:00:00.000Z'
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body.reservation.note).toEqual('Updated note');
  });
});

// *-------------------- TEST Delete reservation --------------------*

describe('DELETE /reservation/:reservationId', () => {
  it('should delete an existing reservation', async () => {
    const res = await request(app)
      .delete('/api/reservation/1'); // Assuming 1 is a valid reservation ID

    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toContain('Reservation deleted');
  });
});

// *-------------------- TEST POST User --------------------*

describe('POST /users', () => {
  it('should create a new user', async () => {
    const res = await request(app)
      .post('/users')
      .send({
        firstName: 'Test',
        lastName: 'User',
        email: 'testuser@example.com',
        phoneNumber: '123456789',
        password: 'Test123!'
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
  });

  it('should return 400 when email already exists', async () => {
    // Assume the same user is attempted to be created twice
    const res = await request(app)
      .post('/users')
      .send({
        firstName: 'Test',
        lastName: 'User',
        email: 'testuser@example.com',
        phoneNumber: '123456789',
        password: 'Test123!'
      });
    expect(res.statusCode).toEqual(404);
    expect(res.body.error).toContain('Email already exists');
  });
});

// *-------------------- TEST GET - ME User --------------------*

describe('GET /users/me', () => {
  it('should retrieve the current logged-in user', async () => {
    const res = await request(app)
      .get('/users/me')
      .set('Authorization', `Bearer ${userToken}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body.currentUser).toHaveProperty('id');
  });
});


// *-------------------- TEST PUT - User --------------------*

describe('PUT /users/:userId', () => {
  it('should update user details', async () => {
    const res = await request(app)
      .put('/users/1') // Assuming '1' is the valid user ID
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        firstName: 'Updated',
        lastName: 'User'
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body.user.firstName).toEqual('Updated');
  });
});

// *-------------------- TEST DELETE - User --------------------*

describe('DELETE /users/:userId', () => {
  it('should delete the user', async () => {
    const res = await request(app)
      .delete('/users/1') // Assuming '1' is a valid user ID
      .set('Authorization', `Bearer ${adminToken}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toContain('User deleted');
  });

  it('should return 404 if user not found', async () => {
    const res = await request(app)
      .delete('/users/999') // Assuming '999' does not exist
      .set('Authorization', `Bearer ${adminToken}`);

    expect(res.statusCode).toEqual(404);
    expect(res.body.error).toContain('User not found');
  });
});
