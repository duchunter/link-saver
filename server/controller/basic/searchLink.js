import { scanTable } from '../../models/models';
import { adjustCondition, getSafeResult } from '../../utils/smartSearch';

export default async function (req, res) {
  let { mode, table, condition, limit } = req.body;
  if (mode == null) mode = 'all';
  adjustCondition(condition);

  // If client want to request all at once
  if (mode === 'all') {
    let result = await scanTable({ condition, table });
    return res.json(getSafeResult(req, result));
  }

  // If client want to request some based on mode value
  if (mode >= 0) {
    let result = await scanTable({
      condition,
      table,
      limit,
      offset: mode * limit
    });

    return res.json(getSafeResult(req, result));
  }

  // Invalid mode
  return res.status(400).json('Invalid mode');
}
