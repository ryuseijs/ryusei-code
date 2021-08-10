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
     * @internal
     *
     * @param elements - A collection of essential editor elements.
     */
    mount(elements: Elements): void;
    /**
     * Adds styles to the specified selector.
     * The `Editor#apply()` or `Editor#html()` applies the registered styles once,
     * and therefore initial styles must be added before them.
     * Otherwise, you should manually invoke the `apply()` method.
     *
     * @param selector - A selector string.
     * @param prop     - A CSS property or an objet literal with properties and values.
     * @param value    - Optional. A value for the property.
     */
    add(selector: string, prop: string | Record<string, number | string>, value?: number | string): void;
    /**
     * Applies registered styles to the style element.
     */
    apply(): void;
    /**
     * Destroys the component.
     *
     * @internal
     */
    destroy(): void;
}
//# sourceMappingURL=../../../../src/js/components/Style/Style.d.ts.map