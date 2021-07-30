import { Elements } from '@ryusei/code';
import { Editor } from '../../core/Editor/Editor';
import { StandaloneMarker } from './StandaloneMarker';
/**
 * The modifier class for the selection marker.
 *
 * @since 0.1.0
 */
export declare const CLASS_MARKER_SELECTION: string;
/**
 * The class for highlighting a selection range.
 *
 * @since 0.1.0
 */
export declare class SelectionMarker extends StandaloneMarker {
    /**
     * The SelectionMarker constructor.
     *
     * @param editor   - An Editor instance.
     * @param elements - A collection of editor elements.
     */
    constructor(editor: Editor, elements: Elements);
    /**
     * Listens to some events.
     */
    protected listen(): void;
    /**
     * Called when the selection state is changed.
     *
     * @param e         - An EventBusEvent object.
     * @param Selection - A Selection instance.
     * @param state     - A new state.
     * @param prev      - A previous state.
     */
    private onStateChanged;
    /**
     * Draws the current selection.
     */
    private drawSelection;
}
//# sourceMappingURL=../../../../src/js/components/Range/SelectionMarker.d.ts.map