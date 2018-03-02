'use strict'

// Promote or demote link

import { scanTable, addToTable, delFromTable } from '../models/models';
import { addLog } from '../utils/log';

export default async function (req, res) {
  const { promote, id } = req.body;

  // If not promote then demote
  const [oldTable, newTable] = promote ? ['Temp', 'Main'] : ['Main', 'Temp'];

  // Get link from source table based on id
  let linkList = await scanTable({
    table: oldTable,
    condition: { id }
  });

  // Check if scan table fail
  if (linkList.length === 0) {
    res.status(404).json('Link not found');
    return 1;
  }

  // Edit data before add to new table
  if (promote) {
    delete linkList[0].origin;
  }
  else {
    linkList[0].origin = 'demote';
  }

  delete linkList[0].id;

  // Add link to new table and remove from the old one
  let isSuccess = await Promise.all([
    addToTable({
      table: newTable,
      data: linkList[0]
    }),
    delFromTable({
      table: oldTable,
      condition: { id }
    })
  ]);

  // Return message based on linkList
  const action = promote ? 'promote' : 'demote';
  if (isSuccess[0] && isSuccess[1]) {
    addLog({
      code: action,
      content: `${linkList[0].id} - ${linkList[0].link}`,
    });

    res.status(200).json(`Link ${action}d`);
  } else {
    // ERROR
    const status = `Add: ${isSuccess[0]}, Delete: ${isSuccess[1]}`;
    addLog({
      code: 'error',
      content: `${action} link catch an error
      - Status: ${status},
      - Data: ${linkList[0].toString()}`,
    });

    res.status(500).json(status);
  }
}
