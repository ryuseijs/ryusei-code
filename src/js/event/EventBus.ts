import { EventBusCallback, EventBusEvent, EventHandler } from '@ryusei/code';
import { toArray } from '../utils';


/**
 * The class for provides the simple event system.
 *
 * @since 0.1.0
 */
export class EventBus<T = undefined> {
  /**
   * Holds all handlers.
   */
  protected handlers: Record<string, EventHandler[]> = {};

  /**
   * The owner of the instance.
   */
  private readonly owner: T | undefined;

  /**
   * The EventBus constructor.
   *
   * @param owner - Optional. The owner of the instance.
   */
  constructor( owner?: T ) {
    this.owner = owner;
  }

  /**
   * Registers an event handler.
   *
   * @param events   - An event name or names separated by spaces. Use a dot(.) to add a namespace.
   * @param callback - A callback function to register.
   * @param key      - Optional. An object for an identifier of the handler.
   * @param priority - Optional. A priority number for the order in which the callbacks are invoked.
   *                   Lower numbers correspond with earlier execution. The default value is 10.
   */
  on( events: string | string[], callback: EventBusCallback, key?: object, priority = 10 ): void {
    toArray( events ).filter( Boolean ).join( ' ' ).split( ' ' ).forEach( eventNS => {
      const [ event, namespace ] = eventNS.split( '.' );
      const eventHandlers = this.handlers[ event ] || [];

      eventHandlers.push( { event, callback, namespace, priority, key } );
      eventHandlers.sort( ( handler1, handler2 ) => handler1.priority - handler2.priority );

      this.handlers[ event ] = eventHandlers;
    } );
  }

  /**
   * Removes event handlers registered by `on()`.
   * If only the event name is provided, all handlers that associate with the event are removed.
   * If the event name and namespace are specified, handlers that associate with the event and namespace are removed.
   *
   * @param events - An event name or names separated by spaces. Use a dot(.) to add a namespace.
   * @param key    - Optional. An object for an identifier of the handler.
   */
  off( events: string | string[], key?: object ): void {
    toArray( events ).filter( Boolean ).join( ' ' ).split( ' ' ).forEach( eventNS => {
      const [ event, namespace ] = eventNS.split( '.' );
      const eventHandlers = this.handlers[ event ];

      if ( eventHandlers ) {
        if ( key || namespace ) {
          this.handlers[ event ] = eventHandlers.filter( handler => {
            return ! ( handler.key === key && handler.namespace === namespace );
          } );
        } else {
          this.handlers[ event ] = [];
        }
      }
    } );
  }

  /**
   * Triggers callback functions.
   *
   * @param event - An event name.
   * @param args  - Optional. Any number of arguments to pass to callback functions.
   */
  emit( event: string, ...args: any[] ): void {
    const eventHandlers = this.handlers[ event ];
    const eventObject: EventBusEvent<T> = { type: event, owner: this.owner };

    if ( eventHandlers ) {
      eventHandlers.forEach( handler => { handler.callback( eventObject, ...args ) } );
    }
  }

  /**
   * Removes all handlers.
   */
  destroy(): void {
    this.handlers = {};
  }
}
