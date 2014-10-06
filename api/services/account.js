var _ = require('lodash'),
  moment = require('moment');

function Account() {
  // construtor
}

Account.prototype.getFormData = function (user, format_date) {

  /**
   *  'getFormData'
   *
   *  @summary Synchrone service to get form account data
   *
   *  @param user {object} : the user from the application
   *
   *  @return {object}
   */

  if (!_.isObject(user)) {
    throw new Error('AccountService #getFormData : the user param is mandatory and should be an object');
  }

  if (!_.isFunction(format_date)) {
    throw new Error('AccountService #getFormData : the format_date param is mandatory and should be a function');
  }

  var birthDate = format_date(user.birthDate);

  return {
    userName: user.userName,
    firstName: user.firstName,
    lastName: user.lastName,
    birthDate_day: birthDate.get('date'),
    birthDate_month: birthDate.format('MMMM'),
    birthDate_year: birthDate.get('year'),
    email: user.email,
    days: sails.services.date.getDays(),
    months: sails.services.date.getMonths(moment.months()),
    years: sails.services.date.getYears()
  };
};

module.exports = Account;
