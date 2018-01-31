const {db} = require('./db');

//get all posts titles and id's by city
//get all posts by city 
//get all posts in every city
//get any posts from whatever cities requested (For profile edits)

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
    const sql = 'SELECT id, title FROM posts WHERE city_id = $1'
    return db.manyOrNone(sql, [city_id])
  } 
}

module.exports = cities;