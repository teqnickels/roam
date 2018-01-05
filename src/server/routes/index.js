const router = require('express').Router();
const privacyPolicy = require('./privacy-policy')
const termsOfService = require('./terms-of-service')
const authentication = require('./authentication')

router.get('/', (request, response) => {
  response.render('home')
})

router.get('/post', (request, response) => {
  response.render('post')
})

router.use('/', authentication)
router.use('/privacy-policy', privacyPolicy)
router.use('/terms-of-service',termsOfService)

module.exports = router;
