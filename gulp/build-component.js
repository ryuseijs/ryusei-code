const rollup     = require( 'rollup' ).rollup;
const typescript = require( 'rollup-plugin-typescript2' );
const rename     = require( 'ts-transformer-properties-rename' ).default;
const uglify     = require( 'rollup-plugin-uglify' ).uglify;
const babel      = require( '@rollup/plugin-babel' );
const resolve    = require( '@rollup/plugin-node-resolve' );
const commonjs   = require( '@rollup/plugin-commonjs' );
const fs         = require( 'fs' ).promises;
const path       = require( 'path' );
const minimist   = require( 'minimist' );
const banner     = require( './constants/banner' );


function buildLanguages() {
  const dir      = './src/js/languages';
  const options  = minimist( process.argv.slice( 2 ) );
  const { lang } = options;

  // Build a single language file if specified through a command line.
  if ( lang ) {
    return buildLanguage( dir, lang );
  }

  // Now builds all languages.
  return fs.readdir( dir, { withFileTypes: true } )
    .then( entries => {
      return Promise.all( entries.map( entry => {
        if ( entry.isDirectory() ) {
          return buildLanguage( dir, entry.name );
        }
      } ) );
    } );
}

function buildLanguage( dir, lang ) {
  const script = `
    import { ${ lang } } from './${ lang }'

    if ( typeof window !== 'undefined' && window[ 'RyuseiCode' ] ) {
      window[ 'RyuseiCode' ].register( ${ lang }() );
    }
  `;

  return build( dir, lang, script );
}

function buildExtensions() {
  const dir           = './src/js/extensions';
  const options       = minimist( process.argv.slice( 2 ) );
  const { component } = options;

  // Build a single component file if specified through a command line.
  if ( component ) {
    return buildExtension( dir, component );
  }

  return fs.readdir( dir, { withFileTypes: true } ).then( entries => {
    return Promise.all( entries.map( entry => {
      if ( entry.isDirectory() ) {
        return buildExtension( dir, entry.name );
      }
    } ) );
  } );
}

function buildExtension( dir, extension ) {
  const script = `
    import { ${ extension } } from './${ extension }'

    if ( typeof window !== 'undefined' && window[ 'RyuseiCode' ] ) {
      window[ 'RyuseiCode' ].compose( { ${ extension } } );
    }
  `;

  return build( dir, extension, script, true );
}

function build( dir, file, script, kebab = false ) {
  const temp      = path.join( dir, file, `_temp.ts` );
  const fragments = dir.split( '/' );
  const dirname   = fragments[ fragments.length - 1 ];

  return fs.writeFile( temp, script )
    .then( () => {
      return rollup( {
        input  : temp,
        plugins: [
          resolve.nodeResolve(),
          commonjs( { sourceMap: false } ),
          typescript( {
            clean: true,
            transformers: [
              service => ( {
                before: [
                  rename( service.getProgram(), { internalPrefix: '' } ),
                ],
                after : [],
              } ),
            ],
            tsconfigOverride: {
              compilerOptions: {
                mapRoot            : null,
                declarationDir     : null,
                declaration        : false,
                declarationMap     : false,
                sourceMap          : false,
                noImplicitUseStrict: true,
                noImplicitAny      : false,
              }
            },
          } ),
          babel.getBabelOutputPlugin( { configFile: path.resolve( __dirname, '../.babelrc' ) } ),
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
        ]
      } ).then( bundle => {
        return bundle.write( {
          banner,
          file     : path.join( `./dist/js/${ dirname }`, `${ kebab ? toKebab( file ) : file }.min.js` ),
          sourcemap: false,
        } );
      } );
    } )
    .then( () => fs.unlink( temp ) );
}

/**
 * Converts camel case to kebab case.
 *
 * @param string - A string to convert.
 *
 * @return A converted string.
 */
function toKebab( string ) {
  return string
    .replace( /([a-z0-9])([A-Z])/g, '$1 $2' )
    .replace( /[\s\-_]+/g, ' ' )
    .split( ' ' )
    .filter( Boolean )
    .map( word => word.toLowerCase() )
    .join( '-' );
}

exports.buildLanguages  = buildLanguages;
exports.buildExtensions = buildExtensions;
