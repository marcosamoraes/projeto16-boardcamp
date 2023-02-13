import Joi from 'joi';
import validator from './validator.js';

const updateRentalsSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const validateUpdateRentalsSchema = validator(updateRentalsSchema);
export default validateUpdateRentalsSchema;
