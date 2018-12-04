const gulp = require('gulp');

require('./tasks/clean');
require('./tasks/compile');
require('./tasks/test');

gulp.task('default', gulp.series('clean', 'compile:rules', 'compile:test'));
