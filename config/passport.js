/**
 * Passport configuration
 *
 * This if the configuration for your Passport.js setup and it where you'd
 * define the authentication strategies you want your application to employ.
 *
 * I have tested the service with all of the providers listed below - if you
 * come across a provider that for some reason doesn't work, feel free to open
 * an issue on GitHub.
 *
 * Also, authentication scopes can be set through the `scope` property.
 *
 * For more information on the available providers, check out:
 * http://passportjs.org/guide/providers/
 */

module.exports.passport = {

  local: {
    strategy: require('passport-local').Strategy
  },

  bearer: {
    strategy: require('passport-http-bearer').Strategy,
    protocol: 'bearer',
    options: {
      session: false
    }
  },

  twitter: {
    name: 'Twitter',
    protocol: 'oauth',
    strategy: require('passport-twitter').Strategy,
    options: {
      consumerKey: 'mkJn1v9zVyKHnU7S6yLCg',
      consumerSecret: 'wIj7zjxPTwc8Mt2uAyf8azKmSgPEDwYpvpxdtQwic'
    }
  },

  github: {
    name: 'GitHub',
    protocol: 'oauth2',
    strategy: require('passport-github').Strategy,
    options: {
      clientID: 'your-client-id',
      clientSecret: 'your-client-secret'
    }
  },

  facebook: {
    name: 'Facebook',
    protocol: 'oauth2',
    strategy: require('passport-facebook').Strategy,
    scope: ['publish_stream', 'email', 'user_photos', 'user_location', 'user_likes', 'user_birthday', 'friends_birthday', 'publish_actions'],
    options: {
      clientID: '170148346520274',
      clientSecret: '887e8f7abb9b1cb9238a097e06585ae2'
    }
  },

  google: {
    name: 'Google',
    protocol: 'openid',
    strategy: require('passport-google').Strategy
  }

};
