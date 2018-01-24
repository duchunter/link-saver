'use strict'

// Promote or demote link

import { scanTable, addToTable, delFromTable } from '../models/models';

export default async function (req, res) {
  const { promote, id } = req.body;

  // If not promote then demote
  const [oldTable, newTable] = promote ? ['Temp', 'Main'] : ['Main', 'Temp'];

  // Get link from source table based on id
  let result = await scanTable({
    table: oldTable,
    condition: { id }
  });

  // Check if scan table fail
  if (result.length === 0) {
    res.status(404).json('Link not found');
    return 1;
  }

  // Edit data before add to new table
  if (promote) {
    delete result[0].origin;
  }
  else {
    result[0].origin = 'demote';
  }

  delete result[0].id;

  // Add link to new table and remove from the old one
  result = await Promise.all([
    addToTable({
      table: newTable,
      data: result[0]
    }),
    delFromTable({
      table: oldTable,
      condition: { id }
    })
  ]);

  // Return message based on result
  if (result[0] && result[1]) {
    res.status(200).json(`Link ${promote ? 'promoted' : 'demoted'}`);
  } else {
    res.status(500).json(`Add: ${result[0]}, Delete: ${result[1]}`);
  }
}
