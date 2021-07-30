const { src, dest } = require( 'gulp' );
const sass         = require( 'gulp-dart-sass' );
const postcss      = require( 'gulp-postcss' );
const cssnano      = require( 'cssnano' );
const autoprefixer = require( 'autoprefixer' );
const rename       = require( 'gulp-rename' );


module.exports = function buildCss() {
  return src( [
    './src/css/**/index.scss',
    '!./src/css/**/foundation/index.scss',
    '!./src/css/**/object/**/*.scss',
    '!./src/css/**/extension/**/*.scss'
  ], { base: 'src' } )
    .pipe( sass() )
    .pipe( postcss( [
      cssnano( { reduceIdents: false } ),
      autoprefixer(),
    ] ) )
    .pipe( rename( path => {
      const fragments = path.dirname.split( '\\' );
      const dirname   = fragments.includes( 'themes' ) ? fragments.slice( 0, -1 ).join( '\\' ) : path.dirname;

      return {
        dirname,
        basename: `ryuseicode-${ fragments[ fragments.length - 1 ] }.min`,
        extname : '.css',
      };
    } ) )
    .pipe( dest( 'dist' ) );
}
