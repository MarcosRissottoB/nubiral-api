import Joi from 'joi';

const username = Joi.string().alphanum().min(3).max(20);
const email = Joi.string().email().min(5).max(20);
const password = Joi.string().alphanum().min(5).max(20);

export const singUpSchema = Joi.object({
  username: username.required(),
  email: email.required(),
  password: password.required(),
});

export const singInSchema = Joi.object({
  email: email.required(),
  password: password.required(),
});