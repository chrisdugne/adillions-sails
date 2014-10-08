var _ = require('lodash'),
  url = require('url'),
  Q = require('q'),
  juice = require('juice'),
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
  this.defaultsMailOptions = {
    from: 'Adillions <support@adillions.com>'
  };
}

Mail.prototype._sendHtmlMail = function (viewPath, data, options) {
  var smtpTransportOptions = this.smtpTransportOptions,
    defaultsMailOptions = this.defaultsMailOptions,
    templateData = _.defaults({
      layout: 'layout_mail'
    }, data),
    mailOptions = _.merge(defaultsMailOptions, options);

  return Q.npost(this.res, 'render', [viewPath, templateData]).then(function (html) {
    return Q.npost(juice, 'juiceContent', [html, {
      removeStyleTags: false,
      url: 'http://www.adillions.com'
    }]).then(function (inlinedHtml) {
      console.log(inlinedHtml);
      mailOptions.html = inlinedHtml;
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
  });
};

Mail.prototype.registration = function (firstName, userName, email) {

  /**
   *  'registration'
   *
   *  @summary Send a registration mail
   *
   *  @param user {name} : the user name
   *  @param user {name} : the user email

   *  @return {promise}
   */

  var name = '';

  if (_.isString(firstName)) {
    name = firstName;
  }

  if (_.isString(userName) && !_.isString(name)) {
    name = userName;
  }

  if (!_.isString(email) || _.isEmpty(email)) {
    throw new Error('MailService #registration : the email param is mandatory and should not be empty');
  }

  // 'mail/registration' inlined to 'mail/registration_inlined' thanks to http://templates.mailchimp.com/resources/inline-css/
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
