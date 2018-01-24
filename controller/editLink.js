'use strict'

import { updateInTable } from '../models/models';

export default async function (req, res) {
  const { id, table, changes } = req.body;
  let result = await updateInTable({
    table,
    changes,
    condition: { id }
  });

  if (result) {
    res.status(200).json('Link updated');
  } else {
    res.status(500).json('Internal error');
  }
}
