var _ = require('lodash');

var TicketService = module.exports = function () {
  return {

    //--------------------------------------------------------------------------

    read: function (user, skip, next) {

      if (!_.isFunction(next)) {
        throw new Error('TicketService #read : the callback function is mandatory');
      }

      if (!_.isString(user)) {
        throw new Error('TicketService #read : the user param is mandatory and should be a string');
      }

      if (!_.isNumber(skip)) {
        throw new Error('TicketService #read : the skip param is mandatory and should be a number');
      }

      var Lottery = sails.models.lottery;
      var Ticket = sails.models.ticket;

      Ticket
        .find({
          player_uid: user
        })
        .limit(100)
        .skip(skip)
        .then(function fetch(tickets) {
          var uids = _.union(_.map(tickets, 'lottery'));
          return Lottery
            .find()
            .where({
              'uid': uids
            })
            .then(function done(lotteries) {
              var themes = _.map(lotteries, 'uid');
              next(null, {
                tickets: [],
                themes: themes
              });
            });
        })
        .fail(function (err) {
          sails.log.error('TicketService #read : query fails', err);
          next(err);
        });

    },

    //--------------------------------------------------------------------------
  };
};
