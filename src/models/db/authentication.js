const { db } = require('./db');

const user = {
  register: (firstName, lastName, email, city, password) => {
    const sql = `INSERT INTO users (first_name, last_name, email, city, password, join_date) VALUES ($1, $2, $3, $4, $5, CURRENT_TIMESTAMP) RETURNING *`;
    return db.oneOrNone(sql, [firstName, lastName, email, city, password])
  },
  getUserByEmail: (email) => {
    const sql = `SELECT * FROM users WHERE email = $1`
    return db.oneOrNone(sql, [email])
  },
  getUserById: (id) => {
    const sql = `SELECT first_name, last_name, email, city, join_date FROM users WHERE id = $1`
    return db.oneOrNone(sql, [id])
  },

}


module.exports = { user }
