var gulp = require('gulp'),
    jade = require('gulp-jade'),
    less = require('gulp-less'),
    jshint = require('gulp-jshint'),
    concat = require('gulp-concat'),
    cleancss = require('gulp-cleancss'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    watch = require('gulp-watch'),
    livereload = require('gulp-livereload');

//Compile Jade

gulp.task('jade', function () {
    return gulp.src('app/**/*.jade')
        .pipe(jade())
        .pipe(gulp.dest('dist'))
        .pipe(livereload());
});

//Compile Less

gulp.task('less', function () {
   return  gulp.src('app/**/*.less')
       .pipe(less(
           {compress: true}
       ))
       .pipe(concat('main.min.css'))
       .pipe(gulp.dest('dist/styles'))
       .pipe(livereload());
});

//Concat Minify CSS

gulp.task('concatCss', function () {
    gulp.src('app/styles/dep/*.css')
        .pipe(concat('all.min.css'))
        .pipe(gulp.dest('dist/styles'));
});

//Finds Bugs JsHint

gulp.task('lint', function () {
    gulp.src('app/scripts/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(livereload());
});

//Concat Minify JsFiles

gulp.task('minjs', function () {
    gulp.src('app/scripts/dep/**/*.js')
        .pipe(concat('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/scripts'));
});

gulp.task('mainjs', function () {
    gulp.src('app/scripts/*.js')
        .pipe(concat('app.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/scripts'));
});

// Livereload Tasks
gulp.task('watch', function() {
    livereload.listen();
    gulp.watch('app/styles/*.less', ['styles']);
    gulp.watch('app/scripts/*.js', ['lint','mainjs']);
    gulp.watch('app/*.jade', ['jade']);
});

//Production -> also know as the "magic" task

gulp.task('magic', ['jade','less','concatCss','lint','minjs','mainjs'], function () {
    gulp.src('app/images/**').pipe(gulp.dest('dist/images'));
    gulp.src('app/data/*.json').pipe(gulp.dest('dist/data'));
    gulp.src('app/fonts/**').pipe(gulp.dest('dist/fonts'));
});











