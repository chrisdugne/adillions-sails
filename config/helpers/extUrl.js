/**
 * Handlebars extUrl helpers
 *
 */
var _ = require('lodash'),
  util = require('util'),
  fs = require('fs');

var validateOptions = function (opts) {
  var aliases;

  // Checks
  if (!_.isString(opts.aliases)) {
    throw new Error('The aliases option must be passed to init the helper and it must be a string.');
  }

  try {
    aliases = JSON.parse(fs.readFileSync(opts.aliases).toString());
  } catch (e) {
    // Here you get the error when the file was not found,
    // but you also get any other error
    if (e.code === 'ENOENT') {
      aliases = {};
      sails.log.warn('helpers#extUrl: options.aliases file not found!', opts.aliases);
    } else {
      throw e;
    }
  }

  opts.aliases = aliases;

  return opts;
};

/**
 * Helpers
 */

module.exports = {

  aliases: {},

  hosts: {},

  register: function (hbs, config) {
    // sanity check on options
    config = validateOptions(config);

    this.aliases = config.aliases;
    this.hosts = config.hosts;
    var _this = this;
    hbs.registerHelper('extUrl', function () {
      return _this.getExtURL.apply(_this, arguments);
    });
  },

  getExtURLHelper: function (config) {
    // sanity check on options
    config = validateOptions(config);

    this.aliases = config.aliases;
    this.hosts = config.hosts;
    return this.getExtURL.bind(this);
  },

  getExtURL: function (urlAlias) {
    var url = this.aliases[urlAlias];
    var args = Array.prototype.slice.call(arguments, 1);
    var namedParameterRegex = new RegExp('\\{([a-zA-Z]+)\\}');
    var _this = this;

    // Removes Object `{hash : {}, options : {}}` if it exists
    // which is added by Handlebars as last argument
    _.filter(args, function (arg) {
      return (typeof arg !== 'number' || typeof arg !== 'string');
    });

    if (typeof url !== 'string') {
      throw new Error(util.format('External url alias "%s" is not defined', urlAlias));
    }

    // Replace all hosts occurence using hostReplacer and replace all positioned variables.
    return url.replace(
      namedParameterRegex, // matches {<letters>}
      function (_, index) {

        var param = _this.hosts[index];

        if (typeof param === 'number' || typeof param === 'string') {
          return param;
        }

        // invalid parameter
        throw new Error(util.format(
          'Invalid or missing hosts {%s} for external url alias "%s"',
          index, urlAlias
        ));
      }
    ).replace(
      /\{([0-9]+)\}/g, // matches {<number>}
      function (_, index) {

        var param = args[index];

        if (typeof param === 'number' || typeof param === 'string') {
          return param;
        }

        // invalid parameter
        throw new Error(util.format(
          'Invalid or missing parameter {%d} for external url alias "%s"',
          index, urlAlias
        ));
      }
    );
  }
};
