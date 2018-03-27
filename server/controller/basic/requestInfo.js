'use strict'

import { countInTable } from '../../models/models';
import { adjustCondition } from '../../utils/smartSearch';

export default async function (req, res) {
  const { table, condition } = req.body;
  adjustCondition(condition);
  let result = await countInTable({ table, condition });

  // Invalid query
  if (result[0].count === -1) {
    res.status(400).json('Invalid request');
  } else {
    // OK
    res.status(200).json(result[0].count);
  }
}
