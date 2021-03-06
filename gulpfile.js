'use strict';

const gulp        			= require('gulp');

const sass							=	require('gulp-sass');
const sassGlob 					= require('gulp-sass-glob');
const groupMediaQueries = require('gulp-group-css-media-queries');
const cleanCSS 					= require('gulp-clean-css');
const autoprefixer 			= require('gulp-autoprefixer');

const concat 						= require('gulp-concat');
const uglify 						= require('gulp-uglify');
const babel 						= require('gulp-babel');

const rename 						= require('gulp-rename');
const sourcemaps 				= require('gulp-sourcemaps');
const replace 					= require('gulp-replace');
const del 							= require('del');
const plumber 					= require('gulp-plumber');
const browserSync 			= require('browser-sync').create();

const svgstore 					= require('gulp-svgstore');
const svgmin 						= require('gulp-svgmin');
const imagemin 					= require('gulp-imagemin');

const paths =  {
  src: './src/',        // paths.src
  build: 'build/'      	// paths.build
};

function styles() {
	return gulp.src(paths.src + 'sass/main.scss')
		.pipe(plumber())
		.pipe(sourcemaps.init())
		.pipe(sassGlob())
		.pipe(sass()) // { outputStyle: 'compressed' }
		.pipe(groupMediaQueries())
		.pipe(autoprefixer({
			cascade: false,
			grid: true,
			overrideBrowserslist: ['last 2 versions'],
		}))
		.pipe(cleanCSS())
		.pipe(rename({ suffix: ".min" }))
		.pipe(sourcemaps.write('/'))
		.pipe(gulp.dest(paths.build + 'css/'));
}

function htmls() {
	return gulp.src(paths.src + '*.html')
		.pipe(plumber())
		.pipe(replace(/\n\s*<!--DEV[\s\S]+?-->/gm, ''))
    .pipe(gulp.dest(paths.build));
}

function images() {
  return gulp.src(paths.src + 'img/*.{jpg,jpeg,png,gif,svg}')
    .pipe(imagemin())
    .pipe(gulp.dest(paths.build + 'img/'));
}
function favicon() {
  return gulp.src(paths.src + 'favicon.ico')
    .pipe(gulp.dest(paths.build));
}

function fonts() {
	return gulp.src(paths.src + 'fonts/*.*')
	.pipe(gulp.dest(paths.build + 'fonts/'))
}

function svgSprite() {
  return gulp.src(paths.src + 'svg/*.svg')
    .pipe(svgmin(function (file) {
      return {
        plugins: [{
          cleanupIDs: {
            minify: true
          }
        }]
      }
    }))
    .pipe(svgstore({ inlineSvg: true }))
    .pipe(rename('sprite.svg'))
    .pipe(gulp.dest(paths.build + 'img/'));
}

function scripts() {
  return gulp.src(paths.src + 'js/*.js')
    .pipe(plumber())
    .pipe(babel({
      presets: ['@babel/preset-env']
    }))
    .pipe(uglify())
    .pipe(concat('script.min.js'))
    .pipe(gulp.dest(paths.build + 'js/'))
}

function clean() {
  return del('build/')
}

function watch() {
  gulp.watch(paths.src + 'sass/**/*.scss', styles);
  gulp.watch(paths.src + '*.html', htmls);
  gulp.watch(paths.src + 'js/*.js', scripts);
  gulp.watch(paths.src + 'img/*.{jpg,jpeg,png,gif,svg}', images);
  gulp.watch(paths.src + 'svg/*.svg', svgSprite);
}

function serve() {
  browserSync.init({
    server: {
      baseDir: paths.build
		},
		notify: false
  });
  browserSync.watch(paths.build + '**/*.*', browserSync.reload);
}

exports.styles 					= styles;
exports.scripts 				= scripts;
exports.htmls 					= htmls;
exports.fonts 					= fonts;
exports.images 					= images;
exports.favicon 				= favicon;
exports.svgSprite 			= svgSprite;
exports.clean 					= clean;
exports.watch 					= watch;

gulp.task('default', gulp.series(
  clean,
  gulp.parallel(styles, svgSprite, scripts, htmls, images, favicon, fonts),
  gulp.parallel(watch, serve)
));