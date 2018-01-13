const router = require('express').Router();
const { user } = require('../../models/db/authentication')

router.get('/:user_id/:blog_id', (request, response) => {
  console.log('GETTING THE POSTS')
  const blogId = request.params.blog_id
   user.getPostById(blogId)
    .then((post) => {
      response.render('posts', { post: post })
    })
    .catch(console.error)
});

module.exports = router;
