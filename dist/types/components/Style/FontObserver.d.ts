import { Editor } from '../../core/Editor/Editor';
/**
 * The class for observing the font loading.
 *
 * @since 0.1.3
 */
export declare class FontObserver {
    /**
     * Keeps the initial width of the sample string.
     */
    private readonly initialWidth;
    /**
     * Holds the Editor instance.
     */
    private readonly Editor;
    /**
     * Holds the Measure instance.
     */
    private readonly Measure;
    /**
     * Keeps the time when the instance is created.
     */
    private readonly time;
    /**
     * The Observer constructor.
     *
     * @param Editor - An Editor instance.
     */
    constructor(Editor: Editor);
    /**
     * Observes the font loading.
     */
    private observe;
}
//# sourceMappingURL=../../../../src/js/components/Style/FontObserver.d.ts.map