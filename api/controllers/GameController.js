/**
 * GameController.js
 *
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {
  index: function (req, res) {
    res.view({
      usePopTitle: true
    });
  },
  results: function (req, res) {
    var LotteryService = new sails.services.lottery();
    LotteryService.getLoteries(10, 0, function (err, results) {
      if (err) {
        return res.serverError(err);
      }
      res.view({
        loteries: results,
        usePopTitle: true
      });
    });

  }
};
