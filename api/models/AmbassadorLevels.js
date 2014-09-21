/**
 * @description ::
 * @docs        ::
 */

module.exports = {

  tableName: 'ambassador_levels',

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

    reach: {
      type: 'integer',
      columnName: 'reach'
    },

    level: {
      type: 'integer',
      columnName: 'level'
    },

    bonus: {
      type: 'integer',
      columnName: 'bonus'
    },

    names: {
      type: 'json',
      columnName: 'names'
    }

  }

};
