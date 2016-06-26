
var gulp = require('gulp');

gulp.task('default', function () {
    gulp.src('node_modules/angular/angular.js').pipe(gulp.dest("wwwroot/libs"));
});