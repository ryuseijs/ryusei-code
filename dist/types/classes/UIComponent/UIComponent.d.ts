import { Attributes, Elements, UIButtonSettings, UIFieldSettings, UIGroupData } from '@ryusei/code';
import { Component } from '../Component/Component';
/**
 * The stroke linecap value for the path element.
 */
export declare const STROKE_LINECAP = "round";
/**
 * The base class for creating UI, such as a toolbar or a dialog.
 *
 * @since 0.1.0
 */
export declare class UIComponent<T extends UIGroupData = UIGroupData> extends Component {
    /**
     * Holds the wrapper element.
     */
    protected wrapper: HTMLDivElement;
    /**
     * Holds the active group ID.
     */
    protected group: string;
    /**
     * Stores group elements.
     */
    protected groups: Record<string, T>;
    /**
     * Initializes the component.
     *
     * @param elements - A collection of essential editor elements.
     */
    mount(elements: Elements): void;
    /**
     * Creates elements.
     * Override this method in a child class and provide a wrapper element.
     */
    protected create(): void;
    /**
     * Listens to some events.
     */
    protected listen(): void;
    /**
     * Hides the toolbar when the escape key is pressed.
     *
     * @param e - A KeyboardEvent object.
     */
    protected escape(e: KeyboardEvent): void;
    /**
     * Appends the group element to the wrapper element just before displaying the UI.
     * Override this method to change the default element to append the group to.
     *
     * @param group - A group ID.
     */
    protected append(group: string): void;
    /**
     * Sets focus to the first element that has the greatest tab index.
     * If it is not found, sets focus to the first input or button element if available.
     *
     * @param group - A group ID.
     */
    protected autoFocus(group: string): void;
    /**
     * Creates a close button.
     * The wrapper element must exist and have an ID attribute before calling this method.
     *
     * @param attrs - Attributes for the button.
     *
     * @return A created button element.
     */
    createCloseButton(attrs: Attributes): HTMLButtonElement;
    /**
     * Creates buttons according to the settings.
     *
     * @param settings  - A settings object.
     * @param parent    - A parent element to append the button to.
     * @param component - A component instance.
     * @param classes   - Additional classes for buttons.
     *
     * @return An object with created buttons.
     */
    createButtons<T extends Component>(settings: UIButtonSettings<T> | UIButtonSettings<T>[], parent: HTMLElement, component: T, classes?: string | string[]): Record<string, HTMLButtonElement>;
    /**
     * Creates a button with the provided settings.
     *
     * @param settings - A settings object.
     * @param parent   - A parent element to append the button to.
     * @param classes  - Additional classes for buttons.
     *
     * @return A created button element.
     */
    protected createButton<T extends Component>(settings: UIButtonSettings<T>, parent: HTMLElement, classes: string | string[]): HTMLButtonElement;
    /**
     * A utility function to create an input field.
     *
     * @param settings - A settings object.
     * @param parent   - A parent element where the created input element will be appended.
     *
     * @return A created input element.
     */
    createField(settings: UIFieldSettings, parent: HTMLElement): HTMLInputElement;
    /**
     * Displays the UI.
     *
     * @param group - A group ID.
     */
    show(group: string): void;
    /**
     * Hides the UI.
     */
    hide(): void;
    /**
     * Checks if the specified group is active or not.
     * If omitted, this checks any group is active or not.
     *
     * @param group - Optional. A group ID to check.
     */
    isActive(group?: string): boolean;
    /**
     * Checks if one of the elements in the UI has focus or not.
     *
     * @return `true` if an element in the UI has focus, or otherwise `false`.
     */
    isFocused(): boolean;
}
//# sourceMappingURL=../../../../src/js/classes/UIComponent/UIComponent.d.ts.map