module.exports = function (grunt) {
  grunt.registerTask('prod', [
    'validate',
    'compileAssets',
    'cssmin',
    'imagemin',
    'strip',
    'uglify',
    'hash'
  ]);
};
