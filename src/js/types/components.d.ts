declare module '@ryusei/code' {
  import {
    Caret,
    Chunk,
    Code,
    ContextMenu,
    Edit,
    Input,
    Keymap,
    Measure,
    Range,
    Scope,
    Selection,
    Style,
    Sync,
    View,
  } from '../components';
  import { Component } from '../core/base/Component';

  /**
   * The interface for core components.
   */
  interface Components {
    Caret: Caret;
    Chunk: Chunk;
    Code: Code;
    ContextMenu: ContextMenu;
    Edit: Edit;
    Input: Input;
    Keymap: Keymap;
    Measure: Measure;
    Range: Range;
    Scope: Scope;
    Selection: Selection;
    Style: Style,
    Sync: Sync;
    View: View;
  }

  /**
   * The interface for extensions.
   */
  interface Extensions {
    [ name: string ]: Component;
  }
}
