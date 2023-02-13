import Joi from 'joi';
import validator from './validator.js';

const finishRentalsSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const validateFinishRentalsSchema = validator(finishRentalsSchema);
export default validateFinishRentalsSchema;
