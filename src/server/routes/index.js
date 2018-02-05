const router = require('express').Router();
const privacyPolicy = require('./privacy-policy');
const termsOfService = require('./terms-of-service');
const authentication = require('./authentication');
const user = require('./users');
const posts = require('./profiles');
const cities = require('../../models/db/index')
const middlewares = require('../middlewares')
const tableCreate = require('../../../')

router.get('/splash', (request, response) => {
  response.render('splash');
});

router.get('/', middlewares.restrictToLoggedInUsers, (request, response) => {
  response.render('index');
});

router.get('/cities', middlewares.restrictToLoggedInUsers, (request, response) => {
  return cities.allCities()
  .then((cities)=> {
    response.render('cities', { cities: cities })
  })
})

router.get('/cities/:id', middlewares.restrictToLoggedInUsers, (request, response) => {
  const { id } = request.params
  return cities.postsFromCity(id)
  .then((blogPosts)=> {
    response.render('city', {blogPosts}) 
  })
})

router.get('/cities/:id/:blog_id', (request, response) => {
  response.send('This is the blog page')
})

// router.use('/posts', middlewares.restrictToLoggedInUsers, middlewares.setDefaultResponseLocals);
router.use('/profiles/', middlewares.restrictToLoggedInUsers, middlewares.setDefaultResponseLocals);
router.use('/', authentication);
router.use('/', user );
router.use('/profile', posts); //FIX THIS SHIT 🙄 /profiles or /posts?
router.use('/privacy-policy', privacyPolicy);
router.use('/terms-of-service', termsOfService);

module.exports = router;
