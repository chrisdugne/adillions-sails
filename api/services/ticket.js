var _ = require('lodash');

var TicketService = module.exports = function () {
  return {

    //--------------------------------------------------------------------------

    read: function (user, skip) {

      if (!_.isString(user)) {
        throw new Error('TicketService #read : the user param is mandatory and should be a string');
      }

      if (!_.isNumber(skip)) {
        throw new Error('TicketService #read : the skip param is mandatory and should be a number');
      }

      var Lottery = sails.models.lottery;
      var Ticket = sails.models.ticket;

      return Ticket
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

          return [tickets, uids];
        })
        .spread(function fetchLinkedLotteries(tickets, uids) {
          return Lottery
            .find()
            .where({
              'uid': uids
            })
            .then(function (lotteries) {
              lotteries = _.sortBy(lotteries, 'timestamp').reverse();
              return {
                tickets: tickets,
                lotteries: lotteries
              };
            });
        })
        .fail(function (err) {
          sails.log.error('TicketService #read : query fails', err);
        });

    },

    //--------------------------------------------------------------------------

    create: function (userUID, numbers) {

      if (!_.isString(userUID)) {
        throw new Error('TicketService #create : the userUID param is mandatory and should be a string');
      }

      if (!_.isArray(numbers)) {
        throw new Error('TicketService #create : the skip param is mandatory and should be a number');
      }

      console.log('create --> ', numbers);
      var Ticket = sails.models.ticket;

      return sails.services.public().readStatus()
        .then(function checkDrawingAvailability(result) {
          if (result.globals.appStatus.state !== 1) {
            throw 'too late';
          }
          return result.nextDrawing;
        })
        .then(function incrementNbPlayers(nextDrawing) {
          return Ticket
            .findOne()
            .where({
              player_uid: userUID
            })
            .sort('timestamp DESC')
            .then(function (ticket) {
              if (ticket.lottery !== nextDrawing.uid) {
                nextDrawing.nbPlayers += 1;
                nextDrawing.save();
              }
              return;
            });
        })
        .then(function checkReferring() {
          console.log('--> checkReferring');
          console.log(userUID);
        });
    },

    //--------------------------------------------------------------------------
  };
};
