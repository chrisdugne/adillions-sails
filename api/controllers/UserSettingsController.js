var _ = require('lodash'),
  moment = require('moment');

/**
 * AccountController.js
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
    var UserService = new sails.services.user(),
      AuthService = new sails.services.auth(),
      AccountService = new sails.services.account(),
      form = AccountService.getFormData(req.user, req.format_date);

    UserService.readPassports(req.user.uid, function (err, passports) {
      if (err) {
        return res.serverError(err);
      }

      var providers = AuthService.getProviders(passports);

      res.view({
        providers_row: 12 / (_.size(providers)),
        providers: providers,
        form: form,
        isAccount: true,
        alert: req.flash('alert')[0],
        usePopTitle: true,
        bodyClass: 'account',
        layout: 'layout_about'
      });

    });

  },

  updateAccount: function (req, res) {
    var userData = _.pick(req.body.user, 'userName', 'firstName', 'lastName', 'birthDate', 'email'),
      UserService = new sails.services.user(),
      uid = req.user.uid,
      accountRoute = sails.config.route('userSettings.account', {
        hash: {
          'lang': res.getLocale()
        }
      });

    var birthDateFormated = req.format_date()
      .set('date', userData.birthDate.day)
      .set('month', Number(userData.birthDate.month) - 1)
      .set('year', userData.birthDate.year)
      .format('YYYY-MM-DD');

    if (!req.format_date(birthDateFormated).isValid()) {
      req.flash('alert', {
        type: 'danger',
        message: res.i18n('Error.Account.birtDate.invalid')
      });
      return res.redirect(accountRoute);
    }

    userData.birthDate = birthDateFormated;

    UserService.update(uid, userData).then(function (result) {
      req.flash('alert', {
        type: 'success',
        message: res.i18n('account_updated')
      });
      res.redirect(accountRoute);
    }).fail(function (err) {
      if (err.code === 'E_VALIDATION') {
        if (err.invalidAttributes.email) {
          req.flash('alert', {
            type: 'warning',
            message: res.i18n('Error.Passport.Email.Exists')
          });
        } else {
          req.flash('alert', {
            type: 'warning',
            message: res.i18n('Error.Passport.User.Exists')
          });
        }
      } else {
        req.flash('alert', {
          type: 'danger',
          message: res.i18n('ui_error')
        });
      }
      res.redirect(accountRoute);
    });
  }

};
