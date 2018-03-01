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
    data: {
      created,
      code,
      content: content
    }
  });

  // Error
  if (!isSuccess) console.log('Cannot save log!');
}

// SEND ALL LOG TO LOG SERVER
async function sendLog() {
  // Get all log and send api
  const allLogs = await scanTable({ table: 'Logs' });
  let result = null;
  try {
    result = await request({
      method: 'PUT',
      uri: domain,
      body: {
        name: 'Link saver',
        package: allLogs,
      },

      json: true,
      resolveWithFullResponse: true
    });
  } catch (err) {
    result = err;
  }

  // If sending api request failed
  if (!result.statusCode) {
    addLog({
      code: 'error',
      content: 'Failed to send api request to log server',
    });

    return false;
  }

  // If ok, delete all logs
  if (result.statusCode == 201) {
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
      `Log response with status: ${result.statusCode} - msg: ${result.response.body}`,
  });

  return false;
}
