/**
 * GameController.js
 *
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

var url = require('url'),
  _ = require('lodash');

var getUrl = function (req, code) {
  return url.format({
    protocol: req.protocol,
    host: req.headers.host,
    pathname: code
  });
};

module.exports = {
  index: function (req, res) {
    var languages = res.locals.languages,
      currentLanguage = res.getLocale(),
      LotteryService = new sails.services.lottery();

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
      charityPrice: function (cb) {
        LotteryService.getTotalCharityPrice(true, cb);
      },
      nextDrawing: function (cb) {
        LotteryService.getNextDrawing(currentLanguage, cb);
      },
    }, function (err, results) {
      if (err) {
        return res.serverError(err);
      }
      res.view(_.defaults(locals, results));
    });

  }
};
