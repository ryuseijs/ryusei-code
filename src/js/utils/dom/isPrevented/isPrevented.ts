/**
 * Checks if the default action of the event is prevented or not.
 *
 * @param e - An Event object.
 *
 * @return `true` if the default action is prevented, or otherwise `false`.
 */
export function isPrevented( e: Event ): boolean {
  return e && e.defaultPrevented;
}
