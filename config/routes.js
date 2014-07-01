/**
 * Routes
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `config/404.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on routes, check out:
 * http://sailsjs.org/#documentation
 */

module.exports.routes = {

  '/login': 'AuthController.login',
  '/logout': 'AuthController.logout',
  '/register': 'AuthController.register',

  'post /auth/local': 'AuthController.callback',
  'post /auth/local/:action': 'AuthController.callback',

  '/auth/:provider': 'AuthController.provider',
  '/auth/:provider/callback': 'AuthController.callback',

  '/:lang?': 'HomeController.index',

  '/:lang/game': 'GameController.index',
  '/:lang/results': 'GameController.results',

  '/:lang/about': 'AboutController.index',
  '/:lang/about/winwinwin': 'AboutController.winwinwin',
  '/:lang/about/team': 'AboutController.team',
  '/:lang/about/reward': 'AboutController.reward',
  '/:lang/about/prizes': 'AboutController.prizes',
  '/:lang/about/press': 'AboutController.press',
  '/:lang/about/faq': 'AboutController.faq',
  '/:lang/about/legalnotices': 'AboutController.legalnotices',
  '/:lang/about/rules': 'AboutController.rules',
  '/:lang/about/jobs': 'AboutController.jobs',
  '/:lang/about/privacy': 'AboutController.privacy',
  '/:lang/about/terms': 'AboutController.terms',
  '/:lang/about/advertisers': 'AboutController.advertisers'

  // If a request to a URL doesn't match any of the custom routes above, it is matched
  // against Sails route blueprints.  See `config/blueprints.js` for configuration options
  // and examples.

};
