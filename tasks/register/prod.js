module.exports = function (grunt) {
  grunt.registerTask('prod', [
    'validate',
    'compileAssets',
    'webapp',
    'cssmin',
    'imagemin:prod',
    'strip',
    'uglify',
    'hash'
  ]);
};
