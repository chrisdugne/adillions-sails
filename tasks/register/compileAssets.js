module.exports = function (grunt) {
	grunt.registerTask('compileAssets', [
		'clean:dev',
    'sass:dev',
		'copy:dev',
		'coffee:dev',
    'concat:dev'
	]);
};
