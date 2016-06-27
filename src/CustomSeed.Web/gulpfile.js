
var gulp = require('gulp');
var ts = require('gulp-typescript');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');

var tsProject = ts.createProject('tsconfig.json', { sortOutput: true });

gulp.task('default', ['scripts', 'copy'], function () {

    gulp.src([
        'node_modules/angular/angular.js',
        'node_modules/angular/angular.min.js',
        'node_modules/angular/angular.min.js.map',

        'node_modules/angular-route/angular-route.js',
        'node_modules/angular-route/angular-route.min.js',
        'node_modules/angular-route/angular-route.min.js.map',

        'node_modules/angular-translate/dist/angular-translate.js',
        'node_modules/angular-translate/dist/angular-translate.min.js'
    ], { base: 'node_modules' })
        .pipe(gulp.dest('wwwroot/libs'));
});

gulp.task('copy', function () {

    gulp.src('app/**/*.html', { base: 'app' }).pipe(gulp.dest('wwwroot/app'));
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

gulp.task('watch', ['scripts', 'copy'], function () {

    gulp.watch(['tsconfig.json', 'app/*.ts'], ['scripts']);
    gulp.watch('app/**/*.html', ['copy']);
});
