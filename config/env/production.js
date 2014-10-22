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

  analytics: {
    writeKey: 'eDRB4c1S9D',
    readKey: 'HpIr1P1BkGE4LSXSazFElcaGFZpTzd',
    projectId: '7hD3Z0cTnP'
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

  session: {
    adapter: 'redis',
    url: process.env.REDISCLOUD_URL,
    db: 0,
    prefix: 'sess:'
  },

  passport: {
    twitter: {
      options: {
        consumerKey: process.env.TWITTER_CLIENT_ID,
        consumerSecret: process.env.TWITTER_CLIENT_SECRET
      }
    },
    facebook: {
      options: {
        clientID: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET
      }
    },
    google: {
      options: {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET
      }
    }
  },

  api: {
    google: {
      key: 'AIzaSyDy4ANp7E82UTvmb_I2v-24mJZiOZXXLO4',
      version: '3'
    },
    analytics: {
      writeKey: 'eDRB4c1S9D'
    },
    aws: {
      key: '',
      secret: '',
      version: ''
    }
  }

};
