import { Elements } from '@ryusei/code';
import { Component } from '../../classes/Component/Component';
/**
 * The group ID for markers of indent guides.
 *
 * @since 0.1.0
 */
export declare const MARKER_ID = "indent";
/**
 * The component for drawing guide lines.
 *
 * @since 0.1.0
 */
export declare class Guide extends Component {
    /**
     * Initializes the component.
     *
     * @param elements - A collection of editor elements.
     */
    mount(elements: Elements): void;
    /**
     * Listens some events.
     */
    private listen;
    /**
     * Clears current guides and draw new ranges for guides.
     */
    private draw;
    /**
     * Parses chunk lines and returns ranges for guides.
     *
     * @return An array with ranges.
     */
    private parse;
}
//# sourceMappingURL=../../../../src/js/extensions/Guide/Guide.d.ts.map