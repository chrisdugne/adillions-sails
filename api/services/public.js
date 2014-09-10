var PublicService = module.exports = function () {
  return {

    //--------------------------------------------------------------------------

    readGlobals: function (next) {
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

    readMobileSettings: function (version, next) {
      sails.models.mobilesettings
        .find()
        .where({
          version: version
        })
        .then(function (result) {
          if (!result || !result.length) {
            throw new Error('empty mobileSettings for version ' + version);
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
