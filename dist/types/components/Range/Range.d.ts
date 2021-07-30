import { Elements, Range as PositionRange, RangeData } from '@ryusei/code';
import { Component } from '../../classes/Component/Component';
import { Marker } from './Marker';
import { SelectionMarker } from './SelectionMarker';
/**
 * The throttle duration for calling the `observe` method while scrolling.
 *
 * @since 0.1.0
 */
export declare const OBSERVE_THROTTLE_DURATION = 200;
/**
 * Limits the number of ranges to register.
 *
 * @since 0.1.0
 */
export declare const MAX_RANGES = 10000;
/**
 * The class for highlighting the selection and arbitrary ranges.
 *
 * @since 0.1.0
 */
export declare class Range extends Component {
    /**
     * Holds the SelectionMarker instance.
     */
    selection: SelectionMarker;
    /**
     * Stores ranges with categorizing them into arbitrary groups.
     */
    readonly ranges: Record<string, RangeData[]>;
    /**
     * Stores wrapper elements of markers.
     */
    readonly groups: Record<string, HTMLDivElement>;
    /**
     * Initializes the component.
     *
     * @param elements - A collection of editor elements.
     */
    mount(elements: Elements): void;
    /**
     * Observes ranges and draw/hide them.
     *
     * @param refresh - Optional. If `true`, redraws markers without their caches.
     */
    private observe;
    /**
     * Draws visible markers.
     *
     * @param group   - A group to draw.
     * @param refresh - Optional. If `true`, redraws markers without their caches.
     */
    private draw;
    /**
     * Checks if the range should be drawn or not.
     * This returns `true` when the range boundary is inside the viewport, or the range contains it.
     *
     * @param range - A range to check.
     *
     * @return `true` if the range should be drawn or otherwise `false`.
     */
    private isVisible;
    /**
     * Registers ranges to the group and draw them as markers if they are inside viewport.
     * If `concat` is `true`, sequential ranges will be concatenated as a single range.
     *
     * @param group       - A group name.
     * @param ranges      - A range or ranges to draw.
     * @param concat      - Optional. Determines whether to concat sequential ranges into the single one or not.
     * @param constructor - Optional. Specifies the Marker constructor.
     */
    register(group: string, ranges: PositionRange[], concat?: boolean, constructor?: typeof Marker): void;
    /**
     * Clears ranges and rendered markers in the specified group.
     * If the group name is omitted, all ranges will be cleared.
     *
     * @param group - Optional. A group name to clear.
     */
    clear(group?: string): void;
    /**
     * Clears ranges in the specified group.
     * Rendered markers are not cleared.
     *
     * @param group - A group name to clear.
     */
    clearRanges(group: string): void;
}
//# sourceMappingURL=../../../../src/js/components/Range/Range.d.ts.map