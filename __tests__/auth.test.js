const request = require("supertest");
const app = require("../app");

// *-------------------- TEST POST SIGN UP --------------------*

describe('POST /signup', () => {
  it('should create a new user and return a JWT', async () => {
    const response = await request(app)
      .post('/auth/signup')
      .send({
        email: 'test@example.com',
        firstName: 'Test',
        lastName: 'User',
        password: 'Password123',
        phoneNumber: '1234567890',
      });
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('jwt');
  });

  it('should return 400 if the email already exists', async () => {
    // First call to create the user
    await request(app).post('/auth/signup').send({
      email: 'testuser@example.com',
      firstName: 'Test',
      lastName: 'User',
      password: 'Password123',
      phoneNumber: '1234567890',
    });

    // Second call with the same email
    const response = await request(app)
      .post('/auth/signup')
      .send({
        email: 'testuser@example.com',
        firstName: 'Test',
        lastName: 'User',
        password: 'Password123',
        phoneNumber: '1234567890',
      });
    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe('Email already exists');
  });
});

// *-------------------- TEST POST SIGNIN --------------------*

describe('POST /signin', () => {
  it('should /authenticate user and return JWT', async () => {
    // Assume the user has already been created in the signUp test
    const response = await request(app)
      .post('/auth/signin')
      .send({
        email: 'testuser@example.com',
        password: 'Password123',
      });
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('jwt');
  });

  it('should reject invalid credentials', async () => {
    const response = await request(app)
      .post('/auth/signin')
      .send({
        email: 'testuser@example.com',
        password: 'wrongPassword',
      });
    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe('Incorrect username or password');
  });
});

// *-------------------- TEST RESET PASSWORD --------------------*


describe('POST /reset-password', () => {
  it('should allow a user to reset their password', async () => {
    const userResponse = await request(app)
      .post('/auth/signup')
      .send({
        email: 'resetuser@example.com',
        firstName: 'Reset',
        lastName: 'User',
        password: 'OldPassword123',
        phoneNumber: '1234567890',
      });

    const response = await request(app)
      .post('/auth/reset-password')
      .send({
        email: 'resetuser@example.com',
        newPassword: 'NewPassword123',
      });
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('Password successfully reset');
  });

  it('should return 404 if the user does not exist', async () => {
    const response = await request(app)
      .post('/auth/reset-password')
      .send({
        email: 'nonexistent@example.com',
        newPassword: 'NewPassword123',
      });
      
    expect(response.statusCode).toBe(404);
    expect(response.body.error).toBe('User not found');
  });
});
