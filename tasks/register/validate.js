module.exports = function (grunt) {
  grunt.registerTask('validate', [
    'jshint:app',
    'jshint:front',
    'jsonlint'
  ]);
};
