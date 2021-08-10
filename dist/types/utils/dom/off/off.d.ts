export declare function off<K extends keyof WindowEventMap>(elm: Window, events: K, callbackOrKey: object | ((e: Event) => void)): void;
export declare function off<K extends keyof DocumentEventMap>(elm: Document, events: K, callbackOrKey: object | ((e: Event) => void)): void;
export declare function off<K extends keyof HTMLElementEventMap>(elm: HTMLElement, events: K, callbackOrKey: object | ((e: Event) => void)): void;
export declare function off<K extends keyof SVGElementEventMap>(elm: SVGElement, events: K, callbackOrKey: object | ((e: Event) => void)): void;
export declare function off<K extends keyof ElementEventMap>(elm: Element, events: K, callbackOrKey: object | ((e: Event) => void)): void;
export declare function off<T extends Event = Event>(elm: Window | Document | Element, events: string, callbackOrKey: object | ((e: T) => void)): void;
//# sourceMappingURL=../../../../../src/js/utils/dom/off/off.d.ts.map