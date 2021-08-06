declare module '@ryusei/code' {
  import { Component } from '../classes/Component/Component';
  import { ContextMenu } from '../components';
  import { Marker } from '../components/Range/Marker';
  import { Editor } from '../core/Editor/Editor';

  /**
   * The type for any function.
   *
   * @since 0.1.0
   */
  type AnyFunction = ( ...args: any[] ) => any;

  /**
   * The type for an object with attributes.
   *
   * @since 0.1.0
   */
  type Attributes = Record<string, string | number | boolean>;

  /**
   * The interface for collection of elements that consists of the editor.
   *
   * @since 0.1.0
   */
  interface Elements {
    /**
     * A root element.
     */
    root: HTMLElement;

    /**
     * A view element for clipping the overflowed contents.
     */
    view: HTMLDivElement;

    /**
     * A body element that contains scroller and scrollbars.
     */
    body: HTMLDivElement;

    /**
     * A scroller element.
     */
    scroller: HTMLDivElement;

    /**
     * A container element that contains the gutter and the editor.
     */
    container: HTMLDivElement;

    /**
     * An editor element.
     */
    editor: HTMLDivElement;

    /**
     * An element with lines.
     */
    lines: HTMLDivElement;

    /**
     * An element that is applied the `contenteditable` attribute to.
     * This can be the same element with one of elements in this collection.
     */
    editable: HTMLElement;

    /**
     * An element that is displayed over the viewport.
     */
    overlay: HTMLDivElement;

    /**
     * An element that is displayed on the innermost layer in the editor element.
     */
    background: HTMLDivElement;
  }

  /**
   * The type for a callback function of the EventBus.
   *
   * @since 0.1.0
   */
  type EventBusCallback = ( e: EventBusEvent, ...args: any[] ) => any;

  /**
   * The interface for each event handler object.
   *
   * @since 0.1.0
   */
  interface EventHandler {
    /**
     * The event name.
     */
    event: string;

    /**
     * A callback function.
     */
    callback: AnyFunction;

    /**
     * A namespace.
     */
    namespace: string;

    /**
     * The priority of the handler.
     */
    priority: number;

    /**
     * A key for a handler.
     */
    key?: object;
  }

  /**
   * The interface for an event object of the EventBus.
   *
   * @since 0.1.0
   */
  interface EventBusEvent<T = undefined> {
    /**
     * An event name.
     */
    type: string;

    /**
     * The owner of the EventBus instance.
     */
    owner?: T;
  }

  /**
   * The type for `[ row, col ]`.
   *
   * @since 0.1.0
   */
  type Position = [ number, number ];

  /**
   * The type for `[ startRow, endRow ]`.
   *
   * @since 0.1.0
   */
  type RowRange = [ number, number ];

  /**
   * The type for a range.
   *
   * @since 0.1.0
   */
  type Range = { start: Position, end: Position };

  /**
   * The type for the range data.
   *
   * @since 0.1.0
   */
  type RangeData = { range: Range, marker: Marker };

  /**
   * The interface for the input state.
   *
   * @since 0.1.0
   */
  interface InputState {
    /**
     * The type of the input.
     */
    type: string;

    /**
     * The input key.
     */
    key?: string;

    /**
     * The start row index to replace with the current value.
     */
    startRow?: number;

    /**
     * The end row index to replace with the current value.
     */
    endRow?: number;

    /**
     * The value to replace the line with.
     */
    value?: string;

    /**
     * The string to insert at the caret position.
     */
    insertion?: string;

    /**
     * The col offset.
     */
    offset?: number;

    /**
     * The position to go after the input.
     */
    position?: Position;
  }

  /**
   * The interface for an object that describes a selection boundary.
   *
   * @since 0.1.0
   */
  interface SelectionBoundary {
    node: Node;
    offset: number;
  }

  /**
   * The interface for an offset position.
   *
   * @since 0.1.0
   */
  interface OffsetPosition {
    top: number,
    left: number,
  }

  /**
   * The type for an extended token.
   *
   * @since 0.1.0
   */
  type Token = [ string, string, TokenInfo ];

  /**
   * The type for matching a token as:
   * - a category
   * - a RegExp object to match the token string
   * - state
   *
   * @since 0.1.0
   */
  type TokenMatcher = [ string, RegExp?, string? ];

  /**
   * The type for matching a key as `[ key, ctrl, shift, alt ]`.
   *
   * @since 0.1.0
   */
  type KeyMatcher = [ string, boolean?, boolean?, boolean? ];

  /**
   * The interface for an object that describes token info.
   *
   * @since 0.1.0
   */
  interface TokenInfo {
    code: string;
    html: string;
    category: string;
    depth: number;
    language: string;
    state: string;
    split?: boolean;
    head?: boolean;
    tail?: boolean;
    distance?: number;
    index: number;
    from: number;
    to: number;
  }

  /**
   * The type for a result of scanning for a token.
   *
   * @since 0.1.0
   */
  type ScanResult = { row: number, info: TokenInfo };

  /**
   * The type of icon settings as [ path, stroke?, linecap? ].
   *
   * @since 0.1.0
   */
  type IconSettings = [ string, number?, string? ];

  /**
   * The interface for data of each UI group.
   *
   * @since 0.1.0
   */
  interface UIGroupData {
    elm: HTMLElement;
  }

  /**
   * The interface for each button settings in the UI component.
   *
   * @since 0.1.0
   */
  interface UIFieldSettings {
    id: string;
    i18n?: string;
    tabindex?: number;
  }

  /**
   * The interface for each button settings in the UI component.
   *
   * @since 0.1.0
   */
  interface UIButtonSettings<T extends Component> {
    id: string;
    i18n?: string;
    html?: string;
    icon?: string;
    click?: string | ( ( e: Event, Editor: Editor, settings: UIButtonSettings<T> ) => void );
    checkbox?: boolean;
    tabindex?: number;
    parent?: HTMLElement,
  }

  /**
   * The interface for each item of the context menu.
   *
   * @since 0.1.0
   */
  interface ContextMenuButtonSettings extends UIButtonSettings<ContextMenu>{
    disableOnReadOnly?: boolean,
    shortcut?: string | KeyMatcher,
  }

  /**
   * The interface for data of each dialog group.
   *
   * @since 0.1.0
   */
  interface ContextMenuGroupData extends UIGroupData {
    lists: Record<string, UIButtonSettings<ContextMenu>[]>;
  }
}
