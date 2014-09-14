var ApiController = module.exports = {

  //----------------------------------------------------------------------------

  readNextLottery: function (req, res) {
    var LotteryService = new sails.services.lottery();
    LotteryService.getNextLottery(function (err, result) {
      if (err) {
        return res.serverError(err);
      }
      res.json(result);
    });
  },

  //----------------------------------------------------------------------------

  readGlobals: function (req, res) {
    var PublicService = new sails.services.public();

    PublicService.readGlobals(function (err, result) {
      if (err) {
        return res.serverError(err);
      }
      res.json({
        serverTime: new Date().getTime(),
        global: result
      });
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
      version = req.param('version');

    PublicService.readMobileSettings(version, function (err, result) {
      if (err) {
        return res.serverError(err);
      }
      res.json(result);
    });
  }
};
