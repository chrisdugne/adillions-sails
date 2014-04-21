// JS packaging
var modules = {

  // Main package
  '.tmp/public/scripts/main.js': [
    'assets/bower_components/jquery/jquery.js',
    'assets/bower_components/i18next/i18next.js',
    'assets/bower_components/underscore/underscore.js'
  ],

  // HTML 5 Shiv
  '.tmp/public/scripts/html5.js': [
    'assets/bower_components/html5shiv/dist/html5shiv.js'
  ],

  // JSON Polyfill
  '.tmp/public/scripts/json2.js': [
    'assets/bower_components/json2/json2.js'
  ]

};

module.exports = modules;
