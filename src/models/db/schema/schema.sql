DROP DATABASE IF EXISTS roam;
CREATE DATABASE roam;

\c roam

CREATE TABLE users(
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(255) UNIQUE,
  last_name VARCHAR(255),
  email VARCHAR(255) NOT NULL,
  city VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  join_date TIMESTAMP NOT NULL
);

CREATE TABLE cities(
  id SERIAL PRIMARY KEY, 
  name VARCHAR(255) NOT NULL
);

CREATE TABLE posts(
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  blog TEXT NOT NULL,
  city_id INTEGER REFERENCES cities(id),
  user_id INTEGER REFERENCES users(id),
  user_name VARCHAR(255) REFERENCES users(first_name)
);


CREATE TABLE "session" (
  "sid" varchar NOT NULL COLLATE "default",
	"sess" json NOT NULL,
	"expire" timestamp(6) NOT NULL
)

WITH (OIDS=FALSE);
ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;

