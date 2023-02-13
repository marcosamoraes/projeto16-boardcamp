import Joi from 'joi';
import validator from './validator.js';

const updateCustomersSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const validateUpdateCustomersSchema = validator(updateCustomersSchema);
export default validateUpdateCustomersSchema;
