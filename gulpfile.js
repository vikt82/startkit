'use strict';

var gulp = require('gulp');
var glp = require('gulp-load-plugins')();

// Paths
var path = {
    pug: 'src/pug/pages/*.pug',
    watchPug: ['src/pug/**/*.pug', 'src/page/**/*.pug', 'src.blocks/**/*.pug'],
    sass: ['src/sass/**/*.{scss,sass}', 'src/pug/pages/**/*.{scss,sass}', 'src.blocks/**/*.{scss,sass}'],
    watchSass: 'src/sass/index.scss',
}

// START: Pug =============
gulp.task('pug:dev', function buildHTML() {
    return gulp.src(path.pug)
        .pipe(glp.pug({
            pretty: true
        }))
        .pipe(gulp.dest('dev/'));
});

gulp.task('pug:build', function buildHTML() {
    return gulp.src(path.pug)
        .pipe(glp.pug({
            pretty: true
        }))
        .pipe(gulp.dest('app/'));
});
// END: Pug =============

// START: sass =============
gulp.task('sass:dev', function () {
    return gulp.src(path.sass)
        .pipe(glp.plumber())
        .pipe(glp.sourcemaps.init())
        .pipe(glp.sass())
        .on("error", glp.notify.onError({
            message: "Error: <%= error.message %>",
            title: "Style"
        }))
        .pipe(glp.autoprefixer({
            browsers: ['last 10 versions'],
            cascade: false
        }))
        .pipe(glp.csso())
        .pipe(glp.sourcemaps.write())
        .pipe(gulp.dest('dev/static/css'));
});

gulp.task('sass:build', function () {
    return gulp.src(path.sass)
        .pipe(glp.plumber())
        .pipe(glp.sourcemaps.init())
        .pipe(glp.sass())
        .on("error", glp.notify.onError({
            message: "Error: <%= error.message %>",
            title: "Style"
        }))
        .pipe(glp.autoprefixer({
            browsers: ['last 10 versions'],
            cascade: false
        }))
        .pipe(glp.csso())
        .pipe(glp.sourcemaps.write('map'))
        .pipe(gulp.dest('app/static/css'));
});
// END: sass =============

// START: del =============
var del = require('del');

gulp.task('clean', function() {
    return del(['dev', 'app']);
});
// END: del =============

