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
      usePopTitle: true,
      title: res.i18n('about'),
      bodyClass: 'about',
      layout: 'layout_about'
    });
  },

  winwinwin: function (req, res) {
    return res.view({
      usePopTitle: true,
      title: res.i18n('winwinwin_title'),
      bodyClass: 'winwinwin',
      layout: 'layout_about'
    });
  },

  team: function (req, res) {
    return res.view({
      usePopTitle: true,
      title: res.i18n('team'),
      bodyClass: 'team',
      layout: 'layout_about'
    });
  },

  advertisers: function (req, res) {
    return res.view({
      usePopTitle: true,
      title: res.i18n('advertisers_title'),
      bodyClass: 'advertisers',
      layout: 'layout_about'
    });
  },

  reward: function (req, res) {
    return res.view({
      usePopTitle: true,
      title: res.i18n('reward'),
      layout: 'layout_about'
    });
  },

  prizes: function (req, res) {
    return res.view({
      usePopTitle: true,
      title: res.i18n('prizes'),
      bodyClass: 'prizes',
      layout: 'layout_about'
    });
  },

  press: function (req, res) {
    return res.view({
      usePopTitle: true,
      title: res.i18n('press'),
      layout: 'layout_about'
    });
  },

  faq: function (req, res) {
    console.log(req);
    console.log(req.params['m']);
    return res.view({
      usePopTitle: true,
      title: res.i18n('faq'),
      layout: req.params['m'] === 'm' ? 'layout_about_mobile' : 'layout_about'
    });
  },

  legalnotices: function (req, res) {
    return res.view({
      usePopTitle: true,
      title: res.i18n('legalnotices'),
      layout: 'layout_about'
    });
  },

  rules: function (req, res) {
    return res.view({
      usePopTitle: true,
      title: res.i18n('keyrules'),
      layout: req.params['m'] === 'm' ? 'layout_about_mobile' : 'layout_about'
    });
  },

  jobs: function (req, res) {
    return res.view({
      usePopTitle: true,
      title: res.i18n('jobs'),
      layout: 'layout_about'
    });
  },

  privacy: function (req, res) {
    return res.view({
      usePopTitle: true,
      title: res.i18n('privacy'),
      layout: req.params['m'] === 'm' ? 'layout_about_mobile' : 'layout_about'
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
        title: res.i18n('terms'),
        articles: articles,
        layout: req.params['m'] === 'm' ? 'layout_about_mobile' : 'layout_about'
      });
    });

  }
};
