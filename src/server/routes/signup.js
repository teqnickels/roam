const router = require('express').Router();
const register = require('../../models/db/signup');
// const bodyParser = require('body-parser');
const hash = require('./helpers')

router.get('/', (request, response) => {
  response.render('signup');
});

router.post('/', (request, response) => {
  const { first_name: firstName } = request.body;
  const { last_name: lastName } = request.body;
  const { email } = request.body; // CHECK IF ALREADY EXIST
  const { password } = request.body;// HASH AND STORE

  console.log('USERS INFO IS:', firstName, lastName, email, password)

//ADD HASH FUNCTION FOR PASSWORD
  hash(password)
    .then((encryptedPassword) => {

       register(firstName, lastName, email, encryptedPassword)
        .then((result) => {
          console.log('lil bobby walker :: ==>')
          response.redirect('/')
        })
        // .catch(response.json);
        .catch(console.error)
    })


});

module.exports = router;
