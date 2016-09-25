let gulp = require('gulp');

require('./tasks/compile');
require('./tasks/clean');
require('./tasks/test');

gulp.task('default', ['clean', 'compile:rules', 'compile:tests']);
