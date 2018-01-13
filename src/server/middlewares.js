
const errorHandler = (error, request, response, next) => {
  response
    .status(500)
    .send('Something bad happened. This page should be nicer looking');
};

const logErrors = (error, request, response, next) => {
  console.error(error.stack)
  next(error);
};

const notFoundHandler = (request, response) => {
  response
    .status(404)
    .render('common/not_found')
};

const setDefaultResponseLocals = (request, response, next) => {
  if (request.session.name) {
    response.locals.session = true 
    response.locals.moment = require('moment')
  } else {
    response.locals.session = false
  }
  next()
};

const restrictToLoggedInUsers = (request, response, next) => {

  // console.log(request.session)
  
  let session = request.session  
  if (request.session.name) {
    next();
  } else {
    response.redirect('/splash');
  }
}

module.exports = {
  errorHandler,
  logErrors,
  notFoundHandler,
  setDefaultResponseLocals,
  restrictToLoggedInUsers
};