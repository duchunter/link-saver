'use strict'

import { countInTable } from '../models/models';

export default async function (req, res) {
  const item = req.params.item;
  switch (item) {
    case 'totalMain':
        res.json(await countInTable({ table: 'Main', condition: { id: { logic: '>', value: '0'}} }));
        break;

        // TODO: finish this :v

    default:

  }
}
