const router = require('express').Router();
const register = require('../../models/db/login');
const { hash, checkIfExistsOnLogin } = require('./helpers')

router.post('/', (request, response) => {
  const { email } = request.body
  console.log("This is the email entered:", email)

  if(checkIfExistsOnLogin(email)==true) {
    response.redirect('/')
  }else{
    console.log('USER DOES NOT EXIST')
    //SHOW EMAIL OR PASSWORD WRONG MSG
  }
})


module.exports = router;
