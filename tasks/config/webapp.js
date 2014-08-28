module.exports = function (grunt) {

  grunt.config.set('browserify', {
    app: {
      files: {
        '.tmp/public/scripts/webapp.js': ['webapp/lib/application.js']
      },
      options: {
        bundleOptions: {
          debug: true
        }
      }
    }
  });

};
