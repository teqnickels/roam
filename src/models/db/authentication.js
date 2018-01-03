const { db } = require('./db');

const create = `INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING *`;

const getUser = `SELECT * FROM users WHERE email = $1`

const register = (firstName, lastName, email, password ) => {
  console.log([firstName, lastName, email, password].join('\n') )

   return db.oneOrNone(create, [firstName, lastName, email, password])
}

const getUserByEmail = (email) => {
  return db.oneOrNone(getUser, [email])
  .catch(console.error)
}

module.exports = { register, getUserByEmail };
