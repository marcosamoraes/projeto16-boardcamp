import Joi from 'joi';
import validator from './validator.js';

const storeRentalsSchema = Joi.object({
  customerId: Joi.number().min(1).required(),
  gameId: Joi.number().min(1).required(),
  daysRented: Joi.number().min(1).required(),
});

const validateStoreRentalsSchema = validator(storeRentalsSchema);
export default validateStoreRentalsSchema;
