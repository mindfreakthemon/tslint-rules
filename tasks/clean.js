let gulp = require('gulp');
let del = require('del');

gulp.task('clean:rules', () => {
	return del(['rules']);
});

gulp.task('clean:test', () => {
	return del(['test']);
});
