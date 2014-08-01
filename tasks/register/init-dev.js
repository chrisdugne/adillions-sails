module.exports = function (grunt) {
  grunt.registerTask('init:dev', ['clean', 'bower', 'browserify:vendor']);
};
