module.exports = function (grunt) {
	grunt.registerTask('syncAssets', [
    'newer:sass:dev',
		'sync:dev',
    'newer:concat:dev'
	]);
  grunt.loadNpmTasks('grunt-newer');
};
