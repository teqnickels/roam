const { db } = require('./db');

const create = `INSERT INTO users (first_name, last_name, email, city, password, join_date) VALUES ($1, $2, $3, $4, $5, CURRENT_TIMESTAMP) RETURNING *`;
const getUserWithEmail = `SELECT * FROM users WHERE email = $1`
const getUserWithId = `SELECT * FROM users WHERE email = $1`

const user = {
  register: (firstName, lastName, email, city, password) => {
    console.log( 'TRYING TO REG USER')
    return db.oneOrNone(create, [firstName, lastName, email, city, password])
  },
  getUserByEmail: (email) => {
    return db.oneOrNone(getUserWithEmail, [email])
  },
  getUserById: (id) => {
    console.log('CHECKING FOR EMAIL')
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
