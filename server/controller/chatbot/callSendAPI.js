'use strict'

import request from 'request';
import { addLog } from '../../utils/log';

// Sends response messages via the Send API
export default function callSendAPI(sender_psid, response) {
  // Construct the message body
  let request_body = {
    recipient: {
      id: sender_psid
    },

    message: response
  }

  // Send the HTTP request to the Messenger Platform
  request({
    uri: "https://graph.facebook.com/v2.6/me/messages",
    qs: { access_token: process.env.PAGE_ACCESS_TOKEN },
    method: "POST",
    json: request_body
  }, (err, res, body) => {
    if (err || Object.keys(body).some(key => key == 'error')) {
      addLog({
        code: 'error',
        content: 'Failed to send response to fb Messenger',
      });
    }
  });
}
