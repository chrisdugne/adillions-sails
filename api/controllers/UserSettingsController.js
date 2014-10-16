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
        usePopTitle: true,
        alert: req.flash_alert(),
        bodyClass: 'account',
        layout: 'layout_about'
      });

    });

  },

  accountMobile: function (req, res) {
    var UserService = new sails.services.user(),
      AuthService = new sails.services.auth(),
      AccountService = new sails.services.account(),
      form = AccountService.getFormData(req.user, req.format_date),
      user = req.user;

    res.locals.user = req.user;

    UserService.readPassports(user.uid, function (err, passports) {
      if (err) {
        return res.serverError(err);
      }

      var providers = AuthService.getProviders(passports);

      res.view('usersettings/account', {
        providers_row: 12 / (_.size(providers)),
        providers: providers,
        form: form,
        isMobile: true,
        isAccount: true,
        usePopTitle: true,
        alert: req.flash_alert(),
        bodyClass: 'account',
        layout: 'layout_about_mobile'
      });

    });

  },

  updateAccount: function (req, res) {
    var userData = _.pick(req.body.user, 'userName', 'firstName', 'lastName', 'birthDate', 'email'),
      UserService = new sails.services.user(),
      uid = req.user ? req.user.uid : null,
      birthDate_day = userData.birthDate.day,
      birthDate_month = userData.birthDate.month,
      birthDate_year = userData.birthDate.year,
      accountRoute = sails.config.route('userSettings.account', {
        hash: {
          'lang': res.getLocale()
        }
      });

    var birthDateFormated = req.format_date()
      .set('date', birthDate_day)
      .set('month', Number(birthDate_month) - 1)
      .set('year', birthDate_year)
      .format('YYYY-MM-DD');

    if (!req.format_date(birthDateFormated).isValid()) {
      req.flash_alert('danger', 'Error.Account.birtDate.invalid');
      return res.redirect(accountRoute);
    }

    if (!_.isEmpty(birthDate_day) && !_.isEmpty(birthDate_month) && !_.isEmpty(birthDate_year)) {
      userData.birthDate = birthDateFormated;
    } else {
      delete userData.birthDate;
    }

    UserService.update(uid, userData).then(function (result) {
      req.flash_alert('success', 'account_updated');
      res.redirect(accountRoute);
    }).fail(function (err) {
      if (err.code === 'E_VALIDATION') {
        if (err.invalidAttributes.email) {
          req.flash_alert('danger', 'Error.Passport.Email.Exists');
        } else {
          req.flash_alert('danger', 'Error.Passport.User.Exists');
        }
      } else {
        req.flash_alert('danger', 'ui_error');
      }
      res.redirect(accountRoute);
    });
  },

  updateAccountMobile: function (req, res) {
    var userData = _.pick(req.body.user, 'userName', 'firstName', 'lastName', 'birthDate', 'email'),
      UserService = new sails.services.user(),
      uid = req.user ? req.user.uid : null,
      birthDate_day = userData.birthDate.day,
      birthDate_month = userData.birthDate.month,
      birthDate_year = userData.birthDate.year,
      accountMobileRoute = sails.config.route('userSettings.updateAccountMobile', {
        hash: {
          'lang': res.getLocale()
        }
      }),
      redirectRoute = accountMobileRoute + '?access_token=' + req.user.auth_token;

    var birthDateFormated = req.format_date()
      .set('date', birthDate_day)
      .set('month', Number(birthDate_month) - 1)
      .set('year', birthDate_year)
      .format('YYYY-MM-DD');

    if (!req.format_date(birthDateFormated).isValid()) {
      req.flash_alert('danger', 'Error.Account.birtDate.invalid');
      return res.redirect(redirectRoute);
    }

    if (!_.isEmpty(birthDate_day) && !_.isEmpty(birthDate_month) && !_.isEmpty(birthDate_year)) {
      userData.birthDate = birthDateFormated;
    } else {
      delete userData.birthDate;
    }

    UserService.update(uid, userData).then(function (result) {
      req.flash_alert('success', 'account_updated');
      res.redirect(redirectRoute);
    }).fail(function (err) {
      if (err.code === 'E_VALIDATION') {
        if (err.invalidAttributes.email) {
          req.flash_alert('danger', 'Error.Passport.Email.Exists');
        } else {
          req.flash_alert('danger', 'Error.Passport.User.Exists');
        }
      } else {
        req.flash_alert('danger', 'ui_error');
      }
      res.redirect(redirectRoute);
    });
  },

};
