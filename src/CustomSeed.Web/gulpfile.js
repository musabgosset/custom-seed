
var gulp = require('gulp');
var ts = require('gulp-typescript');
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
        .pipe(sourcemaps.write(/*'.', { sourceRoot: function(file) { return file.cwd + '/app'; } }*/))
        .pipe(gulp.dest('wwwroot/app'));
});
