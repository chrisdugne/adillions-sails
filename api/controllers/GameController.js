var _ = require('lodash');

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
    var LotteryService = new sails.services.lottery(),
      page = Number(req.query.page) || 0,
      total = 10,
      start = page * total;

    var conf = {
      usePopTitle: true,
      title: res.i18n('results_title'),
      bodyClass: 'results',
      layout: 'layout_about'
    };

    LotteryService.getLotteries(total, start, function (err, lotteries) {
      if (err) {
        return res.serverError(err);
      }

      if (!lotteries.length) {
        // no loteries, send a 404 status to avoid indexing
        res.status(404);
        return res.view(conf);
      }

      _.forEach(lotteries, function (lottery) {
        var format = 'dddd, MMMM Do YYYY, h:mm A';
        if (res.locale === 'fr') {
          format = 'dddd, Do MMMM YYYY, h:mm';
        }
        lottery.date = req.format_date(parseInt(lottery.timestamp), 10).format(format);
      });

      res.view(_.merge(conf, {
        lotteries: lotteries
      }));
    });

  }
};
