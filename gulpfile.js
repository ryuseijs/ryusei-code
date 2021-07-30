const { series } = require( 'gulp' );
const { buildModule, buildJs, buildJsQuick, buildPackage } = require( './gulp/build-script' );
const { buildLanguages, buildExtensions } = require( './gulp/build-component' );
const buildCss = require( './gulp/build-css' );


exports[ 'build:js' ]         = buildJs;
exports[ 'build:js:quick' ]   = buildJsQuick;
exports[ 'build:package' ]    = buildPackage;
exports[ 'build:module' ]     = buildModule;
exports[ 'build:languages' ]  = buildLanguages;
exports[ 'build:extensions' ] = buildExtensions;
exports[ 'build:css' ]        = buildCss;

exports[ 'build:all' ] = series(
  buildCss,
  buildPackage,
  buildModule,
  buildLanguages,
  buildExtensions,
);
