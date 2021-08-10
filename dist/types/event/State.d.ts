import { EventBusCallback } from '@ryusei/code';
import { EventBus } from './EventBus';
/**
 * The class for providing a simple state system.
 *
 * @since 0.1.0
 */
export declare class State<T = number> {
    /**
     * Indicates the current state.
     */
    private state;
    /**
     * Keeps the prev state.
     */
    private prev;
    /**
     * Indicates whether the state change is on hold or not.
     */
    private held;
    /**
     * The EventBus instance.
     */
    protected event: EventBus<undefined>;
    /**
     * The State constructor.
     *
     * @param initial - An initial state.
     */
    constructor(initial: T);
    /**
     * Sets a new state.
     *
     * @param state - A state to change to.
     */
    set(state: T): void;
    /**
     * Checks if the current state is a provided one or one of them.
     * If multiple states are passed, this method checks them by the `or` condition.
     *
     * @param states - A state or states to check.
     */
    is(...states: T[]): boolean;
    /**
     * Checks if the previous state is a provided one or one of them.
     * If multiple states are passed, this method checks them by the `or` condition.
     *
     * @param states - A state or states to check.
     */
    isPrev(...states: T[]): boolean;
    /**
     * Holds the current state so that it won't change.
     */
    hold(): void;
    /**
     * Disables to hold the state.
     */
    release(): void;
    /**
     * Registers the event handler.
     *
     * @param events   - An event name or names separated by spaces.
     * @param callback - A callback function to register.
     * @param priority - Optional. A priority number for the order in which the callbacks are invoked.
     */
    on(events: string, callback: EventBusCallback, priority?: number): void;
}
//# sourceMappingURL=../../../src/js/event/State.d.ts.map