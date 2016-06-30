
var gulp = require('gulp');

var ts = require('gulp-typescript');
var sass = require('gulp-sass');

var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');

var through = require('through2');

var tsProject = ts.createProject('tsconfig.json', { outFile: 'app.js'  });

gulp.task('default', ['scripts', 'copy', 'styles'], function () {

    gulp.src([
        'node_modules/systemjs/dist/system.js',
        'node_modules/systemjs/dist/system.js.map',
        'node_modules/systemjs/dist/system.src.js',
        'node_modules/systemjs/dist/system-polyfills.js',
        'node_modules/systemjs/dist/system-polyfills.js.map',
        'node_modules/systemjs/dist/system-polyfills.src.js',


        'node_modules/bootstrap/dist/css/bootstrap.css',
        'node_modules/bootstrap/dist/css/bootstrap.css.map',
        'node_modules/bootstrap/dist/css/bootstrap.min.css',
        'node_modules/bootstrap/dist/css/bootstrap.min.css.map',

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

    function prefixSources(prefix) {
        function process(file, encoding, callback) {

            if (file.sourceMap) {
                for (i in file.sourceMap.sources) {
                    var source = file.sourceMap.sources[i];
                    file.sourceMap.sources[i] = prefix + source;
                }
            }

            this.push(file);
            return callback();
        }

        return through.obj(process);
    }

    var tsResult = tsProject.src()
        .pipe(sourcemaps.init())
        .pipe(ts(tsProject));

    return tsResult.js
        .pipe(prefixSources('../../app/'))
        .pipe(sourcemaps.write('.', { sourceRoot: "", includeContent: false }))
        .pipe(gulp.dest('wwwroot/app'));
});

gulp.task('styles', function () {
    
    return gulp.src('styles/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass.sync({
            includePaths: ['node_modules/bootstrap-sass/assets/stylesheets'],
        }).on('error', sass.logError))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('wwwroot/css'));
});

gulp.task('watch', ['scripts', 'copy'], function () {

    gulp.watch(['tsconfig.json', 'app/*.ts'], ['scripts']);
    gulp.watch('app/**/*.html', ['copy']);
    gulp.watch('styles/**/*.scss', ['styles']);
});
