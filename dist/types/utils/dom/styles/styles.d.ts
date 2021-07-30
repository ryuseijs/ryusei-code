/**
 * The union for CSS style properties, such as "padding", "fontSize", etc.
 *
 * @since 0.1.0
 */
export declare type CSSStyleProperties = Exclude<keyof CSSStyleDeclaration, number>;
export declare function styles(elm: HTMLElement, styles: Record<string, string | number>): void;
export declare function styles<K extends CSSStyleProperties>(elm: HTMLElement, styles: K): CSSStyleDeclaration[K];
export declare function styles(elm: HTMLElement, styles: string): string;
//# sourceMappingURL=../../../../../src/js/utils/dom/styles/styles.d.ts.map