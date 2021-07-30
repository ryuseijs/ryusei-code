import { RyuseiCode } from '../src/js';
import * as Extensions from '../src/js/extensions';
import { html, javascript, typescript } from '../src/js/languages';


/**
 * Registers all languages.
 */
RyuseiCode.register( [ typescript(), javascript(), html() ] );

/**
 * Registers all components.
 */
RyuseiCode.compose( Extensions );
