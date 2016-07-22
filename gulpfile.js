// Generated on 2016-05-13 using generator-angular 0.15.1
'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var openURL = require('open');
var lazypipe = require('lazypipe');
var rimraf = require('rimraf');
var wiredep = require('wiredep').stream;
var runSequence = require('run-sequence');

var connect = require('gulp-connect');
var proxy = require('http-proxy-middleware');

var yeoman = {
  app: require('./bower.json').appPath || 'app',
  dist: 'apm_dist'
};

var paths = {
  scripts: [yeoman.app + '/js/**/*.js'],
  styles: [yeoman.app + '/css/**/*.css'],  
  views: {
    main: yeoman.app + '/index.html',
    login: yeoman.app + '/login.html',
    files: [yeoman.app + '/template/**/*.html']
  }
};

////////////////////////
// Reusable pipelines //
////////////////////////

var lintScripts = lazypipe()
  .pipe($.jshint, '.jshintrc')
  .pipe($.jshint.reporter, 'jshint-stylish');

var styles = lazypipe()
  .pipe($.autoprefixer, 'last 1 version')
  .pipe(gulp.dest, '.tmp/css');

///////////
// Tasks //
///////////

gulp.task('styles', function () {
  return gulp.src(paths.styles)
    .pipe(styles()).pipe(gulp.dest(yeoman.dist + '/css'));;
});

gulp.task('lint:scripts', function () {
  return gulp.src(paths.scripts)
    .pipe(lintScripts());
});

gulp.task('clean:tmp', function (cb) {
  rimraf('./.tmp', cb);
});

gulp.task('start:client', ['start:server', 'styles'], function () {
  openURL('http://localhost:9000/login.html');
});

gulp.task('start:server', function() {
  $.connect.server({
    root: [yeoman.app, '.tmp'],
    livereload: true,
    // Change this to '0.0.0.0' to access the server from outside.
    port: 9000,
    // 'proxy' is now ready to be used in a server.
    middleware: function(connect, opt) {
      return [
        proxy('/apm', {
            target: 'http://localhost:19000', //模拟接口
            // target: 'http://192.168.8.236', //研发环境
            // target: 'http://192.168.8.237', //测试环境
            changeOrigin: true
        })
      ]
    }
  });
});

gulp.task('watch', function () {
  $.watch(paths.styles)
    .pipe($.plumber())
    .pipe(styles())
    .pipe($.connect.reload());

  $.watch(paths.views.files)
    .pipe($.plumber())
    .pipe($.connect.reload());

  $.watch(paths.scripts)
    .pipe($.plumber())
    .pipe(lintScripts())
    .pipe($.connect.reload());

  gulp.watch('bower.json');
});

gulp.task('serve', function (cb) {
  runSequence('clean:tmp',
    ['lint:scripts'],
    ['start:client'],
    'watch', cb);
});

gulp.task('serve:prod', function() {
  $.connect.server({
    root: [yeoman.dist],
    livereload: true,
    port: 9000
  });
});

///////////
// Build //
///////////

gulp.task('clean:dist', function (cb) {
  rimraf('./apm_dist', cb);
});

gulp.task('client:build', ['html', 'styles'], function () {
  var jsFilter = $.filter('**/*.js');
  var cssFilter = $.filter('**/*.css');
  var htmlFilter = $.filter(['**/*', '!**/index.html', '!**/login.html'], { restore: true });

  // return gulp.src('apm_resource/js/module/**/*.js')
  //   .pipe($.concat('module.js'))
  //   .pipe(gulp.dest(yeoman.dist+'/js/'))
  //   .pipe($.rename({ suffix: '.min' }))
  //   .pipe($.uglify())
  //   .pipe(gulp.dest(yeoman.dist+'/js/'))
  //   &
  //   gulp.src('apm_resource/js/lib/**/*.js')
  //   .pipe($.concat('lib.js'))
  //   .pipe(gulp.dest(yeoman.dist+'/js/'))
  //   .pipe($.rename({ suffix: '.min' }))
  //   .pipe($.uglify())
  //   .pipe(gulp.dest(yeoman.dist+'/js/'));

  return gulp.src([paths.views.main, paths.views.login])
    //.pipe($.replace('bower_components', yeoman.app + '/bower_components'))
    .pipe($.useref({searchPath: [yeoman.app, '.tmp']}))
    .pipe(jsFilter)
    .pipe($.ngAnnotate())
    .pipe($.uglify())
    .pipe(jsFilter.restore())
    .pipe(cssFilter)
    .pipe($.minifyCss({cache: true}))
    .pipe(cssFilter.restore())
    .pipe(htmlFilter)
    //.pipe($.rev())//混淆资源文件名称
    .pipe(htmlFilter.restore())
    .pipe($.revReplace())
    .pipe(gulp.dest(yeoman.dist));
});

gulp.task('html', function () {
  return gulp.src(yeoman.app + '/template/**/*')
    .pipe(gulp.dest(yeoman.dist + '/template'));
});

gulp.task('images', function () {
  return gulp.src(yeoman.app + '/images/**/*')
    .pipe($.cache($.imagemin({
        optimizationLevel: 5,
        progressive: true,
        interlaced: true
    })))
    .pipe(gulp.dest(yeoman.dist + '/images'));
});

gulp.task('copy:extras', function () {
  return gulp.src([yeoman.app + '/*/.*', yeoman.app + '/login.js', yeoman.app + '/*.ico', yeoman.app + '/README.MD'], { dot: true })
    .pipe(gulp.dest(yeoman.dist));
});

gulp.task('copy:fonts', function () {
  return gulp.src(yeoman.app + '/fonts/**/*')
    .pipe(gulp.dest(yeoman.dist + '/fonts'));
});

gulp.task('copy:scripts', function () {
  return gulp.src(yeoman.app + '/js/*')
    .pipe(gulp.dest(yeoman.dist + '/js'));
});

gulp.task('build', ['clean:dist'], function () {
  runSequence(['images', 'copy:extras', 'copy:fonts', 'copy:scripts', 'client:build']);
});

//gulp.task('default', ['connect']);
gulp.task('default', ['build']);
