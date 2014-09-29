var _ = require('lodash');

var PublicService = module.exports = function () {
  return {

    //--------------------------------------------------------------------------

    readGlobals: function (next) {

      if (!_.isFunction(next)) {
        throw new Error('readGlobals Service: the callback function is mandatory');
      }

      sails.models.global
        .find()
        .where({
          id: 'current'
        })
        .then(function (result) {
          if (!result || !result.length) {
            throw new Error('empty globals');
          }
          next(null, result[0]);
        })
        .fail(function (err) {
          sails.log.error('PublicService#readGlobals : query fails', err);
          next(err);
        });
    },

    //--------------------------------------------------------------------------

    readMobileSettings: function (id, next) {

      if (!_.isFunction(next)) {
        throw new Error('readMobileSettings Service: the callback function is mandatory');
      }

      if (!_.isString(id)) {
        return next(new Error('readMobileSettings Service: id is mandatory'));
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
        throw new Error('readCharityLevels Service: the callback function is mandatory');
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
        throw new Error('readAmbassadorLevels Service: the callback function is mandatory');
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
