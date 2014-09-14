/**
 * Production environment settings
 *
 * This file can include shared settings for a production environment,
 * such as API keys or remote database passwords.  If you're using
 * a version control solution for your Sails app, this file will
 * be committed to your repository unless you add it to your .gitignore
 * file.  If your repository will be publicly viewable, don't add
 * any private information to this file!
 *
 */

module.exports = {

  log: {
    level: 'verbose'
  },

  connections: {
    Postgresql: {
      adapter: 'sails-postgresql',
      url: process.env.DATABASE_URL,
      ssl: true
    }
  },

  models: {
    connection: 'Postgresql'
  },

  passport: {
    twitter: {
      options: {
        consumerKey: 'mkJn1v9zVyKHnU7S6yLCg',
        consumerSecret: 'wIj7zjxPTwc8Mt2uAyf8azKmSgPEDwYpvpxdtQwic'
      }
    },
    facebook: {
      options: {
        clientID: '170148346520274',
        clientSecret: '887e8f7abb9b1cb9238a097e06585ae2'
      }
    }
  },

  api: {
    google: {
      key: 'AIzaSyDy4ANp7E82UTvmb_I2v-24mJZiOZXXLO4',
      version: '3'
    },
    aws: {
      key: '',
      secret: '',
      version: ''
    }
  }

};
