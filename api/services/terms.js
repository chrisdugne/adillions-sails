var _ = require('lodash');

module.exports = function (terms_translations, next) {

  if (!_.isFunction(next)) {
    throw new Error('terms Service: the callback function is mandatory');
  }

  if (!_.isPlainObject(terms_translations)) {
    return next(new Error('terms Service: The terms translations must be passed to the service and it must be a plain object.'));
  }

  if (_.isEmpty(terms_translations)) {
    sails.log.warn('services#terms: empty terms_translations');
    return next(null, {});
  }

  var articles = {},
    terms_regexx = /terms_([\d]+)-?([\d]+)?-?([\d]+)?/i;

  _.forEach(terms_translations, function (value, key) {
    var article = {},
      term = key.match(terms_regexx),
      lvl_1 = term[1],
      lvl_2 = term[2],
      lvl_3 = term[3];

    if (lvl_1 && !lvl_2 && !lvl_3) {
      // level 1
      articles[lvl_1] = {
        name: value,
        articles: {}
      };
    }

    if (lvl_1 && lvl_2 && !lvl_3) {
      // level 2
      articles[lvl_1].articles[lvl_2] = {
        name: value,
        articles: null
      };
    }

    if (lvl_1 && lvl_2 && lvl_3) {
      // level 3
      if (!articles[lvl_1].articles[lvl_2].articles) {
        articles[lvl_1].articles[lvl_2].articles = {};
      }
      articles[lvl_1].articles[lvl_2].articles[lvl_3] = {
        name: value
      };
    }

  });

  next(null, articles);
};
