import rp from 'request-promise';
import cheerio from 'cheerio';


const forbidenKeywords = process.env.FORBIDEN_KEYWORDS.split(',')


export default async function (url) {
  let html;
  try {
    html = await rp(url);
  } catch (e) {
    return null;
  }

  // Parse html
  let item = { link: url };
  let $ = cheerio.load(html);
  let simplify = html.trim().toLowerCase();
  let nsfw = forbidenKeywords.reduce((result, item) => {
    return result || simplify.includes(item);
  }, false);

  item.title = $('title').text();
  if (nsfw) item.tags = 'dark';

  return item;
}
