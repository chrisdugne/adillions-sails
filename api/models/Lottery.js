/**
 * Lottery.js
 *
 * @description ::
 * @docs        ::
 */

module.exports = {

  tableName: 'lottery',

  // Set false to prevent creating id. By default id will be created as index with auto increment
  autoPK: false,

  // Set schema true/false to only allow fields defined in attributes to be saved. Only for schemaless adapters.
  schema: true,

  // migrate: 'alter', // adds and/or removes columns on changes to the schema
  // migrate: 'drop', // drops all your tables and then re-creates them. All data is deleted.
  // doesn't do anything on sails lift- for use in production.
  migrate: 'safe',

  attributes: {

    uid: {
      type: 'string',
      unique: true
    },

    timestamp: {
      type: 'int',
      columnName: 'date'
    },

    last_update: {
      type: 'date',
      columnName: 'last_update'
    },

    numbers: {
      type: 'int',
      columnName: 'max_numbers'
    },

    theme: {
      type: 'json'
    },

    price: {
      count: {
        type: 'float',
        columnName: 'final_price'
      },
      result: {
        type: 'json',
        columnName: 'prizes'
      },
      min: {
        type: 'int',
        columnName: 'min_price'
      },
      mac: {
        type: 'int',
        columnName: 'max_price'
      }
    },

    result: {
      type: 'array'
    },

    charity: {
      type: 'float'
    }

  }
};
