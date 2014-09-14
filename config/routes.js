/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  '/:lang/login': 'AuthController.login',
  '/:lang/logout': 'AuthController.logout',
  '/:lang/register': 'AuthController.register',
  'post /:lang/auth/local': 'AuthController.callback',
  'post /:lang/auth/local/:action': 'AuthController.callback',

  '/:lang/auth/:provider': 'AuthController.provider',
  '/:lang/auth/:provider/callback': 'AuthController.callback',

  '/:lang?': 'HomeController.index',

  '/:lang/game': 'GameController.index',
  '/:lang/results': 'GameController.results',

  '/:lang/profile/:id?': 'UserController.profile',
  '/:lang/account/:id?': 'UserController.account',

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
  '/:lang/about/advertisers': 'AboutController.advertisers',

  '/api/globals': 'APIController.readGlobals',
  '/api/nextLottery': 'APIController.readNextLottery',

  '/api/mobile/settings/:version': 'APIController.readMobileSettings',
  '/api/charity/levels': 'APIController.readCharityLevels',
  '/api/ambassador/levels': 'APIController.readAmbassadorLevels'

  // API Examples of how to naming controllers functions
  // '/api/globals': 'APIController.readGlobals',
  // 'post /api/globals': 'APIController.createGlobals',
  // 'put /api/globals': 'APIController.updateGlobals',
  // 'delete /api/globals': 'APIController.deleteGlobals'

  /***************************************************************************
   *                                                                          *
   * Custom routes here...                                                    *
   *                                                                          *
   *  If a request to a URL doesn't match any of the custom routes above, it  *
   * is matched against Sails route blueprints. See `config/blueprints.js`    *
   * for configuration options and examples.                                  *
   *                                                                          *
   ***************************************************************************/

};
