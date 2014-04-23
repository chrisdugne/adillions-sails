module.exports = function (grunt) {
	grunt.registerTask('syncAssets', [
		'less:dev',
    'sass:dev',
		'sync:dev',
		'coffee:dev',
    'concat:dev'
	]);
};
