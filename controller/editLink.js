'use strict'

import { updateInTable } from '../models/models';
import { addLog } from '../utils/log';

export default async function (req, res) {
  const { id, table, changes, link } = req.body;
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
