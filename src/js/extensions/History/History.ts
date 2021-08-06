import { Elements, EventBusEvent, HistoryOptions, Range } from '@ryusei/code';
import { Component } from '../../classes/Component/Component';
import { EVENT_CHANGE, EVENT_CHANGED, EVENT_KEYMAP, EVENT_RESET } from '../../constants/events';
import { Editor } from '../../core/Editor/Editor';
import { compare, debounce } from '../../utils';
import { Throttle } from '../../utils/function/throttle/throttle';
import { DEFAULT_OPTIONS } from './defaults';
import { KEYMAP } from './keymap';


/**
 * The interface of each record for the history.
 */
export interface HistoryRecord {
  /**
   * A Range object.
   */
  range: Range;

  /**
   * A pure text of the code.
   */
  value: string;

  /**
   * A number of lines.
   */
  length: number;

  /**
   * Additional data to store in the record.
   */
  data?: Record<string, any>;
}

/**
 * The input type of the history.
 *
 * @since 0.1.0
 */
const RESTORATION_INPUT_TYPE = 'history';

/**
 * The component for managing history.
 * This component requires the Keymap component.
 *
 * @since 0.1.0
 */
export class History extends Component {
  /**
   * Holds history records.
   */
  private history: HistoryRecord[] = [];

  /**
   * Indicates the current history index.
   */
  private index = 0;

  /**
   * The debounced `push` function.
   */
  private debouncedPush: Throttle;

  /**
   * Holds history options.
   */
  private opts: HistoryOptions;

  /**
   * The Comment constructor.
   *
   * @param Editor - An Editor instance.
   */
  constructor( Editor: Editor ) {
    super( Editor );
    this.addKeyBindings( KEYMAP );
  }

  /**
   * Initialized the instance.
   */
  mount( elements: Elements ): void {
    super.mount( elements );

    this.opts          = this.getOptions( 'history', DEFAULT_OPTIONS );
    this.debouncedPush = debounce( this.push.bind( this ), this.opts.debounce );
    this.listen();
  }

  /**
   * Listens to some internal events.
   */
  private listen(): void {
    this.on( EVENT_CHANGE, this.onChange, this );
    this.on( EVENT_CHANGED, this.onChanged, this );

    this.on( `${ EVENT_KEYMAP }:undo ${ EVENT_KEYMAP }:redo`, ( e, ke, action ) => {
      ke.preventDefault();

      if ( ! this.Editor.readOnly ) {
        this[ action ]();
      }
    } );

    this.on( EVENT_RESET, () => {
      this.history.length = 0;
    } );
  }

  /**
   * Creates a history record object.
   *
   * @return A created HistoryRecord object.
   */
  private record(): HistoryRecord {
    return {
      range : this.Selection.get(),
      value : this.Code.value,
      length: this.lines.length,
    };
  }

  /**
   * Restores the provided record.
   * Needs to apply the latest code to the input before sync.
   *
   * @param record - A record to restore.
   */
  private restore( record: HistoryRecord ): void {
    const { range, length } = record;
    const { start, end } = range;

    this.emit( EVENT_CHANGE, RESTORATION_INPUT_TYPE );

    this.Code.value = record.value;
    this.Sync.sync( 0, length - 1, start[ 0 ] );
    this.Selection.set( start, end );

    this.emit( EVENT_CHANGED, RESTORATION_INPUT_TYPE );
    this.emit( 'history:restored', record );
  }

  /**
   * Pushes a record to the history and resets the index.
   * If the `record` is not provided, a new record will be generated via the current editor status.
   *
   * @param record - Optional. A record to push.
   */
  private push( record: HistoryRecord ): void {
    const current = this.history[ this.index ];

    if ( current && this.isSame( current, record ) ) {
      return;
    }

    this.history.push( record );

    if ( this.length > this.opts.limit ) {
      this.history.shift();
    }

    this.index = this.length - 1;
    this.emit( 'history:pushed', record );

    this.debouncedPush.cancel();
  }

  /**
   * Checks if the provided 2 records are same or not.
   *
   * @param record1 - A record to check.
   * @param record2 - Another record to check.
   *
   * @return `true` if the records are same, or otherwise `false`.
   */
  private isSame( record1: HistoryRecord, record2: HistoryRecord ): boolean {
    return record1.value === record2.value
      && ! compare( record1.range.start, record2.range.start )
      && ! compare( record1.range.end, record2.range.end );
  }

  /**
   * Checks if an old record is now active or not.
   *
   * @return `true` if an old record is active, or `false` otherwise.
   */
  private isUndoing(): boolean {
    return this.index !== this.length - 1;
  }

  /**
   * Called when the code is being changed.
   *
   * @param e    - A EventBusEvent object.
   * @param type - An input type. This may be empty.
   */
  private onChange( e: EventBusEvent<Editor>, type: string ): void {
    if ( type !== RESTORATION_INPUT_TYPE ) {
      const { history } = this;

      if ( this.isUndoing() ) {
        history.splice( this.index + 1, history.length );
      }

      if ( ! this.Selection.isCollapsed() || ! this.length || type === 'replace' ) {
        this.push( this.record() );
      }
    }
  }

  /**
   * Called just after the code is changed.
   *
   * @param e    - A EventBusEvent object.
   * @param type - An input type. This may be empty.
   */
  private onChanged( e: EventBusEvent<Editor>, type: string ): void {
    if ( ! this.Input.composing && type !== RESTORATION_INPUT_TYPE ) {
      if ( type === 'input' ) {
        this.debouncedPush( this.record() );
      } else {
        this.push( this.record() );
      }
    }
  }

  /**
   * Performs undo.
   */
  undo(): void {
    this.debouncedPush.invoke();

    if ( 0 < this.index && this.index < this.length ) {
      this.restore( this.history[ --this.index ] );
    }
  }

  /**
   * Performs redo only if previously undo() is operated.
   */
  redo(): void {
    if ( this.index < this.length - 1 ) {
      this.restore( this.history[ ++this.index ] );
    }
  }

  /**
   * Returns the current history length.
   *
   * @return The number of records.
   */
  get length(): number {
    return this.history.length;
  }
}
