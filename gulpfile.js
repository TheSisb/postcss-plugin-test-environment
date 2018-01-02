var gulp = require('gulp');
var postcss = require('gulp-postcss');

var pattern = /[-_.]+([a-zA-Z0-9])/g;

function replacer(g) {
  var character = g[g.length - 1];
  return g[0] === '.' ? '.' + character.toLowerCase() : character.toUpperCase();
}

/**
 * Test plugin here
 */
var testPlugin = require('postcss').plugin('postcss-test', function myplugin(options) {
  return function(css) {
    css.walkRules(rule => {
      rule.selector = rule.selector.replace(pattern, replacer);
    });
  };
});
/*** End test plugin ***/

gulp.task('default', function() {
  var processors = [testPlugin];
  return gulp
    .src('./src/*.css')
    .pipe(postcss(processors))
    .pipe(gulp.dest('./dest'));
});
