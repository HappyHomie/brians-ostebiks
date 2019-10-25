const gulp = require("gulp");
const ejs = require("gulp-ejs");
const rename = require("gulp-rename");
const connect = require('gulp-connect');
const imagemin = require('gulp-imagemin');
const sass = require("gulp-sass");
sass.compiler = require("node-sass");
const babel = require('gulp-babel');
 
function babelFunc (){
    gulp.src('./src/js/*')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(gulp.dest('./dist/assets/js'))
        .pipe(connect.reload())
};

function images (){(
    gulp.src('./src/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./dist/assets/img'))
        .pipe(connect.reload())
)};

function html(done){
    gulp.src("./src/html/templates/*.ejs")
    .pipe(ejs())
    .pipe(rename(function(path){
        if(path.basename != "index"){
            path.dirname = path.basename;
            path.basename = "index";
        }
            path.extname = ".html";
    }))
    .pipe(gulp.dest("./dist"))
    .pipe(connect.reload())
    done();
}

function scss(done){
    gulp.src("./src/css/**/*.scss")
    .pipe(sass())
    .pipe(gulp.dest("./dist/assets/css"))
    .pipe(connect.reload())
    done();
}

function json(done){
    gulp.src("./src/json/*.json")
    .pipe(gulp.dest("./dist/data"))
    .pipe(connect.reload());
    done();
}
function watcher(done){
    gulp.watch("./src/html/**/*.ejs", { ignoreInitial: false }, html);
    gulp.watch("./src/img/*.jpg", { ignoreInitial: false }, images);
    gulp.watch("./src/css/**/*.scss", { ignoreInitial: false }, scss);
    gulp.watch("./src/js/*.js", { ignoreInitial: false }, babelFunc);
    gulp.watch("./src/json/*.json", { ignoreInitial: false }, json);
}


gulp.task("dev", function(done){
    watcher()
    connect.server({
        livereload: true,
        root: "dist"
    });
    done();
});

gulp.task("build", function(done){
    watcher();
    done();
});


