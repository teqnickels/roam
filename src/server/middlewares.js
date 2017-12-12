// add all of your error handlers
// export all of your error handlers in object
const passport = require('passport');
const FacebookStrategy = require('passport-facebook');
require('dotenv').config();

passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_CLIENT_ID, clientSecret: process.env.FACEBOOK_CLIENT_SECRET, callbackURL: 'http://localhost:3000/login/auth/facebook/callback', profileFields: ['id', 'displayName', 'photos', 'email'],
}, ((accessToken, refreshToken, profile, cb) => { user.findOrCreate({ facebookId: profile.id }, (error, user) => cb(error, user)); })));

module.exports = passport;
