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
  console.log('LOGIN ROUTE IS BEING CALLED NOW :::::')
  
  const {email} = request.body;
  const {password: passwordAttempt} = request.body;

  return user
    .getUserByEmail(email)
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

          console.log('**********Just added stuff to the session', request.session.user)

          response.redirect(`/profiles/${thisUser.id}`);
        } else {
          response.render('error', {message: 'Wrong Username or Password'});
        }
      });
    })
    .catch(console.error)
});

router.get('/logout', (request, response) => {
  let session = request.session
  if (request.session.user) {
    session.destroy((err) => {
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
