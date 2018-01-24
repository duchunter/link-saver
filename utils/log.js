'use strict'

import request from 'request-promise';
import { scanTable, addToTable, delFromTable } from '../models/models';

export { addLog, sendLog };

// Log sever info
const domain = 'http://localhost:3001/api/log';
//const domain = 'https://gp-log.herokuapp.com/api/log';

// ADD LOG TO DB
async function addLog({ code, content }) {
  // Created time in format YYYY:MM:DD:HH:MM:SS:MS
  const now = new Date();
  const created = [
    now.getFullYear(),
    now.getMonth() + 1,
    now.getDate(),
    now.getHours(),
    now.getMinutes(),
    now.getSeconds(),
    now.getMilliseconds(),
  ].join(':');

  // Add to log table
  let result = await addToTable({
    table: 'Logs',
    data: { created, code, content }
  });

  /**
   * A terrible problem and may not happen
   * if it happen there are 2 cases
   * - Wrong syntax (meh)
   * - DB is full or error or whatever (oh f*ck)
   */
  if (!result) console.log('Cannot save log!');
}

// SEND ALL LOG TO LOG SERVER
async function sendLog() {
  // Send at YYYY:MM:DD:HH:MM:SS:MS
  const now = new Date();
  const send = [
    now.getFullYear(),
    now.getMonth() + 1,
    now.getDate(),
    now.getHours(),
    now.getMinutes(),
    now.getSeconds(),
    now.getMilliseconds(),
  ].join(':');

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
      code: 'send-log-done',
      content: 'All log sent',
    });

    return true;
  }

  // If request is denied
  addLog({
    code: 'send-log-failed',
    content: `Log response: status ${response.status}, msg: ${response.body.msg}`,
  });

  return false;
}
