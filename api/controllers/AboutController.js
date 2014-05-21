/**
 * AboutController.js
 *
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

var path = require('path');

module.exports = {

  index: function (req, res) {
    res.view({
      usePopTitle: true
    });
  },

  reward: function (req, res) {
    return res.view({
      usePopTitle: true
    });
  },

  prizes: function (req, res) {
    return res.view({
      usePopTitle: true
    });
  },

  press: function (req, res) {
    return res.view({
      usePopTitle: true
    });
  },

  faq: function (req, res) {
    return res.view({
      usePopTitle: true
    });
  },

  rules: function (req, res) {
    return res.view({
      usePopTitle: true
    });
  },

  jobs: function (req, res) {
    return res.view({
      usePopTitle: true
    });
  },

  privacy: function (req, res) {
    return res.view({
      usePopTitle: true
    });
  },

  terms: function (req, res) {
    var articles = {},
      locale = res.getLocale(),
      translations = require(path.resolve('config', 'locales/' + locale)),
      terms_regexx = /terms_([\d]+)-?([\d]+)?-?([\d]+)?/i;

    if (!_.isPlainObject(translations)) {
      throw new Error('About#terms: The translations must be a plain object.');
    }

    var terms_translations = _.transform(translations, function (result, value, key) {
      var term = key.match(terms_regexx);
      if (term) {
        result[key] = value;
      }
    });

    sails.services.terms(terms_translations, function (err, articles) {
      if (err) {
        return res.serverError(err);
      }
      return res.view({
        usePopTitle: true,
        articles: articles
      });
    });

  },

  advertisers: function (req, res) {
    return res.view({
      usePopTitle: true
    });
  }
};
