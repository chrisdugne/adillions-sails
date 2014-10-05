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
    var strategies = _.pick(sails.config.passport, 'facebook', 'twitter', 'google')
    UserService = new sails.services.user(),
    providers = {};

    UserService.readPassports(req.user.uid, function (err, passports) {
      if (err) {
        return res.serverError(err);
      }

      // Get a list of available providers for use in your templates.
      Object.keys(strategies).forEach(function (key) {
        providers[key] = {
          name: strategies[key].name,
          slug: key,
          isLinked: !_.isEmpty(_.where(passports, {
            'provider': key
          })),
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
        alert: req.flash('alert')[0],
        usePopTitle: true,
        bodyClass: 'account',
        layout: 'layout_about'
      });

    });

  },

  updateAccount: function (req, res) {
    var user = req.body.user,
      UserService = new sails.services.user(),
      uid = req.user ? req.user.uid : null,
      accountRoute = sails.config.route('user.account', {
        hash: {
          'lang': res.getLocale()
        }
      });

    UserService.update(uid, user, function (err, result) {
      if (err) {
        return res.serverError(err);
      }
      req.flash('alert', {
        type: 'success',
        message: res.i18n('account_updated')
      });
      res.redirect(accountRoute);
    });
  }

};
