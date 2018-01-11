const router = require('express').Router();
const { user } = require('../../models/db/authentication');
const passport = require('passport');

//DO NOT RENDER UNLESS THERE IS AN AUTHENTICATED USER
router.get('/profiles/:id', (request, response) => {
  const { id } = request.params

  return user.getUserById(id)
    .then((result) => {
      let collection = [];
      for(let i = 0; i < result.length; i++) {
        let blogPair = {};
        blogPair.id = result[i].id
        blogPair.title = result[i].title
        collection.push(blogPair)
      }
      response.render('profiles', {
        name: result[0].first_name,
        member_since: result[0].join_date,
        collection: collection,
        user_id: result[0].id
       })
    }).catch(console.error)
})



module.exports =router;