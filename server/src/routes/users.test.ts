// @ts-nocheck
import request from 'supertest';

import app from '../app';
import { connectTestDb, closeDbConnection } from '../db';

beforeAll(async () => {
  await connectTestDb();
});

afterAll(async () => {
  await closeDbConnection();
});

describe('POST api/users/register', () => {
  test('should respond with validation error if any of the validation fails', async (done) => {
    const response = await request(app).post('/api/users/register').send({}).expect(422);

    expect(response.body).toStrictEqual({
      success: false,
      error: 'ValidationError: "name" is required',
    });
    done();
  });

  test('should create a new user if the request is valid', async (done) => {
    const reqBody = {
      name: 'test',
      email: 'Test@GMAIL.com',
      password: '1234',
      repeatPassword: '1234',
    };
    const response = await request(app).post('/api/users/register').send(reqBody).expect(201);

    expect(response.body.success).toBe(true);
    expect(response.body.data.name).toBe('test');
    expect(response.body.data.email).toBe('test@gmail.com');
    expect(response.body.data.token).toBe('dummyToken');

    done();
  });
});
