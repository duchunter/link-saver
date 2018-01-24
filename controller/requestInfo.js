'use strict'

import { countInTable } from '../models/models';

export default async function (req, res) {
  const { table, condition } = req.body;
  let result = await countInTable({ table, condition });

  // Invalid query
  if (result.count === -1) {
    res.status(400).json('Invalid request');
  } else {
    // OK
    res.status(200).json(result.count);
  }
}
