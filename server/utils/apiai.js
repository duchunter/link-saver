import uuidv1 from 'uuid/v1';
import apiai from 'apiai-promise';
import clientAccessKey from './apiaiConfig';

const bot = apiai(clientAccessKey);

export default async function (text) {
  let res;
  try {
    res = await bot.textRequest(text, {
      sessionId: uuidv1()
    });
  } catch (e) {
    return `Err, i don't understand that`;
  }

  return res.result.fulfillment.speech;
}
