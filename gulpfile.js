var gulp = require("gulp"),
  sass = require("gulp-sass"),
  browserSync = require("browser-sync"),
  clean = require("gulp-clean"),
  imageMin = require("gulp-imagemin"),
  pngQuant = require("imagemin-pngquant"),
  cache = require("gulp-cache"),
  autoprefixer = require("gulp-autoprefixer"),
  minify = require('gulp-minify'),
  cleanCss = require('gulp-clean-css');

var scssPath = {
  sourceMain: "./assets/scss/main.scss",
  sourceBootstrap: "./assets/scss/bootstrap.scss",
  dist: "./static/css",
  watch: "./assets/scss/**/*.scss"
};

var jsPath = {
  source: "./assets/js/**/*.js",
  dist: "./static/js"
};

var imagesPath = {
  source: "./assets/img/**/*",
  dist: "./static/img"
};
var staticPath = "./static/";

gulp.task("css:blink", function () {
  return gulp
    .src(scssPath.sourceMain)
    .pipe(sass())
    .pipe(
      autoprefixer(["last 15 versions", ">1%", "ie 8", "ie 7"], {
        cascade: true
      })
    )
    .pipe(cleanCss())
    .pipe(gulp.dest(scssPath.dist))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task("img:blink", function () {
  return gulp.src(imagesPath.source).pipe(gulp.dest(imagesPath.dist));
});

gulp.task("img:minify", function () {
  return gulp
    .src(imagesPath.source)
    .pipe(
      cache(
        imageMin({
          interlaced: true,
          progressive: true,
          svgoPlugins: [
            {
              removeViewBox: false
            }
          ],
          une: [pngQuant()]
        })
      )
    )
    .pipe(gulp.dest(imagesPath.dist));
});

gulp.task("clear", function () {
  return cache.clearAll();
});

gulp.task("js:blink", function () {
  return gulp.src(jsPath.source)
    .pipe(minify())
    .pipe(gulp.dest(jsPath.dist));
});

gulp.task("clean", function () {
  return gulp.src(staticPath).pipe(clean());
});

gulp.task("browser-sync", function () {
  browserSync.init({
    server: {
      baseDir: "./"
    },
    notify: false,
  });
});

gulp.task("browser-sync-dev", function () {
  browserSync.init({
    server: {
      baseDir: "./"
    },
    notify: false,
    ghostMode: false,
  });
});

gulp.task("watch", ["browser-sync", "css:blink", "js:blink", "img:minify"],
  function () {
    gulp.watch(scssPath.watch, ["css:blink"]);
    gulp.watch(jsPath.source, ["js:blink"]);
    gulp.watch(imagesPath.source, ["img:minify"]);
  }
);

gulp.task("dev-watch", ["browser-sync-dev", "css:blink", "js:blink", "img:minify"],
  function () {
    gulp.watch(scssPath.watch, ["css:blink"]);
    gulp.watch(jsPath.source, ["js:blink"]);
    gulp.watch(imagesPath.source, ["img:minify"]);
  }
);