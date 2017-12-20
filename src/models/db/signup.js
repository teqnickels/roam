const { pgp, db } = require('./db');

const create = 'INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING *';

const register = (firstName, lastName, email, password ) => {
  console.log([firstName, lastName, email, password].join('\n') )
   return db.any(create, [firstName, lastName, email, password])
}

module.exports = register;
