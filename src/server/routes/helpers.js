const bcrypt = require('bcrypt');

const saltRounds = 10;
const { auth } = require('../../models/db/authentication');

const hash = password => new Promise((resolve, reject) => {
  bcrypt.genSalt(saltRounds, (error, salt) => {
    if (error) {
      return reject(error);
    }
    bcrypt.hash(password, salt, (error, hash) => {
      if (error) {
        return reject(error);
      }
      resolve(hash);
    });
  });
});

const checkIfUserExistsInDb = (emailOnLoginAttempt) => {
  return auth.getUserByEmail(emailOnLoginAttempt)
    .then((results) => {
      if ((results || {}).email == emailOnLoginAttempt) {
        newUser = {
          email: results.email,
          hashedPassword: results.password,
        };
        return newUser;
      }
      return false;
    })
    .catch(console.error);
};

function comparePasswords(myPlaintextPassword, hash) {
  return bcrypt.compare(myPlaintextPassword, hash);
}


module.exports = { hash, checkIfUserExistsInDb, comparePasswords };
