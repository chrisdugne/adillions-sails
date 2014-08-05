var ApiController = module.exports = {
  nextLottery: function (req, res) {
    console.log('reached LotteryController.nextLottery');

    var LotteryService = new sails.services.lottery();
    var result = LotteryService.getNextLottery();
  },
};
