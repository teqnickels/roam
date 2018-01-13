const router = require('express').Router();
const { user } = require('../../models/db/authentication');

router.get('/profiles/:id', (request, response) => {
  const id = request.params.id
  return user.getUserById(id)
    .then((result) => {
      const collection = [];
      for (let i = 0; i < result.length; i++) {
        const blogPair = {};
        blogPair.id = result[i].id;
        blogPair.title = result[i].title;
        collection.push(blogPair);
      }
      response.render('profiles', {
        name: result[0].first_name,
        member_since: result[0].join_date,
        collection,
        user_id: result[0].id,
      });
    }).catch(console.error);
});

router.get('/profiles/edit-profile/:id', (request, response) => { 
  const id = request.params.id
  return user
    .getUserById(id)
    .then((result) => {
      console.log('FROM THE EDIT PROFILE ROUTE', result[0])
      response.render('edit-profile', {
        first_name: result[0].first_name,
        last_name: result[0].last_name,
        email: result[0].email,
        member_since: result[0].join_date,
        user_id: result[0].id, 
        city: result[0].city
      })
    }).catch(console.error)
});

module.exports = router;
