import parse from '../parseToQuery';
import { addLog } from '../../utils/log';

export default async function ({ db, table, limit, offset, condition }) {
  let result = [];

  // Parse condition to query string
  let notEmpty = condition ? Object.keys(condition).length !== 0 : false;
  let query = notEmpty ? `where ${parse(condition, ' and ')}` : '';

  // Parse limit and offset to set range
  let range = (limit) ? `limit ${limit} offset ${offset || 0}` : '';

  // Await db to respond and return result
  try {
    result = await db.any(`select * from ${table} ${query} ${range}`);
  } catch (e) {
    // ERROR
    addLog({
      code: 'error',
      content: `Model: select * from ${table} ${query} ${range}`,
    });
    result = [];
  }

  return result;
}
