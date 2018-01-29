'use strict'

import promise from 'bluebird';
import pg from 'pg-promise';
import parse from './parseToQuery';
import { addLog } from '../utils/log';

const pgp = pg({
  promiseLib: promise
});

// Comment this when deploy
const connectionString = 'postgres://localhost:5432/link';
const db = pgp(connectionString || process.env.DATABASE_URL);

// All this file will export
export { scanTable, addToTable, updateInTable, delFromTable, countInTable };


                          //  READ  //
async function scanTable({ table, limit, offset, condition }) {
  let result = [];

  // Parse condition to query string
  let notEmpty = condition ? Object.keys(condition).length !== 0 : false;
  let query = notEmpty ? `where ${parse(condition, ' and ')}` : '';

  // Parse limit and offset to set range
  let range = (limit) ? `limit ${limit} offset ${offset || 0}` : '';

  // Await db to respond and return result
  try {
    result = await db.any(`select * from ${table} ${query} ${range}`);
  } catch (e) {
    // ERROR
    addLog({
      code: 'error',
      content: `Model: select * from ${table} ${query} ${range}`,
    });
    result = [];
  }

  return result;
}

                          //  CREATE  //
async function addToTable({ table, data }) {
  // Must have data
  if (!data) return false;
  let result = true;

  // Parse keys and values from data
  let keys = Object.keys(data).join(', ');
  let values = Object.values(data).map(val => `'${val}'`).join(', ');

  // Await db to respond and return result
  try {
    await db.none(`insert into ${table} (${keys}) values (${values})`);
  } catch (e) {
    // ERROR
    addLog({
      code: 'error',
      content:
        `Model: insert into ${table} (${keys}) values (${values})`,
    });
    result = false;
  }

  return result;
}

                          //  UPDATE  //
async function updateInTable({ table, changes, condition }) {
  // Must have changes and condition
  if (!changes || !condition) return false;
  let result = true;

  // Parse changes to format `key='value'`
  let update = parse(changes, ', ');

  // Parse condition
  let query = parse(condition, ' and ');

  // Await db to respond and return result
  try {
    await db.none(`update ${table} set ${update} where ${query}`);
  } catch (e) {
    // ERROR
    addLog({
      code: 'error',
      content:
        `Model: update ${table} set ${update} where ${query}`,
    });
    result = false;
  }

  return result;
}

                          //  REMOVE  //
async function delFromTable({table, condition}) {
  // Must have condition
  if(!condition) return false;
  let result = true;

  // Parse condition
  let query = parse(condition, ' and ');

  // Await db to respond and return result
  try {
    await db.none(`delete from ${table} where ${query}`);
  } catch (e) {
    // ERROR
    addLog({
      code: 'error',
      content: `Model: delete from ${table} where ${query}`,
    });
    result = false;
  }

  return result;
}

                        // COUNT //
async function countInTable({ table, col, condition }) {
  let result;

  // Parse condition to query string
  let notEmpty = condition ? Object.keys(condition).length !== 0 : false;
  let query = notEmpty ? `where ${parse(condition || {}, ' and ')}` : '';

  // Await db to respond and return result
  try {
    result = await db.any(
      `select count(${col || '*'}) from ${table} ${query}`
    );
  } catch (e) {
    // ERROR
    addLog({
      code: 'error',
      content:
        `Model: select count(${col || '*'}) from ${table} ${query}`,
    });
    result = [{ count: -1 }];
  }

  return result;
}
