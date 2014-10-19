var _ = require('lodash'),
  uuid = require('node-uuid'),
  NB_LOTTERIES_TO_PLAY_TO_BE_REFERRED = 2,
  NB_TIMERS_PER_REFERRING = 2,
  CLASSIC_TICKET = 1;

var TicketService = module.exports = function () {
  return {

    //--------------------------------------------------------------------------

    read: function (user, skip) {

      if (!_.isString(user)) {
        throw new Error('TicketService #read : the user param \
          is mandatory and should be a string');
      }

      if (!_.isNumber(skip)) {
        throw new Error('TicketService #read : the skip param \
          is mandatory and should be a number');
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

          if (tickets.length === 35) {
            var lastLottery = uids.pop();
            tickets = _.reject(tickets, {
              'lottery': lastLottery
            });
          }

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
        throw new Error('TicketService #create : the userUID param \
          is mandatory and should be a string');
      }

      if (!_.isArray(numbers)) {
        throw new Error('TicketService #create : the skip param \
          is mandatory and should be a number');
      }

      var User = sails.models.user;
      var Ticket = sails.models.ticket;
      var Lottery = sails.models.lottery;

      return sails.services.public().readStatus()
        .then(function checkDrawingAvailability(result) {
          if (result.globals.appStatus.state !== 1) {
            throw 'too late';
          }
          return result.nextDrawing;
        })
        .then(function mayIncrementNbPlayers(nextDrawing) {
          return Ticket
            .findOne()
            .where({
              player_uid: userUID
            })
            .sort('timestamp DESC')
            .then(function checkPreviousTicket(ticket) {
              if (!ticket || (ticket.lottery !== nextDrawing.uid)) {
                nextDrawing.nbPlayers += 1;
                nextDrawing.save();
              }
              return;
            });
        })
        .then(function checkGiftToReferrer() {
          return sails.services.user().readSimple(userUID)
            .then(function (user) {
              if (!user.giftToReferrer &&
                user.referrerId &&
                user.referrerId.length > 0) {

                /* !giftToReferrer yet => not than much tickets
                     find all (limit 35 if referrer_id in entered much later)
                     then count nb lotteries */
                return Ticket.find({
                    player_uid: user.uid
                  })
                  .limit(35)
                  .sort('timestamp DESC')
                  .then(function countLotteries(tickets) {
                    var nbLotteries = _.union(_.map(tickets, 'lottery')).length;
                    if (nbLotteries >= NB_LOTTERIES_TO_PLAY_TO_BE_REFERRED) {
                      return User
                        .findOne({
                          sponsorcode: user.referrerId
                        })
                        .then(function giftToReferrer(referrer) {
                          user.giftToReferrer = true;
                          user.idlePoints += NB_TIMERS_PER_REFERRING;
                          referrer.idlePoints += NB_TIMERS_PER_REFERRING;
                          referrer.save();
                          return user;
                        });
                    } else {
                      // not enough lotteries played
                      return user;
                    }
                  });
              } else {
                // no referrer or gift already given
                return user;
              }
            });
        })
        .then(function decreaseStocks(user) {
          if (user.availableTickets > 0) {
            user.availableTickets -= 1;
          } else {
            user.playedBonusTickets += 1;
          }

          if (user.extraTickets > 0) {
            user.extraTickets -= 1;
          }

          user.playedTickets += 1;
          user.save();
          return user;
        })
        .then(function storeTicket(user) {
          return Ticket.create({
            lottery: user.currentLottery,
            user: user.uid,
            uid: uuid.v4(),
            numbers: numbers,
            timestamp: new Date().getTime(),
            type: CLASSIC_TICKET
          });
        })
        .then(function attachLottery(ticket) {
          return Lottery
            .findOne({
              uid: ticket.lottery
            })
            .then(function (lottery) {
              ticket.lottery = lottery;
              return ticket;
            });
        })
        .then(function done(ticket) {
          return ticket;
        });
    }
  };
};
