module.exports = {

  log: {
    level: 'verbose'
  },

  connections: {
    Postgresql: {
      adapter: 'sails-postgresql',
      url: process.env.DATABASE_URL,
      host: process.env.DATABASE_HOST,
      port: process.env.DATABASE_PORT,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME
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
        consumerKey: 'your-consumer-key',
        consumerSecret: 'your-consumer-secret'
      }
    },
    facebook: {
      options: {
        consumerKey: '170148346520274',
        consumerSecret: '887e8f7abb9b1cb9238a097e06585ae2'
      }
    },
    google: {
      options: {
        consumerKey: 'your-consumer-key',
        consumerSecret: 'your-consumer-secret'
      }
    }
  }

};
