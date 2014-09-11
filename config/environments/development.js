module.exports = {

  log: {
    level: 'verbose'
  },

  connections: {
    Postgresql: {
      adapter: 'sails-postgresql',
      url: 'postgres://oubcukdgrmjfrz:Yepe_9jrgK0yIVuyhpan-JrWH5@ec2-54-228-224-127.eu-west-1.compute.amazonaws.com:5432/d4pq9slihvgnns',
      ssl: true
    }
  },

  models: {
    connection: 'localDiskDb'
  },

  passport: {
    facebook: {
      options: {
        // legacy dev
        clientID: '534196239997712',
        clientSecret: '46383d827867d50ef5d87b66c81f1a8e'
      }
    }
  }

};
