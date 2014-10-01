var _ = require('lodash');

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
        .then(function refreshPrizes(user) {
          var Ticket = sails.models.ticket;
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
              return user;
            });
        })
        .then(function refreshBonus(user) {
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
        .then(function roundPrizes(user) {
          user.prizesUSD = parseFloat(user.prizesUSD.toFixed(1));
          user.prizes = parseFloat(user.prizes.toFixed(1));
          return user;
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
