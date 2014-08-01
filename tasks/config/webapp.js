module.exports = function (grunt) {

  grunt.config.set('browserify', {
    app: {
      files: {
        '.tmp/public/scripts/webapp.js': ['webapp/lib/webapp.js']
      },
      options: {
        bundleOptions: {
          debug: true
        }
      }
    }
  });

  grunt.config.set('uglify-webapp', {
    options: {
      banner: '/**! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
      mangle: true
    },
    build: {
      files: {
        /* 'override.same.dest' : [source] */
        '.tmp/public/scripts/webapp.js': ['.tmp/public/scripts/webapp.js']
      }
    }
  });

};
