/**
 * Lottery.js
 *
 * @description ::
 * @docs        ::
 */

module.exports = {

  tableName: 'lottery',

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

    timestamp: {
      type: 'integer',
      columnName: 'date'
    },

    last_update: {
      type: 'date',
      columnName: 'last_update'
    },

    numbers: {
      type: 'integer',
      columnName: 'max_numbers'
    },

    picks: {
      type: 'integer',
      columnName: 'max_picks'
    },

    nbPlayers: {
      columnName: 'nb_players',
      type: 'integer'
    },

    thresholdPlayers: {
      columnName: 'tool_players',
      type: 'integer'
    },

    startTickets: {
      columnName: 'start_tickets',
      type: 'integer'
    },

    theme: {
      type: 'json'
    },

    finalPrice: {
      type: 'float',
      columnName: 'final_price'
    },

    prizes: {
      type: 'array',
      columnName: 'prizes'
    },

    euros: {
      type: 'integer',
      columnName: 'min_price'
    },

    result: {
      type: 'array'
    },

    charity: {
      type: 'float'
    },

    rateToUSD: {
      type: 'float',
      columnName: 'rate_usdto_eur'
    },

    ticketTimer: {
      type: 'integer',
      columnName: 'ticket_timer'
    },

    nbWinners: function () {
      var prizes = this.prizes,
        winners = 0;
      _.forEach(prizes, function (prize) {
        if (Number(prize.share)) {
          winners = winners + Number(prize.winners);
        }
      });
      return winners;
    },

    lucky_ball_number: function () {
      if (!this.result) {
        return null;
      }
      return this.result[5];
    }

  }
};
