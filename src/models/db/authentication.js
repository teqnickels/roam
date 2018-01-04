const { db } = require('./db');

const create = `INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING *`;
const getUserWithEmail = `SELECT * FROM users WHERE email = $1`
const getUserWithId = `SELECT * FROM users WHERE email = $1`

const user = {
  register: (firstName, lastName, email, password) => {
    return db.oneOrNone(create, [firstName, lastName, email, password])
  },
  getUserByEmail: (email) => {
    return db.oneOrNone(getUserWithEmail, [email])
  },
  getUserById: (id) => {
    return db.oneOrNone(getUserWithId, [id])
  }
}


// const register = (firstName, lastName, email, password ) => {
//    return db.oneOrNone(create, [firstName, lastName, email, password])
// }

// const getUserByEmail = (email) => {
//   return db.oneOrNone(getUserWithEmail, [email])
//   .catch(console.error)
// }

// module.exports = { register, getUserByEmail };
module.exports = { user }
