import mongoose from 'mongoose';

const emailSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['personal', 'work', 'business'],
    required: [true, 'Email type is required'],
  },
  email: { type: String, required: [true, 'Email Address is required'] },
  isPrimary: { type: Boolean, default: false },
});

const phoneSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['home', 'mobile', 'work', 'business'],
    required: [true, 'Phone type is required'],
  },
  phoneNo: { type: String, required: [true, 'Phone No is required'] },
  isPrimary: { type: Boolean, default: false },
});

const contactSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'user_id is required!'],
  },
  firstName: {
    trim: true,
    type: String,
    required: [true, 'firstName is required!'],
  },
  lastName: {
    trim: true,
    type: String,
    required: [true, 'lastName is required!'],
  },
  phone: {
    type: [phoneSchema],
    required: [true, 'Phone is required'],
  },
  email: {
    type: [emailSchema],
    required: [true, 'Email is required'],
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

const Contact = mongoose.model('Contact', contactSchema);

export default Contact;
