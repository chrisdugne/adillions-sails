/**
 * Ticket.js
 *
 * @description ::
 * @docs        ::
 */

module.exports = {

  tableName: 'lottery_ticket',

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
      type: 'int',
      columnName: 'creation_date'
    },

    euros: {
      type: 'float',
      columnName: 'price'
    },

    numbers: {
      type: 'array'
    },

    // public static final int CLASSIC_TICKET         = 1;
    // public static final int INSTANT_TICKET         = 2;
    type: {
      type: 'int',
      emun: [1, 2]
    },

    // public static final int unseen      = 0; // set as winning ticket, before notification
    // public static final int blocked     = 1; // set as winning ticket, notification/popup read, cashout blocked (<10)
    // public static final int pending     = 2; // cashout requested
    // public static final int payed       = 3; // to set manually when paiement is done
    // public static final int gift        = 4; // gift to charity
    status: {
      type: 'int',
      emun: [0, 1, 2, 3, 4]
    }

  }
};
