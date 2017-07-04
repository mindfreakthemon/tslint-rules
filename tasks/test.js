let gulp = require('gulp');
let mocha = require('gulp-spawn-mocha');

gulp.task('test', ['compile:test'], () => {
	return gulp.src(['typings/index.d.ts', 'test/**/*.js'], { read: false })
		.pipe(mocha({
			// debugBrk: DEBUG,
			// r: 'node_modules/chai/chai.js',
			R: 'nyan'
		}));
});


