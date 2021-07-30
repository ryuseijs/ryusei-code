declare module '@ryusei/code' {
  import { History } from './History';

  interface Options {
    /**
     * Options for the History component.
     */
    history?: boolean | HistoryOptions,
  }

  interface HistoryOptions {
    /**
     * Limits the number of undo/redo history records.
     */
    limit?: number;

    /**
     * The debounce duration in milliseconds for capturing a history record.
     */
    debounce?: number;
  }

  interface Extensions {
    History: History;
  }
}
