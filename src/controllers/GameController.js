import validateStoreGamesSchema from '../schemas/storeGamesSchema.js';
import db from '../config/database.js';

export async function list(req, res) {
  try {
    const games = await db.query('SELECT * FROM games');
    return res.send(games.rows);
  } catch (err) {
    return res.status(500).send(err);
  }
}

export async function store(req, res) {
  const {
    name,
    image,
    stockTotal,
    pricePerDay,
    error,
  } = await validateStoreGamesSchema(req.body);

  if (error) return res.status(error.code).send(error.message);

  try {
    const gameExists = await db.query('SELECT id FROM games WHERE "name" = $1', [name]);

    if (gameExists.rows.length > 0) return res.sendStatus(409);

    await db.query('INSERT INTO games ("name", "image", "stockTotal", "pricePerDay") VALUES ($1, $2, $3, $4)', [name, image, stockTotal, pricePerDay]);

    return res.sendStatus(201);
  } catch (err) {
    return res.status(500).send(err);
  }
}
