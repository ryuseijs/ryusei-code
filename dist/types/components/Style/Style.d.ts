import { Elements } from '@ryusei/code';
import { Component } from '../../classes/Component/Component';
import { Editor } from '../../core/Editor/Editor';
/**
 * The component for customizing some styles of the editor.
 *
 * @since 0.1.0
 */
export declare class Style extends Component {
    /**
     * Stores all styles.
     */
    private selectors;
    /**
     * Holds the style element.
     */
    private style;
    /**
     * The Style constructor.
     *
     * @param Editor - An Editor element.
     */
    constructor(Editor: Editor);
    /**
     * Adds styles defined in options.
     */
    private init;
    /**
     * Converts the selectors object into a single style string.
     *
     * @return A built string.
     */
    private build;
    /**
     * Initializes the component.
     *
     * @param elements - A collection of essential editor elements.
     */
    mount(elements: Elements): void;
    /**
     * Adds a style to the specified selector.
     *
     * @param selector - A selector string.
     * @param prop     - A CSS property or an objet literal with properties and values.
     * @param value    - A value for the property.
     */
    add(selector: string, prop: string | Record<string, number | string>, value?: number | string): void;
    /**
     * Applies current styles to the style element.
     */
    apply(): void;
    /**
     * Destroys the component.
     */
    destroy(): void;
}
//# sourceMappingURL=../../../../src/js/components/Style/Style.d.ts.map