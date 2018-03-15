'use strict'

import apiai from '../../utils/apiai';
import callSendAPI from './callSendAPI';

// Handles messages events
export default function (sender_psid, received_message) {
  let response;

  // Check if the message contains text
  if (received_message.text) {
    // Send msg
    apiai(received_message.text).then(text => {
      callSendAPI(sender_psid, { text });
    });

  } else if (received_message.attachments) {
    let response = {
      text: 'Nice! But i only answer to text message :v',
    }

    // Sends the response message
    callSendAPI(sender_psid, response);
  }
}
