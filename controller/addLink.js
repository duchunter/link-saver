'use strict'

import { addToTable } from '../models/models';

export default async function (req, res) {
  const { direct, data } = req.body;

  // TODO: validate data

  const table = direct ? 'Main' : 'Temp';
  let result = await addToTable({ table, data });
  if (result) {
    res.status(201).json(`Link added to '${table}'`);
  } else {
    res.status(500).json(`Internal error`);
  }
}
