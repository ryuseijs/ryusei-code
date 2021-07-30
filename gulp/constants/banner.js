const info = require( '../../package' );

module.exports = `/*!
 * RyuseiCode.js
 * Version  : ${ info.version }
 * License  : ${ info.license }
 * Copyright: ${ new Date().getFullYear() } ${ info.author }
 */`;
