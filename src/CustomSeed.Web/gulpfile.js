
var gulp = require('gulp');
var ts = require('gulp-typescript');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');

var tsProject = ts.createProject('tsconfig.json', { sortOutput: true });

gulp.task('default', ['scripts'], function () {

    gulp.src('node_modules/angular/angular.js').pipe(gulp.dest('wwwroot/libs'));

});

gulp.task('scripts', function () {

    var tsResult = tsProject.src()
        .pipe(sourcemaps.init())
        .pipe(ts(tsProject));

    return tsResult.js
        .pipe(concat('app.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('wwwroot/app'));
});

gulp.task('watch', ['scripts'], function() {
    gulp.watch('app/*.ts', ['scripts']);
});
