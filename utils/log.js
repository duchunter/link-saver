'use strict'

import request from 'request-promise';
import { scanTable, addToTable, delFromTable } from '../models/models';

export { addLog, sendLog };

// Log sever info
const domain = 'http://localhost:3001/api/log';
//const domain = 'https://gp-log.herokuapp.com/api/log';

// ADD LOG TO DB
async function addLog({ code, content }) {
  // Created time in millisecond
  const created = new Date().getTime();

  // Add to log table
  let isSuccess = await addToTable({
    table: 'Logs',
    data: { created, code, content }
  });

  /**
   * A terrible problem and may not happen
   * if it happen there are 2 cases
   * - Wrong syntax (meh)
   * - DB is full or error or whatever (oh f*ck)
   */
  if (!isSuccess) console.log('Cannot save log!');
}

// SEND ALL LOG TO LOG SERVER
async function sendLog() {
  // Send at millisecond
  const send = new Date().getTime();

  // Get all log and send api
  const allLogs = await scanTable({ table: 'Logs' });
  let response;
  try {
    response = await request.put(domain, {
      send,
      name: 'Link saver',
      data: allLogs,
    });
  } catch (e) {
    response = false;
  }

  // If sending api request failed
  if (!response) {
    addLog({
      code: 'error',
      content: 'Failed to send api request to log server',
    });

    return false;
  }

  // If ok, delete all logs
  if (response.statusCode === 201) {
    allLogs.forEach(item => delFromTable({
      table: 'Logs',
      condition: { id: item.id },
    }));

    addLog({
      code: 'send-log',
      content: 'All log sent',
    });

    return true;
  }

  // If request is denied
  addLog({
    code: 'error',
    content:
      `Log response: status ${response.status}, msg: ${response.body.msg}`,
  });

  return false;
}