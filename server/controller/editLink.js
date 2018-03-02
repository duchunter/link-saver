'use strict'

import { updateInTable } from '../models/models';
import { addLog } from '../utils/log';

export default async function (req, res) {
  let { id, table, changes, link } = req.body;

  // Validate changes
  if (!changes || Object.keys(changes) == 0) {
    res.status(400).json('Not enough data');
    return;
  }

  // Accept to change
  changes.lastedit = new Date().getTime();
  let isSuccess = await updateInTable({
    table,
    changes,
    condition: { id }
  });

  if (isSuccess) {
    addLog({
      code: 'edit-link',
      content: `${id} - ${link} - ${Object.keys(changes).join(', ')} to ${Object.values(changes).join(', ')}`,
    });

    res.status(200).json('Link updated');
  } else {
    // ERROR
    addLog({
      code: 'error',
      content: `Edit ${id} - ${link} failed`,
    });

    res.status(500).json('Internal error');
  }
}
