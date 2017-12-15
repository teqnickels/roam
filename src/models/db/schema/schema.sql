DROP TABLE IF EXISTS roam;

CREATE TABLE users(
  id serial,
  email VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  access_token VARCHAR(255)
);
