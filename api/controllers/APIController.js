var ApiController = module.exports = {

  //----------------------------------------------------------------------------

  nextLottery: function (req, res) {
    console.log('reached ApiController.nextLottery');

    var LotteryService = new sails.services.lottery();

    async.parallel({
      nextLottery: function (cb) {
        LotteryService.getNextLottery(cb);
      }
    }, function (err, results) {
      if (err) {
        return res.serverError(err);
      }

      res.json(results);
    });
  },

  //----------------------------------------------------------------------------

  globals: function (req, res) {
    var globals = new sails.services.globals();
    globals.fetch(function (error, result) {
      res.json({
        serverTime: new Date().getTime(),
        global: result
      });
    });
  }
};
