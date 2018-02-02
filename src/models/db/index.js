const {db} = require('./db');


const cities = {
  city: (id) => {
    const sql = 'SELECT name FROM cities WHERE id = $1'
    return db.one(sql, [id])
  },
  allCities: () => {
    const sql = 'SELECT * FROM cities'
    return db.many(sql)
  },
  postsFromCity: (city_id) => {
    const sql = 'SELECT * FROM posts WHERE city_id = $1'
    return db.manyOrNone(sql, [city_id])
  }
}

module.exports = cities;