const bcrypt = require('bcrypt');
const saltRounds = 10;

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

module.exports = hash;
