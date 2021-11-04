const gulp = require("gulp"),
      del = require("del");

const sass = require("gulp-sass")(require("sass"));
const argv = require("yargs").argv;

const clean = () => {
  return del(["./build/"]);
};

const copyFiles = () => {
  return gulp
    .src([
      "src/**/*.*",
      "./src/manifest.json",
      "!src/**/*.scss"
    ])
    .pipe(gulp.dest("./build/"));
};

const watch = (cb) => {
  if(argv.watch == undefined)
    return cb();

  return gulp.watch(
    [
      "src/**/*.*"
    ],
    gulp.series(copyFiles, buildStyles));
};

const buildStyles = () => {
  return gulp.src("src/styles/**/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest('./build/styles'));
};

exports.default = gulp.series(clean, copyFiles, buildStyles, watch);