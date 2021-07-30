const rollup     = require( 'rollup' ).rollup;
const typescript = require( 'rollup-plugin-typescript2' );
const uglify     = require( 'rollup-plugin-uglify' ).uglify;
const resolve    = require( '@rollup/plugin-node-resolve' );
const babel      = require( '@rollup/plugin-babel' );
const fs         = require( 'fs' ).promises;

module.exports = function buildWorker() {
  const dir = './src/js/languages';

  return fs.readdir( dir, { withFileTypes: true } )
    .then( entries => entries.filter( entry => entry.isDirectory() ) )
    .then( entries => {
      entries.forEach( entry => {
        const file = `${ dir }/${ entry.name }/url.ts`;

        rollup( {
          input  : `${ dir }/${ entry.name }/worker.ts`,
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
                },
              ] ],
            } ),
            uglify(),
          ],
        } ).then( bundle => {
          return bundle.write( {
            file,
            format   : 'esm',
            sourcemap: false,
          } );
        } ).then( bundle => {
          const code   = bundle.output[ 0 ].code.replace( /(\/\*[\s\S]*?\*\/)|\n/g, '' );
          const base64 = Buffer.from( code ).toString( 'base64' );
          const output = `export function url() { return URL.createObjectURL( new Blob( [ atob( '${ base64 }' ) ] ) ); }`;
          return fs.writeFile( file, output );
        } );
      } );
    } );
};
