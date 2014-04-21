module.exports = function (grunt) {
	grunt.registerTask('linkAssets', [
		'sails-linker:devTpl'
	]);
};
