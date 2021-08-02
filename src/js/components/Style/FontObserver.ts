import { EVENT_FONT_LOADED } from '../../constants/events';
import { Editor } from '../../core/Editor/Editor';
import { Measure } from '../Measure/Measure';


/**
 * The sample string.
 *
 * @since 0.1.3
 */
const SAMPLE = '    ';

/**
 * The timeout duration in milliseconds.
 *
 * @since 0.1.3
 */
const TIMEOUT = 5000;

/**
 * The class for observing the font loading.
 *
 * @since 0.1.3
 */
export class FontObserver {
  /**
   * Keeps the initial width of the sample string.
   */
  private readonly initialWidth: number;

  /**
   * Holds the Editor instance.
   */
  private readonly Editor: Editor;

  /**
   * Holds the Measure instance.
   */
  private readonly Measure: Measure;

  /**
   * Keeps the time when the instance is created.
   */
  private readonly time = Date.now();

  /**
   * The Observer constructor.
   *
   * @param Editor - An Editor instance.
   */
  constructor( Editor: Editor ) {
    this.Editor       = Editor;
    this.Measure      = this.Editor.Components.Measure;
    this.initialWidth = this.Measure.measureWidth( SAMPLE );

    this.observe();
  }

  /**
   * Observes the font loading.
   */
  private observe(): void {
    const width = this.Measure.measureWidth( SAMPLE, false );

    if ( width !== this.initialWidth ) {
      this.Editor.event.emit( EVENT_FONT_LOADED );
    } else {
      if ( Date.now() - this.time < TIMEOUT ) {
        requestAnimationFrame( this.observe.bind( this ) );
      }
    }
  }
}
