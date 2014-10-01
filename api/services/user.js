var _ = require('lodash'),
  utils = require('../utils.js');

var UserService = module.exports = function () {
  return {

    //--------------------------------------------------------------------------

    read: function (uid, next) {

      if (!_.isFunction(next)) {
        throw new Error('UserService #read : the callback function is mandatory');
      }

      if (!_.isString(uid)) {
        throw new Error('UserService #read : the uid param is mandatory and should be a string');
      }

      User
        .findOne({
          uid: uid
        })
        .then(function done(user) {
          next(null, user);
        })
        .fail(function (err) {
          sails.log.error('UserService #read : query fails', err);
          next(err);
        });
    },

    //--------------------------------------------------------------------------

    fetch: function (uid, country, mobileVersion, next) {

      if (!_.isFunction(next)) {
        throw new Error('UserService #fetch: the callback function is mandatory');
      }

      if (!_.isString(uid)) {
        throw new Error('UserService #fetch: the uid param is mandatory and should be a string');
      }

      if (!_.isString(country)) {
        throw new Error('UserService #fetch: the country param is mandatory and should be a string');
      }

      if (!mobileVersion) {
        throw new Error('UserService #fetch: the mobileVersion param is mandatory');
      }

      var Ticket = sails.models.ticket;

      User
        .findOne({
          uid: uid
        })
        .then(function updateUser(user) {
          user.country = country;
          user.mobileVersion = mobileVersion;
          user.save();
          return user;
        })
        .then(function getGodChildren(user) {
          return User
            .count()
            .where({
              referrer_id: user.sponsorcode
            })
            .then(function (nbGodChildren) {
              user.godChildren = nbGodChildren;
              return user;
            });
        })
        .then(function refreshNewPrizes(user) {
          user.prizes = 0;
          user.prizesUSD = 0;

          return Ticket
            .find()
            .populate('lottery')
            .where({
              player_uid: user.uid,
              status: Ticket.UNSEEN
            })
            .then(function (tickets) {
              tickets.forEach(function (ticket) {
                ticket.status = Ticket.BLOCKED;
                ticket.save();
                user.prizes += ticket.euros;
                user.prizesUSD += ticket.euros * ticket.lottery.rateToUSD;
              });

              user.prizesUSD = parseFloat(user.prizesUSD.toFixed(1));
              user.prizes = parseFloat(user.prizes.toFixed(1));
              return user;
            });
        })
        .then(function refreshNewBonus(user) {
          var Ticket = sails.models.ticket;
          user.stocks = 0;
          user.timers = 0;

          return Ticket
            .find()
            .where({
              player_uid: user.uid,
              status: [
                Ticket.BONUS1,
                Ticket.BONUS2,
                Ticket.BONUS3,
                Ticket.BONUS4
              ]
            })
            .then(function (tickets) {
              tickets.forEach(function (ticket) {
                var now = new Date().getTime();
                ticket.status = ticket.status + 100;
                ticket.save();

                user.timers += parseInt(ticket.bonus.instants);

                if (now < ticket.bonus.maxTime) {
                  user.stocks += parseInt(ticket.bonus.stocks);
                }
              });

              user.extraTickets += user.timers;
              user.temporaryBonusTickets += user.stocks;
              user.save();

              return user;
            });
        })
        .then(function setNotifications(user) {
          user.notifications = {
            instants: user.timers,
            stocks: user.stocks,
            prizes: user.prizes,
            prizesUSD: user.prizesUSD
          };
          return user;
        })
        .then(function sumWinnings(user) {
          user.totalWinnings = 0;
          user.balance = 0;
          user.totalGift = 0;
          user.pendingWinnings = 0;
          user.receivedWinnings = 0;

          return Ticket
            .find()
            .populate('lottery')
            .where({
              player_uid: user.uid,
              euros: {
                '>': 0
              }
            })
            .then(function (tickets) {
              tickets.forEach(function (ticket) {

                var value = utils.countryPrice(ticket.euros, user.country, ticket.lottery.rateToUSD);

                switch (ticket.status) {
                case Ticket.BLOCKED:
                  user.balance += value;
                  break;
                case Ticket.PENDING:
                  user.pendingWinnings += value;
                  break;
                case Ticket.GIFT:
                  user.totalGift += value;
                  break;
                default:
                  user.receivedWinnings += value;
                  break;
                }
              });

              return user;
            });

        })
        .then(function done(user) {
          next(null, user);
        })
        .fail(function (err) {
          sails.log.error('UserService#fetch : query fails', err);
          next(err);
        });
    },

    //--------------------------------------------------------------------------

  };

};
