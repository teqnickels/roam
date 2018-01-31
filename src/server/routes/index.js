const router = require('express').Router();
const privacyPolicy = require('./privacy-policy');
const termsOfService = require('./terms-of-service');
const authentication = require('./authentication');
const user = require('./users');
const posts = require('./posts');
const cities = require('../../models/db/home')
const middlewares = require('../middlewares')
const tableCreate = require('../../../')

router.get('/splash', (request, response) => {
  response.render('splash');
});

// router.use(middlewares.restrictToLoggedInUsers)
router.get('/', (request, response) => {
  console.log(request.session.id);
  response.render('home');
});

router.get('/post', (request, response) => {
  response.render('post');
});

router.get('/cities', (request, response) => {
  return cities.allCities()
  .then((cities)=> {
    response.render('cities', { cities: cities })
  })
})


router.get('/cities/:id', (request, response) => {
  const { id } = request.params
  console.log('THIS IS THE CITY ID', id)
  // return cities.city(id)
  // .then((nameOfCity) => {
  //   const cityName = nameOfCity.name;
  // })

  return cities.postsFromCity(id)
  .then((titles)=> {
    console.log(titles)
    response.render('city', { titles: titles}) 
  })
})

router.use('/posts', middlewares.restrictToLoggedInUsers, middlewares.setDefaultResponseLocals);
router.use('/profiles/', middlewares.restrictToLoggedInUsers, middlewares.setDefaultResponseLocals);
router.use('/', authentication);
router.use('/', user );
router.use('/profile', posts);
router.use('/privacy-policy', privacyPolicy);
router.use('/terms-of-service', termsOfService);

module.exports = router;
