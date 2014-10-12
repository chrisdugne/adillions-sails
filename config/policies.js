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

const AUTHORIZED = true;
const UNAUTHORIZED = false;

var filters = ['middl_seoLang', 'middl_initLanguages', 'middl_helpers', 'middl_layout'],
  commonPolicies = filters.concat(['passport']),
  WebPolicies = filters.concat(['passport', 'authenticatedBySession']),
  WebMobilePolicies = filters.concat(['passportToken', 'authenticatedByToken']),
  ApiPolicies = ['passportToken', 'authenticatedByToken'];

module.exports.policies = {

  '*': commonPolicies,

  'gameController': {
    '*': commonPolicies,
    index: WebPolicies
  },

  'userSettingsController': {
    '*': UNAUTHORIZED,
    profile: WebPolicies,
    account: WebPolicies,
    updateAccount: WebPolicies,
    accountMobile: WebMobilePolicies,
    updateAccountMobile: WebMobilePolicies
  },

  'authController': {
    '*': ['middl_helpers', 'passport'],
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
    '*': AUTHORIZED
  }

};
