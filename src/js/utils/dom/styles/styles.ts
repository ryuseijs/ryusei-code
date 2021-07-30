import { forOwn } from '../../object';
import { isString, isUndefined } from '../../type/type';


/**
 * The union for CSS style properties, such as "padding", "fontSize", etc.
 *
 * @since 0.1.0
 */
export type CSSStyleProperties = Exclude<keyof CSSStyleDeclaration, number>;

export function styles(
  elm: HTMLElement,
  styles: Record<string, string | number>
): void;

export function styles<K extends CSSStyleProperties>(
  elm: HTMLElement,
  styles: K
): CSSStyleDeclaration[ K ];

export function styles(
  elm: HTMLElement,
  styles: string
): string;


/**
 * Applies inline styles to the provided element by an object literal.
 *
 * @param elm    - An element to apply styles to.
 * @param styles - An object literal with styles.
 */
export function styles<K extends CSSStyleProperties>(
  elm: HTMLElement,
  styles: Record<string, string | number> | K
): CSSStyleDeclaration[ K ] | void {
  if ( isString( styles ) ) {
    return getComputedStyle( elm )[ styles ];
  }

  forOwn( styles, ( value, key ) => {
    if ( ! isUndefined( value ) ) {
      elm.style[ key ] = String( value );
    }
  } );
}
