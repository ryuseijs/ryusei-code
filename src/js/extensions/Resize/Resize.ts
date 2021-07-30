import { Elements, ResizeOptions } from '@ryusei/code';
import { Component } from '../../classes/Component/Component';
import { PROJECT_CODE } from '../../constants/project';
import { div } from '../../utils';
import { DEFAULT_OPTIONS } from './defaults';
import { I18N } from './i18n';
import { ResizeBar } from './ResizeBar';


/**
 * The class name for the wrapper element that contains resize bars.
 *
 * @since 0.1.0
 */
export const CLASS_SIZER = `${ PROJECT_CODE }__sizer`;

/**
 * The component for resizing the editor by drag bars.
 *
 * @since 0.1.0
 */
export class Resize extends Component {
  /**
   * Stores ResizeBar instances.
   */
  private bars: ResizeBar[] = [];

  /**
   * Initializes the component.
   *
   * @param elements - A collection of essential elements.
   */
  mount( elements: Elements ): void {
    super.mount( elements );

    const { Editor, bars } = this;
    const wrapper = div( CLASS_SIZER, elements.overlay );
    const options = this.getOptions<ResizeOptions>( 'resize', DEFAULT_OPTIONS );

    this.addI18n( I18N );

    if ( options.horizontal ) {
      bars.push( new ResizeBar( Editor, wrapper, false ) );
    }

    if ( options.vertical ) {
      bars.push( new ResizeBar( Editor, wrapper, true ) );
    }
  }

  /**
   * Destroys the component.
   */
  destroy(): void {
    this.bars.forEach( bar => { bar.destroy() } );
    super.destroy();
  }
}
