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
    // think at the pagination req.params('start'),
    var LotteryService = new sails.services.lottery(),
      start = Number(req.query.start) || 0;
    LotteryService.getLoteries(10, start, function (err, results) {
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
