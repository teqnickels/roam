const router = require('express').Router();
const { users }  = require('../../models/db/users');
const bcrypt = require('bcrypt');
const saltRounds = 10;

router.get('/signup', (request, response) => {
  response.render('signup');
});

router.post('/signup', (request, response) => {
  const { first_name: firstName } = request.body;
  const { last_name: lastName } = request.body;
  const { email } = request.body;
  const { city } = request.body;
  const { password } = request.body;

  return checkIfUserExistsInDb(email)
    .then((results) => {
      if (results) {
        response.render('error', { message: 'This User Already Exists' });
      } else {
        hash(password)
          .then((encryptedPassword) => {
            users.register(firstName, lastName, email, city, encryptedPassword);
            response.redirect('/');
          });
      }
    });
});

const hash = password => new Promise((resolve, reject) => {
  bcrypt.genSalt(saltRounds, (error, salt) => {
    if (error) {
      return reject(error);
    }
    bcrypt.hash(password, salt, (error, hash) => {
      if (error) {
        return reject(error);
      }
      resolve(hash);
    });
  });
});

const checkIfUserExistsInDb = (emailOnLoginAttempt) => {
  return auth
    .getUserByEmail(emailOnLoginAttempt)
    .then((results) => {
      if ((results || {}).email == emailOnLoginAttempt) {
        newUser = {
          email: results.email,
          hashedPassword: results.password
        };
        return newUser;
      }
      return false;
    })
    .catch(console.error);
};

function comparePasswords(myPlaintextPassword, hash) {
  return bcrypt.compare(myPlaintextPassword, hash);
};

router.post('/login', (request, response) => {
  const {email} = request.body;
  const {password: passwordAttempt} = request.body;

  return users.getByEmail(email)
    .then((userObject) => {
      const id = userObject.id;
      const firstName = userObject.first_name;
      const lastName = userObject.last_name;
      const email = userObject.email;
      const thisUser = {
        id,
        firstName,
        lastName,
        email
      };

      comparePasswords(passwordAttempt, userObject.password)
      .then((res) => {
        if (res) {
          request.session.user = thisUser;
          response.redirect(`/profiles/${thisUser.id}`);
        } else {
          response.render('error', {message: 'Wrong Username or Password'});
        }
      });
    })
});

router.get('/logout', (request, response) => {
  let session = request.session
  if (request.session.user) {
    session.destroy((err) => {
        response.redirect('/splash')
    })
  } else {
    response.send("You are not logged in.")
  }
})

router.get('/error', (request, response) => {
  response.render('error', { message: null });
});

router.get('/profiles/:id', (request, response) => {
  const id = request.params.id
  return posts
    .joinById(id)
    .then((result) => {
      console.log(result)
      const collection = [];
      for (let i = 0; i < result.length; i++) {
        const blogPair = {};
        blogPair.id = result[i].id;
        blogPair.title = result[i].title;
        collection.push(blogPair);
      }
      response.render('profiles', {
        name: result.first_name,
        member_since: result.join_date,
        collection,
        user_id: result.id
      });
    })
    .catch(console.error)
});

router.get('/profiles/:id/edit-profile/', (request, response) => {
  const id = request.params.id
  const originalObject = {};
  return users
    .getById(id)
    .then((result) => {
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
  users
    .update(request.body)
    .then((result) => {
      request.session.user = result.first_name
      response.json({redirect: `/profiles/${result.id}`})
    }).catch(console.error)
})

router.get('/:user_id/:blog_id', (request, response) => {
  const blogId = request.params.blog_id
  return posts
    .getById(blogId)
    .then((blog) => {
      response.render('blogs', {blog})
    })
    .catch(console.error)
});

module.exports = router;
