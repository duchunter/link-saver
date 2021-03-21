import { delFromTable } from '../../models/models';

export default async function (req, res) {
  const { table, id, link } = req.body;
  let isSuccess = await delFromTable({
    table,
    condition: { id }
  });

  if (isSuccess) {
    res.status(200).json('Link removed');
  } else {
    res.status(500).json('Internal error');
  }
}
