/**
 * GameController.js
 *
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

var url = require('url'),
  numeral = require('numeral'),
  _ = require('lodash');

var getUrl = function (req, code) {
  return url.format({
    protocol: req.protocol,
    host: req.headers.host,
    pathname: code
  });
};

var splitCharityPrice = function (CharityPrice) {
  var formatedCharityPrice = numeral(CharityPrice).format('0,0'),
    i = 1,
    l = formatedCharityPrice.length,
    items = [];
  while (i <= l) {
    var item = formatedCharityPrice.substring(i - 1, i);
    items.push({
      value: item,
      number: !_.isNaN(Number(item)),
      comma: item === ',',
      currency: item === '$' || item === '€'
    });
    i++;
  }
  return items;
};

module.exports = {
  index: function (req, res) {
    var languages = res.locals.languages,
      currentLanguage = res.getLocale(),
      LotteryService = new sails.services.lottery(),
      TOTAL_WINNERS = 3,
      OFFSET_WINNERS = 0,
      SPLIT_CHARITY = true;

    if (_.isEmpty(languages)) {
      sails.log.error('home#index: languages cannot be found');
      return res.view();
    }

    /*
     * Alternate Urls
     */

    var alternateUrls = [];

    _.forEach(languages, function (lang) {
      if (!lang.code) {
        sails.log.warn('home#index: the property "code" of language is falsy', {
          languages: languages,
          lang: lang
        });
        return;
      }
      alternateUrls.push({
        url: getUrl(req, lang.code),
        code: lang.code
      });
    });

    /*
     * Canonical Url
     */

    if (_.isEmpty(currentLanguage)) {
      sails.log.warn('home#index: currentLanguage cannot be found');
      return res.view({
        alternateUrls: alternateUrls
      });
    }

    var canonicalUrl = getUrl(req, currentLanguage),
      locals = {
        alternateUrls: alternateUrls,
        canonicalUrl: canonicalUrl,
        bodyClass: 'landing',
        layout: 'layout_landing'
      };

    async.parallel({
      nextDrawing: function (cb) {
        LotteryService.getNextDrawing(currentLanguage, function (err, results) {
          if (err) {
            // dont' break the page
            // just log the error;
            sails.log.error(err);
          }
          cb(null, results);
        });
      },
      totalCharity: function (cb) {
        LotteryService.getTotalCharityPrice(SPLIT_CHARITY, function (err, results) {
          if (err) {
            // dont' break the page
            // just log the error;
            sails.log.error(err);
          }
          cb(null, splitCharityPrice(results));
        });
      },
      lastWinners: function (cb) {
        LotteryService.getWinners(TOTAL_WINNERS, OFFSET_WINNERS, function (err, results) {
          if (err) {
            // dont' break the page
            // just log the error;
            sails.log.error(err);
          }
          cb(null, results);
        });
      }
    }, function (err, results) {
      if (err) {
        return res.serverError(err);
      }

      if (results && results.lastWinners) {
        _.forEach(results.lastWinners, function (winner) {
          if (winner.charityStatusRang) {
            winner.charityStatusName = res.i18n('charity_rang_' + winner.charityStatusRang);
          }
        });
      }

      res.view(_.defaults(locals, results));
    });

  }
};
