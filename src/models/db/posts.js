const {db} = require('./db');

posts = {
  getById: (id) => {
    const sql = 'SELECT blog FROM posts WHERE id = $1'
    return db.oneOrNone(sql, [id])
  },
  
  joinById : (id) => {
    const sql = `SELECT posts.title, posts.blog, users.first_name, users.last_name
      FROM posts
      RIGHT JOIN users ON users.id=posts.user_id
      WHERE posts.id = $1`;
    return db.oneOrNone(sql, [id]);
  },

  getByCity : (city_id) => {
    const sql = 'SELECT * FROM posts WHERE city_id = $1'
    return db.manyOrNone(sql, [city_id])
  }
}
module.exports = { posts }