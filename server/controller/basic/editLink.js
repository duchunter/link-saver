import { updateInTable } from '../../models/models';

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
    res.status(200).json('Link updated');
  } else {
    res.status(500).json('Internal error');
  }
}
