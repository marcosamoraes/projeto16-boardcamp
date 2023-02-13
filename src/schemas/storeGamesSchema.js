import Joi from 'joi';
import validator from './validator.js';

const storeGamesSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const validateStoreGamesSchema = validator(storeGamesSchema);
export default validateStoreGamesSchema;
