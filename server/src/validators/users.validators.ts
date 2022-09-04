import Joi from 'joi';

export const register = Joi.object({
    name: Joi.string().trim().min(1).required(),
    email: Joi.string().trim().email().lowercase().required(),
    password: Joi.string().trim().min(4).required(),
    repeatPassword: Joi.ref('password'),
}).with('password', 'repeatPassword');

export const login = Joi.object({
    email: Joi.string().trim().email().lowercase().required(),
    password: Joi.string().trim().min(4).required(),
});
