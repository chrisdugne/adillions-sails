/**
 * Global.js
 *
 * @description ::
 * @docs        ::
 */

module.exports = {

  tableName: 'global',

  // Set false to prevent creating id. By default id will be created as index with auto increment
  autoPK: false,

  // Set schema true/false to only allow fields defined in attributes to be saved. Only for schemaless adapters.
  schema: true,

  // migrate: 'alter', // adds and/or removes columns on changes to the schema
  // migrate: 'drop', // drops all your tables and then re-creates them. All data is deleted.
  // doesn't do anything on sails lift- for use in production.
  migrate: 'safe',

  attributes: {

    id: {
      type: 'string',
      unique: true,
      primaryKey: true
    },

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

    // --------------------------------------------------------------------------

    tweet: {
      type: 'json',
      columnName: 'tweet'
    },

    tweetShare: {
      type: 'json',
      columnName: 'tweet_share'
    },

    tweetTheme: {
      type: 'json',
      columnName: 'tweet_theme'
    },

    // --------------------------------------------------------------------------

    fbPost: {
      type: 'json',
      columnName: 'fb_post'
    },

    fbPostTheme: {
      type: 'json',
      columnName: 'fb_post_theme'
    },

    // --------------------------------------------------------------------------

    banners: {
      type: 'json',
      columnName: 'banners'
    },

    // --------------------------------------------------------------------------

    sms: {
      type: 'json',
      columnName: 'sms'
    },

    email: {
      type: 'json',
      columnName: 'email'
    },

    text48h: {
      type: 'json',
      columnName: 'text48h'
    },

    text3min: {
      type: 'json',
      columnName: 'text3min'
    },

    lastUpdatedPrizes: {
      type: 'json',
      columnName: 'last_updated_prizes'
    },

    // --------------------------------------------------------------------------

    appStatus: {
      type: 'json',
      columnName: 'app_status'
    },

    minMoney: {
      type: 'json',
      columnName: 'min_money'
    },

    // --------------------------------------------------------------------------

    currentLotteryFromPrice: {
      type: 'integer',
      columnName: 'current_lottery_from_price'
    },

    currentLotteryToPrice: {
      type: 'integer',
      columnName: 'current_lottery_to_price'
    },

    versionRequired: {
      type: 'double',
      columnName: 'version_required'
    }
  }

};
