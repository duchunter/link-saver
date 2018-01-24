'use strict'

import { delFromTable } from '../models/models';

export default async function (req, res) {
  const { table, id } = req.body;
  let result = await delFromTable({
    table,
    condition: { id }
  });

  if (result) {
    res.status(200).json('Link removed');
  } else {
    res.status(500).json('Internal error or link not found');
  }
}
