import { ContextMenuButtonSettings, ContextMenuGroupData } from '@ryusei/code';
import { UIComponent } from '../../classes/UIComponent/UIComponent';
import {
  CLASS_CONTEXT_MENU,
  CLASS_CONTEXT_MENU_BUTTON,
  CLASS_CONTEXT_MENU_GROUP,
  CLASS_CONTEXT_MENU_ITEM,
  CLASS_CONTEXT_MENU_LABEL,
  CLASS_CONTEXT_MENU_LIST,
  CLASS_CONTEXT_MENU_SHORTCUT,
} from '../../constants/classes';
import { MAIN_CONTEXT_MENU_ID } from '../../constants/context-menu';
import {
  EVENT_BLUR,
  EVENT_CONTEXT_MENU_CLICKED,
  EVENT_CONTEXT_MENU_CLOSED,
  EVENT_CONTEXT_MENU_OPENED,
  EVENT_READONLY,
  EVENT_SCROLLER_SCROLL,
  EVENT_WINDOW_SCROLL,
} from '../../constants/events';
import { IDLE } from '../../constants/selection-states';
import {
  activeElement,
  assert,
  assign,
  attr,
  create,
  div,
  forOwn,
  height,
  isHTMLElement,
  min,
  normalizeKey,
  prevent,
  queryAll,
  styles,
  text,
  unit,
} from '../../utils';


/**
 * The margin from the menu to the right of the window.
 *
 * @since 0.1.0
 */
const MARGIN_RIGHT = 5;

/**
 * The margin from the menu to the bottom of the window.
 *
 * @since 0.1.0
 */
const MARGIN_BOTTOM = 5;

/**
 * The class for creating a context menu replacing the native one.
 *
 * @since 0.1.0
 */
export class ContextMenu extends UIComponent<ContextMenuGroupData> {
  /**
   * The index of the current menu item.
   */
  private index = -1;

  /**
   * Holds buttons that are currently displayed.
   * This may be null when the menu is hidden.
   */
  buttons: Record<string, HTMLButtonElement> | null;

  /**
   * Listens some events.
   */
  protected listen(): void {
    super.listen();

    const { elements } = this;

    this.bind( elements.editor, 'mousedown', this.onMouseDown, this );
    this.bind( document, 'contextmenu', this.onContextMenu, this );
    this.bind( window, 'keydown', this.onKeydown, this );

    this.on( [ EVENT_BLUR, EVENT_SCROLLER_SCROLL, EVENT_WINDOW_SCROLL ], this.hide, this );

    this.bind( elements.root, 'focusin', () => {
      if ( ! this.contains( activeElement() ) && ! this.wrapper.contains( activeElement() ) ) {
        this.hide();
      }
    } );
  }

  /**
   * Creates the context menu elements.
   *
   * @link https://www.w3.org/TR/wai-aria-1.2/#menu
   */
  protected create(): void {
    this.wrapper = div( { class: CLASS_CONTEXT_MENU, role: 'menu' }, this.elements.overlay );
  }

  /**
   * Called when the mouse button is clicked.
   * If the button number is 2, which means a right click,
   * displays the menu and moves it at the cursor location, otherwise hides the menu.
   *
   * @param e - A MouseEvent object.
   */
  private onMouseDown( e: MouseEvent ): void {
    if ( e.button === 2 ) {
      this.show( MAIN_CONTEXT_MENU_ID );
      this.move( e.clientX, e.clientY );
    } else {
      this.hide();
    }
  }

  /**
   * Called when the contextmenu event of the document is fired.
   * Since the context menu may scroll the scroller or the window,
   * displaying the menu at this moment is too early.
   *
   * @param e - An Event object.
   */
  private onContextMenu( e: Event ): void {
    if ( this.isActive() ) {
      return prevent( e );
    }

    if ( this.contains( e.target ) ) {
      const { Selection } = this;

      if ( ! Selection.is( IDLE ) ) {
        this.View.jump( Selection.focus[ 0 ] );

        requestAnimationFrame( () => {
          const { rect } = this.Caret;
          this.show( MAIN_CONTEXT_MENU_ID );
          this.move( rect.left, rect.bottom );
        } );
      }

      prevent( e, true );
    }
  }

  /**
   * Called when the window receives the keydown.
   *
   * @param e - A KeyboardEvent object.
   */
  private onKeydown( e: KeyboardEvent ): void {
    if ( this.isActive() ) {
      const key     = normalizeKey( e.key );
      const arrowUp = key === 'ArrowUp';

      if ( key === 'ArrowDown' || arrowUp ) {
        this.focus( arrowUp );
        prevent( e );
      }
    }
  }

  /**
   * Sets focus on the menu item in order.
   *
   * @param backwards - Whether to decrement or increment the menu index.
   */
  private focus( backwards: boolean ): void {
    const buttons = queryAll<HTMLButtonElement>( this.wrapper, `.${ CLASS_CONTEXT_MENU_BUTTON }` );
    const { length } = buttons;

    if ( length ) {
      this.index += backwards ? -1 : 1;

      if ( this.index < 0 ) {
        this.index = length - 1;
      } else if ( this.index >= length ) {
        this.index = 0;
      }

      buttons[ this.index ].focus();
    }
  }

  /**
   * Moves the menu to the provided client coordinates.
   *
   * @param clientX - A client x coordinate.
   * @param clientY - A client y coordinate.
   */
  private move( clientX: number, clientY: number ): void {
    const { wrapper, wrapper: { clientWidth }, Measure: { scrollerRect } } = this;
    const { documentElement } = document;

    if ( clientX + clientWidth > documentElement.clientWidth - MARGIN_RIGHT ) {
      clientX -= clientWidth;
    }

    clientY = min( clientY, height( documentElement ) - height( wrapper ) - MARGIN_BOTTOM );

    styles( wrapper, {
      top : unit( clientY - scrollerRect.top ),
      left: unit( clientX - scrollerRect.left ),
    } );
  }

  /**
   * Checks whether the editor contains the passed element/event target or not.
   *
   * @param target - An EventTarget object that is an Element instance in most cases.
   *
   * @return `true` if the editor contains the target, or otherwise `false`.
   */
  private contains( target: EventTarget | Element ): boolean {
    return isHTMLElement( target ) && this.elements.editor.contains( target );
  }

  /**
   * Creates elements for menu items.
   *
   * @param group - A group ID.
   */
  private build( group: string ): void {
    const { lists, elm } = this.groups[ group ];
    text( elm, '' );

    forOwn( lists, ( settings, key ) => {
      const list = create( 'ul', [ CLASS_CONTEXT_MENU_LIST, `${ CLASS_CONTEXT_MENU_LIST }--${ key }` ], elm );

      settings = settings.map( settings => {
        settings.parent = create( 'li', CLASS_CONTEXT_MENU_ITEM, list );
        return settings;
      } );

      const buttons = this.createButtons<ContextMenu>( settings, null, this, CLASS_CONTEXT_MENU_BUTTON );

      forOwn( buttons, ( button, id ) => {
        const buttonSettings = this.findSettings( settings, id );
        assert( buttonSettings );

        attr( button, { role: 'menuitem' } );

        this.bind( button, 'click', () => {
          this.emit( EVENT_CONTEXT_MENU_CLICKED, this, id, button );
          this.hide();
        } );

        if ( buttonSettings.disableOnReadOnly ) {
          button.disabled = this.Editor.readOnly;
          this.on( EVENT_READONLY, ( e, readOnly ) => { button.disabled = readOnly } );
        }

        this.bind( button, 'mouseover', () => {
          button.focus();
        } );
      } );

      this.buttons = assign( {}, this.buttons, buttons );
    } );
  }

  /**
   * Finds the each button settings from the array of settings.
   *
   * @param settings - An array with settings.
   * @param id       - A button ID to find.
   *
   * @return The found button settings.
   */
  private findSettings( settings: ContextMenuButtonSettings[], id: string ): ContextMenuButtonSettings {
    for ( let i = 0; i < settings.length; i++ ) {
      if ( settings[ i ].id === id ) {
        return settings[ i ];
      }
    }
  }

  /**
   * Registers a menu item or items.
   *
   * @param group - A group ID. If it does not exist, a new group will be generated.
   * @param list  - A list ID.
   * @param settings - An menu item or items.
   */
  register( group: string, list: string, settings: ContextMenuButtonSettings[] ): void {
    const { groups } = this;

    if ( ! groups[ group ] ) {
      groups[ group ] = {
        elm  : div( [ CLASS_CONTEXT_MENU_GROUP, `${ CLASS_CONTEXT_MENU_GROUP }--${ group }` ] ),
        lists: {},
      };
    }

    settings.forEach( settings => {
      const label    = this.i18n[ settings.i18n || settings.id ];
      const shortcut = settings.shortcut ? this.Keymap.getShortcut( settings.shortcut ) : '';

      settings.html = settings.html || `<span class="${ CLASS_CONTEXT_MENU_LABEL }">${ label }</span>`
        + ( shortcut ? `<span class="${ CLASS_CONTEXT_MENU_SHORTCUT }">${ shortcut }</span>` : '' );
    } );

    const { lists } = groups[ group ];
    lists[ list ] = ( lists[ list ] || [] ).concat( settings );
  }

  /**
   * Displays the context menu.
   *
   * @param group - A group ID.
   */
  show( group: string ): void {
    if ( this.groups[ group ] ) {
      this.build( group );
      super.show( group );
      this.index = -1;
      this.emit( EVENT_CONTEXT_MENU_OPENED );
    }
  }

  /**
   * Hides the context menu.
   */
  hide(): void {
    if ( this.isActive() ) {
      super.hide();
      this.buttons = null;
      this.emit( EVENT_CONTEXT_MENU_CLOSED );
    }
  }
}
