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
 * @desc:
 * - Return the total count of lottery drawings
 * @params:
 * - array
 *  - charity:number
 * @return:
 * - Number
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
 * @desc:
 * - Return the average of charity price from lottery drawings
 * @params:
 * - array
 *  - charity:number
 * @return:
 * - Number
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
        sails.log.error('Lottery#getAverageCharity : averageCharity must be a number', result);
        return next(null, 0);
      }

      if (averageCharity === 0) {
        sails.log.warn('Lottery#getAverageCharity : averageCharity must not equals to 0', result);
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

/*
 * @desc:
 * - Return the next drawing
 * @params:
 * - timestamp:number
 * - theme:json
 * - prize:number
 * @return:
 * - Number
 */

Lottery.prototype.getNextDrawing = function (currentLanguage, next) {

  if (!_.isFunction(next)) {
    throw new Error('Lottery#getNextDrawing Service: the callback function is mandatory');
  }

  if (!_.isString(currentLanguage)) {
    currentLanguage = 'en';
    sails.log.warn('Lottery#getNextDrawing Service: \'currentLanguage\' property must be a string', currentLanguage);
  }

  sails.models.lottery
    .findOne()
    .where({
      timestamp: {
        '>': new Date().getTime()
      }
    })
    .then(function (lottery) {
      var theme = _.isObject(lottery.theme) ? lottery.theme : JSON.parse(lottery.theme);

      next(null, {
        theme: {
          title: theme.title,
          balls: theme.balls[currentLanguage]
        },
        timestamp: Number(lottery.timestamp) / 1000, // turn milliseconds to seconds
        prize: lottery.final_price || lottery.min_price
      });
    })
    .fail(function (err) {
      sails.log.error('Lottery#getNextDrawing : query fails', err);
      next(err);
    });

};

/*
 * @desc:
 * - Return lottery winners
 * @params:
 * - total:number
 * - offset:number
 * - next:function
 * @return:
 * - object
 */

Lottery.prototype.getWinners = function (total, offset, next) {

  if (!_.isFunction(next)) {
    throw new Error('Lottery#getLastWinners Service: the callback function is mandatory');
  }

  if (!_.isNumber(total)) {
    sails.log.warn('Lottery#getLastWinners Service: \'total\' property must be a number', total);
    total = 10;
  }

  if (!_.isNumber(offset)) {
    sails.log.warn('Lottery#getLastWinners Service: \'offset\' property must be a number', offset);
    offset = 0;
  }

  sails.models.ticket
    .find()
    .where({
      price: {
        '>': 0
      }
    })
    .limit(total)
    .skip(offset)
    .sort('timestamp DESC')
    .populate('user')
    .then(function (results) {
      var winners = [];
      _(results).forEach(function (ticket) {
        var user = ticket.user,
          charity_status = user.charity_status(),
          charityStatusRang;

        _.forEach(charity_status, function (charity) {
          charity.active = user.playedtickets <= charity.tickets;
        });

        _.forEach(charity_status, function (charity) {
          if (charity.active) {
            charityStatusRang = charity.rang;
            return false;
          }
        });

        winners.push({
          firstname: user.firstname,
          lastname: user.lastname,
          country: user.country,
          prize: ticket.euros,
          charityStatus: charity_status,
          charityStatusRang: charityStatusRang
        });

      });
      next(null, winners);
    })
    .fail(function (err) {
      sails.log.error('Lottery#getLastWinners : query fails', err);
      next(err);
    });

};

/*
 * @desc:
 * - Return loteries
 * @params:
 * - total:number
 * - offset:number
 * - next:function
 * @return:
 * - Number
 */

Lottery.prototype.getLoteries = function (total, offset, next) {

  if (!_.isFunction(next)) {
    throw new Error('Lottery#getLoteries Service: the callback function is mandatory');
  }

  if (!_.isNumber(total)) {
    sails.log.warn('Lottery#getLoteries Service: \'total\' property must be a number', total);
    total = 10;
  }

  if (!_.isNumber(offset)) {
    sails.log.warn('Lottery#getLoteries Service: \'offset\' property must be a number', offset);
    offset = 0;
  }

  sails.models.lottery
    .find()
    .where({
      result: {
        '!': null
      }
    })
    .limit(total)
    .skip(offset)
    .sort('timestamp DESC')
    .then(function (loteries) {
      next(null, loteries);
    })
    .fail(function (err) {
      sails.log.error('Lottery#getLoteries : query fails', err);
      next(err);
    });

};

module.exports = Lottery;
