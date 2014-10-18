/**
 * MobileSettings.js
 *
 * @description ::
 * @docs        ::
 */

module.exports = {

  tableName: 'mobile_settings',

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

    version: {
      type: 'double',
      columnName: 'version'
    },

    api: {
      type: 'json',
      columnName: 'api'
    },

    facebookAppId: {
      type: 'string',
      columnName: 'facebook_app_id'
    },

    facebookApiSecret: {
      type: 'string',
      columnName: 'facebook_api_secret'
    },

  }

};
