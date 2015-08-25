/**
 * Precompiles Underscore templates to a `.jst` file.
 *
 * ---------------------------------------------------------------
 *
 * (i.e. basically it takes HTML files and turns them into tiny little
 *  javascript functions that you pass data to and return HTML. This can
 *  speed up template rendering on the client, and reduce bandwidth usage.)
 *
 * For usage docs see:
 * 		https://github.com/gruntjs/grunt-contrib-jst
 *
 */

module.exports = function(grunt) {

	grunt.config.set('jst', {
		dev: {

			// To use other sorts of templates, specify a regexp like the example below:
			options: {
				prettify: true,
				amd: false,

				// strips whitespace characters from the beginning and the end of each line.
				processContent: function(src) {
					return src.replace(/(^\s+|\s+$)/gm, '');
				}
			},

			files: {
				// e.g.
				// 'relative/path/from/gruntfile/to/compiled/template/destination'  : ['relative/path/to/sourcefiles/**/*.html']
				'.tmp/public/jst.js': require('../pipeline').templateFilesToInject,
				//'.tmp/public/admin_jst.js': require('../pipeline').templateAdminFilesToInject
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jst');
};
