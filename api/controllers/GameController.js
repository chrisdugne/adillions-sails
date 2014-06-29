var _ = require('lodash'),
  url = require('url');

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
      navLang = res.getLocale(),
      page = Number(req.query.page) || 1,
      total = 10,
      start = (page-1) * total;

    var locals = {
      usePopTitle: true,
      title: res.i18n('results_title'),
      bodyClass: 'results',
      layout: 'layout_about'
    };

    async.parallel({
      total: function (cb) {
        LotteryService.getTotalDrawings(cb);
      },
      lotteries: function (cb) {
        LotteryService.getLotteries(total, start, cb);
      }
    }, function (err, results) {
      if (err) {
        return res.serverError(err);
      }

      if (!results.lotteries.length) {
        // no loteries, send a 404 status to avoid indexing
        sails.log.warn('game#results controller : no lotteries found');
        res.status(404);
        return res.view(locals);
      }

      _.forEach(results.lotteries, function (lottery) {
        lottery.date = req.format_date(parseInt(lottery.timestamp), 10).format('D MMM YYYY');
        lottery.date_day = req.format_date(parseInt(lottery.timestamp), 10).format('D');
        lottery.date_month = req.format_date(parseInt(lottery.timestamp), 10).format('MMM');
        lottery.date_year = req.format_date(parseInt(lottery.timestamp), 10).year();

        var lucky_ball = lottery.lucky_ball_number() - 1;

        // catch lucky ball
        if (lottery.theme.balls) {
          lottery.lucky_ball = lottery.theme.balls[navLang][lucky_ball];
        } else if (lottery.theme[navLang]) {
          lottery.lucky_ball = lottery.theme[navLang][lucky_ball];
        } else if (lottery.theme.icons) {
          lottery.lucky_ball = lottery.theme.icons[lucky_ball];
        } else {
          sails.log.error('game#results controller : no lucky ball found', lottery.theme);
        }

        // remove lucky ball from drawing result
        lottery.result = lottery.result.slice(0, 5);
      });

      var paginationBaseUrl = url.format({
        pathname: '/' + navLang + '/results',
        query: _.omit(req.query, 'page')
      });

      var Pagination = new sails.services.pagination({
        pageParam: req.query.page,
        total: results.total,
        offset: total
      });

      var paginationData = Pagination.getViewData(paginationBaseUrl);
      var paginationStatus = Pagination.getStatusCode();

      var relLinks = Pagination.getRelLinks(url.format({
        protocol: req.protocol,
        host: req.headers.host,
        pathname: '/' + navLang + '/results'
      }));

      // Canonical URL for SEO
      var canonicalUrl = relLinks.canonical = url.format({
        protocol: req.protocol,
        host: req.headers.host,
        pathname: '/' + navLang + '/results',
        query: _.pick(req.query, ['page'])
      });

      res.status(paginationStatus);
      res.links(relLinks);

      _.merge(results, paginationData);

      res.view(_.defaults(locals, results));

    });
  }
};
