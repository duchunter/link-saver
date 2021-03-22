import promise from 'bluebird';
import pg from 'pg-promise';
import read from './methods/read';
import create from './methods/create';
import update from './methods/update';
import remove from './methods/remove';
import count from './methods/count';

const pgp = pg({
  promiseLib: promise
});

const db = pgp({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    ssl: { rejectUnauthorized: false }
});

// READ
export async function scanTable ({ table, limit, offset, condition }) {
  return await read({ db, table, limit, offset, condition });
}

// CREATE
export async function addToTable({ table, data }) {
  return await create({ db, table, data });
}

// UPDATE
export async function updateInTable({ table, changes, condition }) {
  return await update({ db, table, changes, condition });
}

// REMOVE
export async function delFromTable({ table, condition}) {
  return await remove({ db, table, condition });
}

// COUNT
export async function countInTable({ table, col, condition }) {
  return await count({ db, table, col, condition });
}
