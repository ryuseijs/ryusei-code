import { Language, LanguageConfig } from '@ryusei/code';
import { HtmlOptions } from '../html/html';
/**
 * The Vue language options.
 *
 * @since 0.0.12
 */
export interface VueOptions extends HtmlOptions {
}
/**
 * Returns a Vue Language object.
 *
 * @since 0.1.0
 *
 * @return A Language object.
 */
export declare function vue(options?: VueOptions): Language;
/**
 * Returns a Vue LanguageConfig object.
 *
 * @private
 * @since 0.1.0
 *
 * @return A LanguageConfig object.
 */
export declare function vueConfig(): LanguageConfig;
//# sourceMappingURL=../../../../src/js/languages/vue/vue.d.ts.map