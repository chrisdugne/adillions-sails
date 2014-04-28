/**
 *  seoLang Policie
 *
 *  @description:
 *
 *  This filter validates that the language in the URL is supported, otherwise redirects to one that is:
 *  - If URL in language is supported, it will update res.locals, UI and Kasper context with language
 *  - If not, it will try to find the best language from the list of Accepted Languages sent by UA
 *  - If all fails, it will use fallback language
 *  On private pages, it will also update the language when user wants to change
 *
 *
 */

var url = require('url'),
  _ = require('lodash');

var isExists = function (array, key) {
  return _.indexOf(array, key) !== -1;
};

module.exports = function (req, res, next) {

  var config = req._sails.config;

  if (req.path === '/') {
    return next();
  }

  var language = req.path.match(/\/([a-z]{2})\//),
    languagesList = config.i18n.locales;

  // Public pages must have language in URL
  if (!res.locals.user && !language) {
    return res.notFound();
  }

  language = language[1];

  // Private pages with a SEO friendly URL, trying to change the language through the footer menu
  // We redirect to URL with the lang param updated
  if (res.locals.user && req.query.setLng && language) {

    if (isExists(languagesList, req.query.setLng)) {

      return res.redirect(url.format({
        protocol: req.protocol,
        host: req.headers.host,
        pathname: req.path.replace('/' + language + '/', '/' + req.query.setLng + '/'),
        query: _.omit(req.query, 'setLng')
      }));
    }

    return next();
  }

  // Back to Public pages: does the languages in the URL is supported?
  if (isExists(languagesList, language)) {

    // Update UI language
    res.setLocale(language);
    res.locals.locale = language;
    // If we don't support the language in the URL, redirect to page with supported language
    // It tries to use one of the accepted languages from the browser request
    // If it still can't find a supported language, it uses the fallback language
  } else {
    var fallbackLanguage = config.i18n.fallback;

    if (req.acceptedLanguages.length) {
      req.acceptedLanguages.some(function (lang) {
        lang = lang.substring(0, 2);
        if (isExists(languagesList, lang)) {
          fallbackLanguage = lang;
          return true;
        }
        return false;
      });
    }

    return res.redirect(301, url.format({
      protocol: req.protocol,
      host: req.headers.host,
      pathname: req.path.replace('/' + language + '/', '/' + fallbackLanguage + '/'),
      query: req.query
    }));
  }

  next();
};
