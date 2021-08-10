import { Elements } from '@ryusei/code';
import { Component } from '../../classes/Component/Component';
/**
 * The group ID for markers.
 *
 * @since 0.1.0
 */
export declare const MARKER_ID = "brackets";
/**
 * The debounce duration for the clear method.
 *
 * @since 0.1.0
 */
export declare const CLEAR_DEBOUNCE_DURATION = 50;
/**
 * The component for highlighting matched brackets.
 *
 * @since 0.1.0
 */
export declare class BracketMatching extends Component {
    /**
     * The debounced clear function.
     */
    private clear;
    /**
     * The collection of brackets.
     */
    private brackets;
    /**
     * Limits the number of lines to match brackets.
     */
    private maxScanLines;
    /**
     * Initializes the component.
     *
     * @param elements - A collection of essential elements.
     */
    mount(elements: Elements): void;
    /**
     * Called when the selection state is changed.
     *
     * @param e         - An EventBusEvent object.
     * @param Selection - A Selection instance.
     */
    private onSelected;
    /**
     * Checks the current location and renders markers.
     */
    private update;
    /**
     * Draws the provided bracket token and its counterpart.
     *
     * @param row  - A row index.
     * @param info - A TokenInfo object.
     */
    private draw;
    /**
     * Finds the counterpart of the provided token.
     *
     * @param findClosing - Determines whether to find closing part or not.
     * @param row         - A row index.
     * @param info        - A TokenInfo object.
     *
     * @return A counter token of the passed info if found, or otherwise `undefined`.
     */
    private find;
    /**
     * Converts the provided TokeInfo object to the range.
     *
     * @param row  - A row index.
     * @param info - A TokenInfo object to convert.
     *
     * @return A Range object.
     */
    private infoToRange;
}
//# sourceMappingURL=../../../../src/js/extensions/BracketMatching/BracketMatching.d.ts.map