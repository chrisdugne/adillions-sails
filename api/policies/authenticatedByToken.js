/**
 * tokenAuth
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any authenticated user
 *                 Assumes that your login action in one of your controllers sets `req.session.authenticated = true;`
 * @docs        :: http://sailsjs.org/#!documentation/policies
 *
 */

var passport = require('passport'),
  BearerStrategy = require('passport-http-bearer').Strategy;

module.exports = function (req, res, next) {

  // Load authentication strategies
  passport.use(new BearerStrategy({},
    function (token, done) {
      User.findOne({
        auth_token: token
      }, function (err, user) {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false);
        }
        return done(null, user);
      });
    }
  ));

  passport.authenticate('bearer', {
    session: false
  })(req, res, next);

};
