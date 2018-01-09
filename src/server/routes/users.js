const router = require('express').Router();
const { user } = require('../../models/db/authentication');
const passport = require('passport');




router.get('/profiles/:id', (request, response) => {
  const { id } = request.params

  return user.getUserById(id)
    .then((result) => {
      console.log('RESULT AT 0 FROM PROMISE',result)

      let collection = [];

      for(let i = 0; i < result.length; i++) {
        let blogPair = {};
        blogPair.id = result[i].id
        blogPair.title = result[i].title
        collection.push(blogPair)
      }
      console.log('COLLECTION', collection)

      response.render('profiles', {
        name: result[0].first_name,
        member_since: result[0].join_date,
        collection: collection
       })
    }).catch(console.error)
})



// titles: [ {id:1, title:'The Learners Guild'},{id: 2, title:'Homeroom'}, {id:3, title:'Buttercup'} ...]
// titles[i].id , titles[i].title


module.exports =router;
