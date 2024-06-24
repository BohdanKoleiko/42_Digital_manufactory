"use strict"; //Using a strong mode

const { src, dest, watch } = require("gulp");
const browserSync = require("browser-sync").create();
const sass = require("gulp-sass")(require("sass"));
const rename = require("gulp-rename");
const autoprefixer = require("gulp-autoprefixer");
const cleanCSS = require("gulp-clean-css");
const htmlmin = require("gulp-htmlmin");
const imagemin = require("gulp-imagemin");
const sourcemaps = require("gulp-sourcemaps");

// Static server
gulp.task("server", function () {
   browserSync.init({
      open: false,
      server: {
         baseDir: "./dist",
      },
   });
});

//Compress, add min prefix to css file, add autoprefix then clean css, put its in css folder and reload browsersync plugin
gulp.task("styles", function () {
   return src("./src/scss/**/*.+(scss|sass)")
      .pipe(sourcemaps.init())
      .pipe(sass.sync({ outputStyle: "compressed" }).on("error", sass.logError))
      .pipe(autoprefixer())
      .pipe(cleanCSS({ compatibility: "ie8" }))
      .pipe(
         rename({
            prefix: "",
            suffix: ".min",
         }),
      )
      .pipe(sourcemaps.write(""))
      .pipe(dest("./dist/css"))
      .pipe(browserSync.stream());
});

//Wath for changes of sass/scss files and html
gulp.task("watch", function () {
   watch("./src/scss/**/*.+(scss|sass|css)", gulp.parallel("styles"));
   watch("./src/**/*.html").on("change", browserSync.reload);
   watch("./src/**/*.html").on("change", gulp.parallel("html"));
   watch("./src/js/**/*.js").on("change", gulp.parallel("scripts"));
   watch("src/images/**/*").on("change", browserSync.reload);
   watch("src/images/**/*").on("change", gulp.parallel("img"));
   watch("src/images/**/*").on("add", browserSync.reload);
   watch("src/images/**/*").on("add", gulp.parallel("img"));
});

gulp.task("html", function () {
   return src("./src/*.html")
      .pipe(htmlmin({ collapseWhitespace: true }))
      .pipe(dest("./dist"));
});

gulp.task("scripts", function () {
   return src("./src/**/*.js")
      .pipe(sourcemaps.init())
      .pipe(sourcemaps.write(""))
      .pipe(dest("./dist/"));
});

gulp.task("fonts", function () {
   return src("./src/fonts/**/*").pipe(dest("./dist/fonts"));
});

gulp.task("img", function () {
   return src("./src/images/**/*").pipe(imagemin()).pipe(dest("./dist/images"));
});

//To run all tasks with only one command "gulp"
gulp.task("default", gulp.parallel("server", "styles", "watch", "html", "scripts", "fonts", "img"));
