const gulp = require("gulp"),
      del = require("del"),
      zip = require("gulp-zip"),
      ts = require("gulp-typescript");

const sass = require("gulp-sass")(require("sass"));
const argv = require("yargs").argv;

const tsProject = ts.createProject('tsconfig.json');

const clean = () => {
  return del(["./build/"]);
};

const copyFiles = () => {
  return gulp
    .src([
      "src/**/*.*",
      "src/manifest.json",
      "!src/**/*.scss",
      "!src/**/*.ts"
    ])
    .pipe(gulp.dest("./build/"));
};

const compileTypescript = () => {
  return gulp
    .src([
      "src/**/*.ts"
    ])
    .pipe(tsProject())
    .pipe(gulp.dest('./build/scripts'));
}

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

const compress = () => {
  return gulp.src("./build/**/*.*")
    .pipe(zip("build.zip"))
    .pipe(gulp.dest("./"));
};

exports.build = gulp.series(clean, copyFiles, compileTypescript, buildStyles, compress);
exports.default = gulp.series(clean, copyFiles, compileTypescript, buildStyles, watch);