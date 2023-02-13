import express from 'express';
import cors from 'cors';
import {
  list as listGames,
  store as storeGames,
} from '../controllers/GameController';
import {
  list as listRentals,
  store as storeRentals,
  update as updateRentals,
  destroy as destroyRentals,
  finish as finishRentals,
} from '../controllers/RentalController';
import {
  list as listCustomers,
  show as showCustomers,
  store as storeCustomers,
  update as updateCustomers,
} from '../controllers/CustomerController';

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
router.put('/rentals/:id', updateRentals);
router.delete('/rentals/:id', destroyRentals);
router.post('/rentals/:id/return', finishRentals);

export default router;
