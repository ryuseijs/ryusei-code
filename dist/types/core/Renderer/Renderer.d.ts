import { Options } from '@ryusei/code';
import { Code } from '../../components';
import { Lines } from '../../components/Code/Lines';
import { EventBus } from '../../event/EventBus';
/**
 * The class for rendering the editor.
 *
 * @since 0.1.0
 */
export declare class Renderer {
    /**
     * Holds the EventBus instance.
     */
    protected readonly event: EventBus;
    /**
     * Holds the Code instance.
     */
    protected readonly Code: Code;
    /**
     * Holds the lines instance.
     */
    protected readonly lines: Lines;
    /**
     * Holds options.
     */
    protected readonly options: Options;
    /**
     * The Renderer constructor.
     *
     * @param Code    - A Code instance.
     * @param event   - An EventBus instance.
     * @param options - Options.
     */
    constructor(Code: Code, event: EventBus, options: Options);
    /**
     * Render lines until the number reaches the `maxInitialLines`.
     * Rest lines are rendered in the temporary `pre` element.
     *
     * @param append - The function to append a HTML string.
     */
    protected renderLines(append: (string: string) => void): void;
    /**
     * Builds the HTML for the editor.
     *
     * @param source - Optional. Determines whether to embed the source code as a pre element or not.
     *
     * @return The built HTML string.
     */
    html(source?: boolean): string;
}
//# sourceMappingURL=../../../../src/js/core/Renderer/Renderer.d.ts.map