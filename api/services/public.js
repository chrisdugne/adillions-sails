var _ = require('lodash'),
  Q = require('q');

var PublicService = module.exports = function () {
  return {

    //--------------------------------------------------------------------------

    readGlobals: function (next) {
      return Q.fcall(function () {
        return sails.models.globals
          .findOne()
          .where({
            id: 'current'
          })
          .fail(function (err) {
            sails.log.error('PublicService#readGlobals : query fails', err);
            throw err;
          });
      }).nodeify(next);
    },

    //--------------------------------------------------------------------------

    readArchivedLotteries: function (limit, next) {
      return Q.fcall(function () {
        // wrapper the error into a promise, to bubble it
        if (!_.isNumber(limit)) {
          throw new Error('PublicService#readArchivedLotteries : the limit param is mandatory and should be a number');
        }
        return sails.models.lottery
          .find()
          .where({
            result: {
              '!': null
            }
          })
          .limit(limit)
          .sort('timestamp DESC')
          .then(function (lotteries) {
            _.forEach(lotteries, function (lottery) {
              lottery.nbWinners = lottery.nbWinners();
            });
            return lotteries;
          })
          .fail(function (err) {
            sails.log.error('PublicService#readArchivedLotteries : query fails', err);
            throw err;
          });
      }).nodeify(next);
    },

    //--------------------------------------------------------------------------

    readNextDrawing: function (next) {
      return Q.fcall(function () {
        return sails.models.lottery
          .findOne()
          .where({
            timestamp: {
              '>': new Date().getTime()
            }
          });
      }).nodeify(next);
    },

    readNextLottery: function (next) {
      return Q.fcall(function () {
        return sails.models.lottery
          .findOne()
          .where({
            timestamp: {
              '>': new Date().getTime() + 2 * 60 * 60 * 1000
            }
          });
      }).nodeify(next);
    },

    //--------------------------------------------------------------------------

    readStatus: function (next) {
      return Q.all([
        this.readGlobals(),
        this.readNextDrawing(),
        this.readNextLottery()
      ]).spread(function (globals, nextDrawing, nextLottery) {
        return {
          globals: globals,
          nextDrawing: nextDrawing,
          nextLottery: nextLottery
        };
      }).fail(function (err) {
        sails.log.error('PublicService#readStatus : query fails', err);
        throw err;
      }).nodeify(next);
    },

    //--------------------------------------------------------------------------

    readMobileSettings: function (id, next) {
      return Q.fcall(function () {
        // wrapper the error into a promise, to bubble it
        if (!_.isString(id)) {
          throw new Error('PublicService#readMobileSettings : the id param is mandatory and should be a string');
        }
        return sails.models.mobilesettings
          .findOne()
          .where({
            id: id
          })
          .fail(function (err) {
            sails.log.error('PublicService#readMobileSettings : query fails', err);
            throw err;
          });
      }).nodeify(next);
    },

    //--------------------------------------------------------------------------

    readCharityLevels: function (next) {
      return Q.fcall(function () {
        return sails.models.charitylevels
          .find()
          .sort('level ASC')
          .fail(function (err) {
            sails.log.error('PublicService#readCharityLevels : query fails', err);
            throw err;
          });
      }).nodeify(next);
    },

    //--------------------------------------------------------------------------

    readAmbassadorLevels: function (next) {
      return Q.fcall(function () {
        return sails.models.ambassadorlevels
          .find()
          .sort('level ASC')
          .fail(function (err) {
            sails.log.error('PublicService#readAmbassadorLevels : query fails', err);
            throw err;
          });
      }).nodeify(next);
    },

    //--------------------------------------------------------------------------

  };
};
