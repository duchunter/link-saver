'use strict'

import { delFromTable } from '../models/models';
import { addLog } from '../utils/log';

export default async function (req, res) {
  const { table, id, link } = req.body;
  let isSuccess = await delFromTable({
    table,
    condition: { id }
  });

  if (isSuccess) {
    addLog({
      code: 'delete',
      content: `${id} - ${link}`,
    });

    res.status(200).json('Link removed');
  } else {
    // ERROR
    addLog({
      code: 'error',
      content: `Delete ${id} - ${link} failed`,
    });
    res.status(500).json('Internal error');
  }
}
