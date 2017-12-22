const bcrypt = require('bcrypt');
const saltRounds = 10;
const { getUserEmail } = require('../../models/db/authentication');

const hash = (password) => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(saltRounds, (error, salt) => {
      if(error) {
        return reject(error)
      }
      bcrypt.hash(password, salt, (error, hash) => {
        if(error) {
          return reject(error)
        }
        resolve(hash)
      });
    });
  })
}

const checkIfUserExistsInDb = (emailOnLoginAttempt) => {
  return getUserEmail(emailOnLoginAttempt)
    .then((results) => {
      if((results || {}).email == emailOnLoginAttempt) {
          user = {
            email: results.email,
            hashedPassword: results.password
          }
        return user
      } else {
        return false
      }
    })
    .catch(console.error)
  }

const comparePasswords = (passwordFromDb, passwordAttempt) => {
  console.log('COMPARING PASSWORDS', passwordFromDb, passwordAttempt)
  return bcrypt.compare(passwordAttempt, passwordFromDb, (err, res) => {
    if(res) {
      return true
    }
  })
}









module.exports = { hash, checkIfUserExistsInDb, comparePasswords };
