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
    prod: {
      files: [{
        expand: true,
        cwd: './assets/images',
        src: ['**/*.{png,jpg,gif}'],
        dest: '.tmp/public/images/'
      }]
    }
  });

  grunt.loadNpmTasks('grunt-contrib-imagemin');
};
