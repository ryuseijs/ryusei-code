import { Attributes, Options } from '@ryusei/code';
import { Code } from '../../components';
import { Lines } from '../../components/Code/Lines';
import { ATTRIBUTES_EDITABLE_AREA } from '../../constants/attributes';
import {
  CLASS_BODY,
  CLASS_CONTAINER,
  CLASS_EDITOR,
  CLASS_LINE,
  CLASS_LINES,
  CLASS_RENDERED,
  CLASS_ROOT,
  CLASS_SCROLLER,
  CLASS_SOURCE,
  CLASS_VIEW,
} from '../../constants/classes';
import { EventBus } from '../../event/EventBus';
import { assign, min, repeat, tag } from '../../utils';


/**
 * The class for rendering the editor.
 *
 * @since 0.1.0
 */
export class Renderer {
  /**
   * Holds the EventBus instance.
   */
  protected readonly event: EventBus

  /**
   * Holds the Code instance.
   */
  protected readonly Code: Code;

  /**
   * Holds the lines instance.
   */
  protected readonly lines: Lines;

  /**
   * Holds options.
   */
  protected readonly options: Options;

  /**
   * The Renderer constructor.
   *
   * @param Code    - A Code instance.
   * @param event   - An EventBus instance.
   * @param options - Options.
   */
  constructor( Code: Code, event: EventBus, options: Options ) {
    this.Code    = Code;
    this.lines   = Code.Lines;
    this.event   = event;
    this.options = options;
  }

  /**
   * Render lines until the number reaches the `maxInitialLines`.
   * Rest lines are rendered in the temporary `pre` element.
   *
   * @param append - The function to append a HTML string.
   */
  protected renderLines( append: ( string: string ) => void ): void {
    const { lines } = this;
    const max = min( lines.length, this.options.maxInitialLines );

    for ( let i = 0; i < max; i++ ) {
      append( tag( CLASS_LINE ) + lines[ i ].html + '</div>' );
    }
  }

  /**
   * Builds the HTML for the editor.
   *
   * @param source - Optional. Determines whether to embed the source code as a pre element or not.
   *
   * @return The built HTML string.
   */
  html( source?: boolean ): string {
    let html = '';

    const { options, options: { id } } = this;
    const append  = ( string: string ) => { html += string };
    const classes = [ CLASS_ROOT, CLASS_RENDERED ].concat( options.rootClasses );

    const divs: [ string, string[], Attributes? ][] = [
      [ 'root', classes, { id, role: 'code' } ],
      [ 'view', [ CLASS_VIEW ].concat( options.viewClasses ) ],
      [ 'body', [ CLASS_BODY ] ],
      [ 'scroller', [ CLASS_SCROLLER ] ],
      [ 'container', [ CLASS_CONTAINER ] ],
      [ 'editor', [ CLASS_EDITOR ] ],
    ];

    divs.forEach( settings => {
      this.event.emit( `${ settings[ 0 ] }:open`, append, settings[ 1 ], this.lines );
      const attrs = assign( { id: `${ id }-${ settings[ 0 ] }` }, settings[ 2 ] );
      html += tag( settings[ 1 ], attrs );
    } );

    html += tag( [ CLASS_LINES ], ATTRIBUTES_EDITABLE_AREA );
    this.renderLines( append );
    html += '</div>';

    if ( source ) {
      html += `<pre class="${ CLASS_SOURCE }">${ this.Code.value }</pre>`;
    }

    return html + repeat( '</div>', divs.length );
  }
}
