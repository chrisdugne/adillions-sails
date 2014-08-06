var ApiController = module.exports = {
  nextLottery: function (req, res) {
    console.log('reached LotteryController.nextLottery');

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
  }
};
