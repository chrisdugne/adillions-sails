/**
 * Run grunt tasks concurrently
 *
 * ---------------------------------------------------------------
 *
 * For usage docs see:
 *    https://github.com/sindresorhus/grunt-concurrent
 */
module.exports = function (grunt) {

  grunt.config.set('concurrent', {
    server: {
      tasks: [
        'nodemon', 'watch'
      ],
      options: {
        logConcurrentOutput: true
      }
    }
  });

  grunt.loadNpmTasks('grunt-concurrent');
};
