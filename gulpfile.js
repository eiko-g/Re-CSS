'use strict';
const {
    src,
    dest,
    series,
    parallel,
    watch
} = require('gulp');
const minify = require('gulp-minify');
const del = require('delete');
const sass = require('gulp-dart-sass');
const sourcemaps = require('gulp-sourcemaps');

function clean() {
    return del('dist/**');
}

function buildCss() {
    return src('src/scss/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(sourcemaps.write('.'))
        // .pipe(rename({
        //     extname: '.min.css'
        // }))
        .pipe(dest('dist/css/'))
}

function watchScss() {
    return src('src/scss/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write('.'))
        .pipe(dest('cache/css/'))
}

exports.clean = clean;
exports.buildCss = buildCss;
exports.build = series(clean, parallel(buildCss));
exports.default = function () {
    watch(['src/scss/*.scss','docs/src/*.scss'], watchScss);
};