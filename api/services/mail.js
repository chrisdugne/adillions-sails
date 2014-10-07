var _ = require('lodash'),
  Q = require('q'),
  path = require('path'),
  nodemailer = require('nodemailer'),
  smtpTransport = require('nodemailer-smtp-transport');

function Mail(res) {
  if (typeof res === 'undefined') {
    throw new Error('Missing res when instantiating Mail service');
  }
  this.res = res;
  this.smtpTransportOptions = {
    host: 'mail.gandi.net',
    port: 587,
    ignoreTLS: true,
    auth: {
      user: 'noreply@adillions.com',
      pass: 'snoiDILLA2013'
    }
  };
  this.defaultsOptions = {
    from: 'Adillions <support@adillions.com>'
  };
}

Mail.prototype._sendHtmlMail = function (viewPath, data, options) {
  var smtpTransportOptions = this.smtpTransportOptions,
    defaultsOptions = this.defaultsOptions,
    templateData = _.merge({
      layout: 'layout_mail'
    }, data),
    mailOptions = _.merge(defaultsOptions, options);

  return Q.npost(this.res, 'render', [viewPath, templateData]).then(function (html) {
    mailOptions.html = html;
    return Q.Promise(function (resolve, reject, notify) {
      nodemailer
        .createTransport(smtpTransport(smtpTransportOptions))
        .sendMail(mailOptions, function (err, info) {
          if (err) {
            return reject(err);
          }
          resolve(info.response);
        });
    });
  });
};

Mail.prototype._sendTextMail = function (text, options) {
  var smtpTransportOptions = this.smtpTransportOptions,
    defaultsOptions = this.defaultsOptions,
    mailOptions = _.merge(defaultsOptions, options);

  mailOptions.text = text;

  return Q.Promise(function (resolve, reject, notify) {
    nodemailer
      .createTransport(smtpTransport(smtpTransportOptions))
      .sendMail(mailOptions, function (err, info) {
        if (err) {
          return reject(err);
        }
        resolve(info.response);
      });
  });
};

Mail.prototype.registration = function (name, email) {

  /**
   *  'registration'
   *
   *  @summary Send a registration mail
   *
   *  @param user {name} : the user name
   *  @param user {name} : the user email

   *  @return {promise}
   */

  if (!_.isString(name)) {
    name = '';
  }

  if (!_.isString(email) || _.isEmpty(email)) {
    throw new Error('MailService #registration : the email param is mandatory and should not be empty');
  }

  return this._sendHtmlMail('mail/registration', {
    name: name,
    appIosUrl: sails.config.extUrl('app_ios'),
    appAndroidUrl: sails.config.extUrl('app_android')
  }, {
    to: email,
    subject: this.res.i18n('mail.registration.subject')
  }).then(function (response) {
    sails.log.info('mail.registration#service : Message sent' + response);
    return response;
  }).fail(function (err) {
    sails.log.error('mail.registration#service : failed', err);
    throw err;
  });

};

module.exports = Mail;
