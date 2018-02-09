const router = require('express').Router();
const privacyPolicy = require('./privacy-policy');
const termsOfService = require('./terms-of-service');
const authentication = require('./authentication');
const user = require('./users');
const posts = require('./profiles');
const cities = require('../../models/db/index')
const middlewares = require('../middlewares')
const tableCreate = require('../../../')
const newPost = require('./newPost')
var https = require('https')
var pem = require('pem')




router.get('/splash', (request, response) => {
  response.render('splash');
});

// router.use(middlewares.restrictToLoggedInUsers)
router.get('/', middlewares.restrictToLoggedInUsers,(request, response) => {
  response.render('index'); 
});

router.post('/getDoctor', middlewares.restrictToLoggedInUsers,(request, response) => {
  const { doctorsName } = request.body
  const url = `https://api.betterdoctor.com/2016-03-01/doctors?name=${doctorsName}&user_key=5bcbebc5fc7a9103ba7d118d22f0ff25`
  pem.createCertificate({ days: 1, selfSigned: true }, function (err, keys) {
    https.get(url, (res) => {
      res.setEncoding('utf8');
      let rawData = '';
      res.on('data', (chunk) => {rawData += chunk});
      res.on('end', () => {
        const parsedData = JSON.parse(rawData, null, 4)
        response.render('searchResults', { list: parsedData })
        });
      })
    })
  })

router.get('/cities', middlewares.restrictToLoggedInUsers,(request, response) => {
  return cities.allCities()
  .then((cities)=> {
    response.render('cities', { cities: cities })
  })
})

router.get('/cities/:id', middlewares.restrictToLoggedInUsers,(request, response) => {
  const { id } = request.params
  return cities.postsFromCity(id)
  .then((blogPosts)=> {
    response.render('city', {blogPosts}) 
  })
})

router.get('/cities/:id/:blog_id', middlewares.restrictToLoggedInUsers, (request, response) => {
  response.send('This is the blog page')
})

// router.use('/posts', middlewares.restrictToLoggedInUsers, middlewares.setDefaultResponseLocals);
router.use('/profiles/', middlewares.restrictToLoggedInUsers, middlewares.setDefaultResponseLocals);
router.use('/', authentication);
router.use('/', user );
router.use('/', newPost);
// router.use('/profile', posts); //FIX THIS SHIT 🙄 /profiles or /posts?
router.use('/privacy-policy', privacyPolicy);
router.use('/terms-of-service', termsOfService);
