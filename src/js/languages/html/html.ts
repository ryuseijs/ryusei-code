import { AutoCloseConfig, Language, LanguageConfig, UseConfig } from '@ryusei/code';
import { CATEGORY_BRACKET, CATEGORY_COMMENT, CATEGORY_TAG, CATEGORY_TAG_CLOSE, html as _html } from '@ryusei/light';
import { Editor } from '../../core/Editor/Editor';
import { Lexer } from '../../core/Lexer/Lexer';
import { assign, includes } from '../../utils';
import { css } from '../css/css';
import { javascript } from '../javascript/javascript';
import { SELF_CLOSING_TAGS } from './tags';


/**
 * The HTML language options.
 *
 * @since 0.0.12
 */
export interface HtmlOptions {
  script?: {
    language: Language;
    use     : UseConfig;
  },
  style?: {
    language: Language;
    use     : UseConfig;
  },
}

/**
 * The max number of lines to scan up for an opening/closing tag.
 */
const SCAN_UP_LIMIT = 500;

/**
 * Returns a HTML Language object.
 *
 * @since 0.1.0
 *
 * @param options - Optional. Options.
 *
 * @return A Language object.
 */
export function html( options: HtmlOptions = {} ): Language {
  const script = options.script || {
    language: javascript(),
    use: {
      config: javascript(),
      code  : '<script>',
      depth : 2,
    },
  };

  const style = options.style || {
    language: css(),
    use: {
      config: css(),
      code  : '<style>',
      depth : 2,
    },
  };

  const language = _html( { script: () => script.language.language, style: () => style.language.language } );

  return assign( {
    id: language.id,
    language,
    lexer: new Lexer( language ),
    use: {
      [ script.language.id ]: script.use,
      [ style.language.id ] : style.use,
    },
  }, htmlConfig() );
}

/**
 * Returns a HTML LanguageConfig object.
 *
 * @since 0.1.0
 *
 * @return A LanguageConfig object.
 */
export function htmlConfig(): LanguageConfig {
  const quotesCompletionData = {
    close : shouldClose,
    skip  : shouldSkipOrRemove,
    remove: shouldSkipOrRemove,
  };

  return {
    lineComment : [ '<!--', '-->' ],
    blockComment: [ '<!--', '-->' ],

    multiline: [
      [ '<!--', '-->', CATEGORY_COMMENT ],
    ],

    indent: [
      [ shouldIndent, /^<\/\w+/ ],
    ],

    autoClose: [
      [ "'", "'", quotesCompletionData ],
      [ '"', '"', quotesCompletionData ],
      [ '>', closeCurrentTag ],
      [ '/', closeTag ],

      [ '=', '""', {
        close : shouldAppendQuotes,
        offset: 1,
      } ],
    ],
  };
}

/**
 * Determines whether to append `""` after `=` in a tag.
 *
 * @param Editor - An editor instance.
 *
 * @return `true` if quotes should be appended, or otherwise `false`.
 */
function shouldAppendQuotes( Editor: Editor ): boolean {
  const { Components } = Editor;

  return Components.Scope.isIn( [ '#attr', '#tag', '#openTag', '!value' ] )
    && /(^|[ \t])[^\s/<>"'=]+=$/.test( Components.Input.before );
}

/**
 * Determines whether to indent deep or not.
 *
 * @param editor - An editor instance.
 *
 * @return `true` if the indent levent should be increased.
 */
function shouldIndent( editor: Editor ): boolean {
  return !! getOpeningTagName( editor );
}

/**
 * Determines whether to proceed close, skip and remove process.
 *
 * @param Editor       - An Editor instance.
 * @param config       - A target config.
 * @param skipOrRemove - Set `true` when checking a `skip` or `remove` process.
 *
 * @return `true` if the completion process should be proceeded, or otherwise `false`.
 */
function validateQuotes( Editor: Editor, config: AutoCloseConfig, skipOrRemove: boolean ): boolean {
  const { Components } = Editor;

  if ( Components.Scope.isIn( [ '#attr' ] ) ) {
    if ( skipOrRemove ) {
      return true;
    }

    const { Input } = Components;
    return new RegExp( `=\\s*?${ config[ 0 ] }$` ).test( Input.before );
  }
}

/**
 * Determines whether to close quotes or not.
 *
 * @param Editor - An Editor instance.
 * @param config - A target config.
 *
 * @return `true` if the quote should be completed.
 */
function shouldClose( Editor: Editor, config: AutoCloseConfig ): boolean {
  return validateQuotes( Editor, config, false );
}

/**
 * Determines whether to skip/remove quotes or not.
 *
 * @param Editor - An Editor instance.
 * @param config - A target config.
 *
 * @return `true` if inputting a quote should be skipped.
 */
function shouldSkipOrRemove( Editor: Editor, config: AutoCloseConfig ): boolean {
  return validateQuotes( Editor, config, true );
}


/**
 * Returns an opening tag name at the current position.
 *
 * @param Editor - An Editor instance.
 *
 * @return A tag name if found, or an empty string if not.
 */
function getOpeningTagName( Editor: Editor ): string | undefined {
  const { Components } = Editor;
  const range = Components.Selection.get();
  const col   = range.start[ 1 ] - 1;

  if ( col >= 0 ) {
    const { Code, Code: { lines } } = Components;
    const [ tailRow ] = range.start;
    const tailInfo = lines.getInfoAt( [ tailRow, col ] );

    if ( tailInfo && tailInfo.category === CATEGORY_BRACKET && tailInfo.code === '>' ) {
      const { row: headRow, info: headInfo } = lines.scanUp( [ tailRow, tailInfo.from ], [ CATEGORY_BRACKET, /</ ] );
      const code    = Code.sliceRange( [ headRow, headInfo.from ], [ tailRow, tailInfo.to ] );
      const matches = /<([^\s/<>"'=]+)/.exec( code );

      if ( matches && ! includes( SELF_CLOSING_TAGS, matches[ 1 ] ) ) {
        return matches[ 1 ];
      }
    }
  }
}

/**
 * Closes the HTML tag if it is not a self-closed tag.
 *
 * @param editor - An Editor instance.
 *
 * @return A closing tag.
 */
function closeCurrentTag( editor: Editor ): string {
  const tag = getOpeningTagName( editor );
  return tag ? `</${ tag }>` : '';
}

/**
 * Attempts to close the tag when the `/` is entered.
 * This function is not strict for nested tags.
 *
 * @param Editor - An Editor instance.
 *
 * @return A closing tag.
 */
function closeTag( Editor: Editor ): string {
  const { Components } = Editor;
  const { start } = Components.Selection.get();
  const { lines } = Components.Code;

  const closingInfo = lines.scanUp( start, [ CATEGORY_TAG_CLOSE, /./ ], null, 0, SCAN_UP_LIMIT );
  const openingInfo = lines.scanUp( start, [ CATEGORY_TAG, /./ ], null, 0, SCAN_UP_LIMIT );

  if ( openingInfo ) {
    if ( closingInfo ) {
      if ( ( openingInfo.row - closingInfo.row || openingInfo.info.from - closingInfo.info.from ) < 0 ) {
        return '>';
      }
    }
  }

  const tag = openingInfo.info.code;

  if ( includes( SELF_CLOSING_TAGS, tag ) ) {
    return '>';
  }

  return `${ tag }>`;
}
