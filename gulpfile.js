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

function map_error(err) {
  console.log('Error : ' + err.message);
  this.emit('end');
};

function bundle_js(bundler) {
  return bundler.bundle()
  .on('error', map_error)
  .pipe(source('bundle.js'))
  .pipe(gulp.dest('./example/app'));
};

gulp.task('watchify', () => {
  const bundler = watchify(browserify('./example/src/app.js', Object.assign(watchify.args, { debug: true }))
  .transform('babelify', { presets: ['es2015', 'react', 'stage-1'] }), { verbose: true });
  bundle_js(bundler);
  bundler.on('update', () => {
    bundle_js(bundler);
  });
  bundler.on('log', (msg) => {
    console.log(msg);
  });
});

gulp.task('browserSync', function() {
  browserSync.init({
    notify: false,
    port: 3000,
    open: true,
    server: {
      baseDir: ['example/app']
    },
  });
  gulp.watch('example/app/bundle.js').on('change', browserSync.reload);
});

gulp.task('eslint', function() {
  return gulp.src(['src/**/*.js'])
  .pipe(eslint())
  .pipe(eslint.format())
  .pipe(eslint.failAfterError());
});

gulp.task('build:clean', function() {
  del.sync(['build']);
});

gulp.task('build', () => {
  return gulp.src('src/**/*.js')
  .pipe(babel({
    presets: ['es2015', 'stage-1', 'react'],
    plugins: ['transform-runtime']
  }))
  .pipe(gulp.dest('build/'));
});

gulp.task('build:copy', function() {
  return gulp.src(['package.json', 'README.md', 'LICENSE'])
  .pipe(copy('build/', {prefix: 1}));
});

gulp.task('clean:build', ['build:clean', 'build', 'build:copy']);

gulp.task('default', ['watchify', 'browserSync']);
