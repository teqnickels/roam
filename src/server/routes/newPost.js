const router = require('express').Router();

router.get('/newPost', (request, response) => {
  response.render('new-post')
})

router.post('/search-business', (request, response) => {
  console.log('HITTING SEARCH ROUTE')
  const { searchTerm } = request.body
  const { city } = request.body

var options = {
  consumer_key: 'consumer-key',
  consumer_secret: 'consumer-secret',
  token: 'token',
  token_secret: 'token-secret'
};
  yelp.search('term=LaPenca&location=Alameda')
    .then(function(result)  {
      console.log(result)
      // res.json(result);
    });
    
})

module.exports = router; 