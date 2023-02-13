import Joi from 'joi';
import validator from './validator.js';

const storeGamesSchema = Joi.object({
  name: Joi.string().required(),
  image: Joi.string().optional(),
  stockTotal: Joi.number().min(1).required(),
  pricePerDay: Joi.number().min(1).required(),
});

const validateStoreGamesSchema = validator(storeGamesSchema);
export default validateStoreGamesSchema;
