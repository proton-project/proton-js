var gulp       = require('gulp'),
    ts         = require('gulp-typescript'),
    concat     = require('gulp-concat'),
    uglify     = require('gulp-uglify'),
    sourcemaps = require('gulp-sourcemaps'),
    rename     = require('gulp-rename');

var sourcePath = './src';
var jsPath     = './js';
var distPath   = './';
var outputName = 'proton';

var tsProject = ts.createProject('tsconfig.json', {
  typescript: require('typescript'),
});

//typescript task
gulp.task('tsc', function(){
	gulp.src([sourcePath + '/**/*.ts'])
	.pipe(tsProject())
    .pipe(sourcemaps.init({
      loadMaps: true,
    }))
    .pipe(sourcemaps.write('.'))
	.pipe(gulp.dest(jsPath + '/'));
});

//JS minify
gulp.task('compress', function () {
	gulp.src(jsPath + '/**/*.js')
	.pipe(concat(outputName + '.js'))
	.pipe(gulp.dest(distPath))
	.pipe(rename(outputName + '.min.js'))
	//.pipe(uglify())
	.pipe(gulp.dest(distPath));
});

// JS Copy js assets
gulp.task('copy:assets', function() {
    gulp.src('bower_components/binarysocket/client/dist/binarysocket.min.js')
    .pipe(gulp.dest(jsPath));
});

//typescript watch
gulp.task('tsc:watch', function () {
	gulp.watch(sourcePath + '/**/*.ts', ['tsc']);
});

//typescript watch
gulp.task('js:watch', function () {
	gulp.watch(jsPath + '/**/*.js', ['compress']);
});

gulp.task("default", ['copy:assets', 'tsc', 'compress', 'tsc:watch', 'js:watch']);