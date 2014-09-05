var uuid = require('node-uuid');

var generate_sponsorCode = function () {
  var code = '',
    aplha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    num = '0123456789';

  for (var i = 0; i < 5; i++) {
    code += aplha.charAt(Math.floor(Math.random() * aplha.length));
  }
  code += num.charAt(Math.floor(Math.random() * num.length));
  return code;
};

/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  tableName: 'player',

  // Set false to prevent creating id. By default id will be created as index with auto increment
  autoPK: false,

  // Set schema true/false to only allow fields defined in attributes to be saved. Only for schemaless adapters.
  schema: true,

  // migrate: 'alter', // adds and/or removes columns on changes to the schema
  // migrate: 'drop', // drops all your tables and then re-creates them. All data is deleted.
  // doesn't do anything on sails lift- for use in production.
  migrate: 'safe',

  attributes: {

    createdAt: {
      type: 'datetime',
      columnName: 'created_at',
      defaultsTo: function () {
        return new Date();
      }
    },
    updatedAt: {
      type: 'datetime',
      columnName: 'updated_at',
      defaultsTo: function () {
        return new Date();
      }
    },

    uid: {
      type: 'string',
      unique: true,
      primaryKey: true
    },

    photo: {
      type: 'string',
      columnName: 'photo_url'
    },

    // legacy date way
    creation_date: 'integer',
    last_update: 'date',

    secret: 'string',
    auth_token: 'string',
    facebook_id: 'integer',
    twitter_id: 'string',
    twitter_name: 'string',

    accept_emails: {
      type: 'boolean',
      defaultsTo: true
    },

    has_tweet: {
      type: 'boolean',
      defaultsTo: false
    },
    has_tweet_theme: {
      type: 'boolean',
      defaultsTo: false
    },
    has_post_on_facebook: {
      type: 'boolean',
      defaultsTo: false
    },
    has_tweet_an_invite: {
      type: 'boolean',
      defaultsTo: false
    },
    has_invited_on_facebook: {
      type: 'boolean',
      defaultsTo: false
    },

    is_twitter_fan: {
      type: 'boolean',
      defaultsTo: false
    },
    is_facebook_fan: {
      type: 'boolean',
      defaultsTo: false
    },

    available_tickets: {
      type: 'integer',
      defaultsTo: 3
    },
    played_bonus_tickets: {
      type: 'integer',
      defaultsTo: 0
    },
    total_played_tickets: {
      type: 'integer',
      defaultsTo: 0
    },
    total_paid_tickets: {
      type: 'integer',
      defaultsTo: 0
    },

    current_lottery_uid: {
      type: 'string',
      defaultsTo: '-'
    },

    current_points: {
      type: 'integer',
      defaultsTo: 0
    },
    total_points: {
      type: 'integer',
      defaultsTo: 0
    },
    idle_points: {
      type: 'integer',
      defaultsTo: 0
    },

    status: {
      type: 'integer',
      defaultsTo: 1
    },

    username: {
      type: 'string',
      columnName: 'user_name'
    },

    email: {
      type: 'email'
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
      type: 'string',
      defaultsTo: 'US'
    },

    lang: {
      type: 'string',
      defaultsTo: 'en'
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

    referrer_id: {
      type: 'string',
      columnName: 'referrer_id'
    },

    /*
     * One-to-Many association
     */

    tickets: {
      collection: 'ticket',
      via: 'user'
    },

    passport: {
      model: 'Passport'
    },

    /*
     * Methods
     */

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
    }

  },

  beforeCreate: function (user, next) {
    // Handle legacy date
    user.creation_date = new Date().getTime();
    user.last_update = new Date();
    // generate sponsor code
    user.sponsorcode = generate_sponsorCode();
    // generare uid
    user.uid = uuid.v4();
    next(null, user);
  },

  beforeUpdate: function (user, next) {
    // Handle legacy date
    user.last_update = new Date();
    next(null, user);
  }
};
