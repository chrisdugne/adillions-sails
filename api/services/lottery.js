var _ = require('lodash'),
  moment = require('moment');

function Lottery() {
  // construtor
}

var normalizeAttributes = function (lottery) {
  // parse attributes types
  lottery.theme = _.isObject(lottery.theme) ? lottery.theme : JSON.parse(lottery.theme);
  lottery.result = _.isObject(lottery.result) ? lottery.result : JSON.parse(lottery.result);
  lottery.prizes = _.isObject(lottery.prizes) ? lottery.prizes : JSON.parse(lottery.prizes);
  // rangs bugs beacause of useless comma at the end of array
  //lottery.rangs = _.isObject(lottery.rangs) ? lottery.rangs : JSON.parse(lottery.rangs);
  lottery.timestamp = _.isNumber(lottery.timestamp) ? lottery.timestamp : Number(lottery.timestamp);
  lottery.nb_winners = lottery.nb_winners();
  return lottery;
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

      next(null, charity);
    })
    .fail(function (err) {
      next(err);
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
      next(err);
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
      next(err);
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
      if (!lottery) {
        throw new Error('Lottery#getNextDrawing Service: no next drawing found');
      }
      return normalizeAttributes(lottery);
    })
    .then(function (lottery) {
      var theme = lottery.theme;

      next(null, {
        theme: {
          title: theme.title,
          balls: theme.balls[currentLanguage]
        },
        timestamp: lottery.timestamp / 1000, // turn milliseconds to seconds
        prize: lottery.min_price || lottery.final_price
      });
    })
    .fail(function (err) {
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
          charity_rang = 1;

        _.forEach(charity_status, function (charity) {
          if (user.playedtickets >= charity.tickets) {
            charity.active = true;
            charity_rang = charity.rang;
          }
        });

        winners.push({
          firstname: user.firstname,
          lastname: user.lastname,
          country: user.country,
          prize: ticket.euros,
          charityStatus: charity_status,
          charityStatusRang: charity_rang
        });

      });
      next(null, winners);
    })
    .fail(function (err) {
      sails.log.error('Lottery#getLastWinners Service: query fails', err);
      next(err);
    });

};

/*
 * @desc:
 * - Return lotteries
 * @params:
 * - total:number
 * - offset:number
 * - next:function
 * @return:
 * - Number
 */

Lottery.prototype.getLotteries = function (total, offset, next) {

  if (!_.isFunction(next)) {
    throw new Error('Lottery#getLotteries Service: the callback function is mandatory');
  }

  if (!_.isNumber(total)) {
    sails.log.warn('Lottery#getLotteries Service: \'total\' property must be a number', total);
    total = 10;
  }

  if (!_.isNumber(offset)) {
    sails.log.warn('Lottery#getLotteries Service: \'offset\' property must be a number', offset);
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
    .then(function (lotteries) {
      _.forEach(lotteries, function (lottery) {
        return normalizeAttributes(lottery);
      });
      return lotteries;
    })
    .then(function (lotteries) {
      next(null, lotteries);
    })
    .fail(function (err) {
      sails.log.error('Lottery#getLotteries Service: query fails', err);
      next(err);
    });
};

module.exports = Lottery;
