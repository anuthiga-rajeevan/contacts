// @ts-nocheck
import jwt from 'jsonwebtoken';
import { generateAuthToken } from './utils';

describe('generateAuthToken', () => {
  it('should return generated auth token', () => {
    const user = {
      _id: 'dummyId',
      name: 'dummyName',
      email: 'dummyEmail',
      password: 'dummyPassword',
    };
    generateAuthToken(user);
    expect(jwt.sign).toHaveBeenCalledWith(
      { user_id: user._id, email: user.email },
      'token_key',
      {
        expiresIn: '2h',
      },
    );
  });
});
