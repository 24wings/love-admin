var uglify = require('gulp-uglify');
var gulp = require('gulp');
var gzip = require('gulp-gzip');
gulp.task('script', function() {
    // 1. 找到文件
    gulp.src(['dist/polyfills.bundle.js',
            'dist/vendor.bundle.js',
            'dist/styles.bundle.js',
            'dist/main.bundle.js'
        ])
        // 2. 压缩文件
        .pipe(uglify({
            compress: true,
        }))
        // .pipe(gzip())
        // 3. 另存压缩后的文件
        .pipe(gulp.dest('dist/min'))
});