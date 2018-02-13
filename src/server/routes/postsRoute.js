const router = require('express').Router();

router.get('/newPost', (request, response) => {
  response.render('new-post')
})

router.post('/search-business', (request, response) => {
  console.log('HITTING SEARCH ROUTE')
  const { searchTerm } = request.body
  const { city } = request.body
    
})

module.exports = router; 