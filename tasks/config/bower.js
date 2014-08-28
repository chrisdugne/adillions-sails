/*
    Task to copy bower components to be used on the client side
    as browserify shim.
  
    note : in bower.json -> exportsOverride is used by this task
  
    https://www.npmjs.org/package/grunt-bower-task
*/
module.exports = function (grunt) {

  grunt.config.set('bower', {
    copy: {
      options: {
        targetDir: '.tmp/build/vendors',
        layout: 'byComponent'
      }
    }
  });

};
