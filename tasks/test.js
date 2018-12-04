const gulp = require('gulp');
const mocha = require('gulp-spawn-mocha');

gulp.task('test', gulp.series('compile:test', () => {
	return gulp.src(['test/**/*.js'], { read: false })
		.pipe(mocha({
			r: 'node_modules/chai/chai.js',
			R: 'spec'
		}));
}));


