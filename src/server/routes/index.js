const router = require('express').Router();
const loginRoutes = require('./login');

router.get('/', (request, response) => {
  response.render('splash');
});

// router.get('/login', (request, response) => {
//   response.render('login');
// });
router.use('/login', loginRoutes);
module.exports = router;
