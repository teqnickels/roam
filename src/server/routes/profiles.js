const router = require('express').Router();
const { user } = require('../../models/db/authentication')
const { posts } = require('../../models/db/posts')


router.get('/:user_id/:blog_id', (request, response) => {
  const blogId = request.params.blog_id
  return posts.getPostById(blogId)
    .then((blog) => {
      response.render('blogs', {blog: blog})
    })
    .catch(console.error)
});

module.exports = router;
