import { EventBusCallback, EventHandler } from '@ryusei/code';
/**
 * The class for provides the simple event system.
 *
 * @since 0.1.0
 */
export declare class EventBus<T = undefined> {
    /**
     * Holds all handlers.
     */
    protected handlers: Record<string, EventHandler[]>;
    /**
     * The owner of the instance.
     */
    private readonly owner;
    /**
     * The EventBus constructor.
     *
     * @param owner - Optional. The owner of the instance.
     */
    constructor(owner?: T);
    /**
     * Registers an event handler.
     *
     * @param events   - An event name or names separated by spaces. Use a dot(.) to add a namespace.
     * @param callback - A callback function to register.
     * @param key      - Optional. An object for an identifier of the handler.
     * @param priority - Optional. A priority number for the order in which the callbacks are invoked.
     *                   Lower numbers correspond with earlier execution. The default value is 10.
     */
    on(events: string | string[], callback: EventBusCallback, key?: object, priority?: number): void;
    /**
     * Removes event handlers registered by `on()`.
     * If only the event name is provided, all handlers that associate with the event are removed.
     * If the event name and namespace are specified, handlers that associate with the event and namespace are removed.
     *
     * @param events - An event name or names separated by spaces. Use a dot(.) to add a namespace.
     * @param key    - Optional. An object for an identifier of the handler.
     */
    off(events: string | string[], key?: object): void;
    /**
     * Triggers callback functions.
     *
     * @param event - An event name.
     * @param args  - Optional. Any number of arguments to pass to callback functions.
     */
    emit(event: string, ...args: any[]): void;
    /**
     * Removes all handlers.
     */
    destroy(): void;
}
//# sourceMappingURL=../../../src/js/event/EventBus.d.ts.map