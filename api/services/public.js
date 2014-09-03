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

    readMobileSettings: function (next) {
      sails.models.mobilesettings
        .find()
        .where({
          version: '1.5'
        })
        .then(function (result) {
          if (!result || !result.length) {
            throw new Error('empty mobileSettings');
          }
          next(null, result[0]);
        })
        .fail(function (err) {
          sails.log.error('PublicService#readMobileSettings : query fails', err);
          next(err);
        });
    }

    //--------------------------------------------------------------------------

  };
};
