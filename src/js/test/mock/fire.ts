import { assign } from '../../utils';


/**
 * Fires any native event manually.
 *
 * @param target - A target.
 * @param type   - An event type.
 * @param data   - Optional. Additional data.
 *
 * @return An event object.
 */
export function fire( target: Window | Document | Element, type: string, data: any = {} ): Event {
  const e = new Event( type );
  target.dispatchEvent( assign( e, data ) );
  return e;
}
