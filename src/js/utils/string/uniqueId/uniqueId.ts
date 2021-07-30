const ids: Record<string, number> = {};

/**
 * Returns a sequential unique ID as "{ prefix }-{ number }".
 *
 * @param prefix - A prefix for the ID.
 */
export function uniqueId( prefix: string ): string {
  const number   = ( ids[ prefix ] || 0 ) + 1;
  const idNumber = number < 10 ? `0${ number }` : number;

  ids[ prefix ] = number;

  return `${ prefix }${ idNumber }`;
}
