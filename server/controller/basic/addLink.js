import { addToTable } from '../../models/models';

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
    res.status(201).json(`Link added to '${table}'`);
  } else {
    res.status(500).json(`Internal error`);
  }
}
