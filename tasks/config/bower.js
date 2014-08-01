/*
    Task to copy bower components to be used on the client side
    as browserify shim.

    https://www.npmjs.org/package/grunt-bower-task
*/
module.exports = function (grunt) {

  grunt.config.set('bower', {
    install: {
      options: {
        targetDir: '.tmp/public/scripts/requires',
        layout: 'byComponent'
      }
    }
  });

};
