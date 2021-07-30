import { RyuseiCode } from '../../core/RyuseiCode/RyuseiCode';
import * as Extensions from '../../extensions';
import * as languages from '../../languages';
import { forOwn } from '../../utils';


forOwn( languages, language => {
  RyuseiCode.register( language() );
} );

RyuseiCode.compose( Extensions );

export { RyuseiCode as default } from '../../core/RyuseiCode/RyuseiCode';
