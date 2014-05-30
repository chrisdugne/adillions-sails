/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {
  // user is a reserved keyword in Postgres at heroku.
  // Define a custom table name
  tableName: 'member',

  // Enforce model schema in the case of schemaless databases
  schema: true,

  attributes: {
    username: {
      type: 'string',
      unique: true
    },
    email: {
      type: 'email',
      unique: true
    },
    firstname: {
      type: 'string'
    },
    lastname: {
      type: 'string'
    },
    passports: {
      collection: 'Passport',
      via: 'user'
    },
    fullname: function () {
      return this.firstname + ' ' + this.lastname;
    }
  }
};
