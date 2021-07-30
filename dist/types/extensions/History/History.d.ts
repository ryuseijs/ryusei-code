import { Elements, Range } from '@ryusei/code';
import { Component } from '../../classes/Component/Component';
import { Editor } from '../../core/Editor/Editor';
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
 * The component for managing history.
 * This component requires the Keymap component.
 *
 * @since 0.1.0
 */
export declare class History extends Component {
    /**
     * Holds history records.
     */
    private history;
    /**
     * Indicates the current history index.
     */
    private index;
    /**
     * The debounced `push` function.
     */
    private debouncedPush;
    /**
     * Holds history options.
     */
    private opts;
    /**
     * The Comment constructor.
     *
     * @param Editor - An Editor instance.
     */
    constructor(Editor: Editor);
    /**
     * Initialized the instance.
     */
    mount(elements: Elements): void;
    /**
     * Listens to some internal events.
     */
    private listen;
    /**
     * Creates a history record object.
     *
     * @return A created HistoryRecord object.
     */
    private record;
    /**
     * Restores the provided record.
     * Needs to apply the latest code to the input before sync.
     *
     * @param record - A record to restore.
     */
    private restore;
    /**
     * Pushes a record to the history and resets the index.
     * If the `record` is not provided, a new record will be generated via the current editor status.
     *
     * @param record - Optional. A record to push.
     */
    private push;
    /**
     * Checks if the provided 2 records are same or not.
     *
     * @param record1 - A record to check.
     * @param record2 - Another record to check.
     *
     * @return `true` if the records are same, or otherwise `false`.
     */
    private isSame;
    /**
     * Checks if an old record is now active or not.
     *
     * @return `true` if an old record is active, or `false` otherwise.
     */
    private isUndoing;
    /**
     * Called when the code is being changed.
     *
     * @param e    - A EventBusEvent object.
     * @param type - An input type. This may be empty.
     */
    private onChange;
    /**
     * Called just after the code is changed.
     *
     * @param e    - A EventBusEvent object.
     * @param type - An input type. This may be empty.
     */
    private onChanged;
    /**
     * Performs undo.
     */
    undo(): void;
    /**
     * Performs redo only if previously undo() is operated.
     */
    redo(): void;
    /**
     * Returns the current history length.
     *
     * @return The number of records.
     */
    get length(): number;
}
//# sourceMappingURL=../../../../src/js/extensions/History/History.d.ts.map