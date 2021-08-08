/**
 * The alias of document.createRange.
 * The Range constructor is not supported by IE.
 *
 * @since 0.1.0
 *
 * @return A Range instance.
 */
export function createRange(): Range {
  return document.createRange();
}
