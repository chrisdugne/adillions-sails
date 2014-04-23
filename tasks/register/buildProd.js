module.exports = function (grunt) {
	grunt.registerTask('buildProd', [
		'compileAssets',
    'cssmin',
    'imagemin',
    'strip',
    'uglify',
    'hash',
		'clean:build',
		'copy:build'
	]);
};
