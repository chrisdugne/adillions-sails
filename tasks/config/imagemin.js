/**
 * Minify images.
 *
 * ---------------------------------------------------------------
 *
 * For usage docs see:
 *    https://github.com/gruntjs/grunt-contrib-imagemin
 */
module.exports = function(grunt) {

  grunt.config.set('imagemin', {
    options : {
      optimizationLevel: 2, // default:7 (very slow)
      pngquant: false,
      progressive: false,
    },
    prod: {
      files: [{
        expand: true,
        cwd: 'assets/images/',
        src: ['**/*.{png,jpg}', '!sprites/**', 'sprites/*.{png,jpg}'], // all files expect sprites src
        dest: '.tmp/public/images/'
      }]
    }
  });

  grunt.loadNpmTasks('grunt-contrib-imagemin');
};
