const router = require('express').Router();

router.get('/posts', (request, response) => {
  response.render('posts')
})
module.exports = router;
