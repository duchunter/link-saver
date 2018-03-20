'use strict'

import apiai from '../../utils/apiai';
import webscrape from '../../utils/webscrape';
import callSendAPI from './callSendAPI';
import { addToTable, scanTable } from '../../models/models';
import { addLog } from '../../utils/log';

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
          if (!data) {
            callSendAPI(sender_psid, {
              text: `Err, i can't scrape this url`,
            });
          } else {
            // Add link to DB
            data.added = new Date().getTime();
            data.origin = 'chatbot';
            addToTable({
              data,
              table: 'Temp',
            }).then(isSuccess => {
              if (isSuccess) {
                addLog({
                  code: 'add-link',
                  content: data.link,
                });

                callSendAPI(sender_psid, {
                  text: `${data.title} added`,
                });
              } else {
                // ERROR
                addLog({
                  code: 'error',
                  content: `Add ${data.link} failed`,
                });
                callSendAPI(sender_psid, {
                  text: `Internal error`,
                });
              }
            });
          }
        });
      });

    //If contain 'reading list'
    } else if (received_message.text.toLowerCase().includes('reading list')) {
      scanTable({
        table: 'Temp',
        limit: 5,
      }).then(data => {
        if (data.length == 0) {
          callSendAPI(sender_psid, {
            text: 'Temp table is empty',
          });
        } else {
          data.forEach(item => {
            callSendAPI(sender_psid, {
              text: item.link,
            });
          });
        }
      });

    // Normal text
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
