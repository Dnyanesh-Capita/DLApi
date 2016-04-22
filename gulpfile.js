
var gulp = require('gulp'),
    _ = require('lodash'),
    ts = require('gulp-typescript'),
    removeLines = require('gulp-remove-lines'),
	eventStream = require('event-stream'),
    replace = require('gulp-replace'),
    clean = require('gulp-clean'),
    typescript = require('typescript'),
    tslint = require('gulp-tslint'),
    runSequence = require('run-sequence'),
    gulpNSP = require('gulp-nsp');

var settings = {
    name: 'apiGateway',
    scopeName: '@osc',
    releaseFolder: './_release',
    sourceFolder: './src',
    includeDts: true
}

gulp.task('develop', ['compile', 'run-app'], function () {
});

gulp.task('run-app', function () {
    console.log('starting development mode :) FTW!');
    nodemon({ script: './src/application/App.js', ext: 'html js' })
        .on('restart', function () {
            console.log('a file has changed, restarted server!');
        });
});

//TODO: Add NSP task in compile if time permits
gulp.task('compile', function () {

    var tsResult = gulp.src(['./**/*.ts', '!./node_modules/**', '!./**/typings/**', '!./**/*.d.ts'])
        .pipe(ts({
            typescript: typescript,
            declarationFiles: true,
            target: 'ES5',
            module: 'commonjs',
            experimentalDecorators: true
        }));
    return eventStream.merge(
        tsResult.js
            .pipe(gulp.dest('./'))
    );

});

gulp.task('clean', function () {
    return gulp.src(settings.releaseFolder, { read: false })
        .pipe(clean({ force: true }));
});

// /**
//  * Lint all custom TypeScript files.
//  */
// gulp.task('tslint', function () {
//     return gulp.src(['./**/*.ts', '!./node_modules/**', '!./**/typings/**', '!./**/*.d.ts', '!./_release/**'])
//         .pipe(tslint())
//         .pipe(tslint.report('prose', {
//          emitError : false
//         })
//         .on('error', function (err) {
//             gutil.log('**************** TypeScript TSLint Error *******************************')
//             gutil.log('****************        Stopping build        *******************************')
//             process.exit(1);
//         }));
// });

// //To check your project dependencies for security
// gulp.task('nsp', function (cb) {
//   gulpNSP({package: __dirname + '/package.json', stopOnError: false}, cb);
// });

gulp.task('watch',function(){    
    var watcher = gulp.watch('src/**/*.ts', ['compile']);
    watcher.on('change', function(event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
});