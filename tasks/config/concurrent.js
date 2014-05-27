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
    dev: {
      tasks: [
        'nodemon:dev', 'watch'
      ],
      options: {
        logConcurrentOutput: true
      }
    },
    prod: {
      tasks: [
        'nodemon:prod', 'watch'
      ],
      options: {
        logConcurrentOutput: true
      }
    }
  });

};
