var gulp = require('gulp');
var postcss = require('gulp-postcss');

var autoprefixer = require('autoprefixer');

/**
 * Test plugin here
 */
var testPlugin = require('postcss').plugin('postcss-test', function myplugin(options) {
	const propertyMatch = /^overflow$/;

    return function (css) {
		css.walkDecls(propertyMatch, (decl) => {
			decl.cloneBefore({
				prop: 'white-space',
				value: 'nowrap'
			});
			decl.cloneBefore({
				prop: 'overflow',
				value: 'hidden'
			});
			decl.cloneBefore({
				prop: 'text-overflow',
				value: 'ellipsis'
			});

			decl.remove();
		});
 
    }
});
/*** End test plugin ***/


gulp.task('default', function () {
  var processors = [
    testPlugin,
    autoprefixer
  ];
  return gulp.src('./src/*.css')
    .pipe(postcss(processors))
    .pipe(gulp.dest('./dest'));
});