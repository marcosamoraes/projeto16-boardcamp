/* eslint-disable prefer-destructuring */
import dayjs from 'dayjs';
import validateStoreRentalsSchema from '../schemas/storeRentalsSchema.js';
import db from '../config/database.js';

export async function list(req, res) {
  try {
    const rentals = await db.query(`
      SELECT
        r.*,
        JSON_BUILD_OBJECT('id', c.id, 'name', c.name) AS customer,
        JSON_BUILD_OBJECT('id', g.id, 'name', g.name) AS game
      FROM rentals r
      JOIN customers c ON r."customerId" = c."id"
      JOIN games g ON r."gameId" = g."id"
    `);
    return res.send(rentals.rows);
  } catch (err) {
    return res.status(500).send(err);
  }
}

export async function store(req, res) {
  const {
    customerId,
    gameId,
    daysRented,
    error,
  } = await validateStoreRentalsSchema(req.body);

  if (error) return res.status(error.code).send(error.message);

  try {
    let customer = await db.query('SELECT * FROM customers WHERE "id" = $1', [customerId]);
    customer = customer.rows[0];
    if (!customer) return res.sendStatus(409);

    let game = await db.query('SELECT * FROM games WHERE "id" = $1', [gameId]);
    game = game.rows[0];
    if (!game) return res.sendStatus(409);

    const quantityGameRented = await db.query('SELECT count(id) as quantity FROM rentals WHERE "gameId" = $1 AND "returnDate" IS NULL', [game.id]);

    if (game.stockTotal <= quantityGameRented.rows[0].quantity) return res.sendStatus(400);

    const originalPrice = daysRented * game.pricePerDay;

    await db.query(
      'INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee") VALUES ($1, $2, $3, $4, null, $5, null)',
      [customerId, gameId, dayjs().format(), daysRented, originalPrice],
    );

    return res.sendStatus(201);
  } catch (err) {
    return res.status(500).send(err);
  }
}

export async function destroy(req, res) {
  const { id } = req.params;

  try {
    let rental = await db.query('SELECT * FROM rentals WHERE "id" = $1', [id]);
    rental = rental.rows[0];
    if (!rental) return res.sendStatus(404);

    if (!rental.returnDate) return res.sendStatus(400);

    await db.query('DELETE FROM rentals WHERE "id" = $1', [id]);

    return res.sendStatus(200);
  } catch (err) {
    return res.status(500).send(err);
  }
}

export async function finish(req, res) {
  const { id } = req.params;

  try {
    let rental = await db.query('SELECT * FROM rentals WHERE "id" = $1', [id]);
    rental = rental.rows[0];
    if (!rental) return res.sendStatus(404);

    if (rental.returnDate) return res.sendStatus(400);

    const returnDate = dayjs().format();

    const dateExpiresAt = dayjs(rental.rentDate).add(rental.daysRented, 'day');

    let delayFee = null;

    const diffDays = dateExpiresAt.diff(dayjs(), 'day');
    if (diffDays > 0) delayFee = diffDays * (rental.originalPrice / rental.daysRented);

    await db.query('UPDATE rentals SET "returnDate" = $1, "delayFee" = $2 WHERE "id" = $3', [returnDate, delayFee, id]);

    return res.sendStatus(200);
  } catch (err) {
    return res.status(500).send(err);
  }
}
