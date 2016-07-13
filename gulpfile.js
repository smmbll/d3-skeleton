var gulp = require('gulp');
var connect = require('gulp-connect');
var traceur = require('gulp-traceur');
var sass = require('gulp-ruby-sass');

function errorWatcher(err) {
  console.log(err);

  this.emit('end');
}

gulp.task('connect', function(){
  connect.server({
    livereload: true,
    port: 8005
  });
});

gulp.task('reload', function(){
  gulp.src('./dist/**/*.*')
  .pipe(connect.reload());
});

gulp.task('sass', function(){
  sass('./sass/*.scss')
    .on('error', sass.logError)
    .pipe(gulp.dest('dist/css'));
});

gulp.task('traceur', function() {
  gulp.src('./scripts/*.js')
  .pipe(traceur())
  .on('error',errorWatcher)
  .pipe(gulp.dest('dist/scripts'));
});

gulp.task('watch', function(){
  gulp.watch(['./sass/*.scss','./scripts/*.js','./dist/**/*.*'],['sass','traceur','reload']);
});

gulp.task('default', ['connect','sass','traceur','watch','reload']);
