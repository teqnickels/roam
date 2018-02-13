const {db} = require('./db');

const users = {
  update: (userUpdates) => {
    updateFields = Object.keys(userUpdates)
    let query = 'UPDATE users SET '
    const fields = []
    updateFields.forEach(field => {
      if (field !== 'id') 
        fields.push(`${field}=\$/${field}/`)
        // ' first_name=$/first_name/'
      })
    query += fields.join(', ')
    query += ' WHERE id=$/id/ RETURNING *'
    return db.one(query, userUpdates)
  },

  getById: (id) => {
    const sql = 'SELECT * FROM users WHERE id=$1'
    return db.oneOrNone(sql, [id])
  }, 

  register : (firstName, lastName, email, city, password) => {
    const sql = 'INSERT INTO users (first_name, last_name, email, city, password, join_date) VALU' +
        'ES ($1, $2, $3, $4, $5, CURRENT_TIMESTAMP) RETURNING *';
    return db.oneOrNone(sql, [firstName, lastName, email, city, password]);
  },

  getByEmail : (email) => {
    const sql = 'SELECT * FROM users WHERE email = $1';
    return db.oneOrNone(sql, [email])
  },

  joinById : (id) => {
    const sql = `
      SELECT posts.title, posts.id, users.id, users.first_name, users.last_name, users.email, users.city, users.join_date
      FROM posts
      RIGHT JOIN users ON users.id=posts.user_id
      WHERE users.id = $1`;
    return db.any(sql, [id]);
  }
}

module.exports = { users }