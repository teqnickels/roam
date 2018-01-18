const { db } = require('./db');

const user = {
  register: (firstName, lastName, email, city, password) => {
    const sql = 'INSERT INTO users (first_name, last_name, email, city, password, join_date) VALUES ($1, $2, $3, $4, $5, CURRENT_TIMESTAMP) RETURNING *';
    return db.oneOrNone(sql, [firstName, lastName, email, city, password]);
  },
  getUserByEmail: (email) => {
    const sql = 'SELECT * FROM users WHERE email = $1';
    return db.oneOrNone(sql, [email]).catch(console.error);
  },
  //change this to getAllUserPostsByUserId
  getUserById: (id) => {
    const sql = `
    SELECT posts.title, posts.id, users.id, users.first_name, users.last_name, users.email, users.city, users.join_date
    FROM posts
    RIGHT JOIN users ON users.id=posts.user_id
    WHERE users.id = $1`;
    return db.any(sql, [id]);
  },
  //change this to getSinglePostById
  getPostById: (id) => {
    const sql = `SELECT posts.title, posts.blog, users.first_name, users.last_name
    FROM posts
    RIGHT JOIN users ON users.id=posts.user_id
    WHERE posts.id = $1`;
    return db.oneOrNone(sql, [id]);
  },
};

const profiles = { 
  updateUser: (firstName, lastName, email, city, id) => {
    const sql = 'UPDATE users SET first_name=$1, last_name=$2, email=$3, city=$4 WHERE id=$5'
    return db.none(sql, [firstName, lastName, email, city, id])
  }, 
  getSingleUserById: (id) => {
    const sql = 'SELECT * FROM users WHERE id=$1'
    return db.oneOrNone(sql, [id])
  }
}

module.exports = { user, profiles };
