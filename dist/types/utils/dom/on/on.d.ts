/**
 * Stores registered handlers which has a key.
 *
 * @since 0.1.0
 */
export declare const handlerMap: WeakMap<object, {
    elm: Document | Window | Element;
    events: string;
    callback: (e: Event) => void;
}[]>;
export declare function on<K extends keyof DocumentEventMap>(elm: Document, events: K, callback: (e: DocumentEventMap[K]) => void, key?: object): void;
export declare function on<K extends keyof WindowEventMap>(elm: Window, events: K, callback: (e: WindowEventMap[K]) => void, key?: object): void;
export declare function on<K extends keyof HTMLElementEventMap>(elm: HTMLElement, events: K, callback: (e: HTMLElementEventMap[K]) => void, key?: object): void;
export declare function on<K extends keyof ElementEventMap>(elm: Element, events: K, callback: (e: ElementEventMap[K]) => void, key?: object): void;
export declare function on<T extends Event = Event>(elm: Window | Document | Element, events: string, callback: (e: T) => void, key?: object): void;
//# sourceMappingURL=../../../../../src/js/utils/dom/on/on.d.ts.map