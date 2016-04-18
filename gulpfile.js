'use strict';

var gulp = require('gulp');
var concat = require('gulp-concat');

gulp.task('concat', function() {
  return gulp.src(['./public_html/js_files/const.js',
                   './public_html/js_files/jquery.js',
                   './public_html/js_files/vue.js',
                   './public_html/js_files/like-button.js'])
    .pipe(concat('all.js'))
    .pipe(gulp.dest('./public_html/js/'));
});
