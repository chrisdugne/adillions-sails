var _ = require('lodash'),
  Q = require('q');

var PublicService = module.exports = function () {
  return {

    //--------------------------------------------------------------------------

    readGlobals: function () {
      return sails.models.globals
        .findOne()
        .where({
          id: 'current'
        })
        .then(function (globals) {
          return globals;
        })
        .fail(function (err) {
          sails.log.error('PublicService#readGlobals : query fails', err);
        });
    },

    //--------------------------------------------------------------------------

    readArchivedLotteries: function (limit) {
      return sails.models.lottery
        .find()
        .where({
          result: {
            '!': null
          }
        })
        .limit(limit || 1000)
        .sort('timestamp DESC')
        .then(function (lotteries) {
          _.forEach(lotteries, function (lottery) {
            lottery.nbWinners = lottery.nbWinners();
          });
          return lotteries;
        })
        .fail(function (err) {
          sails.log.error('PublicService#readArchivedLotteries : query fails', err);
        });
    },

    //--------------------------------------------------------------------------

    readNextDrawing: function () {
      return sails.models.lottery
        .findOne()
        .where({
          timestamp: {
            '>': new Date().getTime()
          }
        });
    },

    readNextLottery: function () {
      return sails.models.lottery
        .findOne()
        .where({
          timestamp: {
            '>': new Date().getTime() + 2 * 60 * 60 * 1000
          }
        });
    },

    //--------------------------------------------------------------------------

    readStatus: function () {
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
      });

    },

    //--------------------------------------------------------------------------

    readMobileSettings: function (id, next) {

      if (!_.isFunction(next)) {
        throw new Error('PublicService#readMobileSettings Service: the callback function is mandatory');
      }

      if (!_.isString(id)) {
        return next(new Error('PublicService#readMobileSettings Service: id is mandatory'));
      }

      sails.models.mobilesettings
        .find()
        .where({
          id: id
        })
        .then(function (result) {
          if (!result || !result.length) {
            throw new Error('empty mobileSettings for id ' + id);
          }
          next(null, result[0]);
        })
        .fail(function (err) {
          sails.log.error('PublicService#readMobileSettings : query fails', err);
          next(err);
        });
    },

    //--------------------------------------------------------------------------

    readCharityLevels: function (next) {

      if (!_.isFunction(next)) {
        throw new Error('PublicService#readCharityLevels Service: the callback function is mandatory');
      }

      sails.models.charitylevels
        .find()
        .sort('level ASC')
        .then(function (result) {
          if (!result || !result.length) {
            throw new Error('empty charitylevels');
          }
          next(null, result);
        })
        .fail(function (err) {
          sails.log.error('PublicService#readCharityLevels : query fails', err);
          next(err);
        });
    },

    //--------------------------------------------------------------------------

    readAmbassadorLevels: function (next) {

      if (!_.isFunction(next)) {
        throw new Error('PublicService#readAmbassadorLevels Service: the callback function is mandatory');
      }

      sails.models.ambassadorlevels
        .find()
        .sort('level ASC')
        .then(function (result) {
          if (!result || !result.length) {
            throw new Error('empty ambassadorlevels');
          }
          next(null, result);
        })
        .fail(function (err) {
          sails.log.error('PublicService#readAmbassadorLevels : query fails', err);
          next(err);
        });
    },

    //--------------------------------------------------------------------------

  };
};
