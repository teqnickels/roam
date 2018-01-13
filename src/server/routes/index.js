const router = require('express').Router();
const privacyPolicy = require('./privacy-policy');
const termsOfService = require('./terms-of-service');
const authentication = require('./authentication');
const user = require('./users');
const posts = require('./posts');
const middlewares = require('../middlewares')

router.get('/splash', (request, response) => {
  response.render('splash');
  console.log('IS THERE A SESSION? ', request.session.name)
});


router.get('/', (request, response) => {
  console.log(request.session.id);
  response.render('home');
});

router.get('/post', (request, response) => {
  response.render('post');
});

router.use('/posts', middlewares.restrictToLoggedInUsers, middlewares.setDefaultResponseLocals);
router.use('/profiles/', middlewares.restrictToLoggedInUsers, middlewares.setDefaultResponseLocals);
router.use('/', authentication);
router.use('/', user);
router.use('/profile', posts);
router.use('/privacy-policy', privacyPolicy);
router.use('/terms-of-service', termsOfService);

module.exports = router;
