
var gulp = require('gulp');
var del = require('del');
var sequence = require('run-sequence');

var ts = require('gulp-typescript');
var sass = require('gulp-sass');

var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');

var through = require('through2');

var tsProject = ts.createProject('tsconfig.json', { outFile: 'app.js'  });

gulp.task('clean', function () {

     return del(['wwwroot/app', 'wwwroot/css', 'wwwroot/libs']);
});

gulp.task('default', function (callback) {

    // delete the folder to prevent KoreBuild from finding the .vcxproj
    del('node_modules\node-sass\src\libsass\win');

    // 1. Run 'clean' (obviously required to finish first)
    // 2. Run 'copy' and 'scripts' in parallel (independent from each other)
    // 3. Run 'styles' last (might override some of the stylesheets, i.e. bootstrap)
    return sequence('clean', ['copy', 'scripts'], 'styles');
});

gulp.task('copy', ['copy:html', 'copy:libs']);

gulp.task('copy:libs', function () {

    return gulp.src([
        'node_modules/systemjs/dist/system.js',
        'node_modules/systemjs/dist/system.js.map',
        'node_modules/systemjs/dist/system.src.js',
        'node_modules/systemjs/dist/system-polyfills.js',
        'node_modules/systemjs/dist/system-polyfills.js.map',
        'node_modules/systemjs/dist/system-polyfills.src.js',

        //'node_modules/bootstrap/dist/css/bootstrap.css',
        //'node_modules/bootstrap/dist/css/bootstrap.css.map',
        //'node_modules/bootstrap/dist/css/bootstrap.min.css',
        //'node_modules/bootstrap/dist/css/bootstrap.min.css.map',

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

gulp.task('copy:html', function () {

    return gulp.src('app/**/*.html', { base: 'app' }).pipe(gulp.dest('wwwroot/app'));
});

gulp.task('scripts', function () {

    function prefixSources(prefix) {
        function process(file, encoding, callback) {

            if (file.sourceMap) {
                for (i in file.sourceMap.sources) {
                    var source = file.sourceMap.sources[i];
                    file.sourceMap.sources[i] = prefix +source;
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

gulp.task('styles', ['sass:custom', 'sass:bootstrap']);

gulp.task('sass:custom', function () {

    return gulp.src('styles/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('wwwroot/css'));
});

gulp.task('sass:bootstrap', function () {

    return gulp.src('bootstrap/bootstrap.scss')
        .pipe(sourcemaps.init())
        .pipe(sass.sync({
            includePaths: ['node_modules/bootstrap-sass/assets/stylesheets']
    }).on('error', sass.logError))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('wwwroot/libs/bootstrap/dist/css'));
});

gulp.task('watch', function () {

    gulp.watch(['tsconfig.json', 'app/**/*.ts'], ['scripts']);
    gulp.watch('app/**/*.html', ['copy:html']);
    gulp.watch(['styles/**/*.scss'], ['styles:custom']);
    gulp.watch(['bootstrap/**/*.scss'], ['sass:bootstrap']);
});
