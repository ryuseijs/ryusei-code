const rollup     = require( 'rollup' ).rollup;
const typescript = require( 'rollup-plugin-typescript2' );
const uglify     = require( 'rollup-plugin-uglify' ).uglify;
const resolve    = require( '@rollup/plugin-node-resolve' );
const babel      = require( '@rollup/plugin-babel' );


module.exports = function buildLexer() {
  return rollup( {
    input  : './src/js/core/Lexer/Lexer.ts',
    plugins: [
      resolve.nodeResolve(),
      typescript( {
        tsconfigOverride: {
          compilerOptions: {
            sourceMap: false,
            mapRoot: null,
          }
        }
      } ),
      babel.getBabelOutputPlugin( {
        presets: [ [
          '@babel/preset-env',
          {
            modules: false,
            loose  : true,
          }
        ] ],
      } ),
      uglify(),
    ],
  } ).then( bundle => {
    return bundle.write( {
      file     : './src/js/core/Lexer/Lexer.esm.js',
      format   : 'esm',
      sourcemap: false,
    } );
  } );
}
