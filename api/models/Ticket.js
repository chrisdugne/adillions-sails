/**
 * Ticket.js
 *
 * @description ::
 * @docs        ::
 */

var Ticket = module.exports = {

  UNSEEN: 0, // set as winning ticket, before notification
  BLOCKED: 1, // set as winning ticket, notification/popup read, cashout blocked (<10)
  PENDING: 2, // cashout requested
  PAYED: 3, // to set manually when paiement is done
  GIFT: 4, // gift to charity

  BONUS1: 11, // rang 7
  BONUS2: 12, // rang 8
  BONUS3: 13, // rang 9
  BONUS4: 14, // rang 10

  VALIDATED_BONUS1: 111, // rang 7 converted
  VALIDATED_BONUS2: 112, // rang 8 converted
  VALIDATED_BONUS3: 113, // rang 9 converted
  VALIDATED_BONUS4: 114, // rang 10 converted

  tableName: 'lottery_ticket',

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

    uid: {
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

    bonus: {
      type: 'json'
    },
    /*
     * One-to-one association
     */
    user: {
      model: 'user',
      columnName: 'player_uid'
    },

    /*
     * One-to-one association
     */
    lottery: {
      model: 'lottery',
      columnName: 'lottery_uid'
    },

    timestamp: {
      type: 'integer',
      columnName: 'creation_date'
    },

    euros: {
      type: 'float',
      columnName: 'price',
      defaultsTo: null
    },

    numbers: {
      type: 'array'
    },

    // public static final int CLASSIC_TICKET         = 1;
    // public static final int INSTANT_TICKET         = 2;
    type: {
      type: 'integer',
      enum: [1, 2]
    },

    status: {
      type: 'integer',
      defaultsTo: null
    }

  }
};
