import Joi from 'joi';
import validator from './validator.js';

const storeRentalsSchema = Joi.object({
  customerId: Joi.number().required(),
  gameId: Joi.number().required(),
  daysRented: Joi.number().min(1).required(),
});

const validateStoreRentalsSchema = validator(storeRentalsSchema);
export default validateStoreRentalsSchema;
