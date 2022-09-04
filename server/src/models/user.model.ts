import { Schema, model, Document } from 'mongoose';

export interface SavedUserDocument extends Document {
  name: string;
  email: string;
  password: string;
  createdAt: number;
  updatedAt: number;
}

const userSchema = new Schema({
  name: {
    trim: true,
    type: String,
    required: [true, 'Name is required!'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: [true, 'Email must be unique'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  createdAt: {
    type: Number,
    default: Date.now,
  },
  updatedAt: {
    type: Number,
    default: Date.now,
  },
});

const User = model<SavedUserDocument>('User', userSchema);

export default User;
