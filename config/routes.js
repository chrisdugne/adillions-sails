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

  //----------------------------------------------------------------------------
  // Web mobile routes
  //----------------------------------------------------------------------------

  'get /:lang/:mobile/login': 'AuthController.login',
  'get /:lang/:mobile/register': 'AuthController.register',
  'post /m/auth/local': 'AuthController.callbackMobile',
  'post /m/auth/local/:action': 'AuthController.callbackMobile',
  'get /m/auth/:provider': 'AuthController.providerMobile',
  'get /m/auth/:provider/callback': 'AuthController.callbackMobile',

  'get /m/loggedin': 'AuthController.loggedinMobile',

  '/:lang/:mobile/terms': 'AboutController.terms',
  '/:lang/:mobile/rules': 'AboutController.rules',
  '/:lang/:mobile/privacy': 'AboutController.privacy',
  '/:lang/:mobile/faq': 'AboutController.faq',

  //----------------------------------------------------------------------------
  // Web routes
  //----------------------------------------------------------------------------

  'get /:lang/login': 'AuthController.login',
  'get /:lang/logout': 'AuthController.logout',
  'get /:lang/register': 'AuthController.register',

  'post /auth/local': 'AuthController.callback',
  'post /auth/local/:action': 'AuthController.callback',

  'get /auth/:provider': 'AuthController.provider',
  'get /auth/:provider/callback': 'AuthController.callback',

  '/:lang?': 'HomeController.index',

  '/:lang/game': 'GameController.index',
  '/:lang/results': 'GameController.results',

  'get /:lang/settings/profile': 'UserSettingsController.profile',
  'get /:lang/settings/account': 'UserSettingsController.account',
  'put /:lang/settings/account': 'UserSettingsController.updateAccount',

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

  //----------------------------------------------------------------------------
  // API : public endpoints
  //----------------------------------------------------------------------------

  '/api/globals': 'PublicController.readGlobals',

  '/api/status': 'PublicController.readStatus',
  '/api/lottery/archive/:limit?': 'PublicController.readArchivedLotteries',

  '/api/mobile/settings/:id': 'PublicController.readMobileSettings',
  '/api/charity/levels': 'PublicController.readCharityLevels',
  '/api/ambassador/levels': 'PublicController.readAmbassadorLevels',

  //----------------------------------------------------------------------------
  // API : authorized endpoints
  //----------------------------------------------------------------------------

  'get /api/user/:uid?': 'EndpointUserController.read',
  'put /api/user/fetch': 'EndpointUserController.fetch',
  'put /api/user/update': 'EndpointUserController.update',

  'post /api/facebook': 'EndpointSocialController.postOnWall',
  'get /api/facebook/fan': 'EndpointSocialController.isFan',

  'post /api/twitter': 'EndpointSocialController.tweet',
  'get /api/twitter/follow': 'EndpointSocialController.isFollower',
  'post /api/twitter/follow': 'EndpointSocialController.follow',

  'get /api/ticket/:skip?': 'EndpointTicketController.read',
  'post /api/ticket/': 'EndpointTicketController.create',

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
