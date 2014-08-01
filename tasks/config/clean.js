/**
 * Clean files and folders.
 *
 * ---------------------------------------------------------------
 *
 * This grunt task is configured to clean out the contents in the .tmp/public of your
 * sails project.
 *
 * For usage docs see:
 * 		https://github.com/gruntjs/grunt-contrib-clean
 */
module.exports = function (grunt) {

  grunt.config.set('clean', {
    clientbuild: ['.tmp/build'],
    webapp: ['.tmp/public/scripts/webapp.js', '.tmp/build'],
    dev: ['.tmp/public/**'],
    build: ['www']
  });

};
