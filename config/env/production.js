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

var prods_env = {
  'prod': {
    passport: {
      facebook: {
        options: {
          clientID: '170148346520274',
          clientSecret: '887e8f7abb9b1cb9238a097e06585ae2'
        }
      }
    }
  },
  'stage': {
    passport: {
      facebook: {
        options: {
          clientID: '293490820852692',
          clientSecret: '1ec4fb849a52132737e0402ee007a978'
        }
      }
    }
  },
  'dev': {
    passport: {
      facebook: {
        options: {
          clientID: '293490260852748',
          clientSecret: '734afab21e3dcab63d7faf0e757187bc'
        }
      }
    }
  }
};

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
    facebook: prods_env[process.env.APP_NAME || 'prod'].passport.facebook,
    google: {
      options: {
        clientID: '78678402894-mchcph0itjhbkd727qdm4d8f7epbcatv.apps.googleusercontent.com',
        clientSecret: 'Ob0ZMAXEPkVJ6cdUSmH3-V5i'
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
