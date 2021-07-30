/**
 * The alias of document.createRange.
 * The Range constructor is not supported by IE.
 *
 * @since 0.1.0
 */
export const createRange: () => Range = document.createRange.bind( document );
