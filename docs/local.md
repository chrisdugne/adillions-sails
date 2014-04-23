## Local

  Add local adaptaters config at : `/config/local.js`

    adapters: {
      'default': 'postgresql',
      postgresql: {
        module: 'sails-postgresql',
        host: 'localhost',
        user: *,
        password: *,
        database: *,
        port: *,
        ssl: false
      }
