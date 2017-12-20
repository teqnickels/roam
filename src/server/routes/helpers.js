const bcrypt = require('bcrypt');
const saltRounds = 10;
const getUserEmail = require('../../models/db/authentication');

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

const checkIfExistsOnLogin = (emailOnLoginAttempt) => {
  return getUserEmail(emailOnLoginAttempt)
    .then((results) => {
      console.log("This is the result", results, results.email)
      if(results.length > 0 ) {
        return true
      } else {
        return false
      }
    })
  }

module.exports = { hash, checkIfExistsOnLogin };
