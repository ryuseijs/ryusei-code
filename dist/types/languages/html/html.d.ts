import { Language, LanguageConfig, UseConfig } from '@ryusei/code';
/**
 * The HTML language options.
 *
 * @since 0.0.12
 */
export interface HtmlOptions {
    script?: {
        language: Language;
        use: UseConfig;
    };
    style?: {
        language: Language;
        use: UseConfig;
    };
}
/**
 * Returns a HTML Language object.
 *
 * @since 0.1.0
 *
 * @param options - Optional. Options.
 *
 * @return A Language object.
 */
export declare function html(options?: HtmlOptions): Language;
/**
 * Returns a HTML LanguageConfig object.
 *
 * @since 0.1.0
 *
 * @return A LanguageConfig object.
 */
export declare function htmlConfig(): LanguageConfig;
//# sourceMappingURL=../../../../src/js/languages/html/html.d.ts.map