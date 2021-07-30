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
     * Checks if the current start position is in the specified state or category.
     * With a `!` prefix, this returns `true` if the position is NOT inside the scope.
     *
     * @param names    - A name or names of scope.
     * @param position - Optional. Specifies the position to check.
     *
     * @return `true` if the start position is inside the scope.
     */
    isIn(names: string | string[], position?: Position): boolean;
    /**
     * Checks if the current start position is in the specified state or not.
     * `!` is acceptable.
     *
     * @param states   - A state or state names.
     * @param position - Optional. Specifies the position to check.
     */
    inState(states: string | string[], position?: Position): boolean;
    /**
     * Checks if the current start position is in the specified category or not.
     * `!` is acceptable.
     *
     * @param categories - A state or state names.
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