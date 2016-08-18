var gulp            = require('gulp'),
    gutil           = require('gulp-util'),
    concat          = require('gulp-concat'),
    cleanCSS        = require('gulp-clean-css'),
    sourcemaps      = require('gulp-sourcemaps'),
    uglify          = require('gulp-uglify'),
    autoprefixer    = require('gulp-autoprefixer'),
    gulpWatch       = require('gulp-watch'),
    del             = require('del'),
    runSequence     = require('run-sequence'),
    rename          = require('gulp-rename'),
    buildBrowserify = require('ionic-gulp-browserify-typescript'),
    sassBuild       = require('ionic-gulp-sass-build'),
    copyHTML        = require('ionic-gulp-html-copy'),
    copyFonts       = require('ionic-gulp-fonts-copy'),
    copyScripts     = require('ionic-gulp-scripts-copy'),
    imageCopyOptimize       = require('ionic-gulp-image-task'),
    tslint          = require('ionic-gulp-tslint'),
    argv            = process.argv;


/**
 * Ionic hooks
 * Add ':before' or ':after' to any Ionic project command name to run the specified
 * tasks before or after the command.
 */
gulp.task('serve:before', ['watch']);
gulp.task('emulate:before', ['build']);
gulp.task('deploy:before', ['build']);
gulp.task('build:before', ['build']);

// we want to 'watch' when livereloading
var shouldWatch = argv.indexOf('-l') > -1 || argv.indexOf('--livereload') > -1;
gulp.task('run:before', [shouldWatch ? 'watch' : 'build']);

/**
 * Ionic Gulp tasks, for more information on each see
 * https://github.com/driftyco/ionic-gulp-tasks
 *
 * Using these will allow you to stay up to date if the default Ionic 2 build
 * changes, but you are of course welcome (and encouraged) to customize your
 * build however you see fit.
 */

var isRelease = argv.indexOf('--release') > -1;

gulp.task('watch', ['clean'], function(done){
  runSequence(
    ['sass', 'html', 'images', 'fonts', 'appFonts', 'scripts'],
    function(){
      gulpWatch('app/**/*.scss', function(){ gulp.start('sass'); });
      gulpWatch('app/**/*.html', function(){ gulp.start('html'); });
      buildBrowserify({ watch: true }).on('end', done);
    }
  );
});

gulp.task('build', ['clean'], function(done){
  runSequence(
    ['sass', 'html', 'images', 'fonts', 'appFonts', 'scripts'],
    function(){
      buildBrowserify({
        minify: isRelease,
        browserifyOptions: {
          debug: !isRelease
        },
        uglifyOptions: {
          mangle: false
        }
      }).on('end', done);
    }
  );
});

gulp.task('sass', function(){
  return sassBuild({
    src: 'app/theme/app.+(ios|md|wp).scss',
    dest: 'www/build/css',
    sassOptions: {
      includePaths: [
        'node_modules/ionic-angular',
        'node_modules/ionicons/dist/scss'
      ],
      outputStyle: 'compressed'
    },
    autoprefixerOptions: {
      browsers: ['last 2 versions'],
      cascade: false
    }
  });
});

gulp.task('images', function(){
  return gulp.src('resources/www/img/**/*')
    .pipe(gulp.dest('www/build/images'))
});

gulp.task('appFonts', function(){
  return gulp.src('resources/www/fonts/**/*')
    .pipe(gulp.dest('www/build/fonts/'))
});

gulp.task('html', copyHTML);
gulp.task('fonts', copyFonts);
gulp.task('scripts', copyScripts);
gulp.task('clean', function(){
  return del('www/build');
});
gulp.task('lint', tslint);
