var validator = require('validator');
/**
 * Local Authentication Protocol
 *
 * The most widely used way for websites to authenticate users is via a username
 * and/or email as well as a password. This module provides functions both for
 * registering entirely new users, assigning passwords to already registered
 * users and validating login requesting.
 *
 * For more information on local authentication in Passport.js, check out:
 * http://passportjs.org/guide/username-password/
 */

/**
 * Register a new user
 *
 * This method creates a new user from a specified email, username and password
 * and assign the newly created user a local Passport.
 *
 * @param {Object}   req
 * @param {Object}   res
 * @param {Function} next
 */
exports.register = function (req, res, next) {
  var email = req.param('email'),
    username = req.param('username'),
    password = req.param('password');

  if (!email) {
    req.flash('error', 'Error.Passport.Email.Missing');
    return next(new Error('No email was entered.'));
  }

  if (!username) {
    req.flash('error', 'Error.Passport.Username.Missing');
    return next(new Error('No username was entered.'));
  }

  if (!password) {
    req.flash('error', 'Error.Passport.Password.Missing');
    return next(new Error('No password was entered.'));
  }

  User.create({
    username: username,
    email: email
  }, function (err, user) {
    if (err) {
      sails.log.error(err);
      req.flash('error', 'Error.Passport.User.Exists');
      return next(err);
    }

    Passport.create({
      protocol: 'local',
      password: password,
      user: user.uid
    }, function (err, passport) {
      next(err, user);
    });
  });
};

/**
 * Assign local Passport to user
 *
 * This function can be used to assign a local Passport to a user who doens't
 * have one already. This would be the case if the user registered using a
 * third-party service and therefore never set a password.
 *
 * @param {Object}   req
 * @param {Object}   res
 * @param {Function} next
 */
exports.connect = function (req, res, next) {
  var user = req.user,
    password = req.param('password');

  Passport.findOne({
    protocol: 'local',
    user: user.uid
  }, function (err, passport) {
    if (err) {
      return next(err);
    }

    if (!passport) {
      Passport.create({
        protocol: 'local',
        password: password,
        user: user.uid
      }, function (err, passport) {
        next(err, user);
      });
    } else {
      next(null, user);
    }
  });
};

/**
 * Validate a login request
 *
 * Looks up a user using the supplied identifier (email or username) and then
 * attempts to find a local Passport associated with the user. If a Passport is
 * found, its password is checked against the password supplied in the form.
 *
 * @param {Object}   req
 * @param {string}   identifier
 * @param {string}   password
 * @param {Function} next
 */
exports.login = function (req, identifier, password, next) {
  var isEmail = validator.isEmail(identifier),
    query = {};

  if (isEmail) {
    query.email = identifier;
  } else {
    query.username = identifier;
  }

  User.findOne(query, function (err, user) {
    if (err) {
      return next(err);
    }

    if (!user) {
      if (isEmail) {
        req.flash('error', 'Error.Passport.Email.NotFound');
      } else {
        req.flash('error', 'Error.Passport.Username.NotFound');
      }

      return next(null, false);
    }

    Passport.findOne({
      protocol: 'local',
      user: user.uid
    }, function (err, passport) {
      if (passport) {
        passport.validatePassword(password, function (err, res) {
          if (err) {
            return next(err);
          }

          if (!res) {
            req.flash('error', 'Error.Passport.Password.Wrong');
            return next(null, false);
          } else {
            return next(null, user);
          }
        });
      } else {

        if (user.secret) {
          // legacy hash
          var secret = require('crypto').createHash('sha512').update(1409609226940 + 'mcclane54').digest('hex');
          console.log('from: ' + secret, 'to: ce45c638f92e5984525d13b0cf67f50c1e12f4af3af6f2de5b191baf3a438a4821114c7d9ec1a79d50ad0d4610192d85843609dcaf29493d716fa56a7f7860ab');
          req.flash('error', 'todo: handle legacy local login with secret');
          return next(null, false);
        }

        req.flash('error', 'Error.Passport.Password.NotSet');
        return next(null, false);
      }
    });
  });
};
