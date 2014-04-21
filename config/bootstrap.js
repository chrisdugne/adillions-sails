/**
 * Bootstrap
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#documentation
 */

var path = require('path'),
  hbs = require('hbs'),
  hbsutils = require('hbs-utils')(hbs),
  hbshelpers = require(path.resolve(__dirname + '/helpers'));

module.exports.bootstrap = function (cb) {
  // These convenience methods will register all partials (that have a *.html or *.hbs extension) in the given directory. registerPartials will perform a one-time registration.
  // Partials that are loaded from a directory are named based on their filename, where spaces and hyphens are replaced with an underscore character:
  // template.html      -> {{> template}}
  // template 2.html    -> {{> template_2}}
  // login view.hbs     -> {{> login_view}}
  // template-file.html -> {{> template_file}}
  hbsutils.registerPartials(path.resolve('views/_partials'));

  // register all helpers located in '/helpers' folder
  hbshelpers.templating.register(hbs);
  hbshelpers.misc.register(hbs)
  hbshelpers.pagination.register(hbs);
  hbshelpers.statics.register(hbs, {
    mapping: require('./assets.json'),
    hostname: sails.config.static_resources_proxies
  })

  // It's very important to trigger this callack method when you are finished
  // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
  cb();
};
