const router = require('express').Router();
const signUp = require('../../models/db/signup')
const bodyParser = require('body-parser')

router.get('/', (request, response) => {
  response.render('signup')
})

router.post('/', (request, response) => {
    var email = request.body.email;
    var password = request.body.password;
    response.json('DONE')
});
module.exports = router;
