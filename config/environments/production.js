module.exports = {

  log: {
    level: 'verbose'
  },

  connections: {
    Postgresql: {
      adapter: 'sails-postgresql',
      url: process.env.PG_DATABASE,
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
    github: {
      options: {
        clientID: 'your-consumer-key',
        clientSecret: 'your-consumer-secret'
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
