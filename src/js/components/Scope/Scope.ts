import { Position } from '@ryusei/code';
import { Component } from '../../classes/Component/Component';
import { startsWith, toArray } from '../../utils';


/**
 * The class for checking a current state or category.
 * States and categories are defined by language tokenizers.
 *
 * @since 0.1.0
 */
export class Scope extends Component {
  /**
   * Checks if the current start position is in the specified state or category.
   * With a `!` prefix, this returns `true` if the position is NOT inside the scope.
   *
   * @param names    - A name or names of scope.
   * @param position - Optional. Specifies the position to check.
   *
   * @return `true` if the start position is inside the scope.
   */
  isIn( names: string | string[], position?: Position ): boolean {
    names = toArray( names );

    const states     = names.filter( name => name.indexOf( '#' ) > -1 );
    const categories = names.filter( name => name.indexOf( '#' ) === -1 );

    return this.inState( states, position ) && this.inCategory( categories, position );
  }

  /**
   * Checks if the current start position is in the specified state or not.
   * `!` is acceptable.
   *
   * @param states   - A state or state names.
   * @param position - Optional. Specifies the position to check.
   */
  inState( states: string | string[], position?: Position ): boolean {
    return this.inScope( states, false, position );
  }

  /**
   * Checks if the current start position is in the specified category or not.
   * `!` is acceptable.
   *
   * @param categories - A state or state names.
   * @param position   - Optional. Specifies the position to check.
   */
  inCategory( categories: string | string[], position?: Position ): boolean {
    return this.inScope( categories, true, position );
  }

  /**
   * Checks if the current start position is in the specified state or not.
   * If `category` is `true`, this method checks if the position is in the category or not.
   *
   * @param names    - A state or state names.
   * @param category - Optional. Determines whether to check for a category or not.
   * @param position - Optional. Specifies the position to check.
   */
  private inScope( names: string | string[], category: boolean, position?: Position ): boolean {
    names = toArray( names );

    const negated = names.filter( name => startsWith( name, '!' ) ).map( name => name.slice( 1 ) );

    if ( negated.length && this.inScope( negated, category ) ) {
      return false;
    }

    names = names.filter( name => ! startsWith( name, '!' ) );

    return ! names.length || names.some( name => {
      const info = this.lines.getInfoAt( position || this.Selection.get().start );
      return info && info[ category ? 'category' : 'state' ] === name;
    } );
  }
}
