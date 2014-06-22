var moment = require('moment');

/**
 * Moment.js date formatting initialization
 *
 * Assign a function `format_date` to req object
 * that is an instance of moment.js object
 * set to current language
 *
 * TODO Should this be a middleware ? It is attached to *every* request !!!
 *
 * @returns {formatDate}
 */
module.exports = function (req, res, next) {

  req.format_date = function (val) {
    var singleton = moment(val),
      navLang = res.getLocale();

    singleton.lang(navLang);

    return singleton;
  };

  return next();

};
