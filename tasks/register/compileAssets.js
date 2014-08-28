module.exports = function (grunt) {
  grunt.registerTask('compileAssets', [
    'clean:dev',
    'sass:dev',
    'es6',
    'handlebars',
    'copy:dev',
    'concat:dev'
  ]);
};
