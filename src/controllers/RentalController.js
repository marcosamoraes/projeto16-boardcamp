import validateStoreRentalsSchema from '../schemas/storeRentalsSchema.js';
import validateUpdateRentalsSchema from '../schemas/updateRentalsSchema.js';
import validateFinishRentalsSchema from '../schemas/finishRentalsSchema.js';

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
  } = await validateStoreRentalsSchema(req.body);

  if (error) return res.status(422).send(error);

  try {
    return res.sendStatus(201);
  } catch (err) {
    return res.status(500).send(err);
  }
}

export async function update(req, res) {
  const {
    error,
  } = await validateUpdateRentalsSchema(req.body);

  if (error) return res.status(422).send(error);

  try {
    return res.sendStatus(201);
  } catch (err) {
    return res.status(500).send(err);
  }
}

export async function destroy(req, res) {
  try {
    return res.sendStatus(201);
  } catch (err) {
    return res.status(500).send(err);
  }
}

export async function finish(req, res) {
  const {
    error,
  } = await validateFinishRentalsSchema(req.body);

  if (error) return res.status(422).send(error);

  try {
    return res.sendStatus(201);
  } catch (err) {
    return res.status(500).send(err);
  }
}
