const router = require('express').Router();


router.get('/', (request, response) => {
  response.render('signup')
})

module.exports = router;
