import { Elements } from '@ryusei/code';
import { Component } from '../../classes/Component/Component';
import { CustomCaret } from './CustomCaret';
/**
 * The ID of the primary caret.
 *
 * @since 0.1.0
 */
export declare const PRIMARY_CARET_ID = "primary";
/**
 * The component for generating and handling carets.
 *
 * @since 0.1.0
 */
export declare class Caret extends Component {
    /**
     * The wrapper element that contains caret elements.
     */
    private wrapper;
    /**
     * Stores the all registered Caret instances.
     */
    private carets;
    /**
     * Holds the primary Caret instance.
     */
    private primary;
    /**
     * Mounts the component.
     * Uses the native caret on IE and mobile devices.
     *
     * @param elements - A collection of essential editor elements.
     */
    mount(elements: Elements): void;
    /**
     * Creates a wrapper element that contains carets.
     */
    private create;
    /**
     * Listens to some events.
     */
    private listen;
    /**
     * Called when the selection state is changed.
     *
     * @param e         - An EventBusEvent object.
     * @param Selection - A Selection instance.
     */
    private onSelected;
    /**
     * Updates the primary caret position on the animation frame.
     */
    private update;
    /**
     * Registers a new caret.
     *
     * @param id - An ID for the caret to register.
     *
     * @return A registered Caret instance.
     */
    register(id: string): CustomCaret;
    /**
     * Returns the primary or the particular caret.
     *
     * @param id - Optional. A caret ID.
     *
     * @return A Caret instance if available, or otherwise `undefined`.
     */
    get(id?: string): CustomCaret | undefined;
    /**
     * Returns the DOMRect object of the native caret.
     *
     * @return A DOMRect object.
     */
    get rect(): DOMRect | null;
}
//# sourceMappingURL=../../../../src/js/components/Caret/Caret.d.ts.map