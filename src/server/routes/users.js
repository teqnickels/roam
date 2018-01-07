const router = require('express').Router();
const { user } = require('../../models/db/authentication');
const passport = require('passport');

//================ NOTES =======================
//  - IF REQ.SESSION.ID OR COOKIE ALLOW, OTHERWISE,      REDIR TO LOGIN VIEW
// - Add hello msg to profiles with ejs if statement
//
//
//==============================================


router.get('/profiles/:id', (request, response) => {
  const { id } = request.params
  return user.getUserById(id)
    .then((result) => {
      response.render('profiles', {
        name: result.first_name,
        member_since: result.join_date

       })
    })
})

module.exports =router;
