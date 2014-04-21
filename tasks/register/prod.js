module.exports = function (grunt) {
	grunt.registerTask('prod', [
		'compileAssets',
		'uglify',
		'cssmin',
		'sails-linker:devTpl'
	]);
};
