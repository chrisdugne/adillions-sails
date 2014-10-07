var _ = require('lodash'),
  utils = require('../utils.js'),
  Q = require('q');

var UserService = module.exports = function () {

  //----------------------------------------------------------------------------
  // Private tools
  //----------------------------------------------------------------------------

  var fillNetworks = function (user) {
    return Q.fcall(function prepare() {
        user.networks = {};
        return user;
      })
      .then(function checkFacebook(user) {
        user.networks.connectedToFacebook = _.find(user.passports, {
          'provider': 'facebook'
        }) !== undefined;
        return user;
      })
      .then(function checkFan(user) {
        return sails.services.facebook().isFan(user.passports)
          .then(function (isFan) {
            user.networks.isFan = isFan;
            return user;
          });
      });
  };

  //----------------------------------------------------------------------------
  // EXPOSE
  //----------------------------------------------------------------------------

  return {

    read: function (uid) {

      if (!_.isString(uid)) {
        throw new Error('UserService #read : the uid param \
          is mandatory and should be a string');
      }

      return User
        .findOne({
          uid: uid
        })
        .populate('passports')
        .then(function fill(user) {
          return fillNetworks(user);
        })
        .then(function done(user) {
          return user;
        })
        .fail(function (err) {
          sails.log.error('UserService #read : query fails', err);
        });
    },

    //--------------------------------------------------------------------------

    readPassports: function (uid, next) {

      if (!_.isFunction(next)) {
        throw new Error('UserService #readPassports : \
          the callback function is mandatory');
      }

      if (!_.isString(uid)) {
        throw new Error('UserService #readPassports : \
          the uid param is mandatory and should be a string');
      }

      Passport
        .find({
          user: uid
        })
        .then(function done(passports) {
          next(null, passports);
        })
        .fail(function (err) {
          sails.log.error('UserService #readPassports : query fails', err);
          next(err);
        });
    },

    //--------------------------------------------------------------------------

    fetch: function (uid, country, mobileVersion) {

      if (!_.isString(uid)) {
        throw new Error('UserService #fetch: the uid param \
          is mandatory and should be a string');
      }

      if (!_.isString(country)) {
        throw new Error('UserService #fetch: the country param \
          is mandatory and should be a string');
      }

      if (!mobileVersion) {
        throw new Error('UserService #fetch: the mobileVersion param \
          is mandatory');
      }

      var Ticket = sails.models.ticket;

      return User
        .findOne({
          uid: uid
        })
        .then(function updateUser(user) {
          user.country = country;
          user.mobileVersion = mobileVersion;
          return user;
        })
        .then(function findNextDrawing(user) {
          return sails.models.lottery
            .findOne()
            .where({
              timestamp: {
                '>': new Date().getTime()
              }
            })
            .then(function prepareToNewDrawing(lottery) {
              if (lottery.uid !== user.currentLottery) {
                user.currentLottery = lottery.uid;
                user.availableTickets = lottery.startTickets;
                user.playedBonusTickets = 0;
                user.temporaryBonusTickets = 0;

                user.tweet = false;
                user.tweetTheme = false;
                user.postOnFacebook = false;
                user.postThemeOnFacebook = false;
                user.invitedOnFacebook = false;
              }

              return user;
            });
        })
        .then(function getGodChildren(user) {
          return User
            .count()
            .where({
              referrerId: user.sponsorcode
            })
            .then(function (nbGodChildren) {
              user.godChildren = nbGodChildren;
              return user;
            });
        })
        .then(function getLastTicketTime(user) {
          return Ticket
            .findOne()
            .where({
              player_uid: user.uid
            })
            .sort('timestamp DESC')
            .then(function (ticket) {
              user.lastTicketTime = ticket.timestamp;
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
          user.timers = user.idlePoints;

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
              user.idlePoints = 0;

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
            .then(function shareValuesOut(tickets) {
              tickets.forEach(function (ticket) {

                var value = utils.countryPrice(
                  ticket.euros,
                  user.country,
                  ticket.lottery.rateToUSD
                );

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
        .then(function saveChanges(user) {
          user.save();
          return user;
        })
        .then(function addPassports(user) {
          return Passport
            .find({
              user: user.uid
            })
            .then(function (passports) {
              // trick : clone user to get user.passports client-side
              user = _.extend({}, user);
              user.passports = passports;
              return user;
            });
        })
        .then(function fill(user) {
          return fillNetworks(user);
        })
        .then(function done(user) {
          return user;
        })
        .fail(function (err) {
          sails.log.error('UserService#fetch : query fails', err);
        });
    },

    //--------------------------------------------------------------------------

    update: function (uid, newData) {

      if (!_.isString(uid)) {
        throw new Error('UserService #update : the uid param \
          is mandatory and should be a string');
      }

      if (!_.isObject(newData)) {
        throw new Error('UserService #update : the newData param \
          is mandatory');
      }

      return User
        .update({
          uid: uid
        }, newData)
        .then(function done(users) {
          return users[0];
        })
        .fail(function (err) {
          sails.log.error('UserService #update : query fails', err);
        });
    }

  };

};
