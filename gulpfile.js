const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require("browser-sync").create();

//Test for now, perhaps change later to run unit testing
gulp.task('test', () => {
    console.log("this is the gulp!");
})

/*
 - Task 'sass'
    -Extract Bootstrap.scss, and all SCSS
    - Compile all using Gulp-sass()
    - Set destinatino to src/css
    - Stream the data to browserSync
*/
gulp.task('sass', () => {
    gulp.src(["node_modules/bootstrap/scss/bootstrap.scss", "src/scss/*.scss"])
        .pipe(sass())
        .pipe(gulp.dest("src/css"))
        .pipe(browserSync.stream());
});

/*
 - Task - 'js'
    -Extract Popper.js, jQuery, and Bootstrap 
    -Inject into src/js/vendors
    - Stream to browser
*/
gulp.task('js', () => {

    gulp.src(["node_modules/bootstrap/dist/js/bootstrap.min.js", "node_modules/jquery/dist/jquery.min.js",
            "node_modules/popper.js/dist/popper.min.js", "node_modules/flip/dist/jquery.flip.min.js"
        ])
        .pipe(gulp.dest("src/vendors/js"))
        .pipe(browserSync.stream());
});

// Watch Sass & Server - BrowserSync configuration
gulp.task('serve', ['sass'], function () {
    browserSync.init({
        server: "./src"
    });

    gulp.watch(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'], ['sass']);
    gulp.watch("src/*.html").on('change', browserSync.reload);
});

// run all tasks on start
gulp.task('default', ['test', 'js', 'serve']);