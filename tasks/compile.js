let gulp = require('gulp');
let typescript = require('gulp-tsc');
let plumber = require('gulp-plumber');

gulp.task('compile:rules', ['clean:rules'], () => {
	let compilerOptions = require('../tsconfig.json').compilerOptions;

	return gulp.src(['typings/index.d.ts', 'src/rules/**/*.ts'], { base: 'src/rules' })
		.pipe(plumber())
		.pipe(typescript(compilerOptions))
		.pipe(gulp.dest('rules'));
});

gulp.task('compile:test', ['clean:test'], () => {
	let compilerOptions = require('../tsconfig.json').compilerOptions;

	return gulp.src(['typings/index.d.ts', 'src/test/**/*.ts'], { base: 'src/test' })
		.pipe(plumber())
		.pipe(typescript(compilerOptions))
		.pipe(gulp.dest('test'));
});
