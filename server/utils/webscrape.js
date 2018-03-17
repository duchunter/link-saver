'use strict'

import rp from 'request-promise';
import cheerio from 'cheerio';

export default async function (url) {
  let html;
  try {
    html = await rp(url);
  } catch (e) {
    return null;
  }

  // Parse html
  let $ = cheerio.load(html);
  return {
    link: url,
    title: $('title').html(),
  }
}
