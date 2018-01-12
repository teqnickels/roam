const router = require('express').Router();
const { user } = require('../../models/db/authentication');
const { hash, checkIfUserExistsInDb, comparePasswords } = require('./helpers');

router.get('/signup', (request, response) => {
  response.render('signup');
});

router.post('/signup', (request, response) => {
  const { first_name: firstName } = request.body;
  const { last_name: lastName } = request.body;
  const { email } = request.body;
  const { city } = request.body;
  const { password } = request.body;

  return checkIfUserExistsInDb(email)
    .then((results) => {
      if (results) {
        response.render('error', { message: 'This User Already Exists' });
      } else {
        hash(password)
          .then((encryptedPassword) => {
            user.register(firstName, lastName, email, city, encryptedPassword);
            response.redirect('/');
          });
      }
    });
});

router.post('/login', (request, response) => {
  const { email } = request.body;
  const { password: passwordAttempt } = request.body;

  return user.getUserByEmail(email)
    .then((result) => {
      console.log(result)
      const { id } = result;
      // const { firstName } = result.first_name;
      comparePasswords(passwordAttempt, result.password)
        .then((res) => {
          console.log(res)
          // if (res) {
          //   request.session.id = id;
          // console.log('SESSION ID', request.session.id);
          response.redirect(`/profiles/${id}`);
          // } else {
          //   response.render('error', { message: 'Wrong Username or Password' });
          // }
        });
    }).catch(console.error)
});

router.get('/error', (request, response) => {
  response.render('error', { message: null });
});


module.exports = router;
