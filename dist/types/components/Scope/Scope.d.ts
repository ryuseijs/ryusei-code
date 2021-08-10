import { Position } from '@ryusei/code';
import { Component } from '../../classes/Component/Component';
/**
 * The class for checking a current state or category.
 * States and categories are defined by language tokenizers.
 *
 * @since 0.1.0
 */
export declare class Scope extends Component {
    /**
     * Checks if the current or specified position is in the specified state or category.
     * With the `!` negating notation, this returns `true` if the position is NOT inside the scope.
     *
     * Note that the Lexer (RyuseiLight) determines states and categories.
     *
     * @example
     * ```ts
     * // Returns `true` if the caret is inside a comment.
     * Scope.isIn( [ 'comment' ] );
     *
     * // Returns `true` if the caret is inside a "attr" state.
     * Scope.isIn( [ '#attr' ] );
     *
     * // Returns `true` if the caret is not inside a comment and a string.
     * Scope.isIn( [ '!comment', '!string' ] );
     * ```
     *
     * @param names    - A name or an array with names of states and/or categories.
     * @param position - Optional. Specifies the position to check.
     *
     * @return `true` if the start position is inside the scope.
     */
    isIn(names: string | string[], position?: Position): boolean;
    /**
     * Checks if the current or specified position is in the specified state or not.
     * The `!` negating notation is acceptable.
     *
     * @param states   - A name or an array with names of states.
     * @param position - Optional. Specifies the position to check.
     */
    inState(states: string | string[], position?: Position): boolean;
    /**
     * Checks if the current or specified position is in the specified category or not.
     * The `!` negating notation is acceptable.
     *
     * @param categories - A name or an array with names of categories.
     * @param position   - Optional. Specifies the position to check.
     */
    inCategory(categories: string | string[], position?: Position): boolean;
    /**
     * Checks if the current start position is in the specified state or not.
     * If `category` is `true`, this method checks if the position is in the category or not.
     *
     * @param names    - A state or state names.
     * @param category - Optional. Determines whether to check for a category or not.
     * @param position - Optional. Specifies the position to check.
     */
    private inScope;
}
//# sourceMappingURL=../../../../src/js/components/Scope/Scope.d.ts.map