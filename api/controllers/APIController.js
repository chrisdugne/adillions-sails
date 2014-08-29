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
    var globals = new sails.services.globals();
    globals.fetch(function (err, result) {
      if (err) {
        return res.serverError(err);
      }
      res.json({
        serverTime: new Date().getTime(),
        global: result
      });
    });
  }
};
