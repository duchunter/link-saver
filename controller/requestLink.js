'use strict'

import { scanTable } from '../models/models';

export default async function (req, res) {
  const { mode, table, condition, limit } = req.body;

  // Request all at once
  if (mode === 'all') {
    return res.json(await scanTable({
      condition,
      table,
    }));
  }

  // Request some based on mode value
  if (mode > 0) {
    return res.json(await scanTable({
      condition,
      table,
      limit,
      offset: mode * limit
    }));
  }

  // Invalid mode
  return res.json([]);
}
