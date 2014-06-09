// JS packaging
var modules = {

  // Main package
  '.tmp/public/scripts/main.js': [
    // main vendors
    'assets/bower_components/jquery/jquery.js',
    //'assets/bower_components/i18next/i18next.js',
    //'assets/bower_components/underscore/underscore.js',
    'assets/bower_components/amd-loadr/loadr.js',

    // boostrap vendors
    'assets/bower_components/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/transition.js',
    'assets/bower_components/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/dropdown.js',
    'assets/bower_components/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/tooltip.js',
    'assets/bower_components/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/button.js',
    'assets/bower_components/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/collapse.js',

    // main modules
    'assets/scripts/modules/main.js',
    '.tmp/transpile/modules/**/*.js'
  ],

  // HTML 5 Shiv, JSON Polyfill, CSS3 Polyfill
  '.tmp/public/scripts/polyfill.js': [
    'assets/bower_components/html5shiv/dist/html5shiv.js',
    'assets/bower_components/json2/json2.js',
    'assets/bower_components/respond/dest/respond.src.js'
  ]

};

module.exports = modules;
