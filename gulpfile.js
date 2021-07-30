const { series } = require( 'gulp' );
const { buildModule, buildJs, buildJsQuick, buildPackage } = require( './gulp/build-script' );
const { buildLanguages, buildExtensions } = require( './gulp/build-component' );
const buildLexer  = require( './gulp/build-lexer' );
const buildCss    = require( './gulp/build-css' );


exports[ 'build:js' ]         = buildJs;
exports[ 'build:js:quick' ]   = buildJsQuick;
exports[ 'build:package' ]    = buildPackage;
exports[ 'build:lexer' ]      = buildLexer;
exports[ 'build:module' ]     = buildModule;
exports[ 'build:languages' ]  = buildLanguages;
exports[ 'build:extensions' ] = buildExtensions;
exports[ 'build:css' ]        = buildCss;

exports[ 'build:all' ] = series(
  buildCss,
  buildLexer,
  buildPackage,
  buildModule,
  buildLanguages,
  buildExtensions,
);
