const gulp = require('gulp');
const browserify = require('browserify');
const watchify = require('watchify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const eslint = require('gulp-eslint');
const browserSync = require('browser-sync').create();
const babel = require('gulp-babel');
const del = require('del');
const copy = require('gulp-copy');
const uglify = require('gulp-uglify');

function map_error(err) {
  console.log('Error : ' + err.message);
  this.emit('end');
};

function bundle_js(bundler) {
  return bundler.bundle()
  .on('error', map_error)
  .pipe(source('bundle.js'))
  .pipe(gulp.dest('./demo/app'));
};

gulp.task('watchify', () => {
  const bundler = watchify(browserify('./demo/src/app.js', Object.assign(watchify.args, { debug: true }))
  .transform('babelify', { presets: ['es2015', 'react', 'stage-1'] }), { verbose: true });
  bundle_js(bundler);
  bundler.on('update', () => {
    bundle_js(bundler);
  });
  bundler.on('log', (msg) => {
    console.log(msg);
  });
});

gulp.task('browserSync',() => {
  browserSync.init({
    notify: false,
    port: 3000,
    open: true,
    server: {
      baseDir: ['./']
    },
  });
  gulp.watch('demo/app/bundle.js').on('change', browserSync.reload);
});

gulp.task('eslint', () => {
  return gulp.src(['demo/src/**/*.js'])
  .pipe(eslint())
  .pipe(eslint.format())
  .pipe(eslint.failAfterError());
});

gulp.task('compress', () => {
  return gulp.src('demo/app/bundle.js')
  .pipe(uglify({}))
  .pipe(gulp.dest('demo/app/'));
});

gulp.task('default', ['watchify', 'browserSync']);
