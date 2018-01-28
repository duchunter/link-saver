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
  rating VARCHAR,
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
  rating VARCHAR,
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
  'link', 'title', 'tags', '1', 'doc', 'rating', 'read', 'edit',
  '1', 'report', 'relation', 'lib'
);

INSERT INTO Temp (
  link, title, tags, added, doc, rating, read, edit,
  lastedit, report, relation, lib
) VALUES (
  'link', 'title', 'tags', '1', 'doc', 'rating', 'read', 'edit',
  '1', 'report', 'relation', 'lib'
);

INSERT INTO Logs (
  created, code, content
) VALUES (
  '1', 'code', 'content'
);

SELECT COUNT(*) FROM Main;
