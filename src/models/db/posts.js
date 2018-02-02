const {db} = require('./db');

posts = {
  getPostById: (id) => {
    const sql = 'SELECT blog FROM posts WHERE id = $1'
    return db.oneOrNone(sql, [id])
  }
}
module.exports = { posts }