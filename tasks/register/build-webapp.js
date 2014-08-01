module.exports = function (grunt) {
  grunt.registerTask('webapp:init', ['clean:webapp', 'bower']);
  grunt.registerTask('webapp:dev', ['webapp:init', 'browserify:app']);
  grunt.registerTask('webapp:prod', ['webapp:init', 'browserify:app', 'uglify-webapp']);
};
