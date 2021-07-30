declare module '@ryusei/code' {
  import { Dialog } from './Dialog';

  interface Extensions {
    Dialog: Dialog;
  }

  /**
   * The interface for data of each dialog group.
   *
   * @since 0.1.0
   */
  export interface DialogGroupData extends UIGroupData {
    title: HTMLElement;
    body: HTMLElement;
    buttons: Record<string, HTMLButtonElement>;
  }
}
