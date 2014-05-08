/**
 * Grunt task to run nodemon
 *
 * ---------------------------------------------------------------
 *
 * For usage docs see:
 *    https://github.com/ChrisWren/grunt-nodemon
 */
module.exports = function (grunt) {

  grunt.config.set('nodemon', {
    debug: {
      script: 'app.js',
      options: {
        args: ['--env=development'],
        nodeArgs: ['--debug'],
        ignore: ['assets/**', '.tmp'],
        ext: 'js,json,hbs',
        delay: 0,
        watch: [
          'config/**/*',
          'views/_partials/*'
        ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-nodemon');
};
