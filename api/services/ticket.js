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
        .limit(35)
        .sort('timestamp DESC')
        .skip(skip)
        .then(function fetchTickets(tickets) {
          tickets = _.sortBy(tickets, 'timestamp').reverse();
          var uids = _.union(_.map(tickets, 'lottery'));
          var lastLottery = uids.pop();
          tickets = _.reject(tickets, {
            'lottery': lastLottery
          });

          return Lottery
            .find()
            .where({
              'uid': uids
            })
            .then(function fetchLinkedLotteries(lotteries) {
              lotteries = _.sortBy(lotteries, 'timestamp').reverse();
              next(null, {
                tickets: tickets,
                lotteries: lotteries
              });
            });
        })
        .fail(function (err) {
          sails.log.error('TicketService #read : query fails', err);
          next(err);
        });

    },

    //--------------------------------------------------------------------------

    create: function (user, numbers, next) {

      if (!_.isFunction(next)) {
        throw new Error('TicketService #create : the callback function is mandatory');
      }

      if (!_.isString(user)) {
        throw new Error('TicketService #create : the user param is mandatory and should be a string');
      }

      if (!_.isArray(numbers)) {
        throw new Error('TicketService #create : the skip param is mandatory and should be a number');
      }

      console.log('create --> ', numbers);
      var Ticket = sails.models.ticket;

      sails.services.public().readGlobals(function (err, globals) {
        if (globals.appStatus.state !== 1) {
          next(null, 'too late');
        }
      });

      // Ticket
      //   .create({
      //     player_uid: user
      //   })
      //   .then(function fetchTickets(tickets) {
      //     tickets = _.sortBy(tickets, 'timestamp').reverse();
      //     var uids = _.union(_.map(tickets, 'lottery'));
      //     var lastLottery = uids.pop();
      //     tickets = _.reject(tickets, {
      //       'lottery': lastLottery
      //     });

      //     return Lottery
      //       .find()
      //       .where({
      //         'uid': uids
      //       })
      //       .then(function fetchLinkedLotteries(lotteries) {
      //         lotteries = _.sortBy(lotteries, 'timestamp').reverse();
      //         next(null, {
      //           tickets: tickets,
      //           lotteries: lotteries
      //         });
      //       });
      //   })
      //   .fail(function (err) {
      //     sails.log.error('TicketService #create : query fails', err);
      //     next(err);
      //   });

    },

    //--------------------------------------------------------------------------
  };
};
