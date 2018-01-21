'use strict'

import { addToTable } from '../models/models';

export default async function (req, res) {
  const { direct, data } = req.body;

  // TODO: validate data
  
  const table = direct ? 'Main' : 'Temp';
  res.json(await addToTable({ table, data }));
}
