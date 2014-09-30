var _ = require('lodash');

var UserService = module.exports = function () {
  return {

    //--------------------------------------------------------------------------

    read: function (uid, next) {

      if (!_.isFunction(next)) {
        throw new Error('User#read Service: the callback function is mandatory');
      }

      if (!_.isString(uid)) {
        throw new Error('User#read Service: the uid param is mandatory and should be a string');
      }

      User
        .findOne({
          uid: uid
        })
        .then(function done(user) {
          next(null, user);
        })
        .fail(function (err) {
          sails.log.error('User#read Service: query fails', err);
          next(err);
        });
    },

    //--------------------------------------------------------------------------

    fetch: function (uid, country, mobileVersion, next) {

      if (!_.isFunction(next)) {
        throw new Error('User#fetch Service: the callback function is mandatory');
      }

      if (!_.isString(uid)) {
        throw new Error('User#fetch Service: the uid param is mandatory and should be a string');
      }

      if (!_.isString(country)) {
        throw new Error('User#fetch Service: the country param is mandatory and should be a string');
      }

      if (!mobileVersion) {
        throw new Error('User#fetch Service: the mobileVersion param is mandatory');
      }

      User
        .findOne({
          uid: uid
        })
        .then(function updateUser(user) {
          user.country = country;
          user.mobileVersion = mobileVersion;
          return user.save();
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
        .then(function notifyMoneyPrizes(user) {
          var Ticket = sails.models.ticket;
          return Ticket
            .find()
            .where({
              player_uid: user.uid,
              status: Ticket.UNSEEN
            })
            .then(function (tickets) {
              tickets.forEach(function (ticket) {
                ticket.status = Ticket.BONUS3;
                ticket.save();
              });
              user.tickets = tickets;
              return user;
            });
        })
        .then(function done(user) {
          next(null, user);
        })
        .fail(function (err) {
          sails.log.error('User#read Service: query fails', err);
          next(err);
        });
    },

    //--------------------------------------------------------------------------

  };

};
