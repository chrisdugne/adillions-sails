/**
 * Internationalization / Localization Settings
 *
 * If your app will touch people from all over the world, i18n (or internationalization)
 * may be an important part of your international strategy.
 *
 *
 * For more information, check out:
 * http://sailsjs.org/#documentation
 */

module.exports.i18n = {
  // setup some locales - other locales default to en silently
  locales: ['en', 'fr'],
  // you may alter a site wide default locale
  defaultLocale: 'en',
  // sets a custom cookie name to parse locale settings from  - defaults to NULL
  // refers to api/policies/seoLang.js
  cookie: 'locales',
  // humanize languages
  languages: {
    'en': {
      code: 'en',
      name: 'English'
    },
    'fr': {
      code: 'fr',
      name: 'Français'
    }
  }
};
