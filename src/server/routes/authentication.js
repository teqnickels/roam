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

// router.get('/login', (request, response) => {
//   response.render( 'splash', {sessionId : null})
// })

router.post('/login', (request, response) => {
  console.log('HITTING LOGIN ROUTE')
  const { email } = request.body;
  const { password: passwordAttempt } = request.body;

  return user.getUserByEmail(email)
    .then((result) => {

      console.log('RESULT AFTER GETUSERBYEMAIL()', result)

      const id = result.id;
      const firstName = result.first_name;

      comparePasswords(passwordAttempt, result.password)
        .then((res) => {
          if (res) {
            request.session.name = firstName;

            console.log('Just added stuff to the session', request.session.name)
            console.log('SESSION ID', request.session.id);

            response.redirect(`/profiles/${id}`);
          } else {
            response.render('error', { message: 'Wrong Username or Password' });
          }
        });
    }).catch(console.error)
});

router.get('/logout', (request, response) => {
  console.log('HITTING LOGOUT ROUTE')
  // console.log('Here the session go:', request.session)
  let session = request.session
  if (request.session.name) {
    session
      .destroy((err) => {
        response.redirect('/splash')
        // console.log('THE SESSION WILL BE DESTROYED NOW:', request.session.first_name)
    })
  } else {
    response.send("You are not logged in.")
  }
})

router.get('/error', (request, response) => {
  response.render('error', { message: null });
});


module.exports = router;
