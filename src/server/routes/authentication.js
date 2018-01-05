const router = require('express').Router();
const { user } = require('../../models/db/authentication');
const passport = require('passport');
const { hash, checkIfUserExistsInDb, comparePasswords } = require('./helpers')

router.get('/signup', (request, response) => {
  response.render('signup');
});

router.post('/signup', (request, response) => {

  const { first_name: firstName } = request.body;
  const { last_name: lastName } = request.body;
  const { email } = request.body;
  const { city } = request.body
  const { password } = request.body;

  return checkIfUserExistsInDb(email)
    .then((results) => {
      if(results) {
        console.log('GOT RESULTS, BACK IN ROUTES')
        response.render('error', {message: 'This User Already Exists'})
      } else {
        console.log('BACK IN ROUTES, NO MATCH, WILL CREATE')
        hash(password)
        .then((encryptedPassword) => {
          console.log('ABOUT TO REGISTER USER')
          user.register(firstName, lastName, email, city, encryptedPassword)
          .then((result) => {
            response.redirect('/')
          }).catch(console.error)
        }).catch(console.error)
      };
    })
  })

router.post('/login', (request, response) => {
  const { email } = request.body
  const { password: passwordAttempt } = request.body

  return user.getUserByEmail(email)
    .then((user) => {
      console.log(user)
      const id = user.id
      const firstName = user.first_name
      console.log('this is the users id', id)
      comparePasswords(passwordAttempt, user.password)
        .then((res) => {
          if(res) {
            request.session.id = id
            response.render('profile'
            // {
            //   userFirstName: user.firstName,
            //   userCity : user.city,
            //   userJoinDate: user.joinDate
            // }
          )
          } else {
            response.render('error', { message: 'Wrong Username or Password'})
          }
        }).catch(console.error)
    }).catch(console.error)
})

router.get('/profile', (request, response) => {
  response.render('profile')
})


router.get('/error', (request, response) => {
  response.render('error', {message: null})
})


module.exports = router;
