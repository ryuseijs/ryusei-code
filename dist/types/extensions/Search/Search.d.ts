import { Elements } from '@ryusei/code';
import { Component } from '../../classes/Component/Component';
import { Editor } from '../../core/Editor/Editor';
/**
 * The class for searching texts in the code.
 *
 * @since 0.1.0
 */
export declare class Search extends Component {
    /**
     * Holds the Toolbar component.
     */
    private Toolbar;
    /**
     * Holds the wrapper element.
     */
    private wrapper;
    /**
     * Holds the element that wraps elements of the search interface.
     */
    private searchBar;
    /**
     * Holds the element that wraps elements of the replace interface.
     */
    private replaceBar;
    /**
     * Holds the element that displays matches count.
     */
    private counter;
    /**
     * Stores button elements.
     */
    private buttons;
    /**
     * The throttled search function.
     */
    private throttledSearch;
    /**
     * Holds matched ranges.
     */
    private ranges;
    /**
     * The current range index.
     */
    private index;
    /**
     * Indicates whether to ignore cases or not.
     */
    private matchCase;
    /**
     * Whether to search texts by the regular expression or not.
     */
    private regexp;
    /**
     * Whether to search texts by a whole word or not.
     */
    private wholeWord;
    /**
     * Holds search options.
     */
    private opts;
    /**
     * Keeps the ID of the timer for the delay until jumping to the next match.
     */
    private jumpTimerAfterReplace;
    /**
     * Holds the search input element.
     */
    searchField: HTMLInputElement;
    /**
     * Holds the replace input element.
     */
    replaceField: HTMLInputElement;
    /**
     * The Search constructor.
     *
     * @param Editor - An Editor instance.
     */
    constructor(Editor: Editor);
    /**
     * Initializes the component.
     *
     * @param elements - A collection of essential elements.
     */
    mount(elements: Elements): void;
    /**
     * Creates elements for the search interface.
     */
    private create;
    /**
     * Listens to some events.
     */
    private listen;
    /**
     * Called when any key is pressed on the search field.
     *
     * @param e - A KeyboardEvent object.
     */
    private onSearchFieldKeydown;
    /**
     * Called when any key is pressed on the replace field.
     *
     * @param e - A KeyboardEvent object.
     */
    private onReplaceFieldKeydown;
    /**
     * Called when any key is pressed on both the search and input fields.
     *
     * @param e - A KeyboardEvent object.
     */
    private onKeydown;
    /**
     * Called when the field receives input.
     */
    private onInput;
    /**
     * Searches the provided string with current settings.
     *
     * @param search - Optional. A string to search.
     * @param index  - Optional. An index to activate.
     *
     * @return An array with tuples that contains `[ index, length ]`.
     */
    private search;
    /**
     * Search again without changing the current index.
     *
     * @param index - Optional. An index to activate.
     */
    private rematch;
    /**
     * Updates matches counter.
     */
    private updateMatchesCount;
    /**
     * Toggles `disabled` property of some buttons.
     */
    private toggleDisabled;
    /**
     * Jumps to the start position of the range specified by the index.
     *
     * @param index - An index of the range to jump to.
     */
    private jump;
    /**
     * Highlights the prev or next matched text and jumps there.
     *
     * @param prev - Whether to highlight the previous or next match.
     */
    private move;
    /**
     * Toggles the active class and the `aria-checked` attribute.
     *
     * @param button  - A target button element.
     * @param checked - Determines whether to check or uncheck them.
     */
    private toggleChecked;
    /**
     * Toggles the replace UI.
     *
     * @param show - Determines whether to show the replace UI or not.
     */
    private toggleReplace;
    /**
     * Checks if the search toolbar is active or not.
     *
     * @return `true` if the search toolbar is active, or otherwise `false`.
     */
    private isActive;
    /**
     * Toggles the "Match Case" mode.
     *
     * @param activate - Optional. Whether to activate the "Match Case" mode or not.
     */
    toggleMatchCase(activate?: boolean): void;
    /**
     * Toggles the "RegExp" mode.
     *
     * @param activate - Optional. Whether to activate the "RegExp" mode or not.
     */
    toggleRegExp(activate?: boolean): void;
    /**
     * Toggles the "Match Whole Word" mode.
     *
     * @param wholeWord - Optional. Whether to activate the "Match Whole Word" mode or not.
     */
    toggleWholeWord(wholeWord?: boolean): void;
    /**
     * Highlights the matched text at the index.
     *
     * @param index - An index of the range to highlight.
     */
    activate(index: number): void;
    /**
     * Highlights the next matched text and jumps there.
     */
    next(): void;
    /**
     * Highlights the previous matched text and jumps there.
     */
    prev(): void;
    /**
     * Replaces the search result with the provided replacement string.
     * If the length of ranges does not change after replacing,
     * that means the replacement includes the original word itself.
     *
     * @param replacement - Optional. A replacement string.
     * @param index       - Optional. An index to replace.
     */
    replace(replacement?: string, index?: number): void;
    /**
     * Converts the provided range to the range index.
     *
     * @param range - A range to convert into a range index.
     *
     * @return A range index if available, or otherwise `-1`.
     */
    private toIndex;
    /**
     * Replaces all matched strings with the replacement.
     *
     * @param replacement - Optional. A replacement string.
     */
    replaceAll(replacement?: string): void;
    /**
     * Shows the toolbar.
     *
     * @param replace - Whether to display the replace interface or not.
     */
    show(replace: boolean): void;
    /**
     * Clears all markers.
     */
    clear(): void;
}
//# sourceMappingURL=../../../../src/js/extensions/Search/Search.d.ts.map