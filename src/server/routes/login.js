const router = require('express').Router();
const passport = require('../middlewares');

// everything here is going to be after localhost:300/login/

router.get('/', (request, response) => {
  response.render('login');
});

router.get('/auth/facebook', passport.authenticate('facebook'));

router.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }), (request, response) => {
  // success
  // response.redirect('/');
  response.json('We made it!');
});


module.exports = router;
