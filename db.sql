DROP DATABASE IF EXISTS link;
CREATE DATABASE link;

\c link;

CREATE TABLE Main (
  id SERIAL PRIMARY KEY,
  link TEXT,
  title TEXT,
  tags TEXT,
  added BIGINT,
  doc TEXT,
  rating SMALLINT,
  read VARCHAR,
  edit VARCHAR,
  lastedit BIGINT,
  report TEXT,
  relation TEXT,
  lib TEXT
);

CREATE TABLE Temp (
  id SERIAL PRIMARY KEY,
  link TEXT,
  title TEXT,
  tags TEXT,
  added BIGINT,
  doc TEXT,
  rating SMALLINT,
  read VARCHAR,
  edit VARCHAR,
  lastedit BIGINT,
  report TEXT,
  relation TEXT,
  lib TEXT,
  origin TEXT
);

CREATE TABLE Logs (
  id SERIAL PRIMARY KEY,
  created BIGINT,
  code VARCHAR,
  content TEXT
);

INSERT INTO Main (
  link, title, tags, added, doc, rating, read, edit,
  lastedit, report, relation, lib
) VALUES (
  'link', 'title', 'tags', '1', 'doc', '2', 'read', 'edit',
  '1', 'report', 'relation', 'lib'
);

INSERT INTO Temp (
  link, title, tags, added, doc, rating, read, edit,
  lastedit, report, relation, lib
) VALUES (
  'link', 'title', 'tags', '1518961075570', 'doc', '3', 'read', 'edit',
  '1518961075570', 'report', 'relation', 'lib'
);

INSERT INTO Logs (
  created, code, content
) VALUES (
  '1', 'code', 'content'
);
