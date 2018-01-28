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
  const now = new Date();
  changes.lastedit = now.getTime();
  let isSuccess = await updateInTable({
    table,
    changes,
    condition: { id }
  });

  if (isSuccess) {
    addLog({
      code: 'edit-link',
      content: `${id} - ${link}`,
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
