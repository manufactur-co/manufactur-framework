const { src, dest, watch, series, parallel } = require( "gulp" );
const sass = require( "gulp-sass" )( require( "sass" ) );
const cleanCSS = require( "gulp-clean-css" );
const rename = require( "gulp-rename" );
const minify = require('gulp-minify');
const concat = require( 'gulp-concat' );
const terser = require( 'gulp-terser' );
const order = require( 'gulp-order' );
const sourcemaps = require( 'gulp-sourcemaps' );

/**
 * Compiles sass files based on the given file pattern.
 * @param {string} filePattern - The file pattern that will be used for the blob.
 * @returns {Object}
 */
function compileSass( filePatterns ) {
    return src( filePatterns )
        .pipe( sass().on( "error", sass.logError ) )
        .pipe( cleanCSS() )
        .pipe( dest( "./dist/css" ) );
}

// Create a function 
const compileThemeStyles = compileSass.bind( this, [
    "./build/manufactur.scss"
] );

function compileJS(jsPath) {
    return src( jsPath )
        .pipe( sourcemaps.init() )
        .pipe(order([
            "assets/js/vendor/*.js",
            "assets/js/main.js",
            "assets/js/components/*.js"
        ], { base: './build' }))
        .pipe( concat( 'manufactur.js' ) )
        .pipe( terser() )
        .pipe( sourcemaps.write( '.' ) )
        .pipe( dest( 'dist/js' ) );
}

// Create a function 
const compileThemeJS = compileJS.bind( this, "build/assets/js/**/*.js" );

/**
 * Watches changes inside the styles folder.
 */
function watchStyles() {
    // Watch all files inside the styles folder (except for exclusions) and rebuild theme.css.
    watch( [ 
        "./build/**/*.scss",
        "./build/assets/scss/components/*.scss",
    ], compileSass.bind( this, "./build/manufactur.scss" ) );

    // Watch all files inside the styles folder (except for exclusions) and rebuild theme.css.
    watch( [ 
        "./build/assets/js/components/*.js",
        "./build/assets/js/vendor/*.js"
    ], compileJS.bind( this, "build/assets/js/**/*.js" ) );
}

exports.sass = compileThemeStyles;
exports.js = compileThemeJS;
exports.default = watchStyles;