'use strict'

import { addToTable } from '../../models/models';
import { addLog } from '../../utils/log';

export default async function (req, res) {
  let { direct, data } = req.body;

  // Validate data
  if (!data || Object.keys(data) == 0) {
    res.status(400).json('Not enough data');
    return;
  }

  // Accept to add link
  data.added = new Date().getTime();
  const table = direct ? 'Main' : 'Temp';
  let isSuccess = await addToTable({ table, data });
  if (isSuccess) {
    addLog({
      code: 'add-link',
      content: data.link,
    });

    res.status(201).json(`Link added to '${table}'`);
  } else {
    // ERROR
    addLog({
      code: 'error',
      content: `Add ${data.link} failed`,
    });

    res.status(500).json(`Internal error`);
  }
}
