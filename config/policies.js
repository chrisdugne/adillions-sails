var _ = require('lodash');
/**
 * Policy mappings (ACL)
 *
 * Policies are simply Express middleware functions which run **before** your controllers.
 * You can apply one or more policies to a given controller, or protect just one of its actions.
 *
 * Any policy file (e.g. `authenticated.js`) can be dropped into the `/policies` folder,
 * at which point it can be accessed below by its filename, minus the extension, (e.g. `authenticated`)
 *
 * For more information on policies, check out:
 * http://sailsjs.org/#documentation
 */

var commonPolicies = ['passport', 'seoLang', 'initLanguages', 'formatDate', 'layout'],
  WebPolicies = ['passport', 'authenticatedBySession', 'seoLang', 'initLanguages', 'formatDate', 'layout'],
  ApiPolicies = ['passportToken', 'authenticatedByToken'];

module.exports.policies = {

  /***************************************************************************
   *                                                                          *
   * Default policy for all controllers and actions (`true` allows public     *
   * access)                                                                  *
   *                                                                          *
   ***************************************************************************/

  // '*': true,

  /***************************************************************************
   *                                                                          *
   * Here's an example of mapping some policies to run before a controller    *
   * and its actions                                                          *
   *                                                                          *
   ***************************************************************************/
  // RabbitController: {

  // Apply the `false` policy as the default for all of RabbitController's actions
  // (`false` prevents all access, which ensures that nothing bad happens to our rabbits)
  // '*': false,

  // For the action `nurture`, apply the 'isRabbitMother' policy
  // (this overrides `false` above)
  // nurture  : 'isRabbitMother',

  // Apply the `isNiceToAnimals` AND `hasRabbitFood` policies
  // before letting any users feed our rabbits
  // feed : ['isNiceToAnimals', 'hasRabbitFood']
  // }

  '*': commonPolicies,

  'gameController': {
    '*': commonPolicies,
    index: WebPolicies
  },

  'userSettingsController': {
    '*': WebPolicies
  },

  'authController': {
    '*': 'passport',
    login: commonPolicies,
    register: commonPolicies
  },

  'endpointUserController': {
    '*': ApiPolicies // to restric access by a token authentification
  },

  'endpointTicketController': {
    '*': ApiPolicies // to restric access by a token authentification
  },

  'endpointSocialController': {
    '*': ApiPolicies // to restric access by a token authentification
  },

  'publicController': {
    '*': true
  }

};
