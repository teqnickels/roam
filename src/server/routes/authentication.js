const router = require('express').Router();
const { register } = require('../../models/db/authentication');
const { hash, checkIfUserExistsInDb, comparePasswords } = require('./helpers')

router.get('/signup', (request, response) => {
  response.render('signup');
});

router.post('/signup', (request, response) => {
  const { first_name: firstName } = request.body;
  const { last_name: lastName } = request.body;
  const { email } = request.body;
  const { password } = request.body;

  return checkIfUserExistsInDb(email)
    .then((results) => {
      if(results) {
        response.render('error', {message: 'This User Already Exists'})
      } else {
        hash(password)
        .then((encryptedPassword) => {
          register(firstName, lastName, email, encryptedPassword)
          .then((result) => {
            response.redirect('/')
          })
        })
      };
    })
  })

router.post('/login', (request, response) => {
  const { email } = request.body
  const { password: passwordAttempt } = request.body

  return checkIfUserExistsInDb(email)
    .then((user) => {
        if(comparePasswords(user.hashedPassword, request.body.password)) {
          response.render('home')
        } else {
          response.render('error', {message: 'Wrong Username or Password'})
        }
      })
    })




router.get('/error', (request, response) => {
  response.render('error', {message: null})
})


module.exports = router;
