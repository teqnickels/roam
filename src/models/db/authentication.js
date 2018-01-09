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
    const sql = `
    SELECT posts.title, posts.id, users.first_name, users.join_date
    FROM posts
    RIGHT JOIN users ON users.id=posts.user_id
    WHERE users.id = $1`
    return db.any(sql, [id])
  },
}


module.exports = { user }
