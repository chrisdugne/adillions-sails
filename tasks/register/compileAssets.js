module.exports = function (grunt) {
  grunt.registerTask('compileAssets', [
    'clean:dev',
    'sass:dev',
    'es6',
    'copy:dev',
    'concat:dev'
  ]);
};
