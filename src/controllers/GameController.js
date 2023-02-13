import validateStoreGamesSchema from '../schemas/storeGamesSchema.js';

export async function list(req, res) {
  try {
    return res.sendStatus(201);
  } catch (err) {
    return res.status(500).send(err);
  }
}

export async function store(req, res) {
  const {
    error,
  } = await validateStoreGamesSchema(req.body);

  if (error) return res.status(422).send(error);

  try {
    return res.sendStatus(201);
  } catch (err) {
    return res.status(500).send(err);
  }
}
