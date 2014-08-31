/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  tableName: 'player',

  autoCreatedAt: false,
  autoUpdatedAt: false,

  // Set false to prevent creating id. By default id will be created as index with auto increment
  autoPK: false,

  // Set schema true/false to only allow fields defined in attributes to be saved. Only for schemaless adapters.
  schema: true,

  // migrate: 'alter', // adds and/or removes columns on changes to the schema
  // migrate: 'drop', // drops all your tables and then re-creates them. All data is deleted.
  // doesn't do anything on sails lift- for use in production.
  migrate: 'safe',

  attributes: {

    // new date way
    // createdAt: {
    //   type: 'datetime',
    //   defaultsTo: function (){ return new Date(); }
    // },
    // updatedAt: {
    //   type: 'datetime',
    //   defaultsTo: function (){ return new Date(); }
    // },

    // legacy date way
    creation_date: {
      type: 'integer',
      columnName: 'creation_date'
    },

    last_update: {
      type: 'date',
      columnName: 'last_update'
    },

    uid: {
      type: 'string',
      unique: true,
      primaryKey: true
    },

    username: {
      type: 'string',
      columnName: 'user_name'
    },

    email: {
      type: 'email',
      unique: true
    },

    firstname: {
      type: 'string',
      columnName: 'first_name'
    },

    lastname: {
      type: 'string',
      columnName: 'last_name'
    },

    birthdate: {
      type: 'string', //1984-08-22 (should be DATE)
      columnName: 'birth_date'
    },

    country: {
      type: 'string'
    },

    lang: {
      type: 'string'
    },

    /*
     * One-to-Many association
     */
    tickets: {
      collection: 'ticket',
      via: 'user'
    },

    playedtickets: {
      type: 'integer',
      columnName: 'total_played_tickets',
      defaultsTo: 0
    },

    nbavailabletickets: {
      type: 'integer',
      columnName: 'available_tickets',
      defaultsTo: 8
    },

    sponsorcode: {
      type: 'string',
      columnName: 'sponsor_code'
    },

    passports: {
      collection: 'Passport',
      via: 'user'
    },
    fullname: function () {
      return this.firstname + ' ' + this.lastname;
    },
    charity_status: function () {
      var status = [{
        tickets: 1,
        rang: 1
      }, {
        tickets: 50,
        rang: 2
      }, {
        tickets: 100,
        rang: 3
      }, {
        tickets: 200,
        rang: 4
      }, {
        tickets: 500,
        rang: 5
      }];
      return status;
    },
    beforeCreate: function (user, next) {
      // Handle legacy date
      user.creation_date = new Date().getTime();
      user.last_update = new Date();
      next(null);
    }
  }
};
