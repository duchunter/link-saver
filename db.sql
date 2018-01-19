DROP DATABASE IF EXISTS link;
CREATE DATABASE link;

\c link;

CREATE TABLE Main (
  id SERIAL PRIMARY KEY,
  link TEXT,
  title TEXT,
  tags TEXT,
  added VARCHAR,
  doc TEXT,
  rating VARCHAR,
  read VARCHAR,
  edit VARCHAR,
  lastedit VARCHAR,
  report TEXT,
  relation TEXT,
  lib TEXT
);

CREATE TABLE Temp (
  id SERIAL PRIMARY KEY,
  link TEXT,
  title TEXT,
  tags TEXT,
  added VARCHAR,
  doc TEXT,
  rating VARCHAR,
  read VARCHAR,
  edit VARCHAR,
  lastedit VARCHAR,
  report TEXT,
  relation TEXT,
  lib TEXT,
  origin TEXT
);

CREATE TABLE Logs (
  id SERIAL PRIMARY KEY,
  created TEXT,
  code VARCHAR,
  content TEXT
);

INSERT INTO Main (
  link, title, tags, added, doc, rating, read, edit,
  lastedit, report, relation, lib
) VALUES (
  'link', 'title', 'tags', 'added', 'doc', 'rating', 'read', 'edit',
  'lastedit', 'report', 'relation', 'lib'
);

INSERT INTO Temp (
  link, title, tags, added, doc, rating, read, edit,
  lastedit, report, relation, lib
) VALUES (
  'link', 'title', 'tags', 'added', 'doc', 'rating', 'read', 'edit',
  'lastedit', 'report', 'relation', 'lib'
);

INSERT INTO Logs (
  created, code, content
) VALUES (
  'created', 'code', 'content'
);

SELECT COUNT(*) FROM Main;
