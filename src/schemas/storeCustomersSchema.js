import Joi from 'joi';
import validator from './validator.js';

const storeCustomersSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const validateStoreCustomersSchema = validator(storeCustomersSchema);
export default validateStoreCustomersSchema;
