'use strict'

import { scanTable, addToTable, delFromTable } from '../models/models';

export default async function (req, res) {
  const { id } = req.body;

  // Get link from Temp based on id
  let result = await scanTable({
    table: 'Temp',
    condition: { id }
  });

  // Check if scan table fail
  if (result.length === 0) return false;

  // Add link to Main and remove from Temp
  delete result[0].id;
  result = await Promise.all([
    addToTable({
      table: 'Main',
      data: result[0]
    }),
    delFromTable({
      table: 'Temp',
      condition: { id }
    })
  ]);

  // Return message based on result
  if (result[0] && result[1]) {
    res.status(200).json('Link promoted');
  } else {
    res.status(500).json(`Add: ${result[0]}, Delete: ${result[1]}`);
  }
}
