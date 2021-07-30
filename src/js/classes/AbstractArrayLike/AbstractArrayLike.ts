import { arrayProto, splice } from '../../utils';


/**
 * The abstract class for implementing an ArrayLike class.
 *
 * @since 0.1.0
 *
 * @typeParam T - A type for each element.
 */
export abstract class AbstractArrayLike<T> implements ArrayLike<T> {
  /**
   * The length of elements.
   */
  length = 0;

  /**
   * The index signature for behaving an array-like object.
   */
  [ index: number ]: T;

  /**
   * Implements the `push` method by using native method.
   *
   * @param items - Items to push.
   */
  push( ...items: T[] ): void {
    arrayProto.push.apply( this, items );
  }

  /**
   * Implements the `splice` method by using native method.
   *
   * @param start       - A start index.
   * @param deleteCount - The number of items to delete from the start index.
   * @param items       - New items to insert at the start index.
   */
  splice( start: number, deleteCount?: number, ...items: T[] ): void {
    splice( this, start, deleteCount, ...items );
  }

  /**
   * Clears elements.
   */
  clear(): void {
    splice( this, 0, this.length );
  }
}
