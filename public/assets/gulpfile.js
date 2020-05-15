var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var concatCss = require('gulp-concat-css');
var minifyCss = require('gulp-minify-css');

gulp.task('uglify', function(){
	gulp.src(['js/moment.js', 'js/daterangepicker.js', 'js/design/libs/modernizr-2.7.1.min.js', 'js/design/c3-chart/d3.v3.js', 'js/design/c3-chart/c3.min.js', 'js/copyText.js', 'js/html5slider.js', 'js/ZeroClipboard.min.js', 'js/main.js'])
	.pipe(uglify())
	.pipe(concat('all.js'))
	.pipe(gulp.dest('js_build'));
});

gulp.task('minify-css', function(){
	gulp.src(['css/design/screen.css', 'css/design/dev.css', 'css/design/rwd.css', 'js/design/c3-chart/c3.min.css'])
	.pipe(minifyCss())
	.pipe(concatCss('all.css'))
	.pipe(gulp.dest('css_build'));
});

gulp.task('watch', function(){
	gulp.watch('js/*.js', ['uglify']);
	gulp.watch('css/*.css', ['minify-css']);
})

gulp.task('default', ['uglify', 'minify-css', 'watch']);