var _ = require('lodash'),
  url = require('url');

/**
 * UserController.js
 *
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {

  profile: function (req, res) {
    res.view({
      isProfile: true,
      usePopTitle: true,
      bodyClass: 'profile',
      layout: 'layout'
    });
  },

  account: function (req, res) {
    var strategies = _.pick(sails.config.passport, 'facebook', 'twitter', 'google'),
      providers = {};

    // Get a list of available providers for use in your templates.
    Object.keys(strategies).forEach(function (key) {
      providers[key] = {
        name: strategies[key].name,
        slug: key,
        isFacebook: key === 'facebook',
        isGoogle: key === 'google',
        isTwitter: key === 'twitter',
        isGithub: key === 'github'
      };
    });

    res.view({
      providers_row: 12 / (Object.keys(strategies).length),
      providers: providers,
      isAccount: true,
      alert: req.flash('error')[0],
      usePopTitle: true,
      bodyClass: 'account',
      layout: 'layout_about'
    });
  },

  updateAccount: function (req, res) {
    var params = req.body,
      accountRoute = sails.config.route('user.account', {
        hash: {
          'lang': res.getLocale()
        }
      });

    res.redirect(accountRoute);
  }

};
