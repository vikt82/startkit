'use strict';

var gulp = require('gulp');
var glp = require('gulp-load-plugins')();

// Paths
var path = {
    pug: 'src/pug/pages/*.pug',
    watchPug: ['src/pug/**/*.pug', 'src/page/**/*.pug', 'src.blocks/**/*.pug']
}

// Pug
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

// =============