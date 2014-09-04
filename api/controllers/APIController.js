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

  readMobileSettings: function (req, res) {
    var PublicService = new sails.services.public();

    PublicService.readMobileSettings(function (err, result) {
      if (err) {
        return res.serverError(err);
      }
      res.json(result);
    });
  }
};
