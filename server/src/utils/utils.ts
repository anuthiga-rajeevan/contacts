import jwt from 'jsonwebtoken';
import { SavedUserDocument } from '../models/user.model';

export const generateAuthToken = (user: SavedUserDocument) => {
  return jwt.sign({ user_id: user._id, email: user.email }, process.env.TOKEN_KEY || 'token_key', {
    expiresIn: '2h',
  });
};
