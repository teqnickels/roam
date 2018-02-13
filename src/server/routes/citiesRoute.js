const router = require('express').Router();
const { posts } = require('../../models/db/posts')
const cities = require('../../models/db/cities')
const middlewares = require('../middlewares')
// const tableCreate = require('../../../')
var https = require('https')
var pem = require('pem')

router.get('/',(request, response) => {
  response.render('index'); 
});

router.get('/splash', (request, response) => {
  response.render('splash');
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

router.get('/cities', (request, response) => {
  return cities.all()
  .then((cities)=> {
    response.render('cities', { cities })
  })
})

router.get('/cities/:id', (request, response) => {
  const { id } = request.params
  return posts.getByCity(id)
  .then((blogPosts)=> {
    response.render('city', { blogPosts }) 
  })
})

router.get('/cities/:id/:blog_id', (request, response) => {
  response.send('This is the blog page')
});

module.exports = router;