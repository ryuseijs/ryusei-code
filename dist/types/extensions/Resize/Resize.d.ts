import { Elements } from '@ryusei/code';
import { Component } from '../../classes/Component/Component';
/**
 * The class name for the wrapper element that contains resize bars.
 *
 * @since 0.1.0
 */
export declare const CLASS_SIZER: string;
/**
 * The component for resizing the editor by drag bars.
 *
 * @since 0.1.0
 */
export declare class Resize extends Component {
    /**
     * Stores ResizeBar instances.
     */
    private bars;
    /**
     * Initializes the component.
     *
     * @param elements - A collection of essential elements.
     */
    mount(elements: Elements): void;
    /**
     * Destroys the component.
     */
    destroy(): void;
}
//# sourceMappingURL=../../../../src/js/extensions/Resize/Resize.d.ts.map