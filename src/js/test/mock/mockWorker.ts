import { AnyFunction } from '@ryusei/code';
import { javascript } from '@ryusei/light';
import { Lexer } from '../../core/Lexer/Lexer';


/**
 * Forcibly defines the Worker class in the window object.
 *
 * @since 0.1.0
 */
export function mockWorker(): void {
  /**
   * Mocks the Worker for tokenization.
   */
  Object.defineProperty( window, 'Worker', { value: class {
    /**
     * Just holds the provided URL.
     */
    url: string;

    /**
     * The callback function executed after tokenization.
     */
    onmessage: AnyFunction;

    /**
     * The timer ID.
     */
    protected timer: ReturnType<typeof setTimeout>;

    /**
     * The Worker constructor.
     *
     * @param url - A URL to the worker, but will never be used.
     */
    constructor( url: string ) {
      this.url = url;
    }

    /**
     * Starts the worker.
     *
     * @param data - A data object.
     */
    postMessage( data: { code: string, limit?: number } ): void {
      setTimeout( () => {
        if ( this.onmessage ) {
          const lexer = new Lexer( javascript() );
          const e: any = { data: lexer.run( data.code, data.limit ) };
          this.onmessage( e );
        }
      }, 10 );
    }

    /**
     * Terminates the worker.
     */
    terminate(): void {
      if ( this.timer ) {
        clearTimeout( this.timer );
      }
    }
  } } );
}
