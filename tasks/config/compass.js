/**
 * Create spritesheet.
 *
 * ---------------------------------------------------------------
 *
 * Compiles coffeeScript files from `assest/js` into Javascript and places them into
 * `.tmp/public/js` directory.
 *
 * For usage docs see:
 *    https://github.com/gruntjs/grunt-contrib-coffee
 */
module.exports = function (grunt) {

  grunt.config.set('compass', {
    sprites: {
      options: {
        clean: false,
        noLineComments: true,
        imagesDir: 'assets/images/sprites/',
        imagesPath: 'assets/images/sprites/',
        generatedImagesDir: 'assets/images/sprites/',
        httpGeneratedImagesPath: '/images/sprites/',
        sassDir: 'assets/styles/sprites/',
        specify: 'assets/styles/sprites/package.scss',
        cssDir: '.tmp/compass'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-compass');
};
