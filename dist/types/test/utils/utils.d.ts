import { AnyFunction, Options } from '@ryusei/code';
import { Editor } from '../../core/Editor/Editor';
/**
 * Creates a new editor instance and applies it to the pre element.
 *
 * @param code    - Optional. The initial code.
 * @param options - Optional. Options.
 * @param tag     - Optional. A tag for the source element.
 *
 * @return An Editor instance.
 */
export declare function init(code?: string, options?: Options, tag?: string): Editor;
/**
 * Clears the editor and sets the provided new code.
 *
 * @param Editor - The Editor instance to clear.
 * @param code   - The new code.
 */
export declare function refresh(Editor: Editor, code?: string): void;
/**
 * Generates huge code, starting from 0.
 *
 * @param length - A number of lines to generate.
 * @param text   - Optional. A test for all lines.
 *
 * @return Generated code.
 */
export declare function generate(length: number, text?: string): string;
/**
 * Requests an animation frame and returns a Promise instance.
 *
 * @param callback - A callback function.
 *
 * @return A Promise instance.
 */
export declare function raf(callback: FrameRequestCallback): Promise<void>;
/**
 * Sets a timer with returning a Promise instance.
 *
 * @param callback - A callback function.
 * @param time     - A timer duration.
 *
 * @return A Promise instance.
 */
export declare function timer<T extends AnyFunction>(callback: T, time?: number): Promise<ReturnType<T>>;
/**
 * A promise that will be resolved on the next animation frame.
 *
 * @return A promise instance.
 */
export declare function waitForAnimationFrame(): Promise<void>;
//# sourceMappingURL=../../../../src/js/test/utils/utils.d.ts.map