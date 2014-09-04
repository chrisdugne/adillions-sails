/**
 * Models
 * (sails.config.models)
 *
 * Unless you override them, the following properties will be included
 * in each of your models.
 */

module.exports.models = {

  // Your app's default connection.
  // i.e. the name of one of your app's connections (see `config/connections.js`)

  // For production connection: see config/environments/production.js
  // For development connection: see config/environments/development.js
  // Default connection :
  connection: 'localDiskDb',
  migrate: 'safe'
};
