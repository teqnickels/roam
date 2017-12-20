const { db } = require('./db');

const getPassword = `SELECT password FROM users WHERE email = $1`

const getUser = `SELECT email FROM users WHERE email = $1`

const getUserEmail = (email) => {
  console.log("CHECKING DATABASE FOR USER EMAIL")
  return db.one(getUser, [email])
}

module.exports = getUserEmail;
