import { EventBusCallback } from '@ryusei/code';
import { includes, slice } from '../utils';
import { EventBus } from './EventBus';


/**
 * The class for providing a simple state system.
 *
 * @since 0.1.0
 */
export class State<T = number> {
  /**
   * Indicates the current state.
   */
  private state: T;

  /**
   * Keeps the prev state.
   */
  private prev: T | undefined;

  /**
   * Indicates whether the state change is on hold or not.
   */
  private held: boolean;

  /**
   * The EventBus instance.
   */
  protected event = new EventBus();

  /**
   * The State constructor.
   *
   * @param initial - An initial state.
   */
  constructor( initial: T ) {
    this.state = initial;
  }

  /**
   * Sets a new state.
   *
   * @param state - A state to change to.
   */
  set( state: T ): void {
    if ( this.state !== state && ! this.held ) {
      this.prev  = this.state;
      this.state = state;
      this.event.emit( 'changed', state, this.prev );
    }
  }

  /**
   * Checks if the current state is a provided one or one of them.
   * If multiple states are passed, this method checks them by the `or` condition.
   *
   * @param states - A state or states to check.
   */
  is( ...states: T[] ): boolean {
    return includes( slice( states ), this.state );
  }

  /**
   * Checks if the previous state is a provided one or one of them.
   * If multiple states are passed, this method checks them by the `or` condition.
   *
   * @param states - A state or states to check.
   */
  isPrev( ...states: T[] ): boolean {
    return includes( slice( states ), this.prev );
  }

  /**
   * Holds the current state so that it won't change.
   */
  hold(): void {
    this.held = true;
  }

  /**
   * Disables to hold the state.
   */
  release(): void {
    this.held = false;
  }

  /**
   * Registers the event handler.
   *
   * @param events   - An event name or names separated by spaces.
   * @param callback - A callback function to register.
   * @param priority - Optional. A priority number for the order in which the callbacks are invoked.
   */
  on( events: string, callback: EventBusCallback, priority?: number ): void {
    this.event.on( events, callback, this, priority );
  }
}
