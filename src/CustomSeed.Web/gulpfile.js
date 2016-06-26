
var gulp = require('gulp');
var ts = require('gulp-typescript');
var tsProject = ts.createProject('tsconfig.json');

gulp.task('default', ['scripts'], function () {
    gulp.src('node_modules/angular/angular.js').pipe(gulp.dest('wwwroot/libs'));

    var tsResult = tsProject.src().pipe(ts(tsProject));

    return tsResult.js.pipe(gulp.dest('release'));

});

gulp.task('scripts', function () {

    var tsResult = tsProject.src().pipe(ts(tsProject));

    return tsResult.js.pipe(gulp.dest('wwwroot/app'));
});
