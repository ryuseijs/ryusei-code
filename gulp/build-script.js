const { parallel, src, dest } = require( 'gulp' );
const rollup     = require( 'rollup' ).rollup;
const typescript = require( 'rollup-plugin-typescript2' );
const rename     = require( 'ts-transformer-properties-rename' ).default;
const uglify     = require( 'rollup-plugin-uglify' ).uglify;
const resolve    = require( '@rollup/plugin-node-resolve' );
const commonjs   = require( '@rollup/plugin-commonjs' );
const babel      = require( '@rollup/plugin-babel' );
const gzip       = require( 'gulp-gzip' );
const fs         = require( 'fs' ).promises;
const path       = require( 'path' );
const banner     = require( './constants/banner' );
const filename   = 'ryuseicode';


function buildScript( type, quick ) {
  const file  = type === 'default' ? `./dist/js/${ filename }.min.js` : `./dist/js/${ filename }-${ type }.min.js`;
  const input = `./src/js/build/${ type }/${ type }.ts`;

  const plugins = [
    resolve.nodeResolve(),
    typescript( {
      clean: ! quick,
      transformers: quick ? [] : [
        service => ( {
          before: [
            rename( service.getProgram(), { internalPrefix: '' } ),
          ],
          after : [],
        } ),
      ],
    } ),
  ];

  if ( ! quick ) {
    plugins.push(
      babel.getBabelOutputPlugin( {
        configFile: path.resolve( __dirname, '../.babelrc' ),
        allowAllFormats: true,
      } ),
      uglify( {
        output: {
          comments: /^!/,
        },
        mangle: {
          properties: {
            regex: /^_(private)_/,
          },
        },
      } ),
    );
  }

  return rollup( { input, plugins } )
    .then( bundle => {
      return bundle.write( {
        banner,
        file,
        format   : 'umd',
        name     : 'RyuseiCode',
        sourcemap: true,
      } );
    } ).then( () => {
      if ( type === 'default' ) {
        return src( file )
          .pipe( gzip() )
          .pipe( dest( './dist/js/' ) );
      }
    } );
}

function buildModule( format, declaration ) {
  const declarationDir = './dist/types';

  const options = declaration ? {
    check: false,
    useTsconfigDeclarationDir: true,
    tsconfigOverride: {
      compilerOptions: {
        declarationDir,
        declaration   : true,
        declarationMap: true,
      },
    },
  } : {};

  return ( declaration ? fs.rmdir( declarationDir, { recursive: true } ) : Promise.resolve() ).then( () => {
    return rollup( {
      input  : './src/js/index.ts',
      plugins: [
        resolve.nodeResolve(),
        commonjs( { sourceMap: false } ),
        typescript( options ),
        babel.getBabelOutputPlugin( {
          presets: [
            [
              '@babel/preset-env',
              {
                modules: false,
                loose  : true,
              }
            ]
          ],
          allowAllFormats: true,
        } ),
      ]
    } ).then( bundle => {
      return bundle.write( {
        banner,
        file  : `./dist/js/${ filename }.${ format }.js`,
        format,
        exports: 'named',
      } );
    } );
  } )
}


exports.buildJs = () => buildScript( 'complete' );
exports.buildJsQuick = () => buildScript( 'complete', true );

exports.buildPackage = parallel(
  function jsCore() { return buildScript( 'core' ) },
  function jsDefault() { return buildScript( 'default' ) },
  function jsExtensions() { return buildScript( 'extensions' ) },
  function jsComplete() { return buildScript( 'complete' ) },
);

exports.buildModule = parallel(
  function moduleCjs() { return buildModule( 'cjs' ) },
  function moduleEsm() { return buildModule( 'esm', true ) },
);
