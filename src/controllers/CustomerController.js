import db from '../config/database.js';
import validateStoreCustomersSchema from '../schemas/storeCustomersSchema.js';
import validateUpdateCustomersSchema from '../schemas/updateCustomersSchema.js';

export async function list(req, res) {
  try {
    const customers = await db.query('SELECT * FROM customers');
    return res.send(customers.rows);
  } catch (err) {
    return res.status(500).send(err);
  }
}

export async function show(req, res) {
  const { id } = req.params;

  try {
    const customer = await db.query('SELECT * FROM customers where "id" = $1', [id]);

    if (customer.rows.length === 0) return res.sendStatus(404);
    return res.send(customer.rows[0]);
  } catch (err) {
    return res.status(500).send(err);
  }
}

export async function store(req, res) {
  const {
    name,
    phone,
    cpf,
    birthday,
    error,
  } = await validateStoreCustomersSchema(req.body);

  if (error) return res.status(error.code).send(error.message);

  try {
    const customerExists = await db.query('SELECT id FROM customers WHERE "cpf" = $1', [cpf]);

    if (customerExists.rows.length > 0) return res.sendStatus(409);

    await db.query('INSERT INTO customers ("name", "phone", "cpf", "birthday") VALUES ($1, $2, $3, $4)', [name, phone, cpf, birthday]);

    return res.sendStatus(201);
  } catch (err) {
    return res.status(500).send(err);
  }
}

export async function update(req, res) {
  const { id } = req.params;

  const {
    name,
    phone,
    cpf,
    birthday,
    error,
  } = await validateUpdateCustomersSchema(req.body);

  if (error) return res.status(error.code).send(error.message);

  try {
    const cpfIsUsed = await db.query('SELECT id FROM customers WHERE "cpf" = $1 AND "id" != $2', [cpf, id]);

    if (cpfIsUsed.rows.length > 0) return res.sendStatus(409);

    await db.query('UPDATE customers SET "name" = $1, "phone" = $2, "cpf" = $3, "birthday" = $4) WHERE "id" = $5', [name, phone, cpf, birthday, id]);

    return res.sendStatus(200);
  } catch (err) {
    return res.status(500).send(err);
  }
}
