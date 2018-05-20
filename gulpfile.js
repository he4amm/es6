const gulp = require('gulp');
const gutil = require('gulp-util');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const WebpackDevServer = require("webpack-dev-server");
const webpackConfig = require('./webpack.config.js');
const sass = require('gulp-sass');

gulp.task('js', () => {
    gulp.src('./src/app.js')
        .pipe(webpackStream(webpackConfig), webpack)
        .pipe(gulp.dest('./build'));
});

gulp.task('sass', function () {
    return gulp.src('src/scss/style.scss')
        .pipe(sass())
        .pipe(gulp.dest('build/css'))
});

gulp.task('copy', function () {
    gulp.src('./src/img/*')
        .pipe(gulp.dest('./build/img'));
});

gulp.task("webpack-dev-server", function (callback) {
    // modify some webpack config options
    var myConfig = Object.create(webpackConfig);
    myConfig.devtool = "eval";

    // Start a webpack-dev-server
    new WebpackDevServer(webpack(myConfig), {
        publicPath: "/" + myConfig.output.publicPath,
        stats: {
            colors: true
        }
    }).listen(8080, "localhost", function (err) {
        if (err) throw new gutil.PluginError("webpack-dev-server", err);
        gutil.log("[webpack-dev-server]", "http://localhost:8080/");
    });
});

gulp.task('watch', function () {
    gulp.watch('src/scss/*.scss', ['sass']);
    gulp.watch('src/**/*.js', ['js']);
});

gulp.task('build', ['js', 'sass']);
gulp.task('default', ['js', 'sass', 'copy', 'watch', 'webpack-dev-server']);