/**
 * Handlebars Misc helpers
 *
 */
var _ = require('lodash');

/**
 * Helpers
 */
var helpers = {

  /**
   *  'nthItem'
   *  =========
   *
   *  Description
   *  -----------
   *
   *  Show a block only for specific nth item in an iterator.
   *
   *  Use case:
   *    You have an iterator in your template with a list of 12 items.
   *    But you only want to display something for every 3rd item. (3, 6, 9 and 12)
   *
   *  Usage
   *  -----
   *
   *  First parameter is iteration index
   *  Second parameter is the number of the nth item wanted
   *
   *  {{#each itemsList}}
   *    {{#nthItem @index 3}}
   *      Will be displayed *only* for every third item!
   *    {{/nthItem}}
   *  {{/each}}
   *
   *  Also works with an {{else}} statement
   *
   */
  nthItem: function (index, position, options) {

    if (typeof index !== 'number' || typeof position !== 'number') {
      throw new Error(
        'Waiting for an index and a position parameters as numbers'
      );
    }

    var modulo = (index + 1) % position;

    if (!modulo) {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
  },

  /**
   *  'mergeContexts'
   *  ===============
   *
   *  Description
   *  -----------
   *
   *  In Handlebars, when you are in a {{each}} block, you loose the root context.
   *  See this open issue: https://github.com/wycats/handlebars.js/issues/392
   *
   *  We have Helpers that depends on the root context (eg. {{route}} ).
   *  The mergeContexts helper allows to merge the current context with a parent context.
   *  BEWARE: there might be property name collisions.
   *
   *  Usage
   *  -----
   *
   *  {{#each items}}
   *    {{#mergeContexts parent=..}}
   *      {{route …}}
   *    {{/mergeContexts}}
   *  {{/each}}
   *
   */
  mergeContexts: function (options) {
    return options.fn(_.merge({}, this, options.hash.parent));
  },

  /**
   *  'set'
   *  ===============
   *
   *  Description
   *  -----------
   *
   *  Set a value in the current context
   *
   *  Usage
   *  -----
   *
   *  {{set name='test' value=@test}}
   *
   */
  set: function (options) {
    var args = [].slice.call(arguments),
      name = options.hash.name,
      value = options.hash.value;

    if (_.isEmpty(args)) {
      throw new Error('The "set" helper was called with no arguments');
    }

    if (typeof name !== 'string' || typeof value === 'undefined') {
      throw new Error(
        'The "set" helper must have a string key "name" and a define key "value"'
      );
    }
    this[name] = value;
  }

};

/**
 * Register helpers in handlebars
 *
 * @param {hbs} Instance from require('hbs')
 */
module.exports.register = function (hbs) {

  // register helpers in handlebars
  _.forEach(helpers, function (helper, name) {
    hbs.registerHelper(name, helper);
  });
};
