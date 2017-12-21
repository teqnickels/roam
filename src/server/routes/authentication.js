const router = require('express').Router();
const register = require('../../models/db/authentication');
const { hash, checkIfExistsOnLogin } = require('./helpers')

router.get('/signup', (request, response) => {
  response.render('signup');
});

router.post('/signup', (request, response) => {
  const { first_name: firstName } = request.body;
  const { last_name: lastName } = request.body;
  const { email } = request.body;
  const { password } = request.body;

  checkIfExistsOnLogin(email)
    .then((result) => {
      if(result ==true) {
        response.render('error', {message: 'This User Already Exists'})
      }
  })
  hash(password)
    .then((encryptedPassword) => {
     register(firstName, lastName, email, encryptedPassword)
      .then((result) => {
        console.log("PASSWORD ENCRYPTED:::=>",encryptedPassword)
        response.redirect('/')
      })
  })
});

router.post('/login', (request, response) => {
  const { email } = request.body
  console.log("This is the email entered:", email)
  checkIfExistsOnLogin(email)
  .then((result) => {
    if(result) {
      response.redirect('/')
    }else{
      console.log('USER DOES NOT EXIST')
      //SHOW EMAIL OR PASSWORD WRONG MSG
    }

  })
})

router.get('/error', (request, response) => {
  response.render('error', {message: null})
})


module.exports = router;
