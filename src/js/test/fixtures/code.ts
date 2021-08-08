/**
 * The short code.
 *
 * @since 0.1.0
 */
export const CODE_SHORT = 'console.log( "Hello!" );';

/**
 * The HTML with the short code.
 *
 * @since 0.1.0
 */
export const EDITOR_HTML_SHORT = `<div id="ryuseicode01" role="code" class="ryuseicode is-rendered has-gutter"><style id="ryuseicode01-style">#ryuseicode01{min-width: %s;min-height: %s;max-width: %s;max-height: %s;-moz-tab-size: %s;tab-size: %s;}</style><div id="ryuseicode01-view" class="ryuseicode__view"><div id="ryuseicode01-body" class="ryuseicode__body"><div id="ryuseicode01-scroller" class="ryuseicode__scroller"><div id="ryuseicode01-container" class="ryuseicode__container"><div aria-hidden="true" class="ryuseicode__gutter ryuseicode__gutter--sticky"><div class="ryuseicode__gutter__float"><div class="ryuseicode__gutter__row"><span class="ryuseicode__gutter__number">1</span></div><div class="ryuseicode__gutter__row"><span class="ryuseicode__gutter__number">1</span></div></div></div><div id="ryuseicode01-editor" class="ryuseicode__editor"><div aria-label="Edit contents" autocorrect="off" autocapitalize="off" spellcheck="false" role="textbox" aria-multiline="true" aria-roledescription="editor" class="ryuseicode__lines"><div class="ryuseicode__line"><code class="ryuseicode__token rc__identifier">console</code><code class="ryuseicode__token rc__delimiter">.</code><code class="ryuseicode__token rc__function">log</code><code class="ryuseicode__token rc__bracket">(</code><code class="ryuseicode__token rc__space"> </code><code class="ryuseicode__token rc__string">"Hello!"</code><code class="ryuseicode__token rc__space"> </code><code class="ryuseicode__token rc__bracket">)</code><code class="ryuseicode__token rc__delimiter">;</code></div></div><pre class="ryuseicode__source">console.log( "Hello!" );</pre></div></div></div></div></div></div>`;

/**
 * The code with numbers.
 *
 * @since 0.1.0
 */
export const CODE_NUMBERS = '1\n2\n3\n4\n5\n6\n7\n8\n9';

/**
 * The code with triple numbers.
 *
 * @since 0.1.0
 */
export const CODE_TRIPLE_NUMBERS = '123\n456\n789';

/**
 * The code with nested brackets.
 *
 * @since 0.1.0
 */
export const CODE_BRACKETS = `{
  {
    {
      {
        { a: 1 },
      },
      {
        { b: 1 },
      },
      {
        { c: 1 },
      },
    }
  }
}`;

/**
 * The code with block comments.
 *
 * @since 0.1.0
 */
export const CODE_BLOCK_COMMENTS = `/*
comment 1
comment 2
comment 3
*/
/*
comment 4
comment 5
comment 6
*/`;
