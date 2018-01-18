const router = require('express').Router();
const { user, profiles } = require('../../models/db/authentication');


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

router.get('/profiles/:id/edit-profile/', (request, response) => {
  const id = request.params.id
  const originalObject = {};
  return profiles.getSingleUserById(id) 
    .then((result) => {
      // const orginalUserProfile = { first_name:result.first_name, last_name:result.last_name, email:result.email, city:result.city, user_id:result.id}
      response.render('edit-profile', { 
        first_name: result.first_name,
        last_name: result.last_name,
        email: result.email,
        member_since: result.join_date,
        user_id: result.id, 
        city: result.city
      })
    }).catch(console.error)
});

router.put('/save-updated-profile', (request, response) => {
  const { firstName, lastName, email, city, id } = request.body
  try {
    return profiles.updateUser(firstName, lastName, email, city, id)
      .then((result)=> {  
        request.session.user = { firstName, lastName, email, city, id }
        response.json({redirect:`/profiles/${id}`})
    })
  } catch(error) {
    response.send( {error: 'Error, unable to save'} )
  }
})
  

module.exports = router;
