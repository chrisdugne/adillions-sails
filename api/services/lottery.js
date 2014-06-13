var _ = require('lodash'),
  numeral = require('numeral');

function Lottery() {

}

var splitNumber = function (ressource) {

  var formatedRessource = numeral(ressource).format('0,0'),
    i = 1,
    l = formatedRessource.length,
    items = [];

  while (i <= l) {
    var item = formatedRessource.substring(i - 1, i);
    items.push({
      value: item,
      number: !_.isNaN(Number(item)),
      comma: item === ',',
      currency: item === '$' || item === '€'
    });
    i++;
  }

  return items;
};

/*
 * Return the total charity price from all lottery drawings
 * results : Number
 */

Lottery.prototype.getTotalCharityPrice = function (split, next) {

  if (!_.isFunction(next)) {
    throw new Error('Lottery#getTotalCharityPrice Service: the callback function is mandatory');
  }

  sails.models.lottery
    .find()
    .where({
      charity: {
        '>': 0
      }
    })
    .sum('charity')
    .then(function (result) {

      if (!_.isArray(result) && !result[0].hasOwnProperty('charity')) {
        sails.log.error('Lottery#getTotalCharityPrice : result is not well formated', result);
        return next(null, 0);
      }

      var charity = result[0].charity;

      if (isNaN(charity)) {
        sails.log.error('Lottery#getTotalCharityPrice : charity must be a number', result);
        return next(null, 0);
      }

      if (charity === 0) {
        sails.log.warn('Lottery#getTotalCharityPrice : charity must not equals to 0', result);
        return next(null, charity);
      }

      charity = Math.round(charity);

      if (split) {
        charity = splitNumber(charity);
      }

      next(null, charity);
    })
    .fail(function (err) {
      // do not expose error
      sails.log.error('Lottery#getTotalCharityPrice : query fails', err);
      next(null);
    });

};

/*
 * Return the total count of lottery drawings
 * results : Number
 */

Lottery.prototype.getTotalDrawings = function (next) {

  if (!_.isFunction(next)) {
    throw new Error('Lottery#getTotalDrawings Service: the callback function is mandatory');
  }

  sails.models.lottery
    .count()
    .then(function (drawings) {
      if (isNaN(drawings)) {
        sails.log.error('Lottery#getTotalDrawings : drawings must be a number', drawings);
        return next(null, drawings);
      }

      if (drawings === 0) {
        sails.log.warn('Lottery#getTotalDrawings : drawings must not equals to 0', drawings);
        return next(null, drawings);
      }

      next(null, drawings);
    })
    .fail(function (err) {
      // do not expose error
      sails.log.error('Lottery#getTotalDrawings : query fails', err);
      next(null);
    });
};

/*
 * Return the average of charity price from lottery drawings
 * results : Number
 */

Lottery.prototype.getAverageCharity = function (next) {

  if (!_.isFunction(next)) {
    throw new Error('Lottery#getAverageCharity Service: the callback function is mandatory');
  }

  sails.models.lottery
    .find()
    .average('charity')
    .then(function (result) {

      if (!_.isArray(result) && !result[0].hasOwnProperty('charity')) {
        sails.log.error('Lottery#getAverageCharity : result is not well formated', result);
        return next(null, 0);
      }

      var averageCharity = result[0].charity;

      if (isNaN(averageCharity)) {
        sails.log.error('Lottery#getAverageaverageCharity : averageCharity must be a number', result);
        return next(null, 0);
      }

      if (averageCharity === 0) {
        sails.log.warn('Lottery#getAverageaverageCharity : averageCharity must not equals to 0', result);
        return next(null, averageCharity);
      }

      next(null, Math.round(averageCharity));
    })
    .fail(function (err) {
      // do not expose error
      sails.log.error('Lottery#getAverageCharity : query fails', err);
      next(null);
    });
};

module.exports = Lottery;
