import { Elements } from '@ryusei/code';
import { Component } from '../../classes/Component/Component';
import {
  CLASS_CARET,
  CLASS_EDITOR,
  CLASS_EMPTY,
  CLASS_LINE,
  CLASS_MARKER,
  CLASS_PRESERVED,
} from '../../constants/classes';
import { EVENT_INIT_STYLE } from '../../constants/events';
import { Editor } from '../../core/Editor/Editor';
import { append, camelToKebab, forOwn, isString, isUndefined, query, remove, text, unit } from '../../utils';
import { FontObserver } from './FontObserver';


/**
 * The component for customizing some styles of the editor.
 *
 * @since 0.1.0
 */
export class Style extends Component {
  /**
   * Stores all styles.
   */
  private selectors: Record<string, Record<string, number | string>> = {};

  /**
   * Holds the style element.
   */
  private style: HTMLStyleElement;

  /**
   * The Style constructor.
   *
   * @param Editor - An Editor element.
   */
  constructor( Editor: Editor ) {
    super( Editor );

    this.init();

    this.on( 'view:open', ( e, append ) => {
      this.emit( EVENT_INIT_STYLE, this.add.bind( this ) );
      append( `<style id="${ this.options.id }-style">${ this.build() }</style>` );
    } );
  }

  /**
   * Adds styles defined in options.
   */
  private init(): void {
    const { options, options: { lineHeight, tabSize } } = this;

    [ 'width', 'height', 'minWidth', 'minHeight', 'maxWidth', 'maxHeight' ].forEach( prop => {
      const value = options[ prop ];

      if ( value ) {
        this.add( 'root', prop, unit( value ) );
      }
    } );

    if ( tabSize ) {
      this.add( 'root', '-moz-tab-size', tabSize );
      this.add( 'root', 'tabSize', tabSize );
    }

    const height = lineHeight ? `${ lineHeight }em` : undefined;

    this.add( `.${ CLASS_EDITOR }`, {
      lineHeight: lineHeight,
      fontFamily: options.monospaceFont,
    } );

    this.add( `.${ CLASS_MARKER }`, 'minHeight', height );
    this.add( `.${ CLASS_CARET }`, 'height', height );
    this.add( `.${ CLASS_LINE }:not(.${ CLASS_EMPTY }):not(.${ CLASS_PRESERVED })`, 'height', height );
  }

  /**
   * Converts the selectors object into a single style string.
   *
   * @return A built string.
   */
  private build(): string {
    let html = '';

    forOwn( this.selectors, ( styles, selector ) => {
      let props = '';

      forOwn( styles, ( value, prop ) => {
        if ( ! isUndefined( value ) ) {
          props += `${ camelToKebab( prop ) }: ${ value };`;
        }
      } );

      if ( props ) {
        html += `${ selector }{${ props }}`;
      }
    } );

    return html;
  }

  /**
   * Initializes the component.
   *
   * @internal
   *
   * @param elements - A collection of essential editor elements.
   */
  mount( elements: Elements ): void {
    this.style = query( elements.root, 'style' );
    append( query( document, 'head' ), this.style );

    if ( this.options.monospaceFont ) {
      new FontObserver( this.Editor );
    }
  }

  /**
   * Adds styles to the specified selector.
   * The `Editor#apply()` or `Editor#html()` applies the registered styles once,
   * and therefore initial styles must be added before them.
   * Otherwise, you should manually invoke the `apply()` method.
   *
   * @param selector - A selector string.
   * @param prop     - A CSS property or an objet literal with properties and values.
   * @param value    - Optional. A value for the property.
   */
  add( selector: string, prop: string | Record<string, number | string>, value?: number | string ): void {
    if ( isString( prop ) ) {
      if ( ! isUndefined( value ) ) {
        const { selectors } = this;
        selector = `#${ this.options.id }${ selector === 'root' ? '' : ' ' + selector }`;
        selectors[ selector ] = selectors[ selector ] || {};
        selectors[ selector ][ prop ] = value;
      }
    } else {
      forOwn( prop, ( value, key ) => {
        this.add( selector, key, value );
      } );
    }
  }

  /**
   * Applies registered styles to the style element.
   */
  apply(): void {
    text( this.style, this.build() );
  }

  /**
   * Destroys the component.
   *
   * @internal
   */
  destroy(): void {
    super.destroy();
    remove( this.style );
  }
}
