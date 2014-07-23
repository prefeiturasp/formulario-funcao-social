// Define gulp before we start
var gulp = require('gulp');

// Define Sass and the autoprefixer
var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');

// This is an object which defines paths for the styles.
// Can add paths for javascript or images for example
// The folder, files to look for and destination are all required for sass
var paths = {
    styles: {
        src: './assets/sass',
        files: './assets/sass/**/*.scss',
        dest: './public/stylesheets'
    },
    images: {
        src: './assets/images',
        files: './assets/images/**/*.png',
        dest: './public/images'
    },
    javascript: {
        src: './assets/javascripts',
        files: './assets/javascripts/**/*.js',
        dest: './public/javascripts'
    }
}

var options = {};
options.sass = {
    outputStyle: 'compressed',
    errLogToConsole: true,
    // sourceMap: 'sass',
    // sourceComments: 'map',
    precision: 10,
    imagePath: paths.images.src,
    includePaths: [paths.styles.src]
};
options.autoprefixer = {
    map: true,
    from: 'asset',
    to: 'style.css'
};

// A display error function, to format and make custom errors more uniform
// Could be combined with gulp-util or npm colors for nicer output
var displayError = function(error) {

    // Initial building up of the error
    var errorString = '[' + error.plugin + ']';
    errorString += ' ' + error.message.replace("\n",''); // Removes new line at the end

    // If the error contains the filename or line number add it to the string
    if(error.fileName)
        errorString += ' in ' + error.fileName;

    if(error.lineNumber)
        errorString += ' on line ' + error.lineNumber;

    // This will output an error like the following:
    // [gulp-sass] error message in file_name on line 1
    console.error(errorString);
}

// Setting up the sass task
gulp.task('sass', function (){
    // Taking the path from the above object
    gulp.src(paths.styles.files)
    // Sass options - make the output compressed and add the source map
    // Also pull the include path from the paths object
    .pipe(sass(options.sass))
    // Pass the compiled sass through the prefixer with defined
    .pipe(prefix(
        'last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4',
        options.autoprefixer
    ))
    // If there is an error, don't stop compiling but use the custom displayError function
    .on('error', function(err){
        displayError(err);
    })
    // Funally put the compiled sass into a css file
    .pipe(gulp.dest(paths.styles.dest))
});

// --------------------------------------------

var imagemin   = require('gulp-imagemin');
 
gulp.task('images', function(){
    return gulp.src(paths.images.files)
        .pipe(imagemin())
        .pipe(gulp.dest(paths.images.dest));
});

// ---------------------------------------------

var browserify = require('browserify');
var source = require('vinyl-source-stream');
 
gulp.task('browserify', function() {
    return browserify(paths.javascript.src + '/app.js')
        .bundle()
        //Pass desired output filename to vinyl-source-stream
        .pipe(source('bundle.js'))
        // Start piping stream to tasks!
        .pipe(gulp.dest(paths.javascript.dest));
});

// ---------------------------------------------

// This is the default task - which is run when `gulp` is run
// The tasks passed in as an array are run before the tasks within the function
gulp.task('default', ['sass', 'images', 'browserify'], function() {
    // Watch the files in the paths object, and when there is a change, fun the functions in the array
    gulp.watch(paths.styles.files, ['sass'])
    // Also when there is a change, display what file was changed, only showing the path after the 'sass folder'
    .on('change', function(evt) {
        console.log(
            '[watcher] File ' + evt.path.replace(/.*(?=sass)/,'') + ' was ' + evt.type + ', compiling...'
        );
    });

    gulp.watch(paths.images.files, ['images'])
    // Also when there is a change, display what file was changed, only showing the path after the 'sass folder'
    .on('change', function(evt) {
        console.log(
            '[watcher] File ' + evt.path.replace(/.*(?=png)/,'') + ' was ' + evt.type + ', compiling...'
        );
    });

    gulp.watch(paths.javascript.files, ['browserify'])
    // Also when there is a change, display what file was changed, only showing the path after the 'sass folder'
    .on('change', function(evt) {
        console.log(
            '[watcher] File ' + evt.path.replace(/.*(?=js)/,'') + ' was ' + evt.type + ', compiling...'
        );
    });
});