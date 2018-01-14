'use strict'

import promise from 'bluebird';
import pg from 'pg-promise';

const pgp = pg({
  promiseLib: promise
});

// Comment this when deploy
const connectionString = 'postgres://localhost:5432/link';
const db = pgp(connectionString || process.env.DATABASE_URL);
