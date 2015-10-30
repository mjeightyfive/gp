'use strict';

var gulp = require('gulp'),
    del = require('del'),
    sequence = require('run-sequence'),
    header = require('gulp-header'),
    mochaPhantomJS = require('gulp-mocha-phantomjs');

var $ = require('gulp-load-plugins')();

var major = $.util.env.major || false;
var minor = $.util.env.minor || false;
var patch = $.util.env.patch || false;

var pkg = require('./package.json');

var banner = [
    '/*! ',
    '<%= package.name %> ',
    'v<%= package.version %> | ',
    '(c) ' + new Date().getFullYear() + ' <%= package.author %> |',
    ' <%= package.homepage %>',
    ' */',
    '\n'
].join('');


if(!major && !minor) {
    patch = true;
}

function handleError(err) {
    console.log(err.toString());
}

gulp.task('clean', del.bind(null, ['./dist']));

gulp.task('default', ['clean'], function() {
    sequence('scripts', 'jshint', 'test');
});

gulp.task('scripts', function() {
    gulp.src('./src/*.js')
        .pipe(header(banner, {
            package: pkg
        }))
        .pipe(gulp.dest('./dist'))
        .pipe($.rename({
            suffix: '.min'
        }))
        .pipe($.uglify({
            preserveComments: 'some'
        }))
        .pipe(gulp.dest('./dist'));
});

gulp.task('jshint', function() {
    return gulp.src('./src/*.js')
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish'));
});

gulp.task('test', function() {
    gulp.src('./tests/*.html')
        .pipe(mochaPhantomJS())
        .on('error', handleError)
        .emit('end');
});

gulp.task('bump', function() {
    gulp.src(['./bower.json', './package.json'])
        .pipe($.
            if(major, $.bump({
                type: 'major'
            })))
        .pipe($.
            if(minor, $.bump({
                type: 'minor'
            })))
        .pipe($.
            if(patch, $.bump({
                type: 'patch'
            })))
        .pipe(gulp.dest('./'));
});

