import validateStoreCustomersSchema from '../schemas/storeCustomersSchema.js';
import validateUpdateCustomersSchema from '../schemas/updateCustomersSchema.js';

export async function list(req, res) {
  try {
    return res.sendStatus(201);
  } catch (err) {
    return res.status(500).send(err);
  }
}

export async function show(req, res) {
  try {
    return res.sendStatus(201);
  } catch (err) {
    return res.status(500).send(err);
  }
}

export async function store(req, res) {
  const {
    error,
  } = await validateStoreCustomersSchema(req.body);

  if (error) return res.status(error.code).send(error.message);

  try {
    return res.sendStatus(201);
  } catch (err) {
    return res.status(500).send(err);
  }
}

export async function update(req, res) {
  const {
    error,
  } = await validateUpdateCustomersSchema(req.body);

  if (error) return res.status(error.code).send(error.message);

  try {
    return res.sendStatus(201);
  } catch (err) {
    return res.status(500).send(err);
  }
}
