/**
 * jsdom does not have the URL.createObjectURL implementation.
 */
URL.createObjectURL = jest.fn();

/**
 * Returns an empty DOMRect object.
 */
Range.prototype.getBoundingClientRect = () => {
  return { top: 0, right: 0, bottom: 0, left: 0, width: 0, height: 0, x: 0, y: 0, toJSON: jest.fn() };
};

/**
 * jsdom does not have the `PointerEvent`.
 */
Object.defineProperty( window, 'PointerEvent', { value: Event } );

/**
 * jsdom does not have the `window.scrollTo()`.
 */
Object.defineProperty( window, 'scrollTo', { value: jest.fn(), writable: true } );

/**
 * Mocks the Canvas context object.
 */
HTMLCanvasElement.prototype.getContext = () => {
  return {
    measureText: () => ( { width: 0 } ),
  } as any;
};
