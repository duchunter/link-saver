'use strict'

import promise from 'bluebird';
import pg from 'pg-promise';

const pgp = pg({
  promiseLib: promise
});

// Comment this when deploy
const connectionString = 'postgres://localhost:5432/link';
const db = pgp(connectionString || process.env.DATABASE_URL);

// Parse condition 'where' or 'set' to query
const parse = function parseToQuery(condition, connector) {
  return Object.keys(condition).map((key) => {
    // For comparision like > <
    if (typeof(condition[key] === 'object')) {
      let { logic, value } = condition[key];
      return `${key}${logic}${value}`;
    }

    // Common =
    return `${key}='${condition[key]}'`;
  }).join(connector);
}

// All this file will export
export { scanTable, addToTable, updateInTable, delFromTable, countInTable };

                          //  READ  //
async function scanTable({ table, limit, offset = 0, condition = {} }) {
  let result = [];

  // Parse condition to query string
  let notEmpty = Object.keys(condition).length !== 0;
  let query = notEmpty ? `where ${parse(condition, ' and ')}` : '';

  // Parse limit and offset to set range
  let range = (limit) ? `limit ${limit} offset ${offset}` : '';

  // Await db to respond and return result
  try {
    result = await db.any(`select * from ${table} ${query} ${range}`);
  } catch (e) {
    console.log(e);
    result = [];
  }

  return result;
}

                          //  CREATE  //
async function addToTable({ table, data }) {
  let result = true;

  // Parse keys and values from data
  let keys = Object.keys(data).join(', ');
  let values = Object.values(data).map(val => `'${val}'`).join(', ');

  // Await db to respond and return result
  try {
    await db.none(`insert into ${table} (${keys}) values (${values})`);
  } catch (e) {
    console.log(e);
    result = false;
  }

  return result;
}

                          //  UPDATE  //
async function updateInTable({ table, changes, condition }) {
  let result = true;

  // Parse changes to format `key='value'`
  let update = parse(changes, ', ');

  // Parse condition
  let query = parse(condition, ' and ');

  // Await db to respond and return result
  try {
    await db.none(`update ${table} set ${update} where ${query}`);
  } catch (e) {
    console.log(e);
    result = false;
  }

  return result;
}

                          //  REMOVE  //
async function delFromTable({table, condition}) {
  let result = true;

  // Parse condition
  let query = parse(condition, ' and ');

  // Await db to respond and return result
  try {
    await db.none(`delete from ${table} where ${query}`);
  } catch (e) {
    console.log(e);
    result = false;
  }

  return result;
}

                        // COUNT //
async function countInTable({ table, col = '*', condition = {} }) {
  let result;

  // Parse condition to query string
  let notEmpty = Object.keys(condition).length !== 0;
  let query = notEmpty ? `where ${parse(condition, ' and ')}` : '';

  // Await db to respond and return result
  try {
    result = await db.any(`select count(${col}) from ${table} ${query}`);
  } catch (e) {
    console.log(e);
    result = { count: -1 };
  }

  return result;
}
