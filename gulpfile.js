/* eslint-disable require-jsdoc */
var gulp = require('gulp');
var {parallel, watch} = require('gulp');
var pug = require('gulp-pug');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');

function compileSASS() {
  return gulp.src('./scss/main.scss')
      .pipe(sourcemaps.init())
      .pipe(sass().on('error', sass.logError))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('./css'));
}

function compilePUG() {
  return gulp.src('./index.pug')
      .pipe(pug({
        pretty: true,
      }))
      .pipe(gulp.dest('./'));
}

function concatJs() {
  return gulp.src(['./js/progressBar-jquery.js',
    './js/jquery.vEllipsis.js',
    './js/function.js',
    './js/custom.js'])
      .pipe(concat('main.js'))
      .pipe(gulp.dest('js'));
}

function watchBuild() {
  watch('./scss/*.scss', compileSASS);
  watch(['./modules/*.pug', './index.pug'], compilePUG);
}

exports.concatJs = concatJs;
exports.build = parallel(compilePUG, compileSASS);
exports.watchBuild = watchBuild;
