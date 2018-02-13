const {db} = require('./db');


const cities = {
  city: (id) => {
    const sql = 'SELECT name FROM cities WHERE id = $1'
    return db.one(sql, [id])
  },

  all: () => {
    const sql = 'SELECT * FROM cities'
    return db.many(sql)
  }
}

module.exports = cities;