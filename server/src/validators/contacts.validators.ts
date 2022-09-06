import Joi from 'joi';

const phone = Joi.object({
  type: Joi.string().valid('home', 'mobile', 'work', 'business').required(),
  phoneNo: Joi.string().required(),
  isPrimary: Joi.boolean().default(false),
});
const email = Joi.object({
  type: Joi.string().valid('personal', 'work', 'business').required(),
  email: Joi.string().trim().email().lowercase().required(),
  isPrimary: Joi.boolean().default(false),
});

export const contact = Joi.object({
  firstName: Joi.string().trim().min(1).required(),
  lastName: Joi.string().trim().min(1).required(),
  phone: Joi.array().items(phone).min(1).required(),
  email: Joi.array().items(email).min(1).required(),
});
