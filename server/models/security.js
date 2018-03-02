'use strict'

// Special code
let transform = {};
transform['//'] = `'`;
transform['/?'] = '"'
transform['|<'] = '(';
transform['|>'] = ')';

// Replace sql character to prevent sql injection
export function noInjection(str) {
  return Object.keys(transform).reduce((final, key) => {
    return final.split(transform[key]).join(key);
  }, str);
}

// Parse character back to normal
export function normalizeStr(str) {
  return Object.keys(transform).reduce((final, key) => {
    return final.split(key).join(transform[key]);
  }, str);
}
