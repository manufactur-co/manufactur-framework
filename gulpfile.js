const { src, dest, watch } = require( "gulp" );
const sass = require( "gulp-sass" )( require( "sass" ) );
const cleanCSS = require( "gulp-clean-css" );
const rename = require( "gulp-rename" );
const minify = require('gulp-minify');


/**
 * Compiles sass files based on the given file pattern.
 * @param {string} filePattern - The file pattern that will be used for the blob.
 * @returns {Object}
 */
function compileSass( filePatterns ) {
    return src( filePatterns )
        .pipe( sass().on( "error", sass.logError ) )
        .pipe( cleanCSS() )
        .pipe( dest( "./dist" ) );
}

// Create a function 
const compileThemeStyles = compileSass.bind( this, [
    "./build/manufactur.scss"
] );

function compileJS( filePatterns ) {
    return src( filePatterns )
        .pipe( minify() )
        .pipe( dest('./dist') )
}

// Create a function 
const compileThemeJS = compileJS.bind( this, [
    "./build/manufactur.js"
] );

/**
 * Watches changes inside the styles folder.
 */
function watchStyles() {
    // Watch all files inside the styles folder (except for exclusions) and rebuild theme.css.
    watch( [ 
        "./build/**/*.scss",
        "./build/components/*.scss",
    ], compileSass.bind( this, "./build/manufactur.scss" ) );

    // Watch all files inside the styles folder (except for exclusions) and rebuild theme.css.
    watch( [ 
        "./build/manufactur.js"
    ], compileJS.bind( this, "./build/manufactur.js" ) );
}

exports.sass = compileThemeStyles;
exports.js = compileThemeJS;
exports.default = watchStyles;