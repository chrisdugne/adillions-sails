module.exports = function (grunt) {
	grunt.registerTask('prod', [
		'compileAssets',
    'cssmin',
    'imagemin',
    'strip',
		'uglify',
    'hash'
	]);
};
