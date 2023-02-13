import Joi from 'joi';
import validator from './validator.js';

const storeRentalsSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const validateStoreRentalsSchema = validator(storeRentalsSchema);
export default validateStoreRentalsSchema;
