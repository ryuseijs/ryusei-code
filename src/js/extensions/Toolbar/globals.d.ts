declare module '@ryusei/code' {
  import { Toolbar } from './Toolbar';

  interface Extensions {
    Toolbar: Toolbar;
  }

  /**
   * The interface for data of each toolbar.
   *
   * @since 0.1.0
   */
  export interface ToolbarGroupData extends UIGroupData {
    label: string;
  }
}
