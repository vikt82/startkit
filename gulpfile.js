'use strict';

var gulp = require('gulp');
var glp = require('gulp-load-plugins')();
var browserSync = require('browser-sync').create();

// Paths
var path = {
    pug: 'src/pug/pages/*.pug',
    watchPug: ['src/pug/**/*.pug', 'src/blocks/**/*.pug'],
    sass: ['src/sass/main.scss'],
    watchSass: ['src/sass/**/*.{scss,sass}', 'src/pug/pages/**/*.{scss,sass}', 'src.blocks/**/*.{scss,sass}'],
    staticImg: ['src/static/**/*.{jpg,jpeg,png,gif}']
}

// START: serve =============
gulp.task('serve', function() {
    browserSync.init({
        server: {
            baseDir: "dev",
            notify: true
        }
    });
    browserSync.watch("dev", browserSync.reload);
});
// END: serve =============

// START: Pug =============
gulp.task('pug:dev', function buildHTML() {
    return gulp.src(path.pug)
        .pipe(glp.plumber())
        .pipe(glp.debug())
        .pipe(glp.pug({
            pretty: true
        }))
        .on("error", glp.notify.onError({
            message: "Error: <%= error.message %>",
            title: "Pug"
        }))
        .pipe(glp.debug())
        .pipe(gulp.dest('dev/'))
        .on('end', browserSync.reload);
});

gulp.task('pug:build', function buildHTML() {
    return gulp.src(path.pug)
        .pipe(glp.debug())
        .pipe(glp.pug({
            pretty: true
        }))
        .pipe(glp.debug())
        .pipe(gulp.dest('app/'));
});
// END: Pug =============

// START: sass =============
gulp.task('sass:dev', function () {
    return gulp.src(path.sass)
        .pipe(glp.plumber())
        .pipe(glp.sourcemaps.init())
        .pipe(glp.debug())
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
        .pipe(glp.debug())
        .pipe(gulp.dest('dev/static/css'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('sass:build', function () {
    return gulp.src(path.sass)
        .pipe(glp.plumber())
        .pipe(glp.debug())
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
        .pipe(glp.debug())
        .pipe(gulp.dest('app/static/css'));
});
// END: sass =============

// START: static =============
gulp.task('static:dev', function() {
    return gulp.src(path.staticImg)
        .pipe(glp.debug())
        .pipe(glp.plumber())
        .pipe(gulp.dest('dev/static/img'));
});
// END: static =============

// START: del =============
var del = require('del');

gulp.task('clean', function() {
    return del(['dev', 'app']);
});
// END: del =============


// START: watch =============
gulp.task('watch', function() {
    gulp.watch(path.watchPug, ['pug:dev']),
    gulp.watch(path.watchSass, ['sass:dev']),
    gulp.watch(path.staticImg, ['static:dev'])
});
// END: watch =============

// START: watch =============
gulp.task('dev', ['pug:dev','sass:dev', 'static:dev', 'watch', 'serve']);

gulp.task('build', ['clean', 'pug:build', 'sass:build']);
// END: watch =============



