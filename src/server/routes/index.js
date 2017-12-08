const router = require('express').Router();

router.get('/', (request, response) => {
  response.render('splash');
});

module.exports = router;
