const gulp = require('gulp');
const typescript = require('gulp-typescript');
const plumber = require('gulp-plumber');

gulp.task('compile:rules', gulp.series('clean:rules', () => {
	const project = typescript.createProject('tsconfig.json');

	return gulp.src(['src/rules/**/*.ts'], { base: 'src/rules' })
		.pipe(plumber())
		.pipe(project())
		.pipe(gulp.dest('rules'));
}));

gulp.task('compile:test', gulp.series('clean:test', () => {
	const project = typescript.createProject('tsconfig.json');

	return gulp.src(['src/test/**/*.ts'], { base: 'src/test' })
		.pipe(plumber())
		.pipe(project())
		.pipe(gulp.dest('test'));
}));
