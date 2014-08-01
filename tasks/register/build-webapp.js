module.exports = function (grunt) {
  grunt.registerTask('webapp', ['clean:webapp', 'bower:copy', 'browserify:app', 'clean:clientbuild']);
};
