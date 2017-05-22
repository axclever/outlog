'use strict';

import gulp from 'gulp';
import source from 'vinyl-source-stream'
import buffer from 'vinyl-buffer'
import babelify from 'babelify'
import watchify from 'watchify'
import sourcemaps from 'gulp-sourcemaps'
import browserify from 'browserify'
import babel from 'gulp-babel'


function compile(watch) {
    let bundler = watchify(browserify('./src/outlog.js', {debug: true}).transform(babelify));

    function rebundle() {
        bundler.bundle()
            .on('error', (err)=> {
                console.error(err);
                this.emit('end');
            })
            .pipe(source('build.js'))
            .pipe(buffer())
            .pipe(sourcemaps.init({loadMaps: true}))
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest('./build'));
    }

    if (watch) {
        bundler.on('update', () => {
            console.log('-> bundling...');
            rebundle();
        });
    }

    rebundle();
}

function watch() {
    return compile(true);
}

gulp.task('build', () => {
    return compile();
});
gulp.task('watch', () => {
    return watch();
});

gulp.task('default', ['watch']);

gulp.task('deploy', ()=> {
    return gulp.src('src/**/*.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('build'));
});