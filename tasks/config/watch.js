/**
 * Run predefined tasks whenever watched file patterns are added, changed or deleted.
 *
 * ---------------------------------------------------------------
 *
 * Watch for changes on
 * - files in the `assets` folder
 * - the `tasks/pipeline.js` file
 * and re-run the appropriate tasks.
 *
 * For usage docs see:
 * 		https://github.com/gruntjs/grunt-contrib-watch
 *
 */

module.exports = function (grunt) {

  grunt.config.set('watch', {
    api: {
      // API files to watch:
      files: ['api/**/*']
    },
    // This task cannot use 'newer' as updates to imported dependencies are not picked up
    styles: {
      files: [
        'assets/styles/**/*.scss'
      ],
      tasks: [
        'sass:dev'
      ]
    },
    // Transpile all ES6 modules and components. This task could use 'newer' but, as transpile is very
    // fast, it ends up being *slower* that just rebuilding everything
    modules: {
      files: [
        'assets/scripts/modules/**/*.js',
      ],
      tasks: [
        'transpile:modules',
        'newer:concat:dev'
      ]
    },

    apps: {
      files: [
        'assets/scripts/*.js',
      ],
      tasks: [
        'newer:concat:dev'
      ]
    }
  });

};
