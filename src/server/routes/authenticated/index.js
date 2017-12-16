const router = require('express').Router();
const signup = require('../signup')
const privacyPolicy = require('../privacy-policy')
const termsOfService = require('../terms-of-service')

router.get('/', (request, response) => {
  response.render('home')
})

router.get('/post', (request, response) => {
  response.render('post')
})

router.use('/signup', signup)
router.use('/privacy-policy', privacyPolicy)
router.use('/terms-of-service',termsOfService)
module.exports = router;
