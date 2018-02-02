const {db} = require('./db');

const profiles = {
  updateUser: (userUpdates) => {
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

  getSingleUserById: (id) => {
    const sql = 'SELECT * FROM users WHERE id=$1'
    return db.oneOrNone(sql, [id])
  }
}

module.exports = { profiles }