import gulp from 'gulp';
import plumber from 'gulp-plumber';
import less from 'gulp-less';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import browser from 'browser-sync';
import svgstore from 'gulp-svgstore';
import rename from 'gulp-rename';
import htmlmin from 'gulp-htmlmin';
import terser from 'gulp-terser';
import csso from 'postcss-csso';
import { stacksvg } from "gulp-stacksvg";
import svgo from 'gulp-svgmin';
import squoosh from 'gulp-libsquoosh';
import { deleteAsync } from 'del';

// Styles

export const styles = () => {
  return gulp.src('source/less/style.less', { sourcemaps: true })
    .pipe(plumber())
    .pipe(less())
    .pipe(postcss([
      autoprefixer(),
      csso()
    ]))
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('source/css', { sourcemaps: '.' }))
    .pipe(gulp.dest('build/css', { sourcemaps: '.' }))
    .pipe(browser.stream());
}

// HTML

const html = () => {
  return gulp.src('source/*.html')
  .pipe(htmlmin( { collapseWhitespace: true }))
  .pipe(gulp.dest('build'));
}

// Scripts

const scripts = () => {
  return gulp.src('source/js/*.js')
  .pipe(terser())
  .pipe(gulp.dest('build/js'))
}

// Images

const optimizeImages = () => {
  return gulp.src('source/img/**/*.{jpg,png}')
  .pipe(squoosh())
  .pipe(gulp.dest('build/img'));
}

const copyImages = () => {
  return gulp.src('source/img/**/*.{jpg,png}')
  .pipe(gulp.dest('build/img'));
}


// SVG

const svg = () => {
  return gulp.src('source/img/**/*.svg')
  .pipe(svgo())
  .pipe(gulp.dest('build/img'));
}

// Stack

const stack = () => {
  return gulp.src([
    'source/img/masks/*.svg'])
    .pipe(stacksvg({ stack }))
    .pipe(gulp.dest('build/img'))
    .pipe(gulp.dest('source/img'));
}

// Copy

const copy = (done) => {
  gulp.src([
    'source/fonts/*{.woff2,woff}',
    'source/*.ico',
    'source/*.webmanifest',
  ],{
    base: 'source'
  })
    .pipe(gulp.dest('build'))
  done();
}

// Clean

export const clean = () => {
  return deleteAsync('build');
}

// Server

const server = (done) => {
  browser.init({
    server: {
      baseDir: 'source'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

// WebP

const createWebP = () => {
  return gulp.src('source/img/**/*.{jpg,png}')
  .pipe(squoosh ({
    webp: {}
  }))
  .pipe(gulp.dest('source/img'))
  .pipe(gulp.dest('build/img'));
}

// Watcher

const watcher = () => {
  gulp.watch('source/less/**/*.less', gulp.series(styles));
  gulp.watch('source/*.html').on('change', browser.reload);
  gulp.watch('source/js/*.js', gulp.series(scripts));
}


export const build = gulp.series(
  clean,
  copy,
  optimizeImages,
  copyImages,
  gulp.parallel(
    styles,
    html,
    scripts,
    svg,
    stack,
    createWebP),
    gulp.series(
      server,
      watcher
      ));

export default gulp.series(
  copy,
  styles,
  stack,
  copyImages,
  html,
  gulp.series(
    server,
    watcher
));
