"use strict"; //Using a strong mode

import gulp from "gulp";
import gulpSourcemaps from "gulp-sourcemaps";
import browserSync from "browser-sync";
import dartSass from "sass";
import gulpSass from "gulp-sass";
import rename from "gulp-rename";
import autoprefixer from "gulp-autoprefixer";
import cleanCSS from "gulp-clean-css";
import htmlmin from "gulp-htmlmin";
import imagemin from "gulp-imagemin";

const { src, dest, watch, parallel, series } = gulp;
const { init, write } = gulpSourcemaps;
const sass = gulpSass(dartSass);

function webServer() {
   browserSync.init({
      open: false,
      server: {
         baseDir: "./dist",
      },
   });
}

function styles() {
   return src("./src/scss/**/*.+(scss|sass)")
      .pipe(init())
      .pipe(sass.sync({ outputStyle: "compressed" }).on("error", sass.logError))
      .pipe(autoprefixer())
      .pipe(cleanCSS({ compatibility: "ie8" }))
      .pipe(
         rename({
            prefix: "",
            suffix: ".min",
         }),
      )
      .pipe(write(""))
      .pipe(dest("./dist/css"))
      .pipe(browserSync.stream());
}

function changesWatcher() {
   watch("./src/scss/**/*.+(scss|sass|css)", parallel(styles));
   watch("./src/**/*.html").on("change", browserSync.reload);
   watch("./src/**/*.html").on("change", parallel(html));
   watch("./src/js/**/*.js").on("change", parallel(scripts));
   watch("src/images/**/*").on("change", browserSync.reload);
   watch("src/images/**/*").on("change", parallel(img));
   watch("src/images/**/*").on("add", browserSync.reload);
   watch("src/images/**/*").on("add", parallel(img));
}

function html() {
   return src("./src/*.html")
      .pipe(htmlmin({ collapseWhitespace: true }))
      .pipe(dest("./dist"));
}

function scripts() {
   return src("./src/**/*.js").pipe(init()).pipe(write("")).pipe(dest("./dist/"));
}

function fonts() {
   return src("./src/fonts/**/*").pipe(dest("./dist/fonts"));
}

function img() {
   return src("./src/images/**/*").pipe(imagemin()).pipe(dest("./dist/images"));
}

const _default = parallel(webServer, changesWatcher, series(styles, html, scripts, fonts, img));
export { _default as default };
