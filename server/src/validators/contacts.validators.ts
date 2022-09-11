import Joi from 'joi';

const updatePhone = Joi.object({
  _id: Joi.string(),
  type: Joi.string().valid('home', 'mobile', 'work', 'business').required(),
  phoneNo: Joi.string().required(),
  isPrimary: Joi.boolean().default(false),
});
const phone = Joi.object({
  type: Joi.string().valid('home', 'mobile', 'work', 'business').required(),
  phoneNo: Joi.string().required(),
  isPrimary: Joi.boolean().default(false),
});
const updateEmail = Joi.object({
  _id: Joi.string(),
  type: Joi.string().valid('personal', 'work', 'business').required(),
  email: Joi.string().trim().email().lowercase().required(),
  isPrimary: Joi.boolean().default(false),
});
const email = Joi.object({
  type: Joi.string().valid('personal', 'work', 'business').required(),
  email: Joi.string().trim().email().lowercase().required(),
  isPrimary: Joi.boolean().default(false),
});

export const addContact = Joi.object({
  firstName: Joi.string().trim().min(1).required(),
  lastName: Joi.string().trim().min(1).required(),
  phone: Joi.array().items(phone).min(1).required(),
  email: Joi.array().items(email).min(1).required(),
});

export const updateContact = Joi.object({
  __v: Joi.number(),
  _id: Joi.string().required(),
  user_id: Joi.string().required(),
  firstName: Joi.string().trim().min(1).required(),
  lastName: Joi.string().trim().min(1).required(),
  phone: Joi.array().items(updatePhone).min(1).required(),
  email: Joi.array().items(updateEmail).min(1).required(),
  createdAt: Joi.number(),
  updatedAt: Joi.number()
});
