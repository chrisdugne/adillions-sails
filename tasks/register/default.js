module.exports = function (grunt) {
  grunt.registerTask('default', ['validate', 'compileAssets', 'webapp:dev', 'concurrent:dev']);
};
