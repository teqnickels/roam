DROP TABLE IF EXISTS roam;

CREATE TABLE users(
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  first_name VARCHAR(255),
  last_name VARCHAR(255),
  password VARCHAR(50),
  address VARCHAR(100),
  city VARCHAR(50),
  state VARCHAR(2),
  zip INTEGER
);

CREATE TABLE posts(
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  blog TEXT NOT NULL,
  user_id INTEGER REFERENCES users(id)
);

/*
  USERS CAN SEARCH BY STATE, CITY, PLACES, EVENTS
*/

CREATE TABLE geolocations(
  id SERIAL PRIMARY KEY,
  city VARCHAR(50) NOT NULL,
  state VARCHAR(50) NOT NULL,
  post_id INTEGER REFERENCES posts(id)
);

CREATE TABLE places(
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  address VARCHAR(255),
  city VARCHAR(255) NOT NULL,
  state VARCHAR(255) NOT NULL,
  rating INTEGER,
  costs INTEGER
);

CREATE TABLE events(
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  address VARCHAR(255),
  city VARCHAR(255) NOT NULL,
  state VARCHAR(255) NOT NULL,
  rating INTEGER,
  costs INTEGER
);

/*
Consider places and events and geolocations for many to many relations
*/
