'use strict'

import apiai from '../../utils/apiai';
import webscrape from '../../utils/webscrape';
import callSendAPI from './callSendAPI';

// Handles messages events
export default function (sender_psid, received_message) {
  let response;

  // Check if the message contains text
  if (received_message.text) {
    // If contain url, scrape it
    if (
      received_message.nlp
      && received_message.nlp.entities
      && received_message.nlp.entities.url
    ) {
      // Scrape and send msg back
      received_message.nlp.entities.url.forEach(link => {
        webscrape(link.value).then(data => {
          let text = data
            ? `title: ${data.title}`
            : `Err, i can't parse that url`;
          callSendAPI(sender_psid, { text });
        });
      });

    } else {
      // Send msg to Dialogflow and send its response to Messenger
      apiai(received_message.text).then(text => {
        callSendAPI(sender_psid, { text });
      });
    }

  } else if (received_message.attachments) {
    let response = {
      text: 'Nice! But i only answer to text message :v',
    }

    // Sends the response message
    callSendAPI(sender_psid, response);
  }
}
