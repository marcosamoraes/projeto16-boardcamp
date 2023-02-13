export async function list(req, res) {
  try {
    return res.sendStatus(201);
  } catch (err) {
    return res.status(500).send(err);
  }
}

export async function store(req, res) {
  try {
    return res.sendStatus(201);
  } catch (err) {
    return res.status(500).send(err);
  }
}
