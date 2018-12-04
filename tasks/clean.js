const gulp = require('gulp');
const del = require('del');

gulp.task('clean:rules', () => del(['rules']));

gulp.task('clean:test', () => del(['test']));

gulp.task('clean', gulp.series('clean:rules', 'clean:test'));
