const { pgp, db } = require('./db');

const create = 'INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING *';

const getPassword = `SELECT password FROM users WHERE email = $1`

const getUser = `SELECT email FROM users WHERE email = $1`

const register = (firstName, lastName, email, password ) => {
  console.log([firstName, lastName, email, password].join('\n') )
   return db.any(create, [firstName, lastName, email, password])
}

const getUserEmail = (email) => {
  console.log("CHECKING DATABASE FOR USER EMAIL")
  return db.one(getUser, [email])
}

module.exports = { register, getUserEmail };
