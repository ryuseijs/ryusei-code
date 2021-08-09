<div align="center">
<a href="https://code.ryuseijs.com">
  <img alt="RyuseiCode" src="https://code.ryuseijs.com/images/svg/logo.svg" width="70">
</a>

<h1>RyuseiCode</h1>

<p>
RyuseiCode is a lightweight, extensible and accessible code editor for browsers.
</p>

<p>
  <a href="https://code.ryuseijs.com">
    <img src="https://code.ryuseijs.com/images/readme/sample.png" alt="Visual Sample" style="max-width: 100%;" width="600">
  </a>
</p>

<p>
  <a href="https://code.ryuseijs.com/guides/getting-started/">Getting Started</a>
  <br>
  <a href="https://code.ryuseijs.com/">Demo</a>
  <br>
  <a href="https://code.ryuseijs.com/documents/">Documents</a>
  <br>
  <a href="https://code.ryuseijs.com/guides/themes/">Themes</a>
  <br>
  <a href="https://code.ryuseijs.com/extensions/">Extensions</a>
  <br>
  <a href="https://code.ryuseijs.com/enhancement/">Enhancement</a>
</p>
</div>

## Features

### Lightweight
You can start with the default small package that is about 70Kb (24Kb gzipped), including Indentation, History (Undo/Redo), and Shortcuts extensions.

### Accessibility Friendly
By using a "contenteditable" element, screen readers are able to read the current and selected code for visually impaired users, which promises your site accessibility.

### Modular and Extensible
The editor functionality can be extended by adding modular extensions. You can build your custom editor by picking them out or creating your own extensions.

### Mobiles and IE
The UX is not perfect, but the editor works on mobile devices thanks to the "contenteditable". It also works on the IE11 with some limitations.

### And more...
- Highlighting the current line
- Line numbers
- Auto closing paired characters
- Undoing and redoing code changes
- Increasing and decreasing the indent level of selected lines
- Commenting out selected lines with line or block comments by shortcuts
- Highlighting matched brackets
- Search and replace toolbar
- Finding words in match case, whole word and regexp modes
- Jump toolbar to go to the specific line
- Resizing the editor size by drag
- Custom dialog
- Custom context menus

### Caveats
- The editor does not support text wrapping and code hint.
- In IE, scrolling performance is not better. I'm reluctant to improve it because I don't believe there is no programmer who edits code in IE anymore.
- The editor is not intended to run gigantic code. You will notice the input latency around 20,000 lines.


## License

RyuseiCode is released under MIT license. © 2021 Naotoshi Fujita
