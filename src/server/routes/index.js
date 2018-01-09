const router = require('express').Router();
const privacyPolicy = require('./privacy-policy')
const termsOfService = require('./terms-of-service')
const authentication = require('./authentication')
const user = require('./users')
const posts = require('./posts')

router.get('/', (request, response) => {
  response.render('home')
})

router.get('/post', (request, response) => {
  response.render('post')
})

router.use('/', authentication)
router.use('/', user)
router.use('/profile', posts)
router.use('/privacy-policy', privacyPolicy)
router.use('/terms-of-service',termsOfService)

module.exports = router;
