const router = require('express').Router();
const { auth }  = require('../../models/db/authentication');
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
            auth.register(firstName, lastName, email, city, encryptedPassword);
            response.redirect('/');
          });
      }
    });
});

router.post('/login', (request, response) => {  
  const {email} = request.body;
  const {password: passwordAttempt} = request.body;

  return auth.getUserByEmail(email)
    .then((userObject) => {
      const id = userObject.id;
      const firstName = userObject.first_name;
      const lastName = userObject.last_name;
      const email = userObject.email;
      const thisUser = {
        id,
        firstName,
        lastName,
        email
      };

      comparePasswords(passwordAttempt, userObject.password).then((res) => {
        if (res) {
          request.session.user = thisUser;
          response.redirect(`/profiles/${thisUser.id}`);
        } else {
          response.render('error', {message: 'Wrong Username or Password'});
        }
      });
    })
});

router.get('/logout', (request, response) => {
  let session = request.session
  if (request.session.user) {
    session.destroy((err) => {
        response.redirect('/splash')
    })
  } else {
    response.send("You are not logged in.")
  }
})

router.get('/error', (request, response) => {
  response.render('error', { message: null });
});


module.exports = router;
