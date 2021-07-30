import { Attributes, Elements, UIButtonSettings, UIFieldSettings, UIGroupData } from '@ryusei/code';
import { CLASS_ACTIVE, CLASS_BUTTON, CLASS_INPUT } from '../../constants/classes';
import {
  activeElement,
  addClass,
  append,
  assert,
  attr,
  create,
  hasClass,
  html,
  isString,
  isUndefined,
  normalizeKey,
  prevent,
  query,
  remove,
  removeClass,
  toArray,
} from '../../utils';
import { icon } from '../../utils/icon';
import { Component } from '../Component/Component';


/**
 * The stroke linecap value for the path element.
 */
export const STROKE_LINECAP = 'round';

/**
 * The base class for creating UI, such as a toolbar or a dialog.
 *
 * @since 0.1.0
 */
export class UIComponent<T extends UIGroupData = UIGroupData> extends Component {
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
  protected groups: Record<string, T> = {};

  /**
   * Initializes the component.
   *
   * @param elements - A collection of essential editor elements.
   */
  mount( elements: Elements ): void {
    super.mount( elements );
    this.create();
    this.listen();
  }

  /**
   * Creates elements.
   * Override this method in a child class and provide a wrapper element.
   */
  protected create(): void {
    assert( false );
  }

  /**
   * Listens to some events.
   */
  protected listen(): void {
    this.bind( window, 'keydown', this.escape, this );
  }

  /**
   * Hides the toolbar when the escape key is pressed.
   *
   * @param e - A KeyboardEvent object.
   */
  protected escape( e: KeyboardEvent ): void {
    if ( this.isActive() && normalizeKey( e.key ) === 'Escape' ) {
      this.hide();
      prevent( e );
    }
  }

  /**
   * Appends the group element to the wrapper element just before displaying the UI.
   * Override this method to change the default element to append the group to.
   *
   * @param group - A group ID.
   */
  protected append( group: string ): void {
    append( this.wrapper, this.groups[ group ].elm );
  }

  /**
   * Sets focus to the first element that has the greatest tab index.
   * If it is not found, sets focus to the first input or button element if available.
   *
   * @param group - A group ID.
   */
  protected autoFocus( group: string ): void {
    const { elm } = this.groups[ group ];
    const target = query<HTMLElement>( elm, '[tabindex]' ) || query( elm, 'input, button' );

    if ( target ) {
      target.focus();

      if ( target instanceof HTMLInputElement ) {
        target.select();
      }
    }
  }

  /**
   * Creates a close button.
   * The wrapper element must exist and have an ID attribute before calling this method.
   *
   * @param attrs - Attributes for the button.
   *
   * @return A created button element.
   */
  createCloseButton( attrs: Attributes ): HTMLButtonElement {
    const button = this.createButtons( {
      id   : 'close',
      icon : 'close',
      click: 'hide',
    }, null, this ).close;

    attr( button, attrs );

    return button;
  }

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
  createButtons<T extends Component>(
    settings: UIButtonSettings<T> | UIButtonSettings<T>[],
    parent: HTMLElement,
    component: T,
    classes?: string | string[]
  ): Record<string, HTMLButtonElement> {
    const buttons = {};

    toArray( settings ).forEach( settings => {
      const button = this.createButton( settings, parent, classes );
      const { click } = settings;

      if ( click ) {
        this.bind( button, 'click', e => {
          if ( isString( click ) ) {
            component[ click ]();
          } else {
            click( e, this.Editor, settings );
          }
        } );
      }

      buttons[ settings.id ] = button;
    }, [] );

    return buttons;
  }

  /**
   * Creates a button with the provided settings.
   *
   * @param settings - A settings object.
   * @param parent   - A parent element to append the button to.
   * @param classes  - Additional classes for buttons.
   *
   * @return A created button element.
   */
  protected createButton<T extends Component>(
    settings: UIButtonSettings<T>,
    parent: HTMLElement,
    classes: string | string[]
  ): HTMLButtonElement {
    const { i18n } = this.options;
    const { checkbox, tabindex, icon: iconName } = settings;
    const label = i18n[ settings.i18n || settings.id ];

    classes = [ CLASS_BUTTON ].concat( iconName ? `${ CLASS_BUTTON }--icon` : null, classes );

    const button = create( 'button', {
      title         : iconName ? label : null,
      type          : 'button',
      tabindex      : ! isUndefined( tabindex ) ? tabindex : null,
      role          : checkbox ? 'checkbox' : null,
      'aria-checked': checkbox ? 'false' : null,
      'aria-label'  : label,
    }, parent || settings.parent );

    addClass( button, classes );

    if ( iconName ) {
      const iconSettings = this.options.icons[ iconName ];

      if ( iconSettings ) {
        append( button, icon( iconSettings[ 0 ], iconSettings[ 1 ], iconSettings[ 2 ] || STROKE_LINECAP ) );
      }
    } else {
      html( button, settings.html || label );
    }

    return button;
  }

  /**
   * A utility function to create an input field.
   *
   * @param settings - A settings object.
   * @param parent   - A parent element where the created input element will be appended.
   *
   * @return A created input element.
   */
  createField(
    settings: UIFieldSettings,
    parent: HTMLElement
  ): HTMLInputElement {
    const label = this.i18n[ settings.i18n || settings.id ];
    const { tabindex } = settings;

    return create( 'input', {
      class       : `${ CLASS_INPUT }`,
      placeholder : label,
      spellcheck  : false,
      tabindex    : ! isUndefined( tabindex ) ? tabindex : null,
      'aria-label': label,
    }, parent );
  }

  /**
   * Displays the UI.
   *
   * @param group - A group ID.
   */
  show( group: string ): void {
    if ( this.isActive() ) {
      remove( this.groups[ this.group ].elm );
    }

    addClass( this.wrapper, CLASS_ACTIVE );

    this.append( group );
    this.group = group;
  }

  /**
   * Hides the UI.
   */
  hide(): void {
    if ( this.isActive() ) {
      removeClass( this.wrapper, CLASS_ACTIVE );
      remove( this.groups[ this.group ].elm );
    }
  }

  /**
   * Checks if the specified group is active or not.
   * If omitted, this checks any group is active or not.
   *
   * @param group - Optional. A group ID to check.
   */
  isActive( group?: string ): boolean {
    return hasClass( this.wrapper, CLASS_ACTIVE ) && ( ! group || this.group === group );
  }

  /**
   * Checks if one of the elements in the UI has focus or not.
   *
   * @return `true` if an element in the UI has focus, or otherwise `false`.
   */
  isFocused(): boolean {
    return this.wrapper.contains( activeElement() );
  }
}
