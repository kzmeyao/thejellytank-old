var gulp = require('gulp');
var gutil = require('gulp-util');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var concatCSS = require('gulp-concat-css');

gulp.task('default', function () {
  gulp.src('build', {read: false})
    .pipe(clean());

  gulp.src([
      'js/vendor/jquery-1.10.2.min.js',
      'js/vendor/underscore-min.js',
      'js/vendor/backbone-min.js',
      'js/vendor/handlebars-v1.3.0.js',
      'js/vendor/TweenMax.min.js',
      'js/vendor/ScrollToPlugin.min.js',
      'js/vendor/500px-js-sdk.js',
      'js/vendor/swipeview.js'
    ])
    .pipe(concat('vendor.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('build/js'))
    .on('error', gutil.log);

  gulp.src([
      'js/bloom.js',
      'js/Work.js',
      'js/Works.js',
      'js/CloudView.js',
      'js/WorksView.js',
      'js/HelloView.js',
      'js/OceanView.js',
      'js/TheWorldView.js',
      'js/AppRouter.js',
      'js/main.js'
    ])
    .pipe(concat('non-vendor.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('build/js'))
    .on('error', gutil.log);

  gulp.src([
      'fonts/icomoon.eot',
      'fonts/icomoon.svg',
      'fonts/icomoon.ttf',
      'fonts/icomoon.woff'
    ])
    .pipe(gulp.dest('build/fonts'));

  gulp.src([
      'css/normalize.css',
      'css/main.css',
      'css/global.css'
    ])
    .pipe(concatCSS("bundle.css"))
    .pipe(gulp.dest('build/styles'));
});
