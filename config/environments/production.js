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
      database: process.env.DATABASE_NAME,
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
  }

};
