var PublicController = module.exports = {

  //----------------------------------------------------------------------------

  readGlobals: function (req, res) {
    new sails.services.public().readGlobals()
      .then(function (globals) {
        res.json({
          serverTime: new Date().getTime(),
          globals: globals
        });
      })
      .fail(function (err){
        return res.serverError(err);
      });
  },

  //----------------------------------------------------------------------------

  readStatus: function (req, res) {
    new sails.services.public().readStatus()
      .then(function (result) {
        res.json(result);
      })
      .fail(function (err){
        return res.serverError(err);
      });
  },

  //----------------------------------------------------------------------------

  readArchivedLotteries: function (req, res) {
    new sails.services.public().readArchivedLotteries(req.param('limit'))
      .then(function (lotteries) {
        res.json(lotteries);
      })
      .fail(function (err){
        return res.serverError(err);
      });
  },

  //----------------------------------------------------------------------------

  readCharityLevels: function (req, res) {
    var PublicService = new sails.services.public();

    PublicService.readCharityLevels(function (err, result) {
      if (err) {
        return res.serverError(err);
      }
      res.json(result);
    });
  },

  //----------------------------------------------------------------------------

  readAmbassadorLevels: function (req, res) {
    var PublicService = new sails.services.public();

    PublicService.readAmbassadorLevels(function (err, result) {
      if (err) {
        return res.serverError(err);
      }
      res.json(result);
    });
  },

  //----------------------------------------------------------------------------

  readMobileSettings: function (req, res) {
    var PublicService = new sails.services.public(),
      id = req.param('id');

    PublicService.readMobileSettings(id, function (err, result) {
      if (err) {
        return res.serverError(err);
      }
      res.json(result);
    });
  }
};
