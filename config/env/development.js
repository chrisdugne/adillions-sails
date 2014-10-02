/**
 * Development environment settings
 *
 * This file can include shared settings for a development team,
 * such as API keys or remote database passwords.  If you're using
 * a version control solution for your Sails app, this file will
 * be committed to your repository unless you add it to your .gitignore
 * file.  If your repository will be publicly viewable, don't add
 * any private information to this file!
 *
 */

module.exports = {

  /***************************************************************************
   * Set the default database connection for models in the development       *
   * environment (see config/connections.js and config/models.js )           *
   ***************************************************************************/

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
    connection: 'Postgresql'
  },

  passport: {
    facebook: {
      options: {
        clientID: '534196239997712',
        clientSecret: '46383d827867d50ef5d87b66c81f1a8e'
      }
    },
    google: {
      options: {
        clientID: '15010835152-22296lnffj5b7rlq1r53qg284moc7adu.apps.googleusercontent.com',
        clientSecret: '3VcdTUPkpbsdHWYZKaDOcQzP'
      }
    }
  },

  api: {
    google: {
      key: '',
      version: '3'
    },
    aws: {
      key: '',
      secret: '',
      version: ''
    }
  }

};
