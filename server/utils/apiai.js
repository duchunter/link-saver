import { v1 as uuidv1 } from 'uuid';
import apiai from 'apiai-promise';


const clientAccessKey = process.env.APIAI_CLIENT_ACCESS_KEY
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
