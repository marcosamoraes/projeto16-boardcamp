import express from 'express';
import cors from 'cors';
import {
  list as listGames,
  store as storeGames,
} from '../controllers/GameController.js';
import {
  list as listRentals,
  store as storeRentals,
  destroy as destroyRentals,
  finish as finishRentals,
} from '../controllers/RentalController.js';
import {
  list as listCustomers,
  show as showCustomers,
  store as storeCustomers,
  update as updateCustomers,
} from '../controllers/CustomerController.js';

const router = express.Router();

router.use(cors());
router.use(express.json());

router.get('/games', listGames);
router.post('/games', storeGames);

router.get('/customers', listCustomers);
router.get('/customers/:id', showCustomers);
router.post('/customers', storeCustomers);
router.put('/customers/:id', updateCustomers);

router.get('/rentals', listRentals);
router.post('/rentals', storeRentals);
router.delete('/rentals/:id', destroyRentals);
router.post('/rentals/:id/return', finishRentals);

export default router;
