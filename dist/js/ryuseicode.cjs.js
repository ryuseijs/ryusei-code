/*!
 * RyuseiCode.js
 * Version  : 0.1.13
 * License  : MIT
 * Copyright: 2021 Naotoshi Fujita
 */
'use strict';

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

Object.defineProperty(exports, '__esModule', {
  value: true
});
/**
 * The collection of i18n strings.
 *
 * @since 0.1.0
 */

var I18N$4 = {
  copy: 'Copy',
  cut: 'Cut',
  paste: 'Paste',
  selectAll: 'Select All',
  close: 'Close',
  confirm: 'OK',
  activate: 'Activate',
  notice: 'Notice',
  cancel: 'Cancel',
  failedToCopy: 'Can not copy on your environment.',
  scrollbar: 'Drag to Scroll',
  inputLabel: 'Edit contents',
  location: 'Line: %s, Column: %s'
};
/**
 * Icon settings as [ path, stroke?, linecap? ].
 *
 * @since 0.1.0
 */

var ICONS$1 = {
  arrowUp: ['m18.6 10.3c-6.59-6.85-6.59-6.85-6.59-6.85m-6.59 6.85 6.59-6.85m0 17v-17', 3],
  arrowDown: ['m5.41 13.7 6.59 6.85m6.59-6.85c-6.59 6.85-6.59 6.85-6.59 6.85m0-17v17', 3],
  close: ['m19 18-14-13m0 13 14-13', 3]
};
/**
 * The map for kay bindings (`[ key, ctrl, shift, alt ]`).
 *
 * @since 0.1.0
 */

var KEYMAP$6 = {
  selectAll: ['A', true]
};
/**
 * The collection of modifier keys.
 *
 * @since 0.1.0
 */

var MODIFIER_KEYS = {
  "default": ['Ctrl', 'Shift', 'Alt'],
  mac: ['⌘', '⇧', '⌥']
};
/**
 * Default values for the editor options.
 *
 * @since 0.1.0
 */

var DEFAULT_OPTIONS$6 = {
  language: 'javascript',
  placeholder: 'Enter code here…',
  minWidth: '200px',
  maxWidth: '100%',
  minHeight: '16em',
  maxHeight: '40em',
  indent: '  ',
  tabSize: 2,
  tabIndex: 0,
  keymap: KEYMAP$6,
  maxInitialLines: 200,
  icons: ICONS$1,
  i18n: I18N$4
};
/**
 * Checks if the array includes the value or not.
 * `Array#includes` is not supported by IE.
 *
 * @param array - An array.
 * @param value - A value to search for.
 *
 * @return `true` if the array includes the value, or otherwise `false`.
 */

function includes(array, value) {
  return array.indexOf(value) > -1;
}
/**
 * Checks if the given subject is an object or not.
 *
 * @param subject - A subject to check.
 *
 * @return `true` if the subject is an object, or otherwise `false`.
 */


function isObject$1(subject) {
  return subject !== null && typeof subject === 'object';
}
/**
 * Checks if the given subject is an array or not.
 *
 * @param subject - A subject to check.
 *
 * @return `true` if the subject is an array, or otherwise `false`.
 */


function isArray(subject) {
  return Array.isArray(subject);
}
/**
 * Checks if the given subject is a function or not.
 *
 * @param subject - A subject to check.
 *
 * @return `true` if the subject is a function, or otherwise `false`.
 */


function isFunction(subject) {
  return typeof subject === 'function';
}
/**
 * Checks if the given subject is a string or not.
 *
 * @param subject - A subject to check.
 *
 * @return `true` if the subject is a string, or otherwise `false`.
 */


function isString(subject) {
  return typeof subject === 'string';
}
/**
 * Checks if the given subject is `undefined` or not.
 *
 * @param subject - A subject to check.
 *
 * @return `true` if the subject is `undefined`, or otherwise `false`.
 */


function isUndefined$1(subject) {
  return typeof subject === 'undefined';
}
/**
 * Checks if the given subject is a Text node or not.
 *
 * @param subject - A subject to check.
 *
 * @return `true` if the subject is a Text node, or otherwise `false`.
 */


function isText(subject) {
  return subject instanceof Text;
}
/**
 * Checks if the given subject is a HTMLElement instance or not.
 *
 * @param subject - A subject to check.
 *
 * @return `true` if the subject is a HTMLElement instance, or otherwise `false`.
 */


function isHTMLElement(subject) {
  return subject instanceof HTMLElement;
}
/**
 * Checks if the given subject is a BR element or not.
 *
 * @param subject - A subject to check.
 *
 * @return `true` if the subject is a BR element, or otherwise `false`.
 */


function isBr(subject) {
  return subject instanceof HTMLBRElement;
}
/**
 * Push the provided value to an array if the value is not an array.
 *
 * @param value - A value to push.
 * @param nest  - Optional. Whether to push the value to an array if the value is already an array.
 *
 * @return An array containing the value, or the value itself if it is already an array.
 *         If the `nest` is `true` and the first child of the array is not an array,
 *         this returns an array with the provided array.
 */


function toArray(value, nest) {
  if (nest === void 0) {
    nest = false;
  }

  if (isArray(value)) {
    if (nest && !isArray(value[0])) {
      return [value];
    }

    return value;
  }

  return [value];
}

var arrayProto = Array.prototype;
/**
 * The slice method for an array-like object.
 *
 * @param arrayLike - An array-like object.
 * @param start     - Optional. A start index.
 * @param end       - Optional. A end index.
 *
 * @return An array with sliced elements.
 */

function slice(arrayLike, start, end) {
  return arrayProto.slice.call(arrayLike, start, end);
}
/**
 * The splice method for an array-like object.
 *
 * @link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice
 *
 * @param arrayLike   - An array-like object.
 * @param start       - A start index.
 * @param deleteCount - Optional. A number of elements to remove from the `start` index.
 * @param args        - Optional. Any number of items to add.
 *
 * @return An array with deleted items.
 */


function _splice(arrayLike, start, deleteCount) {
  var _arrayProto$splice;

  for (var _len2 = arguments.length, args = new Array(_len2 > 3 ? _len2 - 3 : 0), _key2 = 3; _key2 < _len2; _key2++) {
    args[_key2 - 3] = arguments[_key2];
  }

  return (_arrayProto$splice = arrayProto.splice).call.apply(_arrayProto$splice, [arrayLike, start, deleteCount].concat(args));
}
/**
 * Returns the active element.
 * This is just an alias of `document.activeElement`.
 *
 * @return An active element.
 */


function activeElement() {
  return document.activeElement;
}
/**
 * Toggles the provided class or classes by following the `add` boolean.
 *
 * @param elm     - An element whose classes are toggled.
 * @param classes - A class or class names.
 * @param add     - Whether to add or remove a class.
 */


function _toggleClass(elm, classes, add) {
  if (elm) {
    toArray(classes).forEach(function (name) {
      if (name) {
        elm.classList[add ? 'add' : 'remove'](name);
      }
    });
  }
}
/**
 * Adds classes to the element.
 *
 * @param elm     - An element to add classes to.
 * @param classes - Classes to add.
 */


function addClass(elm, classes) {
  _toggleClass(elm, classes, true);
}
/**
 * Appends children to the parent element.
 *
 * @param parent   - A parent element.
 * @param children - A child or children to append to the parent.
 */


function _append(parent, children) {
  toArray(children).forEach(parent.appendChild.bind(parent));
}
/**
 * Iterates over the provided object by own enumerable keys with calling the iteratee function.
 *
 * @param object   - An object to iterate over.
 * @param iteratee - An iteratee function that takes the value and key as arguments.
 *
 * @return A provided object itself.
 */


function forOwn$1(object, iteratee) {
  if (object) {
    var keys = Object.keys(object);

    for (var i = 0; i < keys.length; i++) {
      if (iteratee(object[keys[i]], keys[i]) === false) {
        break;
      }
    }
  }

  return object;
}
/**
 * Assigns all own enumerable properties of all source objects to the provided object.
 * `undefined` in source objects will be skipped.
 *
 * @param object  - An object to assign properties to.
 * @param sources - Objects to assign properties from.
 *
 * @return An object assigned properties of the sources to.
 */


function assign$1(object) {
  for (var _len3 = arguments.length, sources = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
    sources[_key3 - 1] = arguments[_key3];
  }

  sources.forEach(function (source) {
    if (isObject$1(source)) {
      forOwn$1(source, function (value, key) {
        if (!isUndefined$1(source[key])) {
          object[key] = source[key];
        }
      });
    }
  });
  return object;
}
/**
 * Sets new attributes to the passed element if the `attrs` is an object literal,
 * or gets an attribute value from it if the `attrs` is a string.
 *
 * @param elm   - An element to set or get an attribute.
 * @param attrs - An attribute name as a string or new attributes as an object literal.
 */


function attr(elm, attrs) {
  if (elm) {
    if (isString(attrs)) {
      return elm.getAttribute(attrs) || '';
    }

    if (isObject$1(attrs)) {
      forOwn$1(attrs, function (value, key) {
        if (value === null) {
          elm.removeAttribute(key);
        } else {
          elm.setAttribute(key, String(value));
        }
      });
    }
  }
}
/**
 * Inserts a node or nodes before the specified reference node.
 *
 * @param nodes - A node or nodes to insert.
 * @param ref   - A reference node.
 */


function before$1(nodes, ref) {
  toArray(nodes).forEach(function (node) {
    if (node) {
      var parent = node.parentNode || ref && ref.parentNode;

      if (parent) {
        parent.insertBefore(node, ref);
      }
    }
  });
}
/**
 * Checks if the element matches the provided selector, or passes the predicate function.
 *
 * @since 0.1.0
 *
 * @param elm      - An element to test.
 * @param selector - A selector string to match.
 *
 * @return `true` if the element matches the selector.
 */


function matches(elm, selector) {
  Element.prototype.matches = Element.prototype.matches || Element.prototype.msMatchesSelector;
  return elm.matches(selector);
}
/**
 * With starting at the given element,
 * finds the closest parent element that matches the selector.
 *
 * @since 0.1.0
 *
 * @param elm      - A start element.
 * @param selector - A selector to search for.
 *
 * @return The closest element if found, or `null` if not.
 *
 * @throws TypeError
 */


function closest(elm, selector) {
  if (isFunction(elm.closest)) {
    return elm.closest(selector);
  }

  while (elm) {
    if (matches(elm, selector)) {
      return elm;
    }

    elm = elm.parentElement;
  }

  return null;
}
/**
 * Creates a HTML element.
 *
 * @param tag    - A tag name.
 * @param attrs  - Optional. An object with attributes to apply the created element to, or a string with classes.
 * @param parent - Optional. A parent element where the created element is appended.
 */


function _create(tag, attrs, parent) {
  var elm = document.createElement(tag);

  if (attrs) {
    if (isString(attrs) || isArray(attrs)) {
      addClass(elm, attrs);
    } else {
      attr(elm, attrs);
    }
  }

  if (parent) {
    _append(parent, elm);
  }

  return elm;
}
/**
 * The `create` function whose tag argument is fixed to `div`.
 *
 * @param attrs  - Optional. An object with attributes to apply the created element to, or a string with classes.
 * @param parent - Optional. A parent element where the created element is appended.
 */


function div(attrs, parent) {
  return _create('div', attrs, parent);
}
/**
 * Focuses the provided element without scrolling the ascendant element.
 *
 * @param elm - An element to focus.
 */


function _focus5(elm) {
  if (isFunction(elm['setActive'])) {
    elm['setActive']();
  } else {
    elm.focus({
      preventScroll: true
    });
  }
}
/**
 * Checks if the element contains the specified class or not.
 *
 * @param elm       - An element to check.
 * @param className - A class name that may be contained by the element.
 *
 * @return `true` if the element contains the class, or otherwise `false`.
 */


function hasClass(elm, className) {
  return elm && elm.classList.contains(className);
}
/**
 * Returns client height of the element.
 *
 * @param elm - An element to get height.
 */


function height(elm) {
  return elm.clientHeight;
}
/**
 * Sets or gets HTML of the provided element.
 *
 * @param elm - A element to get or set HTML.
 * @param html - Optional. HTML to set.
 */


function html$2(elm, html) {
  if (elm) {
    if (isUndefined$1(html)) {
      return elm.innerHTML;
    }

    if (elm.innerHTML !== html) {
      elm.innerHTML = html;
    }
  }
}
/**
 * Checks if the default action of the event is prevented or not.
 *
 * @param e - An Event object.
 *
 * @return `true` if the default action is prevented, or otherwise `false`.
 */


function isPrevented(e) {
  return e && e.defaultPrevented;
}
/**
 * Joins the provided object as a single line for DOM attributes.
 *
 * @param attrs - An object literal for attributes.
 *
 * @return A single string containing all attributes.
 */


function joinAttrs(attrs) {
  var result = '';
  forOwn$1(attrs, function (value, prop) {
    if (prop && (value || value === false || value === 0)) {
      result += " " + prop + "=\"" + value + "\"";
    }
  });
  return result.trim();
}
/**
 * Stores registered handlers which has a key.
 *
 * @since 0.1.0
 */


var handlerMap = new WeakMap();
/**
 * Attaches a handler to the event.
 *
 * @param elm      - An element, a window or a document.
 * @param events   - An event name or names.
 * @param callback - A handler to attach.
 * @param key      - Optional. The key for identifying the registered handler.
 */

function on(elm, events, callback, key) {
  events.split(' ').forEach(function (event) {
    elm.addEventListener(event, callback);

    if (key) {
      var handlers = handlerMap.get(key) || [];
      handlers.push({
        elm: elm,
        events: events,
        callback: callback
      });
      handlerMap.set(key, handlers);
    }
  });
}
/**
 * Detaches a handler from the event or events.
 *
 * @param elm           - An element where events are removed.
 * @param events        - Optional. An event name or names.
 * @param callbackOrKey - Optional. A handler to remove or an object key.
 */


function off(elm, events, callbackOrKey) {
  if (isFunction(callbackOrKey)) {
    events.split(' ').forEach(function (event) {
      elm.removeEventListener(event, callbackOrKey);
    });
  } else {
    var handlers = handlerMap.get(callbackOrKey);

    if (handlers) {
      handlers.forEach(function (handler) {
        off(handler.elm, handler.events, handler.callback);
      });
      handlerMap["delete"](callbackOrKey);
    }
  }
}
/**
 * Prepends children to the specified parent node.
 *
 * @param parent   - A parent node.
 * @param children - A child or children to prepend to the parent.
 */


function prepend(parent, children) {
  toArray(children).forEach(function (child) {
    parent.insertBefore(child, parent.firstChild);
  });
}
/**
 * Call the `preventDefault()` of the provided event.
 *
 * @param e               - An Event object.
 * @param stopPropagation - Optional. Whether to stop the event propergation or not.
 */


function prevent(e, stopPropagation) {
  if (e) {
    if (e.cancelable) {
      e.preventDefault();
    }

    if (stopPropagation) {
      e.stopPropagation();
    }
  }
}
/**
 * Returns an element that matches the provided selector.
 *
 * @param parent   - A parent element to start searching from.
 * @param selector - A selector to query.
 *
 * @return A found element or `null`.
 */


function query(parent, selector) {
  return parent.querySelector(selector);
}
/**
 * Returns elements that match the provided selector.
 *
 * @param parent   - A parent element to start searching from.
 * @param selector - A selector to query.
 *
 * @return The NodeList object that contains matched elements.
 */


function queryAll(parent, selector) {
  return parent.querySelectorAll(selector);
}
/**
 * Returns a DOMRect object of the provided element or the selection range.
 *
 * @param target - An element or a range instance.
 */


function rect(target) {
  return target.getBoundingClientRect();
}
/**
 * Removes the provided node from its parent.
 *
 * @param nodes - A node or nodes to remove.
 */


function _remove(nodes) {
  toArray(nodes).forEach(function (node) {
    if (node && node.parentNode) {
      node.parentNode.removeChild(node);
    }
  });
}
/**
 * Removes classes from the element.
 *
 * @param elm     - An element to remove classes from.
 * @param classes - Classes to remove.
 */


function removeClass(elm, classes) {
  _toggleClass(elm, classes, false);
}
/**
 * Applies inline styles to the provided element by an object literal.
 *
 * @param elm    - An element to apply styles to.
 * @param styles - An object literal with styles.
 */


function styles(elm, styles) {
  if (isString(styles)) {
    return getComputedStyle(elm)[styles];
  }

  forOwn$1(styles, function (value, key) {
    if (!isUndefined$1(value)) {
      elm.style[key] = String(value);
    }
  });
}
/**
 * Returns an open tag with provided classes.
 *
 * @param classes - Classes.
 * @param attrs   - Optional. An object with attributes.
 * @param tag     - Optional. A tag name.
 */


function tag(classes, attrs, tag) {
  if (attrs === void 0) {
    attrs = {};
  }

  return "<" + (tag || 'div') + " " + joinAttrs(assign$1(attrs, {
    "class": toArray(classes).filter(Boolean).join(' ')
  })) + ">";
}
/**
 * Sets or gets a text content of the provided node.
 *
 * @param node - A node to get or set a text.
 * @param text - Optional. A text to set.
 */


function text(node, text) {
  if (node) {
    if (isUndefined$1(text)) {
      return node.textContent;
    }

    node.textContent = text;
  }
}
/**
 * Appends `px` to the value.
 * If the value is already string, just returns it.
 *
 * @param value - A value to append `px` to.
 */


function unit(value) {
  return isString(value) ? value : value + "px";
}
/**
 * Checks if the client is Android or not.
 *
 * @return `true` if the client is Android, or otherwise `false`.
 */


function isAndroid() {
  return /android/i.test(navigator.userAgent);
}
/**
 * Checks is the browser is based on the Gecko engine or not.
 *
 * @return `true` if the browser is the browser is based on the Gecko (Firefox), or otherwise `false`.
 */


function isGecko() {
  return !!window['InstallTrigger'];
}
/**
 * Checks if the client is iOS or not.
 *
 * @return `true` if the client is iOS, or otherwise `false`.
 */


function isIOS() {
  var _navigator = navigator,
      userAgent = _navigator.userAgent;
  return /iPad|iPhone|iPod/.test(userAgent) || userAgent.indexOf('Mac') > -1 && navigator.maxTouchPoints > 1;
}
/**
 * Checks is the browser is IE or not.
 *
 * @return `true` if the browser is IE, or otherwise `false`.
 */


function isIE() {
  return (
    /*@cc_on!@*/
    !!document['documentMode']
  );
}
/**
 * Checks is the platform is Mac or not.
 *
 * @return `true` if the platform is Mac, or otherwise `false`.
 */


function isMac() {
  return /Mac/i.test(navigator.platform);
}
/**
 * Checks if the device is likely mobile or not.
 *
 * @return `true` if the device is likely mobile, or otherwise `false`.
 */


function isMobile() {
  return isAndroid() || isIOS();
}
/**
 * The project code.
 *
 * @since 0.1.0
 */


var PROJECT_CODE = 'ryuseicode';
/**
 * The abbreviated project code.
 *
 * @since 0.1.0
 */

var PROJECT_CODE_SHORT = 'rc';
/**
 * Throws an error if the provided condition is falsy.
 *
 * @param condition - If falsy, an error is thrown.
 * @param message   - Optional. A message to display.
 */

function assert$1(condition, message) {
  if (message === void 0) {
    message = '';
  }

  if (!condition) {
    throw new Error("[" + PROJECT_CODE + "] " + message);
  }
}
/**
 * Returns a function that invokes the provided function at most once in the specified duration.
 *
 * @since 0.1.0
 *
 * @param func        - A function to throttle.
 * @param interval    - A throttle duration in milliseconds.
 * @param initialCall - Optional. Determines whether to call the function initially.
 * @param debounce    - Optional. If `true`, the function returns a debounced function instead of throttled one.
 * @param raf         - Optional. Determines whether to use the `requestAnimationFrame` or not.
 *
 * @return A throttled function.
 */


function throttle(func, interval, initialCall, debounce, raf) {
  var id;
  var invoker;

  function throttled() {
    if (debounce) {
      cancel();
    }

    for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
      args[_key4] = arguments[_key4];
    }

    invoker = invoke.bind.apply(invoke, [this].concat(args));

    if (!id) {
      if (isUndefined$1(id) && initialCall) {
        invoker();
      } else {
        id = raf ? requestAnimationFrame(invoker) : setTimeout(invoker, interval);
      }
    }
  }

  function invoke() {
    for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
      args[_key5] = arguments[_key5];
    }

    func.apply(this, args);
    cancel();
  }

  function cancel() {
    raf ? cancelAnimationFrame(id) : clearTimeout(id);
    id = null;
  }

  throttled.cancel = cancel;

  throttled.invoke = function () {
    if (id) {
      invoker();
    }
  };

  return throttled;
}
/**
 * Returns a debounced function that invokes the provided function only after the internal timer expires.
 * The timer is reset whenever the debounced function is called.
 *
 * @param func     - A callback function.
 * @param duration - Debounce duration in milliseconds.
 *
 * @return A debounced function.
 */


function debounce(func, duration) {
  return throttle(func, duration, false, true);
}
/**
 * Fires the provided function on the next tick.
 *
 * @param func - A function to call.
 */


function nextTick(func) {
  setTimeout(func);
}
/**
 * Implements the `throttle` function via requestAnimationFrame.
 *
 * @param func - A function to throttle.
 * @param initialCall - Optional. Determines whether to call the function initially.
 *
 * @return A throttled function.
 */


function rafThrottle(func, initialCall) {
  return throttle(func, 0, initialCall, false, true);
}
/**
 * The collection of forward arrow keys.
 *
 * @private
 * @since 0.1.0
 */


var ARROW_FORWARD = ['ArrowDown', 'ArrowRight'];
/**
 * The collection of backward arrow keys.
 *
 * @private
 * @since 0.1.0
 */

var ARROW_BACKWARD = ['ArrowUp', 'ArrowLeft'];
/**
 * The collection of all arrow keys.
 *
 * @private
 * @since 0.1.0
 */

var ARROW_KEYS = [].concat(ARROW_FORWARD, ARROW_BACKWARD);
/**
 * The map for normalizing differences of keys in browsers.
 *
 * @link https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values
 *
 * @private
 * @since 0.1.0
 */

var NORMALIZATION_MAP = {
  Up: 'ArrowUp',
  Down: 'ArrowDown',
  Right: 'ArrowRight',
  Left: 'ArrowLeft',
  Del: 'Delete',
  Esc: 'Escape',
  Spacebar: ' '
};
/**
 * Normalizes the provided key for different browsers.
 *
 * @param key - A key to normalize.
 */

function normalizeKey(key) {
  return NORMALIZATION_MAP[key] || key;
}
/**
 * Checks if the keyboard event matches the provided matcher or not.
 *
 * @param e        - A KeyboardEvent object.
 * @param matchers - A KeyMatcher tuple or an array with matchers.
 *
 * @return `true` if the keyboard event satisfies the matcher, or otherwise `false`.
 */


function matchesKey(e, matchers) {
  var key = normalizeKey(e.key).toUpperCase();
  return matchers && toArray(matchers, true).some(function (matcher) {
    return key === matcher[0].toUpperCase() && !matcher[1] === !e.ctrlKey && !matcher[2] === !e.shiftKey && !matcher[3] === !e.altKey;
  });
}
/**
 * Checks if the subject number is between `minOrMax` and `maxOrMin`.
 *
 * @param number    - A subject number to check.
 * @param minOrMax  - A min or max number.
 * @param maxOrMin  - A max or min number.
 * @param exclusive - Optional. Whether to exclude `x` or `y`.
 */


function between(number, minOrMax, maxOrMin, exclusive) {
  var min = Math.min(minOrMax, maxOrMin);
  var max = Math.max(minOrMax, maxOrMin);
  return exclusive ? min < number && number < max : min <= number && number <= max;
}

var max$1 = Math.max,
    min$1 = Math.min;
/**
 * Clamps a number.
 *
 * @param number - A subject number to check.
 * @param x      - A min or max number.
 * @param y      - A min or max number.
 */

function clamp(number, x, y) {
  var minimum = min$1(x, y);
  var maximum = max$1(x, y);
  return min$1(max$1(minimum, number), maximum);
}

var min = Math.min,
    max = Math.max,
    floor = Math.floor,
    ceil = Math.ceil,
    abs = Math.abs,
    round = Math.round;
/**
 * Compares the provided 2 positions.
 *
 * @return If the `position1` is preceding, returns a negative number,
 *         or if it is following, returns a positive one. If they are same, returns `0`.
 */

function compare(position1, position2) {
  return position1[0] - position2[0] || position1[1] - position2[1];
}
/**
 * The alias of document.createRange.
 * The Range constructor is not supported by IE.
 *
 * @since 0.1.0
 *
 * @return A Range instance.
 */


function createRange() {
  return document.createRange();
}
/**
 * The alias of window.getSelection.
 *
 * @since 0.1.0
 *
 * @return A Selection instance.
 */


function getSelection() {
  return window.getSelection();
}
/**
 * Finds a node that the offset number belongs to.
 *
 * @param elm    - An element to find in.
 * @param offset - An offset index.
 *
 * @return An object that contains a found node and a offset number.
 */


function findSelectionBoundary(elm, offset) {
  var children = elm.childNodes;

  if (!children.length && !offset) {
    return {
      node: elm,
      offset: 0
    };
  }

  if (offset <= elm.textContent.length) {
    for (var i = 0; i < children.length; i++) {
      var node = children[i];
      var length = node.textContent.length;

      if (isText(node)) {
        if (offset <= length) {
          return {
            node: node,
            offset: offset
          };
        }
      } else if (node instanceof Element) {
        var found = findSelectionBoundary(node, offset);

        if (found) {
          return found;
        }
      }

      offset -= length;
    }
  }

  return null;
}
/**
 * Sets a selection by an anchor and a focus object.
 * Note that the Range constructor does not supported by IE.
 *
 * @param anchor - An anchor boundary object.
 * @param focus  - A focus boundary object.
 */


function setSelection(anchor, focus) {
  if (anchor && focus) {
    var selection = getSelection();

    if (selection.setBaseAndExtent) {
      selection.setBaseAndExtent(anchor.node, anchor.offset, focus.node, focus.offset);
    } else {
      var range = selection.rangeCount > 0 ? selection.getRangeAt(0) : document.createRange();
      range.setStart(anchor.node, anchor.offset);
      range.setEnd(focus.node, focus.offset);
      selection.removeAllRanges();
      selection.addRange(range);
    }
  }
}
/**
 * Converts the provided string in the camel case to the kebab case.
 *
 * @param string - A string to convert.
 */


function camelToKebab(string) {
  return string.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
}
/**
 * Counts the search string occurrence in the provided sting.
 *
 * @param string - A string to search in.
 * @param search - A string to search for.
 * @param from   - An index to search from.
 * @param to     - An index to search to.
 *
 * @return A number of occurrence.
 */


function count(string, search, from, to) {
  if (from === void 0) {
    from = 0;
  }

  if (to === void 0) {
    to = string.length;
  }

  if (from || to !== string.length) {
    string = string.slice(from, to);
  }

  return (string.match(new RegExp(search, 'g')) || []).length;
}
/**
 * Checks if the string ends with the `search` string or not.
 *
 * @param string - A string to check.
 * @param search - A string to search.
 *
 * @return `true` if the string ends with the `search`, or otherwise `false`.
 */


function endsWith(string, search) {
  return string.slice(-search.length) === search;
}
/**
 * Converts essential HTML special characters to HTML entities.
 *
 * @param string - A string to escape.
 *
 * @return An escaped string.
 */


function escapeHtml(string) {
  return string.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
/**
 * Escapes string for the RegExp source.
 *
 * @link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
 *
 * @param string - A string to escape.
 */


function escapeRegExp(string) {
  return string.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&');
}
/**
 * Formats a string.
 *
 * @param string       - A string to format.
 * @param replacements - A replacement or replacements.
 *
 * @return A formatted string.
 */


function format(string) {
  for (var i = 0; i < (arguments.length <= 1 ? 0 : arguments.length - 1); i++) {
    string = string.replace('%s', String(i + 1 < 1 || arguments.length <= i + 1 ? undefined : arguments[i + 1]));
  }

  return string;
}
/**
 * Returns the index within the provided string of the nth occurrence.
 * The optional `from` index determines the start position to search the target from.
 *
 * @param string - A string to search in.
 * @param search - A string to search startsWith
 * @param nth    - A number of the occurrence.
 * @param from   - Optional. A start index to search from.
 *
 * @return An index if the nth occurrence of the `search` string is found, or `-1` if not.
 */


function nthIndexOf(string, search, nth, from) {
  if (from === void 0) {
    from = 0;
  }

  var index = from - 1;
  var count = nth;

  while ((index !== -1 || nth === count) && count--) {
    index = string.indexOf(search, index + 1);
  }

  return index;
}
/**
 * Returns a new string filled with a number of copies of the provided string.
 *
 * @param string - A string to repeat.
 * @param count  - An integer for determining the number of repeats.
 *
 * @return A new string containing copies of the provided string.
 */


function repeat(string, count) {
  if (!String.prototype.repeat) {
    var result = '';

    while (count > 0) {
      if (count % 2) {
        result += string;
      }

      count = floor(count / 2);
      string += string;
    }

    return result;
  }

  return string.repeat(count);
}
/**
 * Checks if the string starts with the `search` string or not.
 *
 * @param string - A string to check.
 * @param search - A string to search.
 *
 * @return `true` if the string starts with the `search`, or otherwise `false`.
 */


function startsWith$1(string, search) {
  return string.slice(0, search.length) === search;
}

var ids = {};
/**
 * Returns a sequential unique ID as "{ prefix }-{ number }".
 *
 * @param prefix - A prefix for the ID.
 */

function uniqueId(prefix) {
  var number = (ids[prefix] || 0) + 1;
  var idNumber = number < 10 ? "0" + number : number;
  ids[prefix] = number;
  return "" + prefix + idNumber;
}
/**
 * The base class for a component.
 *
 * @since 0.1.0
 */


var Component = /*#__PURE__*/function () {
  /**
   * The Component constructor.
   *
   * @param Editor - An Editor instance.
   */
  function Component(Editor) {
    this.Editor = Editor;
    this.event = Editor.event;
    this.options = Editor.options;
    this.language = Editor.language;
  }
  /**
   * Called when the component is mounted.
   *
   * @param elements - A collection of editor elements.
   */


  var _proto2 = Component.prototype;

  _proto2.mount = function mount(elements) {
    var _this2 = this;

    this.elements = elements;
    forOwn$1(this.Editor.Components, function (_Component, key) {
      _this2[key] = _Component;
    });
  }
  /**
   * Called when the editor is destroyed.
   *
   * @internal
   */
  ;

  _proto2.destroy = function destroy() {
    off(null, '', this);
  }
  /**
   * Attaches an event handler to an event or events with passing this instance as a key.
   * They can only be detached by the `off()` member method.
   *
   * @param events   - An event name, names split by spaces, or an array with names.
   * @param callback - A callback function.
   * @param thisArg  - Optional. Specifies the `this` parameter of the callback function.
   * @param priority - Optional. A priority number for the order in which the callbacks are invoked.
   */
  ;

  _proto2.on = function on(events, callback, thisArg, priority) {
    this.event.on(events, thisArg ? callback.bind(thisArg) : callback, this, priority);
  }
  /**
   * Detaches handlers registered by `on()` without removing handlers attached by other components.
   *
   * @param events - An event name, names split by spaces, or an array with names.
   */
  ;

  _proto2.off = function off(events) {
    this.event.off(events, this);
  }
  /**
   * Triggers handlers attached to the event.
   *
   * @param event - An event name.
   * @param args  - Optional. Any number of arguments to pass to callback functions.
   */
  ;

  _proto2.emit = function emit(event) {
    var _this$event;

    for (var _len6 = arguments.length, args = new Array(_len6 > 1 ? _len6 - 1 : 0), _key6 = 1; _key6 < _len6; _key6++) {
      args[_key6 - 1] = arguments[_key6];
    }

    (_this$event = this.event).emit.apply(_this$event, [event].concat(args));
  }
  /**
   * Listens to native events.
   * This method stores all listeners and automatically removes them on destruction.
   *
   * @param elm      - A document, a window or an element.
   * @param events   - An event name or names split by spaces.
   * @param callback - A callback function.
   * @param thisArg  - Optional. Specifies the `this` parameter of the callback function.
   */
  ;

  _proto2.bind = function bind(elm, events, callback, thisArg) {
    on(elm, events, thisArg ? callback.bind(thisArg) : callback, this);
  }
  /**
   * Returns a Language or LanguageConfig object at the focus or specified position.
   * This method can return different objects depending on the position
   * if the language allows to embed other languages, such as HTML and PHP.
   *
   * @param position - Optional. Specifies the position to get the language at.
   *
   * @return A main Language object or sub language config object.
   */
  ;

  _proto2.getLanguage = function getLanguage(position) {
    position = position || this.Selection.focus;
    var language = this.language;
    var info = this.lines.getInfoAt(position);

    if (info && info.language && language.use && language.use[info.language]) {
      return language.use[info.language].config;
    }

    return language;
  }
  /**
   * Attempts to invoke the public method of the specified extension.
   * In terms of the "loose coupling", you'd better try not to use this method.
   * Using events is enough in most cases.
   *
   * @example
   * ```ts
   * // Attempts to show the "search" toolbar.
   * Editor.invoke( 'Toolbar', 'show', 'search' );
   * ```
   *
   * @param name   - A name of the extension.
   * @param method - A method name to invoke.
   * @param args   - Optional. Arguments for the method.
   *
   * @return The return value of the method.
   */
  ;

  _proto2.invoke = function invoke(name, method) {
    var _this$Editor;

    for (var _len7 = arguments.length, args = new Array(_len7 > 2 ? _len7 - 2 : 0), _key7 = 2; _key7 < _len7; _key7++) {
      args[_key7 - 2] = arguments[_key7];
    }

    return (_this$Editor = this.Editor).invoke.apply(_this$Editor, [name, method].concat(args));
  }
  /**
   * Returns the specified extension.
   * In terms of the "loose coupling", you'd better try not to use this method.
   * Using events is enough in most cases.
   *
   * @param name - A name of an extension.
   *
   * @return An extension if found, or otherwise `undefined`.
   */
  ;

  _proto2.require = function require(name) {
    return this.Editor.require(name);
  }
  /**
   * Adds default icon strings. They can be still overridden by options.
   * The IconSettings is a tuple as `[ string, number?, string? ]` corresponding with `[ path, stroke?, linecap? ]`.
   *
   * @example
   * ```ts
   * this.addIcons( {
   *   myIcon: [
   *     'm19 18-14-13m0 13 14-13',
   *     3,
   *   ],
   * } );
   * ```
   *
   * @param icons - Icon settings to add.
   */
  ;

  _proto2.addIcons = function addIcons(icons) {
    var options = this.options;
    options.icons = assign$1({}, icons, options.icons);
  }
  /**
   * Adds default i18n strings. They can be still overridden by options.
   *
   * @example
   * ```ts
   * this.addI18n( {
   *   myMessage: 'Hello!',
   * } );
   * ```
   *
   * @param i18n - Additional i18n strings.
   */
  ;

  _proto2.addI18n = function addI18n(i18n) {
    var options = this.options;
    options.i18n = assign$1({}, i18n, options.i18n);
  }
  /**
   * Adds default shortcuts to the keymap object. They can be still overridden by options.
   * Call this method before RyuseiCode mounts components so that the Keymap component recognizes shortcuts.
   *
   * @example
   * ```js
   * class MyExtension extends Component {
   *   constructor( Editor ) {
   *     super( Editor );
   *
   *     this.addKeyBindings( {
   *       myShortcut: [ 'P', true, true ],
   *     } );
   *   }
   * }
   * ```
   *
   * @param shortcuts - Additional shortcuts.
   */
  ;

  _proto2.addKeyBindings = function addKeyBindings(shortcuts) {
    var options = this.options;
    options.keymap = assign$1({}, shortcuts, options.keymap);
  }
  /**
   * Returns options for each extension, merging provided default values.
   *
   * @example
   * ```js
   * class MyExtension extends Component {
   *   constructor( Editor ) {
   *     super( Editor );
   *
   *     const extensionOptions = this.getOptions( 'myExtension', { option1: true } );
   *   }
   * }
   * ```
   *
   * @param name     - An option name.
   * @param defaults - Default values.
   *
   * @return A merged options, or `null`.
   */
  ;

  _proto2.getOptions = function getOptions(name, defaults) {
    var options = this.options[name];

    if (isUndefined$1(options) || options === true) {
      return defaults || {};
    }

    if (isObject$1(options)) {
      return assign$1({}, defaults, options);
    }

    assert$1(false);
  }
  /**
   * Returns the latest Lines instance.
   * This is an alias of `Code#Lines`.
   *
   * @return The Lines instance.
   */
  ;

  _createClass(Component, [{
    key: "lines",
    get: function get() {
      return this.Code.Lines;
    }
    /**
     * Returns the i18n collection.
     * This is an alias of `this.options.i18n`.
     *
     * @return The object with i18n strings.
     */

  }, {
    key: "i18n",
    get: function get() {
      return this.options.i18n;
    }
  }]);

  return Component;
}();

var CLASS_ROOT = PROJECT_CODE;
var CLASS_VIEW = PROJECT_CODE + "__view";
var CLASS_BODY = PROJECT_CODE + "__body";
var CLASS_SCROLLER = PROJECT_CODE + "__scroller";
var CLASS_CONTAINER = PROJECT_CODE + "__container";
var CLASS_EDITOR = PROJECT_CODE + "__editor";
var CLASS_SCROLLBARS = PROJECT_CODE + "__scrollbars";
var CLASS_SCROLLBAR = PROJECT_CODE + "__scrollbar";
var CLASS_LINES = PROJECT_CODE + "__lines";
var CLASS_LINE = PROJECT_CODE + "__line";
var CLASS_SOURCE = PROJECT_CODE + "__source";
var CLASS_BACKGROUND = PROJECT_CODE + "__background";
var CLASS_CARETS = PROJECT_CODE + "__carets";
var CLASS_CARET = PROJECT_CODE + "__caret";
var CLASS_MARKERS = PROJECT_CODE + "__markers";
var CLASS_MARKER = PROJECT_CODE + "__marker";
var CLASS_OVERLAY = PROJECT_CODE + "__overlay";
var CLASS_CONTEXT_MENU = PROJECT_CODE + "__context-menu";
var CLASS_CONTEXT_MENU_GROUP = CLASS_CONTEXT_MENU + "__group";
var CLASS_CONTEXT_MENU_LIST = CLASS_CONTEXT_MENU + "__list";
var CLASS_CONTEXT_MENU_ITEM = CLASS_CONTEXT_MENU + "__item";
var CLASS_CONTEXT_MENU_BUTTON = CLASS_CONTEXT_MENU + "__button";
var CLASS_CONTEXT_MENU_LABEL = CLASS_CONTEXT_MENU_BUTTON + "__label";
var CLASS_CONTEXT_MENU_SHORTCUT = CLASS_CONTEXT_MENU_BUTTON + "__shortcut";
var CLASS_TOKEN = PROJECT_CODE_SHORT + "__token";
var CLASS_INPUT = PROJECT_CODE + "__input";
var CLASS_BUTTON = PROJECT_CODE + "__button";
var CLASS_ICON = PROJECT_CODE + "__icon";
var CLASS_PLACEHOLDER = PROJECT_CODE + "__placeholder";
var CLASS_ACTIVE = 'is-active';
var CLASS_RENDERED = 'is-rendered';
var CLASS_INITIALIZED = 'is-initialized';
var CLASS_ANCHOR = 'is-anchor';
var CLASS_FOCUS = 'is-focus';
var CLASS_PRESERVED = 'is-preserved';
var CLASS_FOCUSED = 'is-focused';
var CLASS_READONLY = 'is-readonly';
var CLASS_DRAGGING = 'is-dragging';
var CLASS_EMPTY = 'is-empty';
var CLASS_MOBILE = 'is-mobile';
var EVENT_MOUNT = 'mount';
var EVENT_MOUNTED = 'mounted';
var EVENT_FOCUS = 'focus';
var EVENT_BLUR = 'blur';
var EVENT_READONLY = 'readOnly';
var EVENT_KEYDOWN = 'keydown';
var EVENT_INPUT = 'input';
var EVENT_NEWLINE = 'newline';
var EVENT_CHANGE = 'change';
var EVENT_CHANGED = 'changed';
var EVENT_COMPOSITION_START = 'compositionStart';
var EVENT_COMPOSITION_UPDATE = 'compositionUpdate';
var EVENT_COMPOSITION_END = 'compositionEnd';
var EVENT_ANCHOR_LINE_CHANGED = 'anchorLineChanged';
var EVENT_FOCUS_LINE_CHANGED = 'focusLineChanged';
var EVENT_COPY = 'copy';
var EVENT_CUT = 'cut';
var EVENT_PASTE = 'paste';
var EVENT_KEYMAP = 'keymap';
var EVENT_CHUNK_MOVED = 'chunkMoved';
var EVENT_CHUNK_SUPPLIED = 'chunkSupplied';
var EVENT_SELECTING = 'selecting';
var EVENT_SELECTED = 'selected';
var EVENT_SELECTION_CHANGE = 'selectionChanged';
var EVENT_SCROLL = 'scroll';
var EVENT_SCROLLED = 'scrolled';
var EVENT_SCROLLER_SCROLL = 'scrollerScroll';
var EVENT_WINDOW_SCROLL = 'windowScroll';
var EVENT_RESIZE = 'resize';
var EVENT_SCROLL_WIDTH_CHANGED = 'scrollWidthChanged';
var EVENT_SCROLL_HEIGHT_CHANGED = 'scrollHeightChanged';
var EVENT_SYNCED = 'synced';
var EVENT_CONTEXT_MENU_OPENED = 'contextMenuOpened';
var EVENT_CONTEXT_MENU_CLOSED = 'contextMenuClosed';
var EVENT_CONTEXT_MENU_CLICKED = 'contextMenuClicked';
var EVENT_RESET = 'reset';
var EVENT_INIT_STYLE = 'initStyle';
var EVENT_FONT_LOADED = 'fontLoaded';
var EVENT_DESTROYED = 'destroyed';
/**
 * The editor is not active.
 */

var IDLE = 0;
/**
 * The selection is collapsed.
 */

var COLLAPSED = 1;
/**
 * The selection will change soon. The native selection has not been updated at this timing.
 */

var START = 2;
/**
 * The selection has just changed after the `START` state. The native selection has been updated.
 */

var CHANGED = 3;
/**
 * The selection has been programmatically updated.
 */

var UPDATE = 4;
/**
 * An user is selecting a document.
 */

var SELECTING = 5;
/**
 * The existing selection is being extended.
 */

var EXTEND = 6;
/**
 * User finishes the selection. The native selection has not been updated at this timing (in Gecko).
 */

var END = 7;
/**
 * The selection is settled and it is not collapsed.
 */

var SELECTED = 8;
/**
 * All contents are selected.
 */

var SELECTED_ALL = 9;
/**
 * The selection is right-clicked.
 */

var CLICKED_RIGHT = 10;
var STATES = /*#__PURE__*/Object.freeze({
  __proto__: null,
  IDLE: IDLE,
  COLLAPSED: COLLAPSED,
  START: START,
  CHANGED: CHANGED,
  UPDATE: UPDATE,
  SELECTING: SELECTING,
  EXTEND: EXTEND,
  END: END,
  SELECTED: SELECTED,
  SELECTED_ALL: SELECTED_ALL,
  CLICKED_RIGHT: CLICKED_RIGHT
});
/**
 * The offset amount for the horizontal position of the caret.
 *
 * @since 0.1.0
 */

var HORIZONTAL_OFFSET = -1;
/**
 * The debounce duration for the `blink` method.
 *
 * @since 0.1.0
 */

var BLINK_DEBOUNCE_DURATION = 30;
/**
 * The class for creating and controlling the caret element.
 *
 * @since 0.1.0
 */

var CustomCaret = /*#__PURE__*/function () {
  /**
   * The Caret constructor.
   *
   * @param Editor - An Editor instance.
   * @param id     - An ID for the caret.
   * @param parent - A parent element where the caret is appended.
   */
  function CustomCaret(Editor, id, parent) {
    var _this3 = this;

    this.Editor = Editor;
    this.caret = div([CLASS_CARET, CLASS_CARET + "--" + id], parent);
    this.blink = debounce(this.blink.bind(this), BLINK_DEBOUNCE_DURATION);
    Editor.event.on(EVENT_RESIZE, function () {
      if (_this3.position) {
        _this3.move(_this3.position);
      }
    });
  }
  /**
   * Moves the caret to the specified position.
   *
   * @param position - A position to set as [ row, col ].
   */


  var _proto3 = CustomCaret.prototype;

  _proto3.move = function move(position) {
    var Measure = this.Editor.Components.Measure;
    var rect = Measure.getOffset(position);
    styles(this.caret, {
      top: unit(rect.top),
      left: unit(rect.left + HORIZONTAL_OFFSET),
      animation: 'none'
    });
    this.blink();
    this.position = position;
  }
  /**
   * Displays the caret.
   */
  ;

  _proto3.show = function show() {
    addClass(this.caret, CLASS_ACTIVE);
  }
  /**
   * Hides the caret.
   */
  ;

  _proto3.hide = function hide() {
    removeClass(this.caret, CLASS_ACTIVE);
  }
  /**
   * Starts the blink animation by removing the `none` value from the `animation`.
   */
  ;

  _proto3.blink = function blink() {
    styles(this.caret, {
      animation: ''
    });
  };

  return CustomCaret;
}();
/**
 * The ID of the primary caret.
 *
 * @since 0.1.0
 */


var PRIMARY_CARET_ID = 'primary';
/**
 * The component for generating and handling carets.
 *
 * @since 0.1.0
 */

var Caret = /*#__PURE__*/function (_Component2) {
  _inheritsLoose(Caret, _Component2);

  function Caret() {
    var _this4;

    _this4 = _Component2.apply(this, arguments) || this;
    /**
     * Stores the all registered Caret instances.
     */

    _this4.carets = {};
    return _this4;
  }
  /**
   * Mounts the component.
   * Uses the native caret on IE and mobile devices.
   *
   * @internal
   *
   * @param elements - A collection of essential editor elements.
   */


  var _proto4 = Caret.prototype;

  _proto4.mount = function mount(elements) {
    _Component2.prototype.mount.call(this, elements);

    this.create();

    if (!isIE() && !isMobile()) {
      this.register(PRIMARY_CARET_ID);
      this.primary = this.get(PRIMARY_CARET_ID);
      this.listen();
    }
  }
  /**
   * Creates a wrapper element that contains carets.
   */
  ;

  _proto4.create = function create() {
    this.wrapper = div({
      "class": CLASS_CARETS,
      role: 'presentation',
      'aria-hidden': true
    }, this.elements.editor);
  }
  /**
   * Listens to some events.
   */
  ;

  _proto4.listen = function listen() {
    var _this5 = this;

    var editable = this.elements.editable;
    var primary = this.primary,
        Editor = this.Editor;
    this.bind(editable, 'focus', function () {
      if (!Editor.readOnly) {
        primary.show();
      }
    });
    this.bind(editable, 'blur', function () {
      primary.hide();
    });
    this.update = rafThrottle(this.update.bind(this), true);
    this.on(EVENT_READONLY, function (e, readOnly) {
      if (readOnly) {
        primary.hide();
      } else {
        if (Editor.isFocused()) {
          _this5.update();

          primary.show();
        }
      }
    });
    this.on(EVENT_SELECTED, this.onSelected, this);
    this.on(EVENT_SELECTING, this.update);
  }
  /**
   * Called when the selection state is changed.
   *
   * @param e         - An EventBusEvent object.
   * @param Selection - A Selection instance.
   */
  ;

  _proto4.onSelected = function onSelected(e, Selection) {
    if (!this.Editor.readOnly) {
      if (Selection.is(CHANGED, COLLAPSED, SELECTED)) {
        this.update();
      }
    }
  }
  /**
   * Updates the primary caret position on the animation frame.
   */
  ;

  _proto4.update = function update() {
    this.primary.move(this.Selection.get(false).end);
  }
  /**
   * Registers a new caret.
   *
   * @param id - The ID for the caret to register.
   *
   * @return The registered CustomCaret instance.
   */
  ;

  _proto4.register = function register(id) {
    var carets = this.carets;
    assert$1(!carets[id]);
    var caret = new CustomCaret(this.Editor, id, this.wrapper);
    carets[id] = caret;
    return caret;
  }
  /**
   * Returns the primary or the specific CustomCaret instance.
   *
   * @param id - Optional. A caret ID.
   *
   * @return A CustomCaret instance if available, or otherwise `undefined`.
   */
  ;

  _proto4.get = function get(id) {
    if (id === void 0) {
      id = PRIMARY_CARET_ID;
    }

    return this.carets[id];
  }
  /**
   * Returns the DOMRect object of the primary caret.
   *
   * @return A DOMRect object.
   */
  ;

  _createClass(Caret, [{
    key: "rect",
    get: function get() {
      return this.Selection.getRect(true);
    }
  }]);

  return Caret;
}(Component);
/**
 * Debounce duration for invoking the `scrollEnd()`.
 * This must not be less than the native scroll interval.
 *
 * @since 0.1.0
 */


var SCROLL_END_DEBOUNCE_DURATION = 60;
/**
 * The number of lines for margin.
 *
 * @since 0.1.0
 */

var MARGIN_LINES = 10;
/**
 * The class for handling line elements.
 *
 * @since 0.1.0
 */

var Chunk = /*#__PURE__*/function (_Component3) {
  _inheritsLoose(Chunk, _Component3);

  function Chunk() {
    var _this6;

    _this6 = _Component3.apply(this, arguments) || this;
    /**
     * Indicates what row corresponds with the first line element.
     * The number can be negative.
     *
     * @readonly
     */

    _this6.start = 0;
    /**
     * The number of margin lines before and after visible lines.
     * The total number of lines will be `margin * 2 + visibleLines`.
     *
     * @readonly
     */

    _this6.margin = MARGIN_LINES;
    /**
     * The current offset amount from the top of the scroller element in pixel.
     *
     * @readonly
     */

    _this6.offsetY = 0;
    /**
     * The anchor line data.
     */

    _this6.anchor = {};
    /**
     * The focus line data.
     */

    _this6.focus = {};
    /**
     * Holds the previous scroll position.
     */

    _this6.scrollTop = 0;
    return _this6;
  }
  /**
   * Initializes the component.
   *
   * @internal
   *
   * @param elements - A collection of essential editor elements.
   */


  var _proto5 = Chunk.prototype;

  _proto5.mount = function mount(elements) {
    _Component3.prototype.mount.call(this, elements);

    var scroller = elements.scroller;
    this.scroller = scroller;
    this.parent = elements.lines;
    this.scrollTop = window.pageYOffset + scroller.scrollTop;
    this.active = this.isVisible();
    this.onScrolled = debounce(this.onScrolled.bind(this), SCROLL_END_DEBOUNCE_DURATION);
    this.supply();
    this.remove();
    this.listen();
  }
  /**
   * Listens to some events.
   */
  ;

  _proto5.listen = function listen() {
    var _this7 = this;

    var onScroll = rafThrottle(this.onScroll.bind(this));
    this.bind(this.scroller, 'scroll', function () {
      onScroll(true);

      _this7.emit(EVENT_SCROLLER_SCROLL);
    });
    this.bind(window, 'scroll', function () {
      onScroll(false);

      _this7.emit(EVENT_WINDOW_SCROLL);
    });
    this.bind(window, 'scroll', rafThrottle(function () {
      _this7.active = _this7.isVisible();
      _this7.borderCache = null;
    }));
    this.on(EVENT_RESIZE, function () {
      _this7.borderCache = null;

      _this7.reposition();
    });
    this.on(EVENT_SCROLL_HEIGHT_CHANGED, function () {
      _this7.supply();

      _this7.borderCache = null;
    });
    this.on(EVENT_SELECTED, this.onSelected, this, 0);
    this.on(EVENT_SELECTING, function () {
      _this7.activate(true);

      if (_this7.focusChanged) {
        _this7.emitChangedEvent(true);
      }
    });
  }
  /**
   * Called whenever the selection state changes.
   *
   * @param e         - An EventBusEvent object.
   * @param Selection - A Selection instance.
   */
  ;

  _proto5.onSelected = function onSelected(e, Selection) {
    if (Selection.is(COLLAPSED, CHANGED)) {
      this.activate(true);
      this.activate(false);

      if (this.anchorChanged) {
        this.emitChangedEvent(false);
      }

      if (this.focusChanged) {
        this.emitChangedEvent(true);
      }
    }
  }
  /**
   * Called whenever the editor scrolls.
   * Be aware that the `scrollY` property is not supported in IE.
   *
   * @return byScroller - Indicates whether the editor is scrolled by the editor element itself or the window.
   */
  ;

  _proto5.onScroll = function onScroll(byScroller) {
    var top = window.pageYOffset + this.scroller.scrollTop;

    if (this.active) {
      var scrollTop = this.scrollTop;

      if (scrollTop < top) {
        this.moveDown();
      } else if (scrollTop > top) {
        this.moveUp();
      }

      this.emit(EVENT_SCROLL, true);
      this.onScrolled(byScroller);
    }

    this.scrollTop = top;
  }
  /**
   * Called the scroll likely ends.
   *
   * @return byScroller - Indicates whether the editor is scrolled by the editor element itself or the window.
   */
  ;

  _proto5.onScrolled = function onScrolled(byScroller) {
    this.emit(EVENT_SCROLLED, byScroller);
  }
  /**
   * Activates the anchor or focus line.
   * - If the selection is collapsed outside of the view,
   *   the anchor and focus lines are merged into a single boundary line.
   * - If the line is not available but there is a boundary,
   *   that means the boundary has been added manually by the Selection component.
   *
   * @param focus - Determines whether to activate focus or anchor line.
   */
  ;

  _proto5.activate = function activate(focus) {
    var className = focus ? CLASS_FOCUS : CLASS_ANCHOR;
    var row = this.Selection.get(false)[focus ? 'end' : 'start'][0];
    var boundary = this.getBoundary(focus);
    var line = this.getLine(row);

    if (!line) {
      var anotherBoundary = this.getBoundary(!focus);

      if (anotherBoundary.row === row) {
        line = anotherBoundary.line;
      }
    }

    if (line) {
      if (boundary.row !== row) {
        this.deactivate(focus);
        addClass(line, className);
        assign$1(boundary, {
          line: line,
          row: row
        });
        this.setBoundaryChanged(focus, true);
      }
    }
  }
  /**
   * Deactivates the anchor or focus line if it is changed.
   *
   * @param focus - Determines whether to deactivate focus or anchor line.
   */
  ;

  _proto5.deactivate = function deactivate(focus) {
    var boundary = this.getBoundary(focus);
    var line = boundary.line;

    if (line) {
      if (hasClass(line, CLASS_PRESERVED) && !hasClass(line, focus ? CLASS_ANCHOR : CLASS_FOCUS)) {
        _remove(line);
      } else {
        removeClass(line, focus ? CLASS_FOCUS : CLASS_ANCHOR);
      }

      boundary.line = null;
      boundary.row = null;
    }
  }
  /**
   * Emits the `changed` event for an anchor or focus line.
   *
   * @param focus - Determines whether to emit the event for the focus or anchor line.
   */
  ;

  _proto5.emitChangedEvent = function emitChangedEvent(focus) {
    var boundary = this.getBoundary(focus);
    assert$1(boundary.line);
    this.emit(focus ? EVENT_FOCUS_LINE_CHANGED : EVENT_ANCHOR_LINE_CHANGED, boundary.line, boundary.row);

    if (focus) {
      this.focusChanged = false;
    } else {
      this.anchorChanged = false;
    }
  }
  /**
   * Sets the `anchorChanged` or `focusChanged` property.
   *
   * @param focus   - Determines which property should be changed.
   * @param changed - The value for the property.
   */
  ;

  _proto5.setBoundaryChanged = function setBoundaryChanged(focus, changed) {
    if (focus) {
      this.focusChanged = changed;
    } else {
      this.anchorChanged = changed;
    }
  }
  /**
   * Supplies line elements so that they can fill the viewport.
   */
  ;

  _proto5.supply = function supply() {
    var _this$Measure = this.Measure,
        lineHeight = _this$Measure.lineHeight,
        scrollerRect = _this$Measure.scrollerRect;
    var maxHeight = min(scrollerRect.height, window.innerHeight);
    var visibleLines = ceil(maxHeight / lineHeight);
    var totalLength = visibleLines + this.margin * 2;

    if (visibleLines !== this.visibleLines) {
      var elms = this.elms;
      var length = elms.length;
      var diff = totalLength - length;

      if (diff > 0) {
        this.html(this.start + length, diff, 'beforeend');
        this.emit(EVENT_CHUNK_SUPPLIED, this, diff);
      }

      this.visibleLines = visibleLines;
    }
  }
  /**
   * Removes unnecessary lines.
   */
  ;

  _proto5.remove = function remove() {
    var elms = this.elms,
        length = this.length;

    if (elms.length > length) {
      _remove(elms.slice(length - elms.length));
    }
  }
  /**
   * Returns a HTML string of lines.
   *
   * @param start  - A start row index.
   * @param length - A number of lines.
   * @param where  - Optional. If provided, built HTML will be inserted to the parent by the `insertAdjacentHTML`.
   *
   * @return A built HTML.
   */
  ;

  _proto5.html = function html(start, length, where) {
    var html = '';

    for (var i = 0; i < length; i++) {
      var line = this.lines[start + i];
      html += tag(CLASS_LINE) + (line ? line.html : '') + '</div>';
    }

    if (where) {
      this.parent.insertAdjacentHTML(where, html);
    }

    return html;
  }
  /**
   * Moves down elements which are outside of the border.
   */
  ;

  _proto5.moveDown = function moveDown() {
    var lengthToMove = this.computeLengthToMoveDown();

    if (lengthToMove >= this.length) {
      this.jumpIntoView();
    } else if (lengthToMove > 0) {
      var lineHeight = this.Measure.lineHeight;
      this.offsetY += lineHeight * lengthToMove;

      if (this.start < 0) {
        this.offsetY = max(this.offsetY + this.start * lineHeight, 0);
      }

      var elms = this.elms;

      var _html = this.html(this.start + elms.length, lengthToMove);

      elms[elms.length - 1].insertAdjacentHTML('afterend', _html);

      _remove(this.detach(0, lengthToMove));

      this.start += lengthToMove;
      this.attach();
      this.offset();
      this.emit(EVENT_CHUNK_MOVED, this);
    }
  }
  /**
   * Moves up elements which are outside of the border.
   */
  ;

  _proto5.moveUp = function moveUp() {
    var lengthToMove = this.computeLengthToMoveUp();

    if (lengthToMove >= this.length) {
      this.jumpIntoView();
    } else if (lengthToMove > 0) {
      var lineHeight = this.Measure.lineHeight;

      _remove(this.detach(-lengthToMove));

      var elms = this.elms;

      var _html2 = this.html(this.start - lengthToMove, lengthToMove);

      elms[0].insertAdjacentHTML('beforebegin', _html2);
      this.start -= lengthToMove;
      this.offsetY = max(this.offsetY - lineHeight * lengthToMove, 0);
      this.attach();
      this.offset();
      this.emit(EVENT_CHUNK_MOVED, this);
    }
  }
  /**
   * Computes the number of lines to move down.
   *
   * @return A number of lines to move down.
   */
  ;

  _proto5.computeLengthToMoveDown = function computeLengthToMoveDown() {
    if (this.end < this.lines.length) {
      var lineHeight = this.Measure.lineHeight,
          margin = this.margin;

      var _rect = rect(this.parent),
          top = _rect.top;

      var border = this.border[0];

      if (top + lineHeight * margin < border) {
        return floor((border - top) / lineHeight);
      }
    }

    return 0;
  }
  /**
   * Computes the number of lines to move up.
   *
   * @return A number of lines to move up.
   */
  ;

  _proto5.computeLengthToMoveUp = function computeLengthToMoveUp() {
    if (this.start > 0) {
      var _this$Measure2 = this.Measure,
          lineHeight = _this$Measure2.lineHeight,
          paddingBottom = _this$Measure2.padding.bottom,
          margin = this.margin;

      var _rect2 = rect(this.parent),
          top = _rect2.top,
          bottom = _rect2.bottom;

      var _this$border = this.border,
          topBorder = _this$border[0],
          bottomBorder = _this$border[1];

      if (top > topBorder) {
        return margin + floor((top - topBorder) / lineHeight);
      }

      if (bottom - lineHeight * margin - paddingBottom > bottomBorder) {
        return floor((bottom - paddingBottom - bottomBorder) / lineHeight);
      }
    }

    return 0;
  }
  /**
   * Detaches lines in the specified lines from the chunk.
   * Both anchor and focus lines will be preserved, and others will be returned.
   *
   * @param start - A start index.
   * @param end   - An end index.
   *
   * @return An array with detached elements.
   */
  ;

  _proto5.detach = function detach(start, end) {
    return this.elms.slice(start, end).reduce(function (detached, elm) {
      var isAnchor = hasClass(elm, CLASS_ANCHOR);
      var isFocus = hasClass(elm, CLASS_FOCUS);

      if (isAnchor || isFocus) {
        addClass(elm, CLASS_PRESERVED);
        attr(elm, {
          'aria-hidden': true
        });
      } else {
        detached.push(elm);
      }

      return detached;
    }, []);
  }
  /**
   * Attaches detached anchor and focus lines to the chunk.
   * Do not move the anchor and focus lines to keep the native selection.
   */
  ;

  _proto5.attach = function attach() {
    var Selection = this.Selection,
        anchorLine = this.anchor.line,
        focusLine = this.focus.line;
    var anchor = Selection.anchor,
        focus = Selection.focus;
    var includesAnchor = this.includes(anchor[0]);
    var includesFocus = this.includes(focus[0]);
    var includesPreservedAnchor = includesAnchor && hasClass(anchorLine, CLASS_PRESERVED);
    var includesPreservedFocus = includesFocus && hasClass(focusLine, CLASS_PRESERVED);

    if (includesPreservedAnchor || includesPreservedFocus) {
      var anchorIndex = includesAnchor ? anchor[0] - this.start : -1;
      var focusIndex = includesFocus ? focus[0] - this.start : -1;
      var firstIndex = min(anchorIndex, focusIndex);
      var secondIndex = max(anchorIndex, focusIndex);
      var backward = Selection.isBackward();
      var firstElm, secondElm;

      if (firstIndex > -1) {
        firstElm = backward ? focusLine : anchorLine;
        secondElm = backward ? anchorLine : focusLine;
      } else {
        secondElm = includesAnchor ? anchorLine : focusLine;
      }

      var elms = this.elms;
      var topElms = firstElm ? elms.slice(0, firstIndex) : elms.slice(0, secondIndex);
      var middleElms = firstElm ? elms.slice(firstIndex + 1, secondIndex) : [];
      var bottomElms = elms.slice(secondIndex + 1);

      if (includesPreservedAnchor) {
        removeClass(anchorLine, CLASS_PRESERVED);
        attr(anchorLine, {
          'aria-hidden': null
        });

        _remove(elms[anchorIndex]);
      }

      if (includesPreservedFocus && anchorIndex !== focusIndex) {
        removeClass(focusLine, CLASS_PRESERVED);
        attr(focusLine, {
          'aria-hidden': null
        });

        _remove(elms[focusIndex]);
      }

      before$1(topElms, firstElm || secondElm);
      before$1(middleElms, secondElm);
      var _secondElm = secondElm,
          nextElementSibling = _secondElm.nextElementSibling;

      if (bottomElms.length && bottomElms[0] !== nextElementSibling) {
        before$1(bottomElms, nextElementSibling);
      }
    }
  }
  /**
   * Offsets the parent element to make it visible inside the viewport.
   *
   * @param offsetY - Optional. Amount of the offset. If empty, the current `offsetY` will be used.
   */
  ;

  _proto5.offset = function offset(offsetY) {
    if (offsetY === void 0) {
      offsetY = this.offsetY;
    }

    this.parent.style.top = offsetY + "px";
  }
  /**
   * Makes the chunk jump so that it is visible in the view.
   */
  ;

  _proto5.jumpIntoView = function jumpIntoView() {
    this.jump(this.Measure.closest(this.scroller.scrollTop));
  }
  /**
   * Repositions the chunk to the current scroll top position.
   */
  ;

  _proto5.reposition = function reposition() {
    var top = this.Measure.getTop(this.start);

    if (top !== this.offsetY) {
      var focusRow = this.focus.row;
      var includesFocus = this.includes(focusRow);
      this.jumpIntoView();

      if (includesFocus) {
        this.View.jump(focusRow);
      }
    }
  }
  /**
   * Checks if the part of the scroller element is vertically visible or not.
   * This method does not care the horizontal visibility.
   *
   * @return `true` if the scroller is visible, or otherwise `false`.
   */
  ;

  _proto5.isVisible = function isVisible() {
    var _rect3 = rect(this.scroller),
        top = _rect3.top,
        bottom = _rect3.bottom;

    var _window = window,
        innerHeight = _window.innerHeight;
    return between(top, 0, innerHeight) || between(bottom, 0, innerHeight) || top < 0 && bottom > innerHeight;
  }
  /**
   * Jumps to the specified row index.
   * Use `View#jump()` instead if you want to scroll to the specific line.
   *
   * @param row - A row to jump to.
   */
  ;

  _proto5.jump = function jump(row) {
    var Measure = this.Measure,
        length = this.length;
    var paddingTop = Measure.padding.top,
        lineHeight = Measure.lineHeight;
    var offsetRows = ceil(paddingTop / lineHeight);
    this.start = clamp(row - offsetRows, 0, max(this.lines.length - length + this.margin, 0));
    this.offsetY = Measure.getTop(this.start);
    var elms = this.detach(0);
    elms[0].insertAdjacentHTML('afterend', this.html(this.start, length));

    _remove(elms);

    this.offset();
    this.attach();
    this.emit(EVENT_CHUNK_MOVED, this);
  }
  /**
   * Returns the focus or anchor boundary data object which contains the line element and the row index.
   *
   * @param focus - Determines whether to return the focus or anchor boundary data.
   *
   * @return The boundary data object.
   */
  ;

  _proto5.getBoundary = function getBoundary(focus) {
    return focus ? this.focus : this.anchor;
  }
  /**
   * Manually adds preserved line.
   * This method should be only used by the Selection component.
   * Note that the `changed` event will be emitted by the `activate` method.
   *
   * @internal
   *
   * @param focus - Determines whether to add a focus or anchor line.
   * @param row   - A row index.
   *
   * @return A created preserved line element.
   */
  ;

  _proto5.addPreservedLine = function addPreservedLine(focus, row) {
    var parent = this.parent;
    var classes = CLASS_LINE + " " + (focus ? CLASS_FOCUS : CLASS_ANCHOR) + " " + CLASS_PRESERVED;
    var line = div({
      "class": classes,
      'aria-hidden': true
    });
    this.deactivate(focus);
    html$2(line, this.lines[row].html);

    if (row < this.start) {
      prepend(parent, line);
    } else {
      _append(parent, line);
    }

    assign$1(this.getBoundary(focus), {
      line: line,
      row: row
    });
    this.setBoundaryChanged(focus, true);
    return line;
  }
  /**
   * Updates HTML of elements with the latest HTML of lines.
   * If omitting elements, updates all elements in the chunk.
   *
   * @param elms  - Optional. Elements to update.
   * @param start - Optional. A start index that corresponds with the first element.
   */
  ;

  _proto5.sync = function sync(elms, start) {
    if (elms === void 0) {
      elms = this.elms;
    }

    if (start === void 0) {
      start = this.start;
    }

    for (var i = 0; i < elms.length; i++) {
      var line = this.lines[i + start];
      html$2(elms[i], line ? line.html : '');
    }
  }
  /**
   * Syncs difference of the number of lines before syncing each HTML for performance.
   * If the `diff` length is greater than the `margin`, this method does nothing.
   *
   * @param row  - A row index.
   * @param diff - Difference of the number of lines before and after editing.
   */
  ;

  _proto5.syncDiff = function syncDiff(row, diff) {
    if (abs(diff) < MARGIN_LINES) {
      var _index = row - this.start;

      var elms = this.elms;

      if (diff > 0) {
        if (elms[_index]) {
          before$1(elms.slice(-diff), elms[_index].nextElementSibling);
        }
      } else if (diff < 0) {
        _append(this.parent, elms.slice(_index + 1, _index + 1 - diff));
      }
    }
  }
  /**
   * Refreshes the chunk.
   */
  ;

  _proto5.refresh = function refresh() {
    this.moveDown();
    this.moveUp();
  }
  /**
   * Scrolls to the specified top position
   * and manually calls the `onScroll` handler for succeeding synchronous processes.
   *
   * @internal
   *
   * @param scrollTop - A scroll position.
   */
  ;

  _proto5.scroll = function scroll(scrollTop) {
    this.scroller.scrollTop = scrollTop;
    this.onScroll(true);
  }
  /**
   * Returns the row index which the provided line element corresponds with.
   *
   * @param elm - A line element.
   *
   * @return The row index of the line element if available, or otherwise `-1`.
   */
  ;

  _proto5.getRow = function getRow(elm) {
    var row = this.elms.indexOf(elm);
    return row > -1 ? row + this.start : -1;
  }
  /**
   * Returns the line at the specified row if available.
   *
   * @param row - A row index.
   *
   * @return A line element if available, or `undefined` if not.
   */
  ;

  _proto5.getLine = function getLine(row) {
    return this.elms[row - this.start];
  }
  /**
   * Checks if the chunk includes the specified row or not.
   *
   * @param row - A row index.
   *
   * @return `true` if the chunk includes the row, or otherwise `false`.
   */
  ;

  _proto5.includes = function includes(row) {
    return between(row, this.start, this.end);
  }
  /**
   * Returns the end index of the chunk lines.
   * This may be greater than the actual total number of lines.
   *
   * @return An end index of the chunk.
   */
  ;

  _createClass(Chunk, [{
    key: "end",
    get: function get() {
      return this.start + this.length - 1;
    }
    /**
     * Returns the number of chunk lines without preserved ones.
     *
     * @return A number of line elements in the chunk.
     */

  }, {
    key: "length",
    get: function get() {
      return this.visibleLines + this.margin * 2;
    }
    /**
     * Returns chunk lines without preserved ones.
     *
     * @return An array containing line elements in the chunk.
     */

  }, {
    key: "elms",
    get: function get() {
      return slice(queryAll(this.parent, "." + CLASS_LINE + ":not(." + CLASS_PRESERVED + ")"));
    }
    /**
     * Returns borders to move elements up or down.
     *
     * @return A tuple containing top and bottom borders.
     */

  }, {
    key: "border",
    get: function get() {
      if (!this.borderCache) {
        var domRect = rect(this.scroller);
        var top = max(domRect.top, 0);
        var bottom = min(domRect.bottom, window.innerHeight);
        this.borderCache = [top, bottom];
      }

      return this.borderCache;
    }
  }]);

  return Chunk;
}(Component);
/**
 * The line break character.
 *
 * @private
 * @since 0.1.0
 */


var LINE_BREAK$1 = '\n';
/**
 * The abstract class for implementing an ArrayLike class.
 *
 * @since 0.1.0
 *
 * @typeParam T - A type for each element.
 */

var AbstractArrayLike = /*#__PURE__*/function () {
  function AbstractArrayLike() {
    /**
     * The length of elements.
     */
    this.length = 0;
  }
  /**
   * Implements the `push` method by using native method.
   *
   * @param items - Items to push.
   */


  var _proto6 = AbstractArrayLike.prototype;

  _proto6.push = function push() {
    for (var _len8 = arguments.length, items = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
      items[_key8] = arguments[_key8];
    }

    arrayProto.push.apply(this, items);
  }
  /**
   * Implements the `splice` method by using native method.
   *
   * @param start       - A start index.
   * @param deleteCount - The number of items to delete from the start index.
   * @param items       - New items to insert at the start index.
   */
  ;

  _proto6.splice = function splice(start, deleteCount) {
    for (var _len9 = arguments.length, items = new Array(_len9 > 2 ? _len9 - 2 : 0), _key9 = 2; _key9 < _len9; _key9++) {
      items[_key9 - 2] = arguments[_key9];
    }

    _splice.apply(void 0, [this, start, deleteCount].concat(items));
  }
  /**
   * Clears elements.
   */
  ;

  _proto6.clear = function clear() {
    _splice(this, 0, this.length);
  };

  return AbstractArrayLike;
}();
/**
 * Checks if the token matches the provided matcher or not.
 *
 * @param token   - A token to test.
 * @param matcher - An array described as a TokenMatcher tuple.
 */


function matchesToken(token, matcher) {
  if (token && token[0] === matcher[0] && (!matcher[1] || matcher[1].test(token[1]))) {
    return isUndefined$1(matcher[2]) || token[2].state === matcher[2];
  }

  return false;
}
/*!
 * RyuseiLight.js
 * Version  : 1.2.0
 * License  : MIT
 * Copyright: 2020 Naotoshi Fujita
 */

/**
 * The line break character.
 *
 * @private
 * @since 0.0.1
 */


var LINE_BREAK = '\n';
var CATEGORY_KEYWORD = 'keyword';
var CATEGORY_COMMENT = 'comment';
var CATEGORY_TAG = 'tag';
var CATEGORY_TAG_CLOSE = 'tag.close';
var CATEGORY_SELECTOR = 'selector';
var CATEGORY_ATRULE = 'atrule';
var CATEGORY_ATTRIBUTE = 'attr';
var CATEGORY_PROPERTY = 'prop';
var CATEGORY_VALUE = 'value';
var CATEGORY_VARIABLE = 'variable';
var CATEGORY_ENTITY = 'entity';
var CATEGORY_CDATA = 'cdata';
var CATEGORY_PROLOG = 'prolog';
var CATEGORY_IDENTIFIER = 'identifier';
var CATEGORY_STRING = 'string';
var CATEGORY_NUMBER = 'number';
var CATEGORY_BOOLEAN = 'boolean';
var CATEGORY_FUNCTION = 'function';
var CATEGORY_CLASS = 'class';
var CATEGORY_DECORATOR = 'decorator';
var CATEGORY_REGEXP = 'regexp';
var CATEGORY_OPERATOR = 'operator';
var CATEGORY_BRACKET = 'bracket';
var CATEGORY_DELIMITER = 'delimiter';
var CATEGORY_SPACE = 'space';
var CATEGORY_TEXT = 'text'; // Internal use only

var CATEGORY_LINEBREAK = 'lb';
/**
 * Checks if the given subject is an object or not.
 *
 * @param subject - A subject to check.
 *
 * @return `true` if the subject is an object, or otherwise `false`.
 */

function isObject(subject) {
  return subject !== null && typeof subject === 'object';
}
/**
 * Checks if the given subject is `undefined` or not.
 *
 * @param subject - A subject to check.
 *
 * @return `true` if the subject is `undefined`, or otherwise `false`.
 */


function isUndefined(subject) {
  return typeof subject === 'undefined';
}
/**
 * Iterates over the provided object by own enumerable keys with calling the iteratee function.
 *
 * @param object   - An object to iterate over.
 * @param iteratee - An iteratee function that takes the value and key as arguments.
 *
 * @return A provided object itself.
 */


function forOwn(object, iteratee) {
  if (object) {
    var keys = Object.keys(object);

    for (var i = 0; i < keys.length; i++) {
      iteratee(object[keys[i]], keys[i]);
    }
  }
}
/**
 * Assigns all own enumerable properties of all source objects to the provided object.
 * `undefined` in source objects will be skipped.
 *
 * @param object  - An object to assign properties to.
 * @param sources - Objects to assign properties from.
 *
 * @return An object assigned properties of the sources to.
 */


function assign(object) {
  for (var _len = arguments.length, sources = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    sources[_key - 1] = arguments[_key];
  }

  sources.forEach(function (source) {
    if (isObject(source)) {
      forOwn(source, function (value, key) {
        if (!isUndefined(source[key])) {
          object[key] = source[key];
        }
      });
    }
  });
  return object;
}
/**
 * Throws an error if the provided condition is falsy.
 *
 * @param condition - If falsy, an error is thrown.
 * @param message   - Optional. A message for the error.
 */


function assert(condition, message) {
  if (message === void 0) {
    message = '';
  }

  if (!condition) {
    throw new Error(message);
  }
}
/**
 * Finds the provided key from a map and returns its index.
 *
 * @param map - A map to search in.
 * @param key - A key to search for.
 *
 * @return An index if found, or `-1` otherwise.
 */


function find(map, key) {
  for (var i = 0; i < map.length; i++) {
    if (map[i][0] === key) {
      return i;
    }
  }

  return -1;
}
/**
 * Insert entries before the reference entry specified by the `ref`.
 * If the reference is not found, a new entry is created.
 *
 * @param map     - A map to insert values to.
 * @param ref     - A reference key.
 * @param entries - entries to insert.
 */


function before(map, ref, entries) {
  var index = find(map, ref);

  if (index > -1) {
    map.splice.apply(map, [index, 0].concat(entries));
  } else {
    map.push.apply(map, entries);
  }
}
/**
 * Checks if the string starts with the `char` or not.
 *
 * @param string - A string to check.
 * @param char   - A character.
 *
 * @return `true` if the string starts with the `char`, or otherwise `false`.
 */


function startsWith(string, _char) {
  return string.charAt(0) === _char;
}
/**
 * Checks if the RegExp supports the sticky flag or not.
 */


var isStickySupported = !isUndefined(/x/.sticky);
/**
 * The class for creating a simple lexer by a Language object.
 *
 * @since 0.0.1
 */

var Lexer$1 = /*#__PURE__*/function () {
  /**
   * The Lexer constructor.
   *
   * @param language - A Language object.
   */
  function Lexer(language) {
    this.language = language;
    this.init(language);
  }
  /**
   * Initializes the language object.
   *
   * @param language - A Language object to initialize.
   */


  var _proto = Lexer.prototype;

  _proto.init = function init(language) {
    var _this = this;

    forOwn(language.grammar, function (tokenizers, key) {
      language.grammar[key] = _this.merge(language, tokenizers);
    });
    forOwn(language.use, this.init.bind(this));
  }
  /**
   * Includes tokenizers required by `#` annotation and flatten them.
   *
   * @param language   - A language object.
   * @param tokenizers - Tokenizers.
   *
   * @return Merged tokenizers.
   */
  ;

  _proto.merge = function merge(language, tokenizers) {
    var merged = [];

    for (var i = 0; i < tokenizers.length; i++) {
      var tokenizer = tokenizers[i];
      var _tokenizers$i = tokenizers[i],
          category = _tokenizers$i[0],
          regexp = _tokenizers$i[1];

      if (startsWith(category, '#') && !regexp) {
        merged.push.apply(merged, this.merge(language, language.grammar[category.slice(1)]));
      } else {
        (function () {
          var flags = regexp.toString().match(/[gimsy]*$/)[0].replace(/[gy]/g, '');
          var source = regexp.source + (isStickySupported ? '' : '|()');
          forOwn(language.source, function (replacement, key) {
            source = source.replace(new RegExp("%" + key, 'g'), replacement.source);
          });
          tokenizer[1] = new RegExp(source, (isStickySupported ? 'y' : 'g') + flags);
          merged.push(tokenizer);
        })();
      }
    }

    return merged;
  }
  /**
   * Parses the text by the provided language and tokenizers.
   *
   * @param text       - A text to tokenize.
   * @param language   - A Language object.
   * @param tokenizers - An array with tokenizers.
   * @param state      - Optional. The current state name.
   *
   * @return An index of the text where the handling ends.
   */
  ;

  _proto.parse = function parse(text, language, tokenizers, state) {
    var index = 0;
    var position = 0;
    this.depth++;

    main: while (index < text.length && !this.aborted) {
      for (var i = 0; i < tokenizers.length; i++) {
        var tokenizer = tokenizers[i];
        var regexp = tokenizer[1],
            action = tokenizer[2];
        regexp.lastIndex = index;
        var match = regexp.exec(text);

        if (!match || !match[0]) {
          continue;
        }

        if (position < index) {
          this.push([CATEGORY_TEXT, text.slice(position, index)], language, state);
        }

        if (action === '@back') {
          position = index;
          break main;
        }

        var offset = this.handle(match, language, tokenizer, state);
        index += offset || 1;
        position = index;

        if (action === '@break') {
          break main;
        }

        continue main;
      }

      index++;
    }

    if (position < index) {
      this.push([CATEGORY_TEXT, text.slice(position)], language, state);
    }

    this.depth--;
    return index;
  }
  /**
   * Pushes the provided token to the lines array.
   *
   * @param token    - A token to push.
   * @param language - A Language object.
   * @param state    - A state name.
   */
  ;

  _proto.push = function push(token, language, state) {
    var depth = this.depth;
    var category = token[0],
        text = token[1];
    var start = this.index;
    var index = 0;
    var from = 0;

    while (index > -1 && !this.aborted) {
      index = text.indexOf(LINE_BREAK, from);
      var line = this.lines[this.index];
      var empty = from === index && !line.length;
      var code = empty ? LINE_BREAK : text.slice(from, index < 0 ? undefined : index);
      var info = {
        depth: depth,
        language: language.id,
        state: state
      };

      if (code) {
        if (category !== CATEGORY_TEXT) {
          info.head = index > -1 && !from;
          info.tail = index < 0 && !!from;
          info.split = index > -1 || !!from;
          info.distance = this.index - start;
        }

        line.push([category === CATEGORY_TEXT && empty ? CATEGORY_LINEBREAK : category, code, info]);
      }

      if (index > -1) {
        this.index++;
        this.aborted = this.limit && this.index >= this.limit;

        if (!this.aborted) {
          from = index + 1;
          this.lines[this.index] = [];
        }
      }
    }
  }
  /**
   * Handles the matched text.
   *
   * @param match     - A matched result.
   * @param language  - A Language object.
   * @param tokenizer - A tokenizer that has been matched with the text.
   * @param state     - A state name.
   *
   * @return An index of the text where the handling ends.
   */
  ;

  _proto.handle = function handle(match, language, tokenizer, state) {
    var category = tokenizer[0];

    if (!category) {
      return 0;
    }

    var text = match[0];

    if (tokenizer[3] === '@debug') {
      // eslint-disable-next-line
      console.log(text, tokenizer);
    }

    if (startsWith(category, '@')) {
      assert(language.use);
      var lang = language.use[category.slice(1)];
      assert(lang);
      return this.parse(text, lang, lang.grammar.main, category);
    }

    if (startsWith(category, '#')) {
      var tokenizers = language.grammar[category.slice(1)];
      assert(tokenizers);

      if (tokenizer[2] === '@rest') {
        text = match.input.slice(match.index);
      }

      return this.parse(text, language, tokenizers, category);
    }

    this.push([category, text], language, state);
    return text.length;
  }
  /**
   * Tokenizes the text by the current language.
   *
   * @param text  - A text to tokenize.
   * @param limit - Optional. Limits the number of lines.
   *
   * @return An array with tokens.
   */
  ;

  _proto.tokenize = function tokenize(text, limit) {
    this.lines = [[]];
    this.index = 0;
    this.depth = -1;
    this.limit = limit || 0;
    this.aborted = false;
    this.parse(text, this.language, this.language.grammar.main, '#main');
    return this.lines;
  };

  return Lexer;
}();

var REGEXP_NUMBER = /[+-]?(\d+\.?\d*|\d*\.?\d+)([eE][+-]?\d+)?/;
var REGEXP_BOOLEAN = /\b(?:true|false)\b/;
var REGEXP_BRACKET = /[[\]{}()]/;
var REGEXP_SPACE = /[ \t]+/;
var REGEXP_QUOTE = /'(?:\\'|.)*?'/;
var REGEXP_DOUBLE_QUOTE = /"(?:\\"|.)*?"/;
var REGEXP_MULTILINE_COMMENT = /\/\*[\s\S]*?(\*\/|$)/;
var REGEXP_SLASH_COMMENT = /\/\/.*/;
var REGEXP_GENERAL_KEYWORDS = /\b(?:break|catch|class|continue|do|else|extends|finally|for|function|if|implements|in|instanceof|interface|new|null|return|throw|try|while)\b/;
/**
 * Returns the CSS language definition.
 *
 * @return A Language object.
 */

function css$1() {
  return {
    id: 'css',
    name: 'CSS',
    grammar: {
      main: [['#common'], // An atrule without a block
      ['#findSingleAtrule'], // Blocks including atrules
      ['#findBlock']],
      findBlock: [['#block', /(?:(?![\t\n\r ;\{\}])[\s\S])(?:(?![;\{\}])[\s\S])*\{[\s\S]*?\}/, '@rest']],
      findSingleAtrule: [['#atrule', /@(?:(?![;\{])[\s\S])+?;/]],
      // Finds atrules before { and ;
      findAtrule: [['#atrule', /@(?:(?![;\{])[\s\S])*?(?=[;\{])/]],
      // May not start with digits
      findSelector: [['#selector', /(?:(?![\t\n\r ;\{\}])[\s\S])[\s\S]*?(?=\{)/]],
      common: [[CATEGORY_STRING, /(["'])[\s\S]*?(?:(?!\\)[\s\S])\1/], [CATEGORY_COMMENT, REGEXP_MULTILINE_COMMENT], [CATEGORY_SPACE, REGEXP_SPACE]],
      block: [['#inner', /{/, '@rest'], [CATEGORY_BRACKET, /}/, '@break'], ['#findAtrule'], ['#findSelector'], [CATEGORY_SPACE, REGEXP_SPACE]],
      inner: [[CATEGORY_BRACKET, /{/], ['#common'], ['#findBlock'], ['#props'], ['#findAtrule'], ['', /}/, '@back']],
      atrule: [['#common'], ['#url', /\burl\(/, '@rest'], [CATEGORY_SPACE, REGEXP_SPACE], [CATEGORY_ATRULE, /[^\s();]+/], [CATEGORY_DELIMITER, /[:;,]/], ['#paren', /\(/, '@rest']],
      paren: [[CATEGORY_BRACKET, /^\(/], ['#common'], ['#paren', /\(/, '@rest'], [CATEGORY_BRACKET, /\)/, '@break'], ['#props']],
      selector: [['#common'], [CATEGORY_OPERATOR, /[>+~]/], [CATEGORY_BRACKET, /[[\]()]/], [CATEGORY_DELIMITER, /=/], [CATEGORY_SELECTOR, /::?\S+/], [CATEGORY_SELECTOR, /[\W\d]\S+/], [CATEGORY_TAG, /\b[a-z]+|\*/i], [CATEGORY_SELECTOR, /\S+/]],
      url: [['#common'], [CATEGORY_FUNCTION, /^url/], [CATEGORY_BRACKET, /\(/], [CATEGORY_STRING, /[^)]+/], [CATEGORY_BRACKET, /\)/, '@break']],
      props: [[CATEGORY_PROPERTY, /[a-z0-9-_\xA0-\uFFFF]+(?=:)/i], ['#url', /\burl\(/, '@rest'], [CATEGORY_FUNCTION, /\b[\w-]+(?=\()\b/], [CATEGORY_KEYWORD, /!important|\b(?:initial|inherit|unset)/], [CATEGORY_PROPERTY, /[a-z0-9-]+(?=:)/], [CATEGORY_NUMBER, /#([0-9a-f]{6}|[0-9a-f]{3})/i], [CATEGORY_NUMBER, /\bU\+[0-9a-f?-]+/i], [CATEGORY_NUMBER, /[+-]?(\d+\.?\d*|\d*\.?\d+)/], [CATEGORY_DELIMITER, /[:;,]/], ['#paren', /\(/, '@rest'], [CATEGORY_BRACKET, /[[\])]/], [CATEGORY_SPACE, REGEXP_SPACE]]
    }
  };
}
/**
 * Returns the JavaScript language definition.
 *
 * @return A Language object.
 */


function javascript$1() {
  return {
    id: 'javascript',
    name: 'JavaScript',
    alias: ['js'],
    source: {
      func: /[_$a-z\xA0-\uFFFF][_$a-z0-9\xA0-\uFFFF]*/
    },
    grammar: {
      main: [[CATEGORY_STRING, REGEXP_QUOTE], [CATEGORY_STRING, REGEXP_DOUBLE_QUOTE], ['#backtick', /`/, '@rest'], [CATEGORY_COMMENT, REGEXP_MULTILINE_COMMENT], [CATEGORY_COMMENT, REGEXP_SLASH_COMMENT], [CATEGORY_REGEXP, /\/(\[.*?]|\\\/|.)+?\/[gimsuy]*/], [CATEGORY_KEYWORD, REGEXP_GENERAL_KEYWORDS], [CATEGORY_KEYWORD, /\b(?:as|async|await|case|catch|const|debugger|default|delete|enum|export|from|import|let|package|private|protected|public|super|switch|static|this|typeof|undefined|var|void|with|yield)\b/], [CATEGORY_KEYWORD, /\b((get|set)(?=\s+%func))/i], [CATEGORY_CLASS, /\b[A-Z][\w$]*\b/], [CATEGORY_FUNCTION, /%func(?=\s*\()/i], [CATEGORY_BOOLEAN, REGEXP_BOOLEAN], [CATEGORY_DECORATOR, /@[^\s(@]+/], [CATEGORY_IDENTIFIER, /\b[a-z_$][\w$]*\b/], [CATEGORY_NUMBER, REGEXP_NUMBER], [CATEGORY_OPERATOR, /=>/], [CATEGORY_OPERATOR, /\+[+=]?|-[-=]?|\*\*?=?|[/%^]=?|&&?=?|\|\|?=?|\?\??=?|<<?=?|>>>=?|>>?=?|[!=]=?=?|[~:^]/], [CATEGORY_BRACKET, REGEXP_BRACKET], [CATEGORY_DELIMITER, /[;.,]+/], [CATEGORY_SPACE, REGEXP_SPACE]],
      backtick: [[CATEGORY_STRING, /^`/], [CATEGORY_STRING, /(\$[^{]|\\[$`]|[^`$])+/], ['#expression', /\${/, '@rest'], [CATEGORY_STRING, /`/, '@break']],
      expression: [[CATEGORY_DELIMITER, /^\${/], [CATEGORY_DELIMITER, /}/, '@break'], ['#main']]
    }
  };
}
/**
 * Returns the HTML language definition.
 *
 * @param options - Optional. Options.
 *
 * @return A Language object.
 */


function html$1(options) {
  if (options === void 0) {
    options = {};
  }

  var script = (options.script || javascript$1)();
  var style = (options.style || css$1)();
  var cdata = [CATEGORY_CDATA, /<!\[CDATA\[[\s\S]*\]\]>/i]; // Embedded scripts or styles may contain CDATA sections.

  script.grammar.main.unshift(cdata);
  style.grammar.main.unshift(cdata);
  return {
    id: 'html',
    alias: ['markup'],
    name: 'HTML',
    use: {
      script: script,
      style: style
    },
    grammar: {
      main: [[CATEGORY_COMMENT, /<!\x2D\x2D[\s\S]*?\x2D\x2D>/], [CATEGORY_PROLOG, /<!DOCTYPE[\s\S]*?>/i], cdata, ['#script', /<script[\s\S]*?>[\s\S]*?<\/script>/], ['#style', /<style[\s\S]*?>[\s\S]*?<\/style>/], ['#tag', /<[\s\S]*?>/], [CATEGORY_ENTITY, /&[\da-z]+;|&#\d+;/i], [CATEGORY_SPACE, REGEXP_SPACE]],
      script: [['#tag', /^<script[\s\S]*?>/], cdata, ['@script', /[\s\S]+(?=<\/script>)/], ['#tag', /<\/script>/]],
      style: [['#tag', /^<style[\s\S]*?>/], ['@style', /[\s\S]+(?=<\/style>)/], ['#tag', /<\/style>/]],
      tag: [['#closeTag', /<\/.+>/], ['#tagContent']],
      closeTag: [[CATEGORY_TAG_CLOSE, /[^\s/<>"'=]+/], ['#tagContent']],
      tagContent: [['#attr', /[\t\n\r ]+[\s\S]+(?=[\t\n\r \/>])/], [CATEGORY_TAG, /[^\s/<>"'=]+/], [CATEGORY_BRACKET, /[<>]/], [CATEGORY_DELIMITER, /[/]/]],
      attr: [[CATEGORY_SPACE, REGEXP_SPACE], [CATEGORY_VALUE, /(['"])(\\\1|.)*?\1/], [CATEGORY_DELIMITER, /[/=]/], [CATEGORY_ATTRIBUTE, /[^\s/>"'=]+/]]
    }
  };
}
/**
 * Returns the JSON language definition.
 *
 * @link https://www.json.org/json-en.html
 *
 * @return A Language object.
 */


function json$1() {
  return {
    id: 'json',
    name: 'JSON',
    grammar: {
      main: [[CATEGORY_PROPERTY, /".*?[^\\]"(?=:)/], [CATEGORY_STRING, REGEXP_DOUBLE_QUOTE], [CATEGORY_KEYWORD, /\bnull\b/], [CATEGORY_NUMBER, /[+-]?(\d+\.?\d*)([eE][+-]?\d+)?/], [CATEGORY_BRACKET, /[{}[\]]/], [CATEGORY_BOOLEAN, REGEXP_BOOLEAN], [CATEGORY_OPERATOR, /:/], [CATEGORY_DELIMITER, /,/], [CATEGORY_SPACE, REGEXP_SPACE]]
    }
  };
}
/**
 * Returns the JSX language definition.
 *
 * @return A Language object.
 */


function jsx$1(options) {
  if (options === void 0) {
    options = {};
  }

  var language = assign((options.base || javascript$1)(), {
    id: 'jsx',
    name: 'JSX',
    alias: ['react']
  });
  var grammar = language.grammar;
  before(grammar.main, CATEGORY_CLASS, [['#findPairedTag'], ['#findSelfClosedTag']]);
  assign(grammar, {
    // This doesn't pick correct paired tags if nested, but they are incrementally searched later.
    findPairedTag: [['#pairedTag', /(?:<[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]*?([0-9A-Z_a-z]+)[\s\S]*?>[\s\S]*?<\/\1>)|<[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]*?>[\s\S]*?<\/>/, '@rest']],
    // Should not match the closing delimiter inside `{}`, `''` and `""`.
    findSelfClosedTag: [['#selfClosedTag', /<(?:\{[\s\S]*?\}|(["'])[\s\S]*?\1|(?:(?!>)[\s\S]))+?\/>/]],
    findBracket: [['#code', /{/, '@rest']],
    pairedTag: [['#openTag', /^</, '@rest'], ['#findBracket'], ['#findPairedTag'], ['#findSelfClosedTag'], ['#tagName', /<\/([\w][^\s]*?)?>/, '@break'], [CATEGORY_SPACE, REGEXP_SPACE]],
    code: [[CATEGORY_BRACKET, /^{/], [CATEGORY_BRACKET, /}/, '@break'], ['#findBracket'], ['#main']],
    selfClosedTag: [['#openTag', /^</, '@rest']],
    openTag: [['#tagName', /<\s*[^\s/>"'=]*/], ['#findBracket'], [CATEGORY_ATTRIBUTE, /[^\s/>"'=]+/], [CATEGORY_VALUE, /(['"])(\\\1|.)*?\1/], [CATEGORY_SPACE, REGEXP_SPACE], [CATEGORY_DELIMITER, /[/=]/], [CATEGORY_BRACKET, />/, '@break']],
    tagName: [[CATEGORY_BRACKET, /[<>]/], [CATEGORY_SPACE, REGEXP_SPACE], [CATEGORY_DELIMITER, /\//], [CATEGORY_CLASS, /[A-Z][\w$-]*/], [CATEGORY_TAG, /[^\s/>"'=]+/]]
  });
  return language;
}
/**
 * Returns the None language definition.
 *
 * @return A Language object.
 */


function none$1() {
  return {
    id: 'none',
    name: '',
    grammar: {
      main: []
    }
  };
}
/**
 * Returns the SCSS language definition.
 *
 * @return A Language object.
 */


function scss$1() {
  var language = assign(css$1(), {
    id: 'scss',
    name: 'SCSS'
  });
  var grammar = language.grammar;
  assign(grammar, {
    findBlock: [
    /**
     * Include: div {}, .class {}, #id {}, * {}, *{}, #{ $variable } {}, .something__#{ $variable } {}
     * Exclude: #{ variable }: value
     */
    ['#block', /([\*-_a-z]|#\{(?:(?!;)[\s\S])*?\}|((#\{(?:(?!;)[\s\S])*?\}|(?:(?![\t-\r ;\{\}\xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF])[\s\S]))(#\{(?:(?!;)[\s\S])*?\}|(?:(?![#;\{\}])[\s\S])|#(?:(?!\{)[\s\S]))+?))(?!#)\{[\s\S]*?\}/i, '@rest']],
    // May contain #{} interpolation
    findSingleAtrule: [['#atrule', /@(#\{|(?:(?![;\{])[\s\S]))+?;/]],
    findAtrule: [['#atrule', /@(#\{|(?:(?![;\{])[\s\S]))*?(?=[;\{])/]],
    // May contain #{} interpolation
    findSelector: [['#selector', /(?:(?!;)[\s\S])*?(?:(?!#)[\s\S])(?=\{)/, '']],
    findInterp: [['#interp', /#{/, '@rest']],
    common: [['#string'], [CATEGORY_COMMENT, REGEXP_MULTILINE_COMMENT], [CATEGORY_COMMENT, REGEXP_SLASH_COMMENT], [CATEGORY_DELIMITER, /;/], [CATEGORY_SPACE, REGEXP_SPACE]],
    string: [['#singleQuote', /'/, '@rest'], ['#doubleQuote', /"/, '@rest']],
    singleQuote: [[CATEGORY_STRING, /^'/], ['#findInterp'], [CATEGORY_STRING, /(\\'|#[^{]|[^'#])+/], [CATEGORY_STRING, /'/, '@break']],
    doubleQuote: [[CATEGORY_STRING, /^"/], ['#findInterp'], [CATEGORY_STRING, /(\\"|#[^{]|[^"#])+/], [CATEGORY_STRING, /"/, '@break']],
    selector: [['#common'], ['#findInterp'], [CATEGORY_OPERATOR, /[>+~]/], [CATEGORY_BRACKET, /[[\]()]/], [CATEGORY_DELIMITER, /=/], [CATEGORY_SELECTOR, /::?\S+(?=#{)/], [CATEGORY_SELECTOR, /[\W\d]\S+(?=#{)/], [CATEGORY_TAG, /\b[a-zA-Z]+\b|\*/], [CATEGORY_SELECTOR, /([^#\s]|#[^{\s])+/]],
    url: [['#common'], ['#findInterp'], [CATEGORY_FUNCTION, /^url/], [CATEGORY_BRACKET, /\(/], [CATEGORY_STRING, /[^)]+(?=#{)/], [CATEGORY_STRING, /[^)]+/], [CATEGORY_BRACKET, /\)/, '@break']],
    interp: [[CATEGORY_DELIMITER, /#{/], [CATEGORY_DELIMITER, /}/, '@break'], ['#common'], ['#props']]
  });
  grammar.inner.unshift(['#findInterp']);
  before(grammar.atrule, '#url', [['#findInterp']]);
  before(grammar.props, CATEGORY_PROPERTY, [['#findInterp'], [CATEGORY_VARIABLE, /\$[\w-_]+/]]);
  return language;
}
/**
 * Returns the XML language definition.
 *
 * @return A Language object.
 */


function xml$1() {
  var language = assign(html$1(), {
    id: 'xml',
    name: 'XML',
    alias: []
  });
  language.grammar.main.unshift([CATEGORY_PROLOG, /<\?[\s\S]*?\?>/]);
  return language;
}
/**
 * Returns the Typescript language definition.
 *
 * @return A Language object.
 */


function typescript$1() {
  var language = assign(javascript$1(), {
    id: 'typescript',
    name: 'TypeScript',
    alias: ['ts']
  });
  var grammar = language.grammar;
  var main = grammar.main;
  before(main, CATEGORY_KEYWORD, [[CATEGORY_KEYWORD, /\b(?:declare|keyof|namespace|readonly|type|string|number|boolean|bigint|symbol|object|any|never|unknown|infer|is)\b/]]);
  before(main, CATEGORY_FUNCTION, [['#functions', /([_$a-z\xA0-\uFFFF][_$a-z0-9\xA0-\uFFFF]*)?(?:<[^>]+?>)?\s*?\(/]]);
  assign(grammar, {
    functions: [[CATEGORY_FUNCTION, /^[\w$]+/]].concat(main.filter(function (tokenizer) {
      return tokenizer[0] !== '#functions';
    }))
  });
  return language;
}
/**
 * Returns the VUE language definition.
 *
 * @return A Language object.
 */


function vue$1(options) {
  if (options === void 0) {
    options = {};
  }

  var language = assign(html$1(options), {
    id: 'vue',
    name: 'Vue',
    alias: []
  }); // Vue uses Mustache syntax for writing code inside tags.

  language.grammar.main.push(['@script', /{{[\s\S]*?}}/]);
  return language;
} // export { common }     from './common/common';

/**
 * Determines what HTML should be inserted to empty lines.
 * Be aware that changing this character may break the selection.
 *
 * @since 0.1.0
 */


var EMPTY_LINE_HTML = '<br>';
/**
 * The class for managing data of each line.
 *
 * @since 0.1.0
 */

var Line = /*#__PURE__*/function () {
  /**
   * The Line constructor.
   *
   * @param options - Options.
   */
  function Line(options) {
    /**
     * Holds the last update time.
     */
    this.time = 0;
    /**
     * Holds the depth of the first token.
     */

    this.depth = 0;
    /**
     * Holds tokens.
     */

    this.tokens = [];
    /**
     * Depth of tabs.
     */

    this.indentDepth = 0;
    this.options = options;
  }
  /**
   * Initializes some properties.
   */


  var _proto7 = Line.prototype;

  _proto7.init = function init() {
    var first = this.first;
    var info = first && first[2] || {};
    this.depth = info.depth || 0;
    this.language = info.language || '';
    this.split = info.split;
    this.indentDepth = count(this.getIndent(), this.options.indent);
    this.htmlCache = undefined;
    this.textCache = undefined;
  }
  /**
   * Sets new tokens and initializes properties.
   * To avoid updating tokens by the old value made by async processes,
   * pass the update time with `Date.now()`.
   *
   * @param tokens - An array with tokens.
   * @param time   - Optional. If this time is older than the current time, tokens will not be updated.
   */
  ;

  _proto7.set = function set(tokens, time) {
    if (!time || time > this.time) {
      this.tokens = tokens;
      this.time = time || Date.now();
      this.init();
    }
  }
  /**
   * Returns the indent of the line if available.
   *
   * @return An indent string if available, or an empty string if not.
   */
  ;

  _proto7.getIndent = function getIndent() {
    var first = this.first;

    if (first) {
      if (first[0] === CATEGORY_SPACE) {
        return first[1];
      }

      if (first[0] === CATEGORY_COMMENT) {
        var match = this.text.match(new RegExp("^" + this.options.indent + "+"));
        return match ? match[0] : '';
      }
    }

    return '';
  }
  /**
   * Returns the TokenInfo object at the index.
   *
   * @param index - A token index.
   *
   * @return A TokenInfo object if available, or `undefined` if not.
   */
  ;

  _proto7.getInfo = function getInfo(index) {
    var token = this.tokens[index];
    return token && token[2];
  }
  /**
   * Returns the TokenInfo object at the col index.
   *
   * @param col - A col index.
   *
   * @return A TokenInfo object if available, or `undefined` if not.
   */
  ;

  _proto7.getInfoAt = function getInfoAt(col) {
    var tokens = this.tokens,
        length = this.tokens.length;

    if (tokens.length) {
      if (col === this.text.length) {
        return tokens[length - 1][2];
      }

      for (var i = 0; i < length; i++) {
        var info = tokens[i][2];

        if (info.from <= col && col < info.to) {
          return info;
        }
      }
    }
  }
  /**
   * Checks if the line contains only a line break/spaces or not.
   *
   * @return `true` if the line contains only a line break or spaces. Otherwise, `false`.
   */
  ;

  _proto7.isEmpty = function isEmpty() {
    var tokens = this.tokens;
    return tokens.length === 1 && includes([CATEGORY_LINEBREAK, CATEGORY_SPACE], tokens[0][0]);
  }
  /**
   * Builds the HTML by tokens.
   * This should not be pre-built in the init function for better performance.
   *
   * @return The HTML string of the line.
   */
  ;

  _createClass(Line, [{
    key: "html",
    get: function get() {
      if (!this.htmlCache) {
        var _html3 = '';

        for (var i = 0; i < this.tokens.length; i++) {
          var token = this.tokens[i];

          if (i === 0 && token[1] === LINE_BREAK$1) {
            _html3 += EMPTY_LINE_HTML;
            break;
          } else {
            _html3 += token[2].html;
          }
        }

        this.htmlCache = _html3 || EMPTY_LINE_HTML;
      }

      return this.htmlCache;
    }
    /**
     * Builds the text by tokens.
     *
     * @return The text of the line.
     */

  }, {
    key: "text",
    get: function get() {
      if (isUndefined$1(this.textCache)) {
        this.textCache = this.tokens.reduce(function (text, token) {
          if (token[1] !== LINE_BREAK$1) {
            text += token[1];
          }

          return text;
        }, '');
      }

      return this.textCache;
    }
    /**
     * Returns the first token.
     *
     * @return The first token.
     */

  }, {
    key: "first",
    get: function get() {
      return this.tokens[0];
    }
  }]);

  return Line;
}();
/**
 * The max number of lines to be inserted at once.
 * Inserting many lines harms the performance.
 *
 * @since 0.1.0
 */


var MAX_INSERTION_LENGTH = 100;
/**
 * Delay for the asynchronous tokenization.
 *
 * @since 0.1.0
 */

var ASYNC_SYNC_DELAY = 10;
/**
 * The class for managing data of all lines.
 *
 * @since 0.1.0
 */

var Lines = /*#__PURE__*/function (_AbstractArrayLike) {
  _inheritsLoose(Lines, _AbstractArrayLike);

  /**
   * The Lines constructor.
   *
   * @param event    - An EventBus instance.
   * @param language - A Language object.
   * @param options  - Options.
   */
  function Lines(event, language, options) {
    var _this8;

    _this8 = _AbstractArrayLike.call(this) || this;
    /**
     * Holds the setTimeout ids.
     */

    _this8.timers = {};
    _this8.language = language;
    _this8.event = event;
    _this8.options = options;
    return _this8;
  }
  /**
   * Inserts a new empty Line instance or instances at the specified row.
   *
   * @param row   - A row index.
   * @param count - A number of lines to insert.
   */


  var _proto8 = Lines.prototype;

  _proto8.insert = function insert(row, count) {
    count = count || 1;

    while (count-- > 0) {
      this.splice(row, 0, new Line(this.options));
    }
  }
  /**
   * Deletes a Line instance or instances from the specified row.
   *
   * @param row   - A row index.
   * @param count - A number of lines to delete.
   */
  ;

  _proto8["delete"] = function _delete(row, count) {
    this.splice(row, count);
  }
  /**
   * Syncs Line instances with the provided code.
   *
   * @param row    - A row index where sync starts.
   * @param code   - Code to sync.
   * @param limit  - Optional. Limits the number of lines to sync.
   * @param before - Optional. A pseudo line prepended to the code.
   * @param time   - Optional. A timestamp when the sync starts.
   *
   * @return `true` if the last line is changed, or otherwise `false`.
   */
  ;

  _proto8.sync = function sync(row, code, limit, before, time) {
    if (before === void 0) {
      before = '';
    }

    if (before) {
      code = before + LINE_BREAK$1 + code;

      if (limit) {
        limit++;
      }
    }

    var lines = this.language.lexer.run(code, limit);

    if (before) {
      lines.shift();
    }

    var changed;

    for (var i = 0; i < lines.length; i++) {
      var rowIndex = row + i;
      var tokens = lines[i];

      if (!this[rowIndex]) {
        this.insert(rowIndex);
      }

      if (this[rowIndex]) {
        if (i === lines.length - 1) {
          changed = !this.isSame(this[rowIndex].tokens, tokens);
        }

        this[rowIndex].set(tokens, time);
      }
    }

    return changed;
  }
  /**
   * Starts an asynchronous sync process.
   *
   * @param id       - A worker ID.
   * @param row      - A row index where sync starts.
   * @param code     - Code to sync.
   * @param limit    - Optional. Limits the number of lines to sync.
   * @param before   - Optional. A pseudo line prepended to the code.
   * @param callback - Optional. A function called after syncing.
   */
  ;

  _proto8.asyncSync = function asyncSync(id, row, code, limit, before, callback) {
    var _this9 = this;

    if (before === void 0) {
      before = '';
    }

    var timers = this.timers;

    if (timers[id]) {
      clearTimeout(timers[id]);
    }

    var time = Date.now();
    timers[id] = setTimeout(function () {
      _this9.sync(row, code, limit, before, time);

      if (callback) {
        callback();
      }
    }, ASYNC_SYNC_DELAY);
  }
  /**
   * Finds the minimum indent string between the `startRow` and the `endRow`.
   *
   * @param startRow - A start row index to search from.
   * @param endRow   - An end row index to search to.
   *
   * @return A minimum indent string.
   */
  ;

  _proto8.findMinIndent = function findMinIndent(startRow, endRow) {
    var minIndent = undefined;

    for (var i = startRow; i <= endRow; i++) {
      var indent = this[i].getIndent();
      minIndent = isUndefined$1(minIndent) || minIndent.length > indent.length ? indent : minIndent;
    }

    return minIndent || '';
  }
  /**
   * Returns a token info at the specified position.
   *
   * @param position - A position to search at.
   *
   * @return A TokenInfo if available, or otherwise `undefined`.
   */
  ;

  _proto8.getInfoAt = function getInfoAt(position) {
    var line = this[position[0]];
    return line ? line.getInfoAt(position[1]) : undefined;
  }
  /**
   * Searches backwards for a token that matches the matcher.
   * If the `counterpart` matcher is provided,
   * this method attempts to match the target and counterpart, such as `{` and `}`.
   *
   * @param position    - A position to start searching.
   * @param matcher     - A matcher.
   * @param counterpart - Optional. A matcher of the counter part.
   * @param depth       - Optional. Determines the initial depth.
   * @param limit       - Optional. Limits the number of lines to scan.
   *
   * @return A TokenInfo object if found, or `undefined` if not.
   */
  ;

  _proto8.scanUp = function scanUp(position, matcher, counterpart, depth, limit) {
    if (depth === void 0) {
      depth = 0;
    }

    var info = this.getInfoAt(position);

    if (info) {
      var row = position[0];

      var _min = limit ? max(0, row - limit) : 0;

      for (var i = row; i >= _min; i--) {
        var tokens = this[i].tokens;

        for (var j = i === row ? info.index : tokens.length - 1; j >= 0; j--) {
          if (matchesToken(tokens[j], matcher)) {
            if (!depth) {
              return {
                row: i,
                info: this[i].getInfo(j)
              };
            }

            depth++;
          }

          if (counterpart && matchesToken(tokens[j], counterpart)) {
            depth--;
          }
        }
      }
    }
  }
  /**
   * Searches forwards for a token that matches the matcher.
   * If the `counterpart` matcher is provided,
   * this method attempts to match the target and counterpart, such as `{` and `}`.
   *
   * @param position    - A position to start searching.
   * @param matcher     - A matcher.
   * @param counterpart - Optional. A matcher of the counter part.
   * @param depth       - Optional. Determines the initial depth.
   * @param limit       - Optional. Limits the number of lines to scan.
   *
   * @return A TokenInfo object if found, or `undefined` if not.
   */
  ;

  _proto8.scanDown = function scanDown(position, matcher, counterpart, depth, limit) {
    if (depth === void 0) {
      depth = 0;
    }

    var info = this.getInfoAt(position);

    if (info) {
      var row = position[0];
      var length = this.length;

      var _max = limit ? min(length, row + limit) : length;

      for (var i = row; i < _max; i++) {
        var tokens = this[i].tokens;

        for (var j = i === row ? info.index : 0; j < tokens.length; j++) {
          if (matchesToken(tokens[j], matcher)) {
            if (!depth) {
              return {
                row: i,
                info: this[i].getInfo(j)
              };
            }

            depth++;
          }

          if (counterpart && matchesToken(tokens[j], counterpart)) {
            depth--;
          }
        }
      }
    }
  }
  /**
   * Searches for a start position where the split token actually starts.
   * If the token at the position is not split, this returns `undefined`.
   *
   * @param position - A position.
   *
   * @return A position where the split token starts if available.
   */
  ;

  _proto8.findBlockStart = function findBlockStart(position) {
    var info = this.getInfoAt(position);

    if (info) {
      if (info.split) {
        var startRow = position[0] - info.distance;
        var line = this[startRow];
        var lastInfo = line.getInfo(line.tokens.length - 1);
        return [startRow, lastInfo.from];
      }

      return [position[0], info.from];
    }
  }
  /**
   * Searches for an end position where the split token actually ends.
   * If the token at the position is not split, this returns `undefined`.
   *
   * @param position - A position.
   *
   * @return A position where the split token ends if available.
   */
  ;

  _proto8.findBlockEnd = function findBlockEnd(position) {
    var info = this.getInfoAt(position);

    if (info) {
      if (info.split && !info.tail) {
        for (var i = position[0] + 1; i < this.length; i++) {
          var _info = this[i].getInfo(0);

          if (_info && _info.tail) {
            return [i, _info.to];
          }
        }
      }

      return [position[0], info.to];
    }
  }
  /**
   * Syncs the number of lines.
   *
   * @param row   - A row index.
   * @param value - A new size.
   *
   * @return Increased or decreased number of lines.
   */
  ;

  _proto8.syncSize = function syncSize(row, value) {
    var diff = value - this.length;

    if (diff > 0) {
      if (diff < MAX_INSERTION_LENGTH) {
        this.insert(row, diff);
      } else {
        this.setLength(value);
      }
    } else if (diff < 0) {
      this["delete"](row, -diff);
    }

    return diff;
  }
  /**
   * Destroys the instance.
   *
   * @internal
   */
  ;

  _proto8.destroy = function destroy() {
    forOwn$1(this.timers, clearTimeout);
  }
  /**
   * Sets the length of this Lines.
   * All overflown items will be removed from the end, or all missing items are added to the end as empty lines.
   *
   * @param value - A new length.
   */
  ;

  _proto8.setLength = function setLength(value) {
    var length = this.length;

    if (length > value) {
      this.splice(value, length - value);
    } else if (length < value) {
      while (value-- > length) {
        this.push(new Line(this.options));
      }
    }
  }
  /**
   * Checks if the passed 2 arrays with tokens are same or not.
   *
   * @param tokens1 - An array with tokens.
   * @param tokens2 - Another array with tokens.
   *
   * @return `true` if they are considered as same, or otherwise `false`.
   */
  ;

  _proto8.isSame = function isSame(tokens1, tokens2) {
    return tokens1.length === tokens2.length && tokens1.every(function (token1, index) {
      var token2 = tokens2[index];
      return token1[0] === token2[0] && token1[1] === token2[1] && token1[2].depth === token2[2].depth;
    });
  };

  return Lines;
}(AbstractArrayLike);
/**
 * The class for handling the raw text and syncing it to lines.
 *
 * @since 0.1.0
 */


var Code = /*#__PURE__*/function (_Component4) {
  _inheritsLoose(Code, _Component4);

  function Code() {
    var _this10;

    _this10 = _Component4.apply(this, arguments) || this;
    /**
     * Holds the minimum row for asynchronous syncing.
     */

    _this10.minStart = Infinity;
    /**
     * Holds the maximum row for asynchronous syncing.
     */

    _this10.maxEnd = 0;
    return _this10;
  }
  /**
   * Sets a new value.
   *
   * @internal
   *
   * @param value - A new value.
   */


  var _proto9 = Code.prototype;

  _proto9.init = function init(value) {
    if (!this.Lines) {
      this.Lines = new Lines(this.event, this.Editor.language, this.options);
    } else {
      this.Lines.clear();
    }

    this.value = value;
    this.Lines.sync(0, value);
  }
  /**
   * Returns a text before the specified row index, including the row itself.
   *
   * @param row - A row index.
   *
   * @return A sliced text.
   */
  ;

  _proto9.before = function before(row) {
    var text = this.text;

    if (row < 0) {
      return '';
    }

    return text.slice(0, row < this.size - 1 ? nthIndexOf(text, LINE_BREAK$1, row + 1) + 1 : text.length);
  }
  /**
   * Returns a text after the specified row index, including the row itself.
   *
   * @param row - A row index.
   *
   * @return A sliced text.
   */
  ;

  _proto9.after = function after(row) {
    var text = this.text;

    if (row <= 0) {
      return text;
    }

    return text.slice(row < this.size ? nthIndexOf(text, LINE_BREAK$1, row) + 1 : text.length);
  }
  /**
   * Returns the code at the row index.
   * Although the `Lines[ row ]` also returns the code at the row,
   * which is much faster than this method,
   * it may not be the latest before the `Sync` finishes syncing process.
   *
   * @param row - A row index.
   *
   * @return The text of the line at the specified row.
   */
  ;

  _proto9.getLine = function getLine(row) {
    return row < this.size ? this.sliceLines(row, row) : '';
  }
  /**
   * Slices the code by the specified row range.
   *
   * @example
   * ```ts
   * // Gets lines from 1 to 9:
   * const code = Code.sliceLines( 2, 10 );
   * ```
   *
   * @param startRow - A start row index to start slicing a text.
   * @param endRow   - An end row index to end slicing a text.
   *
   * @return A sliced text.
   */
  ;

  _proto9.sliceLines = function sliceLines(startRow, endRow) {
    var text = this.text;
    var endIndex = endRow < this.size - 1 ? nthIndexOf(text, LINE_BREAK$1, endRow + 1) + 1 : this.text.length;
    return text.slice(nthIndexOf(text, LINE_BREAK$1, startRow) + 1, endIndex);
  }
  /**
   * Slices the code by the specified position range.
   *
   * @example
   * ```ts
   * const code = Code.sliceLines( [ 0, 1 ], [ 2, 9 ] );
   * ```
   *
   * @param start - A start position to start slicing a text.
   * @param end   - Optional. An end position to end slicing a text.
   *
   * @return A sliced text.
   */
  ;

  _proto9.sliceRange = function sliceRange(start, end) {
    var startIndex = this.positionToIndex(start);
    var endIndex = end ? this.positionToIndex(end) : this.text.length;
    return startIndex < endIndex ? this.text.slice(startIndex, endIndex) : '';
  }
  /**
   * Replaces lines by the replacement text.
   *
   * @example
   * Consider the following HTML as an example:
   * ```html
   * <pre>
   * function message() {
   *   console.log( 'Hi!' );
   * }
   * </pre>
   * ```
   *
   * Let's modify the line 2 (row index is `1`):
   *
   * ```ts
   * const ryuseiCode = new RyuseiCode();
   * ryuseiCode.apply( 'pre' );
   *
   * const { Code, Sync } = ryuseiCode.Editor.Components;
   *
   * setTimeout( () => {
   *   Code.replaceLines( 1, 1, `  console.log( 'Bye!' );\n` );
   *   Sync.sync( 1, 1 );
   * }, 2000 );
   * ```
   *
   * @param startRow    - A start row index.
   * @param endRow      - An end row index.
   * @param replacement - A replacement text.
   */
  ;

  _proto9.replaceLines = function replaceLines(startRow, endRow, replacement) {
    assert$1(startRow <= endRow);
    this.text = this.before(startRow - 1) + this.normalize(replacement) + this.after(endRow + 1);
    this.sizeCache = 0;
  }
  /**
   * Replaces the code in a specified range by the replacement text.
   *
   * @param start       - A start position.
   * @param end         - An end position.
   * @param replacement - A replacement text.
   */
  ;

  _proto9.replaceRange = function replaceRange(start, end, replacement) {
    var startIndex = this.positionToIndex(start);
    var endIndex = this.positionToIndex(end);
    var value = this.value;

    if (startIndex <= endIndex) {
      this.text = value.slice(0, startIndex) + this.normalize(replacement) + value.slice(endIndex);
      this.sizeCache = 0;
    }
  }
  /**
   * Replaces lines by the iteratee function invoked for each line.
   * The returning string of the function will be used as a new line.
   *
   * @example
   * Consider the following HTML as an example:
   *
   * ```html
   * <pre>
   * 1
   * 2
   * 3
   * </pre>
   * ```
   *
   * Let's modify lines by an iteratee function:
   *
   * ```ts
   * const ryuseiCode = new RyuseiCode();
   * ryuseiCode.apply( 'pre' );
   *
   * const { Code, Sync } = ryuseiCode.Editor.Components;
   *
   * setTimeout( () => {
   *   Code.replaceLinesBy( 0, 2, line => `Line: ${ line }` );
   *   Sync.sync( 0, 2 );
   * }, 2000 );
   * ```
   *
   * The result will be:
   * ```none
   * Line: 1
   * Line: 2
   * Line: 3
   * ```
   *
   * @param startRow - A start row index.
   * @param endRow   - An end row index.
   * @param iteratee - An iteratee function invoked for each line.
   */
  ;

  _proto9.replaceLinesBy = function replaceLinesBy(startRow, endRow, iteratee) {
    var size = this.size;
    assert$1(endRow < size);
    var isLast = endRow === size - 1;
    var lines = this.sliceLines(startRow, endRow).split(LINE_BREAK$1, endRow - startRow + 1);
    this.replaceLines(startRow, endRow, lines.reduce(function (acc, line, index, array) {
      var lineBreak = isLast && index === array.length - 1 ? '' : LINE_BREAK$1;
      return acc + iteratee(line, index, array) + lineBreak;
    }, ''));
  }
  /**
   * Searches the provided word or regexp and returns matched ranges.
   *
   * @example
   * ```html
   * <pre>
   * foo
   * bar
   * foo
   * </pre>
   * ```
   *
   * ```ts
   * const ryuseiCode = new RyuseiCode();
   * ryuseiCode.apply( 'pre' );
   *
   * const { Code } = ryuseiCode.Editor.Components;
   * const ranges = Code.search( 'foo' );
   *
   * // The ranges will contain 2 results:
   * // { start: [ 0, 0 ], end: [ 0, 3 ] }
   * // { start: [ 2, 0 ], end: [ 2, 3 ] }
   * ```
   *
   * @param search     - A string or a regexp object.
   * @param ignoreCase - Optional. Whether to perform case-insensitive search or not.
   * @param wholeWord  - Optional. Whether to only match a whole word or not.
   * @param limit      - Optional. Limits the number of matched results.
   *
   * @return An array with Range objects.
   */
  ;

  _proto9.search = function search(_search, ignoreCase, wholeWord, limit) {
    var source = isString(_search) ? escapeRegExp(_search) : _search.source;
    var ranges = [];

    if (source) {
      var regexp = new RegExp(wholeWord ? "\\b" + source + "\\b" : source, ignoreCase ? 'gi' : 'g');

      lines: for (var i = 0; i < this.Lines.length; i++) {
        var line = this.Lines[i];
        var match = void 0;

        while (match = regexp.exec(line.text)) {
          if (!match[0]) {
            regexp.lastIndex++;
          }

          ranges.push({
            start: [i, match.index],
            end: [i, match.index + match[0].length]
          });

          if (limit && ranges.length >= limit) {
            break lines;
          }
        }
      }
    }

    return ranges;
  }
  /**
   * Destroys the component.
   *
   * @internal
   */
  ;

  _proto9.destroy = function destroy() {
    if (this.Lines) {
      this.Lines.destroy();
    }

    _Component4.prototype.destroy.call(this);
  }
  /**
   * Converts the provided position to the text index.
   *
   * @param position - A position to convert.
   *
   * @return A converted index.
   */
  ;

  _proto9.positionToIndex = function positionToIndex(position) {
    var row = position[0];
    assert$1(row < this.size);
    return nthIndexOf(this.text, LINE_BREAK$1, row) + 1 + position[1];
  }
  /**
   * Normalizes characters of line breaks.
   *
   * @param value - A value to normalize.
   *
   * @return A normalized text.
   */
  ;

  _proto9.normalize = function normalize(value) {
    return value.replace(/\r\n?/g, '\n');
  }
  /**
   * Sets a new value.
   *
   * @param value - A value to set.
   */
  ;

  _createClass(Code, [{
    key: "value",
    get:
    /**
     * Returns the current code.
     *
     * @return The current code.
     */
    function get() {
      return this.text;
    }
    /**
     * Returns the number of lines by counting line breaks.
     *
     * @return The number of lines.
     */
    ,
    set: function set(value) {
      this.text = this.normalize(value);
      this.sizeCache = 0;
    }
  }, {
    key: "size",
    get: function get() {
      this.sizeCache = this.sizeCache || count(this.text, LINE_BREAK$1) + 1;
      return this.sizeCache;
    }
  }]);

  return Code;
}(Component);
/**
 * The SVG view box settings.
 *
 * @since 0.1.0
 */


var VIEW_BOX = '0 0 24 24';
/**
 * Returns an icon SVG element specified by the name.
 *
 * @param d       - The path of the icon element.
 * @param stroke  - Stroke width.
 * @param linecap - Linecap.
 *
 * @return The SVG element of the icon.
 */

function icon(d, stroke, linecap) {
  var svg = createSvg('svg', {
    viewBox: VIEW_BOX,
    "class": CLASS_ICON
  });
  var path = createSvg('path', {
    d: d,
    fill: 'currentColor'
  });

  if (stroke) {
    attr(path, {
      'stroke-width': stroke,
      'stroke-linecap': linecap,
      stroke: 'currentColor'
    });
  }

  attr(svg, {
    viewBox: VIEW_BOX
  });
  svg.appendChild(path);
  return svg;
}
/**
 * The helper function to create a SVG element.
 *
 * @param tag   - A tag name in the SVG namespace.
 * @param attrs - An object literal with attributes.
 *
 * @return An created element.
 */


function createSvg(tag, attrs) {
  var elm = document.createElementNS('http://www.w3.org/2000/svg', tag);
  attr(elm, attrs);
  return elm;
}
/**
 * The stroke linecap value for the path element.
 */


var STROKE_LINECAP = 'round';
/**
 * The base class for creating UI, such as a toolbar or a dialog.
 *
 * @since 0.1.0
 */

var UIComponent = /*#__PURE__*/function (_Component5) {
  _inheritsLoose(UIComponent, _Component5);

  function UIComponent() {
    var _this11;

    _this11 = _Component5.apply(this, arguments) || this;
    /**
     * Stores group elements.
     */

    _this11.groups = {};
    return _this11;
  }
  /**
   * Initializes the component.
   *
   * @param elements - A collection of essential editor elements.
   */


  var _proto10 = UIComponent.prototype;

  _proto10.mount = function mount(elements) {
    _Component5.prototype.mount.call(this, elements);

    this.create();
    this.listen();
  }
  /**
   * Creates elements.
   * Override this method in a child class and provide a wrapper element.
   */
  ;

  _proto10.create = function create() {
    assert$1(false);
  }
  /**
   * Listens to some events.
   */
  ;

  _proto10.listen = function listen() {
    this.bind(window, 'keydown', this.escape, this);
  }
  /**
   * Hides the toolbar when the escape key is pressed.
   *
   * @param e - A KeyboardEvent object.
   */
  ;

  _proto10.escape = function escape(e) {
    if (this.isActive() && normalizeKey(e.key) === 'Escape') {
      this.hide();
      prevent(e);
    }
  }
  /**
   * Appends the group element to the wrapper element just before displaying the UI.
   * Override this method to change the default element to append the group to.
   *
   * @param group - A group ID.
   */
  ;

  _proto10.append = function append(group) {
    _append(this.wrapper, this.groups[group].elm);
  }
  /**
   * Sets focus to the first element that has the greatest tab index.
   * If it is not found, sets focus to the first input or button element if available.
   *
   * @param group - A group ID.
   */
  ;

  _proto10.autoFocus = function autoFocus(group) {
    var elm = this.groups[group].elm;
    var target = query(elm, '[tabindex]') || query(elm, 'input, button');

    if (target) {
      target.focus();

      if (target instanceof HTMLInputElement) {
        target.select();
      }
    }
  }
  /**
   * Creates a close button.
   * The wrapper element must exist and have an ID attribute before calling this method.
   *
   * @param attrs - Attributes for the button.
   *
   * @return A created button element.
   */
  ;

  _proto10.createCloseButton = function createCloseButton(attrs) {
    var button = this.createButtons({
      id: 'close',
      icon: 'close',
      click: 'hide'
    }, null, this).close;
    attr(button, attrs);
    return button;
  }
  /**
   * Creates buttons according to the settings.
   *
   * @param settings  - A settings object.
   * @param parent    - A parent element to append the button to.
   * @param component - A component instance.
   * @param classes   - Additional classes for buttons.
   *
   * @return An object with created buttons.
   */
  ;

  _proto10.createButtons = function createButtons(settings, parent, component, classes) {
    var _this12 = this;

    var buttons = {};
    toArray(settings).forEach(function (settings) {
      var button = _this12.createButton(settings, parent, classes);

      var click = settings.click;

      if (click) {
        _this12.bind(button, 'click', function (e) {
          if (isString(click)) {
            component[click]();
          } else {
            click(e, _this12.Editor, settings);
          }
        });
      }

      buttons[settings.id] = button;
    }, []);
    return buttons;
  }
  /**
   * Creates a button with the provided settings.
   *
   * @param settings - A settings object.
   * @param parent   - A parent element to append the button to.
   * @param classes  - Additional classes for buttons.
   *
   * @return A created button element.
   */
  ;

  _proto10.createButton = function createButton(settings, parent, classes) {
    var i18n = this.options.i18n;
    var checkbox = settings.checkbox,
        tabindex = settings.tabindex,
        iconName = settings.icon;
    var label = i18n[settings.i18n || settings.id];
    classes = [CLASS_BUTTON].concat(iconName ? CLASS_BUTTON + "--icon" : null, classes);

    var button = _create('button', {
      title: iconName ? label : null,
      type: 'button',
      tabindex: !isUndefined$1(tabindex) ? tabindex : null,
      role: checkbox ? 'checkbox' : null,
      'aria-checked': checkbox ? 'false' : null,
      'aria-label': label
    }, parent || settings.parent);

    addClass(button, classes);

    if (iconName) {
      var iconSettings = this.options.icons[iconName];

      if (iconSettings) {
        _append(button, icon(iconSettings[0], iconSettings[1], iconSettings[2] || STROKE_LINECAP));
      }
    } else {
      html$2(button, settings.html || label);
    }

    return button;
  }
  /**
   * A utility function to create an input field.
   *
   * @param settings - A settings object.
   * @param parent   - A parent element where the created input element will be appended.
   *
   * @return A created input element.
   */
  ;

  _proto10.createField = function createField(settings, parent) {
    var label = this.i18n[settings.i18n || settings.id];
    var tabindex = settings.tabindex;
    return _create('input', {
      "class": "" + CLASS_INPUT,
      placeholder: label,
      spellcheck: false,
      tabindex: !isUndefined$1(tabindex) ? tabindex : null,
      'aria-label': label
    }, parent);
  }
  /**
   * Displays the UI.
   *
   * @param group - A group ID.
   */
  ;

  _proto10.show = function show(group) {
    if (this.isActive()) {
      _remove(this.groups[this.group].elm);
    }

    addClass(this.wrapper, CLASS_ACTIVE);
    this.append(group);
    this.group = group;
  }
  /**
   * Hides the UI.
   */
  ;

  _proto10.hide = function hide() {
    if (this.isActive()) {
      removeClass(this.wrapper, CLASS_ACTIVE);

      _remove(this.groups[this.group].elm);
    }
  }
  /**
   * Checks if the specified group is active or not.
   * If omitted, this checks any group is active or not.
   *
   * @param group - Optional. A group ID to check.
   */
  ;

  _proto10.isActive = function isActive(group) {
    return hasClass(this.wrapper, CLASS_ACTIVE) && (!group || this.group === group);
  }
  /**
   * Checks if one of the elements in the UI has focus or not.
   *
   * @return `true` if an element in the UI has focus, or otherwise `false`.
   */
  ;

  _proto10.isFocused = function isFocused() {
    return this.wrapper.contains(activeElement());
  };

  return UIComponent;
}(Component);
/**
 * The ID for the main context menu.
 */


var MAIN_CONTEXT_MENU_ID = 'main';
/**
 * The collection of "edit" items for the context menu.
 *
 * @since 0.1.0
 */

var CONTEXT_MENU_EDIT = [{
  id: 'copy',
  shortcut: ['C', true]
}, {
  id: 'cut',
  shortcut: ['X', true],
  disableOnReadOnly: true
}, {
  id: 'paste',
  shortcut: ['V', true],
  disableOnReadOnly: true
}];
/**
 * The collection of "selection" items for the context menu.
 *
 * @since 0.1.0
 */

var CONTEXT_MENU_SELECTION = [{
  id: 'selectAll',
  shortcut: ['A', true]
}];
/**
 * The margin from the menu to the right of the window.
 *
 * @since 0.1.0
 */

var MARGIN_RIGHT = 5;
/**
 * The margin from the menu to the bottom of the window.
 *
 * @since 0.1.0
 */

var MARGIN_BOTTOM = 5;
/**
 * The class for creating a context menu replacing the native one.
 *
 * @since 0.1.0
 */

var ContextMenu = /*#__PURE__*/function (_UIComponent) {
  _inheritsLoose(ContextMenu, _UIComponent);

  function ContextMenu() {
    var _this13;

    _this13 = _UIComponent.apply(this, arguments) || this;
    /**
     * The index of the current menu item.
     */

    _this13.index = -1;
    return _this13;
  }
  /**
   * Listens some events.
   */


  var _proto11 = ContextMenu.prototype;

  _proto11.listen = function listen() {
    var _this14 = this;

    _UIComponent.prototype.listen.call(this);

    var elements = this.elements;
    this.bind(elements.editor, 'mousedown', this.onMouseDown, this);
    this.bind(document, 'contextmenu', this.onContextMenu, this);
    this.bind(window, 'keydown', this.onKeydown, this);
    this.on([EVENT_BLUR, EVENT_SCROLLER_SCROLL, EVENT_WINDOW_SCROLL], this.hide, this);
    this.bind(elements.root, 'focusin', function () {
      if (!_this14.contains(activeElement()) && !_this14.wrapper.contains(activeElement())) {
        _this14.hide();
      }
    });
  }
  /**
   * Creates the context menu elements.
   *
   * @link https://www.w3.org/TR/wai-aria-1.2/#menu
   */
  ;

  _proto11.create = function create() {
    this.wrapper = div({
      "class": CLASS_CONTEXT_MENU,
      role: 'menu'
    }, this.elements.overlay);
  }
  /**
   * Called when the mouse button is clicked.
   * If the button number is 2, which means a right click,
   * displays the menu and moves it at the cursor location, otherwise hides the menu.
   *
   * @param e - A MouseEvent object.
   */
  ;

  _proto11.onMouseDown = function onMouseDown(e) {
    if (e.button === 2) {
      this.show(MAIN_CONTEXT_MENU_ID);
      this.move(e.clientX, e.clientY);
    } else {
      this.hide();
    }
  }
  /**
   * Called when the contextmenu event of the document is fired.
   * Since the context menu may scroll the scroller or the window,
   * displaying the menu at this moment is too early.
   *
   * @param e - An Event object.
   */
  ;

  _proto11.onContextMenu = function onContextMenu(e) {
    var _this15 = this;

    if (this.isActive()) {
      return prevent(e);
    }

    if (this.contains(e.target)) {
      var _Selection = this.Selection;

      if (!_Selection.is(IDLE)) {
        this.View.jump(_Selection.focus[0]);
        requestAnimationFrame(function () {
          var rect = _this15.Caret.rect;

          _this15.show(MAIN_CONTEXT_MENU_ID);

          _this15.move(rect.left, rect.bottom);
        });
      }

      prevent(e, true);
    }
  }
  /**
   * Called when the window receives the keydown.
   *
   * @param e - A KeyboardEvent object.
   */
  ;

  _proto11.onKeydown = function onKeydown(e) {
    if (this.isActive()) {
      var key = normalizeKey(e.key);
      var arrowUp = key === 'ArrowUp';

      if (key === 'ArrowDown' || arrowUp) {
        this.focus(arrowUp);
        prevent(e);
      }
    }
  }
  /**
   * Sets focus on the menu item in order.
   *
   * @param backwards - Whether to decrement or increment the menu index.
   */
  ;

  _proto11.focus = function focus(backwards) {
    var buttons = queryAll(this.wrapper, "." + CLASS_CONTEXT_MENU_BUTTON);
    var length = buttons.length;

    if (length) {
      this.index += backwards ? -1 : 1;

      if (this.index < 0) {
        this.index = length - 1;
      } else if (this.index >= length) {
        this.index = 0;
      }

      buttons[this.index].focus();
    }
  }
  /**
   * Moves the menu to the provided client coordinates.
   *
   * @param clientX - A client x coordinate.
   * @param clientY - A client y coordinate.
   */
  ;

  _proto11.move = function move(clientX, clientY) {
    var wrapper = this.wrapper,
        clientWidth = this.wrapper.clientWidth;
    var _document = document,
        documentElement = _document.documentElement;
    var rootRect = rect(this.elements.root);

    if (clientX + clientWidth > documentElement.clientWidth - MARGIN_RIGHT) {
      clientX -= clientWidth;
    }

    clientY = min(clientY, height(documentElement) - height(wrapper) - MARGIN_BOTTOM);
    styles(wrapper, {
      top: unit(clientY - rootRect.top),
      left: unit(clientX - rootRect.left)
    });
  }
  /**
   * Checks whether the editor contains the passed element/event target or not.
   *
   * @param target - An EventTarget object that is an Element instance in most cases.
   *
   * @return `true` if the editor contains the target, or otherwise `false`.
   */
  ;

  _proto11.contains = function contains(target) {
    return isHTMLElement(target) && this.elements.editor.contains(target);
  }
  /**
   * Creates elements for menu items.
   *
   * @param group - A group ID.
   */
  ;

  _proto11.build = function build(group) {
    var _this16 = this;

    var _this$groups$group = this.groups[group],
        lists = _this$groups$group.lists,
        elm = _this$groups$group.elm;
    text(elm, '');
    forOwn$1(lists, function (settings, key) {
      var list = _create('ul', [CLASS_CONTEXT_MENU_LIST, CLASS_CONTEXT_MENU_LIST + "--" + key], elm);

      settings = settings.map(function (settings) {
        settings.parent = _create('li', CLASS_CONTEXT_MENU_ITEM, list);
        return settings;
      });

      var buttons = _this16.createButtons(settings, null, _this16, CLASS_CONTEXT_MENU_BUTTON);

      forOwn$1(buttons, function (button, id) {
        var buttonSettings = _this16.findSettings(settings, id);

        assert$1(buttonSettings);
        attr(button, {
          role: 'menuitem'
        });

        _this16.bind(button, 'click', function () {
          _this16.emit(EVENT_CONTEXT_MENU_CLICKED, _this16, group, id, button);

          _this16.hide();
        });

        if (buttonSettings.disableOnReadOnly) {
          button.disabled = _this16.Editor.readOnly;

          _this16.on(EVENT_READONLY, function (e, readOnly) {
            button.disabled = readOnly;
          });
        }

        _this16.bind(button, 'mouseover', function () {
          button.focus();
        });
      });
      _this16.buttons = assign$1({}, _this16.buttons, buttons);
    });
  }
  /**
   * Finds the each button settings from the array of settings.
   *
   * @param settings - An array with settings.
   * @param id       - A button ID to find.
   *
   * @return The found button settings.
   */
  ;

  _proto11.findSettings = function findSettings(settings, id) {
    for (var i = 0; i < settings.length; i++) {
      if (settings[i].id === id) {
        return settings[i];
      }
    }
  }
  /**
   * Registers a menu item or items.
   *
   * @example
   *
   * Registers a new item to the "edit" list in the "main" context menu:
   * ```ts
   * const ryuseiCode = new RyuseiCode();
   * ryuseiCode.apply( 'textarea' );
   *
   * const { ContextMenu } = ryuseiCode.Editor.Components;
   *
   * ContextMenu.register( 'main', 'edit', {
   *   id  : 'myButton',
   *   html: 'Click Me',
   *   click() {
   *     console.log( 'Clicked! );
   *   },
   * } );
   * ```
   *
   * Registers a new list and items to the the "main" context menu:
   * ```ts
   * const ryuseiCode = new RyuseiCode();
   * ryuseiCode.apply( 'textarea' );
   *
   * const { ContextMenu } = ryuseiCode.Editor.Components;
   *
   * ContextMenu.register( 'main', 'my-list', [
   *   {
   *     id  : 'button1',
   *     html: 'Button 1',
   *     click() {
   *       console.log( 'You clicked the Button 1' );
   *     },
   *   },
   *   {
   *     id  : 'button2',
   *     html: 'Button 2',
   *     click() {
   *       console.log( 'You clicked the Button 2' );
   *     },
   *   },
   * ] );
   * ```
   *
   * Registers a new group:
   * ```ts
   * const ryuseiCode = new RyuseiCode();
   * ryuseiCode.apply( 'textarea' );
   *
   * const { ContextMenu } = ryuseiCode.Editor.Components;
   *
   * ContextMenu.register( 'my-context-menu', 'my-list', [
   *   ...
   * ] );
   *
   * ContextMenu.show( 'my-context-menu' );
   * ```
   *
   * @param group    - A group ID. If it does not exist, a new group will be generated.
   * @param list     - A list ID.
   * @param settings - An menu item or items.
   */
  ;

  _proto11.register = function register(group, list, settings) {
    var _this17 = this;

    var groups = this.groups;

    if (!groups[group]) {
      groups[group] = {
        elm: div([CLASS_CONTEXT_MENU_GROUP, CLASS_CONTEXT_MENU_GROUP + "--" + group]),
        lists: {}
      };
    }

    settings.forEach(function (settings) {
      var label = _this17.i18n[settings.i18n || settings.id];
      var shortcut = settings.shortcut ? _this17.Keymap.getShortcut(settings.shortcut) : '';
      settings.html = settings.html || "<span class=\"" + CLASS_CONTEXT_MENU_LABEL + "\">" + label + "</span>" + (shortcut ? "<span class=\"" + CLASS_CONTEXT_MENU_SHORTCUT + "\">" + shortcut + "</span>" : '');
    });
    var lists = groups[group].lists;
    lists[list] = (lists[list] || []).concat(settings);
  }
  /**
   * Displays the specified context menu.
   *
   * @param group - A group ID.
   */
  ;

  _proto11.show = function show(group) {
    if (this.groups[group]) {
      this.build(group);

      _UIComponent.prototype.show.call(this, group);

      this.index = -1;
      this.emit(EVENT_CONTEXT_MENU_OPENED);
    }
  }
  /**
   * Hides the context menu.
   */
  ;

  _proto11.hide = function hide() {
    if (this.isActive()) {
      _UIComponent.prototype.hide.call(this);

      this.buttons = null;
      this.emit(EVENT_CONTEXT_MENU_CLOSED);
    }
  };

  return ContextMenu;
}(UIComponent);
/**
 * The class for normalizing different copy/paste behaviours in browsers.
 *
 * @since 0.1.0
 */


var Clipboard = /*#__PURE__*/function () {
  function Clipboard() {}

  var _proto12 = Clipboard.prototype;

  /**
   * Creates a temporary textarea element.
   *
   * @param text - A value for the textarea.
   *
   * @return A created element.
   */
  _proto12.create = function create(text) {
    var textarea = _create('textarea', {}, document.body);

    var offset = '-999999px';
    styles(textarea, {
      position: 'absolute',
      top: offset,
      left: offset
    });
    textarea.value = text;

    _focus5(textarea);

    textarea.setSelectionRange(0, text.length);
    return textarea;
  }
  /**
   * Pastes the text via execCommand for old browsers.
   *
   * @return A pasted text.
   */
  ;

  _proto12.execPaste = function execPaste() {
    var textarea = this.create('');
    document.execCommand('paste');
    var value = textarea.value;

    _remove(textarea);

    return value;
  }
  /**
   * Copies the provided text via execCommand for old browsers.
   *
   * @param text     - A text to copy.
   * @param onFailed - Optional. A callback fired when copy failed.
   */
  ;

  _proto12.execCopy = function execCopy(text, onFailed) {
    var textarea = this.create(text);

    try {
      document.execCommand('copy');
    } catch (e) {
      if (onFailed) {
        onFailed();
      }
    }

    _remove(textarea);
  }
  /**
   * Pastes the clipboard text.
   *
   * @param onPaste - A callback fired after pasting a text, taking a pasted value as the first argument.
   */
  ;

  _proto12.paste = function paste(onPaste) {
    var _navigator2 = navigator,
        clipboard = _navigator2.clipboard;

    if (clipboard) {
      clipboard.readText().then(onPaste);
    } else {
      onPaste(this.execPaste());
    }
  }
  /**
   * Copies the passed text.
   *
   * @param text     - A text to copy.
   * @param onFailed - Optional. A callback fired when copy failed.
   */
  ;

  _proto12.copy = function copy(text, onFailed) {
    var _this18 = this;

    var _navigator3 = navigator,
        clipboard = _navigator3.clipboard;

    if (clipboard) {
      clipboard.writeText(text)["catch"](function () {
        _this18.execCopy(text, onFailed);
      });
    } else {
      this.execCopy(text, onFailed);
    }
  };

  return Clipboard;
}();
/**
 * The class for editing the code.
 *
 * @since 0.1.0
 */


var Edit = /*#__PURE__*/function (_Component6) {
  _inheritsLoose(Edit, _Component6);

  function Edit() {
    var _this19;

    _this19 = _Component6.apply(this, arguments) || this;
    /**
     * Holds the Clipboard instance.
     */

    _this19.clipboard = new Clipboard();
    return _this19;
  }
  /**
   * Initializes the component.
   *
   * @internal
   *
   * @param elements - A collection of essential editor elements.
   */


  var _proto13 = Edit.prototype;

  _proto13.mount = function mount(elements) {
    _Component6.prototype.mount.call(this, elements);

    this.register();
    this.listen();
  }
  /**
   * Listens to some events.
   */
  ;

  _proto13.listen = function listen() {
    var _this20 = this;

    var editable = this.elements.editable;
    this.on(EVENT_KEYDOWN, this.onKeydown, this);
    this.bind(editable, 'paste', this.onPaste, this);
    this.bind(editable, 'copy cut', function (e) {
      _this20[e.type]();
    });
    this.bind(editable, 'dragover drop paste cut', function (e) {
      prevent(e, true);
    });
    this.on(EVENT_CONTEXT_MENU_CLICKED, this.onMenuClicked, this);

    if (isIE()) {
      this.bind(editable, 'compositionstart', function (e) {
        if (_this20.deletedByInput) {
          prevent(e, true);
        }
      });
    }
  }
  /**
   * Called when any key is pressed.
   *
   * @param e  - An EventBusEvent object.
   * @param ke - A KeyboardEvent object.
   */
  ;

  _proto13.onKeydown = function onKeydown(e, ke) {
    var Selection = this.Selection;
    var key = normalizeKey(ke.key);

    var isKey = function isKey(keys) {
      return includes(toArray(keys), key);
    };

    this.deletedByInput = false;

    if (this.Keymap.matches(ke, 'selectAll')) {
      Selection.selectAll();
      return prevent(ke, true);
    }

    if (ke.altKey || ke.metaKey || ke.ctrlKey) {
      return;
    }

    if (Selection.isMultiline()) {
      if (key.length === 1 || isKey(['Process', 'Enter'])) {
        this["delete"]();
        this.deletedByInput = true;
      } else if (isKey(['Delete', 'Backspace'])) {
        this["delete"]();
        prevent(ke);
      }
    }
  }
  /**
   * Called when the context menu item is clicked.
   *
   * @param e           - An EventBusEvent object.
   * @param ContextMenu - A ContextMenu instance.
   * @param group       - A group ID.
   * @param id          - The ID of the clicked item.
   */
  ;

  _proto13.onMenuClicked = function onMenuClicked(e, ContextMenu, group, id) {
    if (group === MAIN_CONTEXT_MENU_ID) {
      var _Selection2 = this.Selection;

      if (id === 'copy' || id === 'cut') {
        if (!this.isSelected()) {
          _Selection2.selectLine(undefined, id === 'copy', true);
        }

        this[id]();
      } else if (id === 'paste') {
        this.clipboard.paste(this.paste.bind(this));
      } else if (id === 'selectAll') {
        _Selection2.selectAll();
      }
    }
  }
  /**
   * Called when the text is being pasted to the editor.
   *
   * @param e - A ClipboardEvent object.
   */
  ;

  _proto13.onPaste = function onPaste(e) {
    var string = (e.clipboardData || window['clipboardData']).getData('text');

    if (string) {
      this.paste(string);
    }

    prevent(e);
  }
  /**
   * Registers items to the context menu.
   */
  ;

  _proto13.register = function register() {
    var ContextMenu = this.ContextMenu;
    ContextMenu.register(MAIN_CONTEXT_MENU_ID, 'edit', CONTEXT_MENU_EDIT);
    ContextMenu.register(MAIN_CONTEXT_MENU_ID, 'selection', CONTEXT_MENU_SELECTION);
  }
  /**
   * Checks if some texts are selected or not.
   * Be aware that this is not same with negating getSelection().isCollapsed.
   *
   * @return `true` if some texts are selected, or otherwise `false`.
   */
  ;

  _proto13.isSelected = function isSelected() {
    return !this.Selection.isCollapsed();
  }
  /**
   * Checks if the Editor is editable or not.
   *
   * @return `true` if the Editor is editable.
   */
  ;

  _proto13.isEditable = function isEditable() {
    return !this.Editor.readOnly;
  }
  /**
   * Deletes the selected text. Nothing will happen when the selection is collapsed.
   */
  ;

  _proto13["delete"] = function _delete() {
    if (this.isSelected()) {
      this.paste('', 'delete');
    }
  }
  /**
   * Pastes the provided text at the current position.
   *
   * @param string - A string to paste.
   * @param type   - Optional. Specifies the input type.
   */
  ;

  _proto13.paste = function paste(string, type) {
    if (type === void 0) {
      type = 'paste';
    }

    if (!this.isEditable()) {
      return;
    }

    if (type === 'paste') {
      this.emit(EVENT_PASTE, string);
    }

    var Selection = this.Selection,
        Code = this.Code;

    var _Selection$get = Selection.get(),
        start = _Selection$get.start,
        end = _Selection$get.end;

    var size = count(string, LINE_BREAK$1) + 1;
    var startRow = start[0];
    var endRow = startRow + size - 1;
    var endLine = string.slice(string.lastIndexOf(LINE_BREAK$1) + 1);
    var col = endLine.length + (size > 1 ? 0 : start[1]);
    var position = [endRow, col];
    this.emit(EVENT_CHANGE, type);
    Code.replaceRange(start, end, string);
    this.Sync.sync(startRow, endRow, endRow);
    Selection.set(position);
    this.emit(EVENT_CHANGED, type);
  }
  /**
   * Copies the provided text to the clipboard.
   * If the text is not provided, this method tries to copy the current selection.
   *
   * @param string        - Optional. A string to copy.
   * @param skipSelection - Optional. Whether to restore the selection range after copy or not.
   */
  ;

  _proto13.copy = function copy(string, skipSelection) {
    var _this21 = this;

    var failedToCopy = this.i18n.failedToCopy;

    var onFailed = function onFailed() {
      if (_this21.require('Dialog')) {
        _this21.invoke('Dialog', 'message', failedToCopy);
      } else {
        alert(_this21.i18n.failedToCopy);
      }
    };

    var copySelection = isUndefined$1(string);
    string = copySelection ? this.Selection.toString() : string;
    this.emit(EVENT_COPY, string);
    var Selection = this.Selection;
    var range = Selection.get(false);
    this.clipboard.copy(string, onFailed);

    if (!skipSelection) {
      Selection.set(range.start, range.end);
    }
  }
  /**
   * Cuts the selected code. Nothing will happen if the selection is collapsed.
   */
  ;

  _proto13.cut = function cut() {
    if (this.isSelected() && this.isEditable()) {
      this.emit(EVENT_CUT);
      this.copy(undefined, true);
      this["delete"]();
    }
  }
  /**
   * Cuts the current line.
   */
  ;

  _proto13.cutLine = function cutLine() {
    if (!this.isEditable()) {
      return;
    }

    this.emit(EVENT_CUT);
    var Selection = this.Selection;

    var _Selection$get2 = Selection.get(),
        _Selection$get2$start = _Selection$get2.start,
        startRow = _Selection$get2$start[0];

    var position = [startRow, 0];
    this.View.jump(startRow);
    Selection.selectLine(startRow, false);
    this.copy(undefined, true);
    Selection.update(position);
    this.emit(EVENT_CHANGE);
    this.Code.replaceLines(startRow, startRow, '');
    this.Sync.sync(startRow, startRow);
    Selection.set(position);
    this.emit(EVENT_CHANGED);
  };

  return Edit;
}(Component);
/**
 * The input type for composition.
 *
 * @since 0.1.0
 */


var COMPOSITION_INPUT_TYPE = 'composition';
/**
 * The class for handling the user input.
 *
 * @since 0.1.0
 */

var Input = /*#__PURE__*/function (_Component7) {
  _inheritsLoose(Input, _Component7);

  function Input() {
    return _Component7.apply(this, arguments) || this;
  }

  var _proto14 = Input.prototype;

  /**
   * Initialized the component.
   *
   * @internal
   *
   * @param elements - A collection of essential editor elements.
   */
  _proto14.mount = function mount(elements) {
    _Component7.prototype.mount.call(this, elements);

    this.listen();
  }
  /**
   * Listen to some events.
   */
  ;

  _proto14.listen = function listen() {
    var _this22 = this;

    var editable = this.elements.editable;
    this.bind(editable, 'keydown', this.onKeydown, this);
    this.bind(editable, isIE() ? 'textinput' : 'input', this.onInput, this);
    this.bind(editable, 'compositionstart', this.onCompositionStart, this);
    this.bind(editable, 'compositionupdate', this.onCompositionUpdate, this);
    this.bind(editable, 'compositionend', this.onCompositionEnd, this);
    this.on(EVENT_MOUNTED, function () {
      _this22.line = _this22.Chunk.elms[0];
      _this22.row = 0;
    });
    this.on(EVENT_FOCUS_LINE_CHANGED, function (e, line, row) {
      _this22.line = line;
      _this22.row = row;
    });
  }
  /**
   * Called when the composition starts.
   * Needs to emit the `change` event at this timing to save the start position.
   * Note that some browsers do not support a CompositionEvent object.
   *
   * @param e - A CompositionEvent object or a regular Event object.
   */
  ;

  _proto14.onCompositionStart = function onCompositionStart(e) {
    if (this.disabled) {
      var _Editor = this.Editor,
          _Selection3 = this.Selection;

      var range = _Selection3.get(false);

      getSelection().removeAllRanges();

      _Editor.blur();

      nextTick(function () {
        _Editor.focus();

        _Selection3.set(range.start, range.end);
      });
      return;
    }

    this.composing = true;
    this.set(COMPOSITION_INPUT_TYPE);
    this.emit(EVENT_COMPOSITION_START, e);
    this.emit(EVENT_CHANGE, COMPOSITION_INPUT_TYPE);
  }
  /**
   * Called whenever the composing content is updated.
   *
   * @param e - A CompositionEvent object or a regular Event object.
   */
  ;

  _proto14.onCompositionUpdate = function onCompositionUpdate(e) {
    var _this23 = this;

    nextTick(function () {
      _this23.Selection.update(_this23.getCaretPosition());

      _this23.emit(EVENT_COMPOSITION_UPDATE, e);
    });
  }
  /**
   * Called when the composition ends.
   *
   * @param e - A CompositionEvent object or a regular Event object.
   */
  ;

  _proto14.onCompositionEnd = function onCompositionEnd(e) {
    this.composing = false;
    this.apply();
    this.emit(EVENT_COMPOSITION_END, e);
  }
  /**
   * Called whenever any key is pressed.
   *
   * @param e - A KeyboardEvent object.
   */
  ;

  _proto14.onKeydown = function onKeydown(e) {
    var key = normalizeKey(e.key);
    var altKey = e.altKey,
        shiftKey = e.shiftKey;

    if (this.disabled && !ARROW_KEYS.includes(key)) {
      return prevent(e, true);
    }

    this.emit(EVENT_KEYDOWN, e);

    if (isPrevented(e)) {
      return;
    }

    this.info = this.lines.getInfoAt(this.getCaretPosition());
    this.set('input', {
      key: key
    });

    if (key === 'Enter') {
      this.handleEnter(e);
      return;
    }

    if (this.Selection.isCollapsed()) {
      if (key === 'Delete' && !shiftKey && !altKey) {
        this.handleDelete(e);
      } else if (key === 'Backspace' && !altKey) {
        this.handleBackspace(e);
      }
    }
  }
  /**
   * Called whenever any input is received.
   * Need to wait for the `compositionend` before calling `apply()`.
   */
  ;

  _proto14.onInput = function onInput(e) {
    this.emit(EVENT_INPUT, this, e);

    if (!this.composing) {
      this.apply();
    }
  }
  /**
   * Handles the Enter key.
   *
   * @param e - A KeyboardEvent object.
   */
  ;

  _proto14.handleEnter = function handleEnter(e) {
    if (!this.composing) {
      this.set('newline', {
        key: 'Enter',
        value: this.before + LINE_BREAK$1 + this.after,
        position: [this.row + 1, 0]
      });
      this.emit(EVENT_NEWLINE, this);
      this.apply();
      prevent(e);
    }
  }
  /**
   * Handles the delete key.
   *
   * @param e - A KeyboardEvent object.
   */
  ;

  _proto14.handleDelete = function handleDelete(e) {
    var row = this.row,
        lines = this.lines;

    if (this.col === this.value.length && row < lines.length - 1) {
      this.apply({
        type: 'deleteNext',
        key: 'Delete',
        value: this.value + lines[row + 1].text,
        startRow: row,
        endRow: row + 1
      });
      prevent(e);
    }
  }
  /**
   * Handles the backspace key.
   */
  ;

  _proto14.handleBackspace = function handleBackspace(e) {
    var row = this.row,
        col = this.col;

    if (col === 0) {
      if (row > 0) {
        var prev = this.lines[row - 1].text;
        this.apply({
          type: 'removePrev',
          key: 'Backspace',
          value: prev + this.value,
          startRow: row - 1,
          position: [row - 1, prev.length]
        });
      }

      prevent(e);
    }
  }
  /**
   * Appends a line break if the provided row is not the end of the document.
   *
   * @param value - A value where the line break will be appended.
   * @param row   - Optional. A row index.
   *
   * @return The value with the line break, or the provided value itself.
   */
  ;

  _proto14.appendLineBreak = function appendLineBreak(value, row) {
    if (row === void 0) {
      row = this.row;
    }

    return value + (row < this.lines.length - 1 ? LINE_BREAK$1 : '');
  }
  /**
   * Settles the final value to apply.
   *
   * @param value  - A value to settle.
   * @param endRow - An end row index.
   */
  ;

  _proto14.settleValue = function settleValue(value, endRow) {
    var state = this.state;

    if (state) {
      if (state.insertion) {
        value = this.before + state.insertion + this.after;
      } else if (!isUndefined$1(state.value)) {
        value = state.value;
      }
    }

    return this.appendLineBreak(value, endRow);
  }
  /**
   * Settles the final position to apply.
   *
   * @param position - A position to settle.
   */
  ;

  _proto14.settlePosition = function settlePosition(position) {
    var state = this.state;

    if (state) {
      if (state.position) {
        return state.position;
      }

      position[1] += state.offset || 0;
    }

    return position;
  }
  /**
   * Returns the current caret position.
   *
   * @return A position of the caret.
   */
  ;

  _proto14.getCaretPosition = function getCaretPosition() {
    return [this.row, this.col];
  }
  /**
   * Sets the input state.
   * If the state with the provided type exists, new props will be assigned to it.
   * The props object accepts following values:
   *
   * | State | Description |
   * |---|---|
   * | `key?` | The key that makes the input. |
   * | `startRow?` | The start row index to replace lines with the current value from. |
   * | `endRow?` | The end row index to replace lines with the current value to. |
   * | `value?` | The value to replace lines with. If omitted, the current value will be used. |
   * | `insertion?` | Specifies the value to insert at the caret position instead of setting the value. |
   * | `offset?` | The number of offset cols after the state is applied. |
   * | `position?` | Explicitly specifies the position after the state is applied. The `offset` will be ignored. |
   *
   * @param type  - The type of the state.
   * @param props - Optional. An object with state values.
   */
  ;

  _proto14.set = function set(type, props) {
    if (props === void 0) {
      props = {};
    }

    var state = this.state;

    if (state && state.type === type) {
      this.state = assign$1(state, props);
    } else {
      this.state = assign$1({
        type: type
      }, props);
    }
  }
  /**
   * Returns the current state object if available.
   *
   * @return The current state object if available, or `null` if not.
   */
  ;

  _proto14.get = function get() {
    return this.state;
  }
  /**
   * Applies the state to the editor and clears it.
   *
   * @example
   * ```ts
   * const ryuseiCode = new RyuseiCode();
   * ryuseiCode.apply( 'textarea' );
   *
   * ryuseiCode.on( 'focus', () => {
   *   const { Input } = ryuseiCode.Editor.Components;
   *
   *   setTimeout( () => {
   *     Input.apply( {
   *       insertion: 'foo',
   *       offset: 3,
   *     } );
   *   }, 1000 );
   * } );
   * ```
   *
   * @param state - Optional. A new state to apply.
   */
  ;

  _proto14.apply = function apply(state) {
    this.state = state || this.state;

    if (!this.state || !this.line) {
      return;
    }

    var Selection = this.Selection,
        row = this.row;
    var _this$state = this.state,
        type = _this$state.type,
        _this$state$startRow = _this$state.startRow,
        startRow = _this$state$startRow === void 0 ? row : _this$state$startRow,
        _this$state$endRow = _this$state.endRow,
        endRow = _this$state$endRow === void 0 ? row : _this$state$endRow;
    var position = this.getCaretPosition();

    if (type !== COMPOSITION_INPUT_TYPE) {
      this.emit(EVENT_CHANGE, type);
    }

    this.Code.replaceLines(startRow, endRow, this.settleValue(this.value, endRow));
    this.Sync.sync(startRow, endRow, endRow);
    Selection.set(this.settlePosition(position));
    this.emit(EVENT_CHANGED, type);
    this.state = null;
    this.info = null;
  }
  /**
   * Returns a character at the current caret position or specified col index.
   *
   * @param col - Optional. A col index of the desired character.
   *
   * @return A character at the specified position.
   */
  ;

  _proto14["char"] = function char(col) {
    if (col === void 0) {
      col = this.col;
    }

    return this.value.charAt(col);
  }
  /**
   * Returns the value of the current line without the tailing line break.
   *
   * @return A text of the current line.
   */
  ;

  _createClass(Input, [{
    key: "value",
    get: function get() {
      return text(this.line) || '';
    }
    /**
     * Sets a new value to the current line.
     * In most cases, it's better to use `apply()` to edit the line instead
     * because this does not syncs the change to the editor.
     *
     * @param value - A new value to set.
     */
    ,
    set: function set(value) {
      text(this.line, value);
    }
    /**
     * Returns the string of the current line before the caret position.
     *
     * @return The string before the caret.
     */

  }, {
    key: "before",
    get: function get() {
      return this.value.slice(0, this.col);
    }
    /**
     * Returns the string of the current line after the caret position.
     *
     * @return The string after the caret.
     */

  }, {
    key: "after",
    get: function get() {
      return this.value.slice(this.col);
    }
    /**
     * Returns the length of the current line.
     *
     * @return The length of the current line.
     */

  }, {
    key: "length",
    get: function get() {
      return this.value.length;
    }
    /**
     * Returns the current col index.
     *
     * @return The col index of the caret.
     */

  }, {
    key: "col",
    get: function get() {
      var line = this.line;
      var selection = getSelection();

      if (line && selection.rangeCount > 0) {
        var range = selection.getRangeAt(0).cloneRange();
        range.setStart(line, 0);
        return range.toString().length;
      }

      return 0;
    }
    /**
     * Returns `true` if the input is disabled.
     *
     * @internal
     *
     * @return `true` if the input is disabled.
     */

  }, {
    key: "disabled",
    get: function get() {
      return this._disabled;
    }
    /**
     * Makes the input disabled.
     * All keys are ignored while it is disabled.
     *
     * @internal
     *
     * @param disabled - Determines whether to disable or enable the input.
     */
    ,
    set: function set(disabled) {
      this._disabled = disabled;
    }
  }]);

  return Input;
}(Component);
/**
 * The component for detecting keyboard shortcuts and distributing them as internal events.
 *
 * @since 0.1.0
 */


var Keymap = /*#__PURE__*/function (_Component8) {
  _inheritsLoose(Keymap, _Component8);

  function Keymap() {
    var _this24;

    _this24 = _Component8.apply(this, arguments) || this;
    /**
     * Stores the target keys.
     */

    _this24.keys = [];
    return _this24;
  }
  /**
   * Initializes the component.
   *
   * @internal
   *
   * @param elements - A collection of essential elements.
   */


  var _proto15 = Keymap.prototype;

  _proto15.mount = function mount(elements) {
    var _this25 = this;

    _Component8.prototype.mount.call(this, elements);

    this.keymap = assign$1({}, KEYMAP$6, this.options.keymap);
    forOwn$1(this.keymap, function (matchers) {
      if (matchers) {
        var _this25$keys;

        (_this25$keys = _this25.keys).push.apply(_this25$keys, toArray(matchers, true).map(function (matcher) {
          return matcher[0].toUpperCase();
        }));
      }
    });
    this.on(EVENT_KEYDOWN, this.onKeydown, this, 0);
  }
  /**
   * Called when any key is pressed.
   *
   * @param e  - An EventBusEvent object.
   * @param ke - A KeyboardEvent object.
   */
  ;

  _proto15.onKeydown = function onKeydown(e, ke) {
    if (!this.Editor.readOnly) {
      if (includes(this.keys, normalizeKey(ke.key).toUpperCase())) {
        var action = this.find(ke);

        if (action) {
          this.emit(EVENT_KEYMAP + ":" + action, ke, action);
        }
      }
    }
  }
  /**
   * Finds the shortcut action from keymap definition.
   *
   * @param e - A KeyboardEvent object.
   *
   * @return A found action.
   */
  ;

  _proto15.find = function find(e) {
    var _this26 = this;

    var action = '';
    forOwn$1(this.keymap, function (matchers, id) {
      if (_this26.matches(e, id)) {
        action = id;
        return false;
      }
    });
    return action;
  }
  /**
   * Checks if the keyboard event matches keys of the provided action ID or not.
   *
   * @param e  - A KeyboardEvent object.
   * @param id - An ID.
   *
   * @return `true` if the keyboard event matches keys of the ID, or otherwise `false`.
   */
  ;

  _proto15.matches = function matches(e, id) {
    var matchers = this.keymap[id];
    return matchers && matchesKey(e, matchers);
  }
  /**
   * Builds a shortcut string that describes keys of the provided action ID or a KeyMatcher object.
   * For example, `undo` or `[ 'Z', true ]` will be `Ctrl+Z`.
   *
   * @param id - An action ID in the keymap or a KeyMatcher object line.
   *
   * @return A built shortcut string. If the ID is not available, it returns an empty string.
   */
  ;

  _proto15.getShortcut = function getShortcut(id) {
    var matchers = isString(id) ? this.keymap[id] : id;

    if (matchers) {
      var matcher = isArray(matchers[0]) ? matchers[0] : matchers;

      if (matcher) {
        var modifiers = MODIFIER_KEYS[isMac() ? 'mac' : 'default'];
        var keys = matcher.slice(1).map(function (use, index) {
          return use && modifiers[index];
        }).filter(Boolean);
        return keys.concat(matcher[0]).join('+');
      }
    }

    return '';
  };

  return Keymap;
}(Component);
/**
 * The utility class for measuring texts.
 *
 * @since 0.1.0
 */


var MeasureText = /*#__PURE__*/function () {
  /**
   * The MeasureText constructor.
   *
   * @param font - A font string for the context.
   */
  function MeasureText(font) {
    /**
     * Stores width of characters.
     */
    this.chars = {};
    this.context = _create('canvas').getContext('2d');
    this.context.font = font;
  }
  /**
   * Returns the width of the provided character.
   * Note that IE rounds the width of the text.
   *
   * @param char     - A character to measure.
   * @param useCache - Optional. Determines whether to use the cached width or not.
   *
   * @return The width of the character in pixel.
   */


  var _proto16 = MeasureText.prototype;

  _proto16.getCharWidth = function getCharWidth(_char2, useCache) {
    if (useCache === void 0) {
      useCache = true;
    }

    var chars = this.chars,
        context = this.context;
    return useCache && chars[_char2] || (chars[_char2] = isIE() ? context.measureText(repeat(_char2, 10)).width / 10 : context.measureText(_char2).width);
  }
  /**
   * Returns the width of the provided text.
   *
   * @param text     - A text to measure.
   * @param useCache - Optional. Determines whether to use the cached width or not.
   */
  ;

  _proto16.measure = function measure(text, useCache) {
    if (useCache === void 0) {
      useCache = true;
    }

    var width = 0;

    for (var i = 0; i < text.length; i++) {
      width += this.getCharWidth(text.charAt(i), useCache);
    }

    return width;
  }
  /**
   * Clears cached width.
   */
  ;

  _proto16.clear = function clear() {
    this.chars = {};
  };

  return MeasureText;
}();
/**
 * The class for measuring offset positions and caches some values.
 *
 * @since 0.1.0
 */


var Measure = /*#__PURE__*/function (_Component9) {
  _inheritsLoose(Measure, _Component9);

  /**
   * The Measure constructor.
   *
   * @param Editor - An Editor instance.
   */
  function Measure(Editor) {
    var _this27;

    _this27 = _Component9.call(this, Editor) || this;
    /**
     * Caches the DOMRect objects of some elements.
     */

    _this27.rectCaches = {};

    _this27.on(EVENT_MOUNT, _this27.onMount, _assertThisInitialized(_this27), 0);

    return _this27;
  }
  /**
   * Called just before components are mounted.
   * This component must be initialized earlier than other components.
   *
   * @param e        - An EventBusEvent object.
   * @param elements - A collection of essential editor elements.
   */


  var _proto17 = Measure.prototype;

  _proto17.onMount = function onMount(e, elements) {
    this.elements = elements;
    this.createMeasureText();
    this.updatePadding();
    this.listen();
  }
  /**
   * Listens to some events.
   * The resize handler must be executed after the Style update listener and before others.
   */
  ;

  _proto17.listen = function listen() {
    var _this28 = this;

    this.on(EVENT_RESIZE, function () {
      _this28.lineHeightCache = 0;

      _this28.updatePadding();

      _this28.createMeasureText();

      _this28.clearRectCaches();
    }, null, 1);
    this.on(EVENT_FONT_LOADED, function () {
      _this28.measureText.clear();
    }, null, 1);
    this.on([EVENT_SCROLL_HEIGHT_CHANGED, EVENT_SCROLLED, EVENT_WINDOW_SCROLL], this.clearRectCaches, this, 1);
  }
  /**
   * Updates the cache of the padding.
   */
  ;

  _proto17.updatePadding = function updatePadding() {
    var editor = this.elements.editor;
    var line = div(CLASS_LINE, editor);
    this.padding = {
      top: parseFloat(styles(editor, 'paddingTop')) || 0,
      bottom: parseFloat(styles(editor, 'paddingBottom')) || 0,
      left: parseFloat(styles(line, 'paddingLeft')) || 0,
      right: parseFloat(styles(line, 'paddingRight')) || 0
    };

    _remove(line);
  }
  /**
   * Creates a `MeasureText` instance only when the font settings are changed.
   */
  ;

  _proto17.createMeasureText = function createMeasureText() {
    var font = this.buildCSSFont();

    if (this.font !== font) {
      this.measureText = new MeasureText(font);
      this.font = font;
    }
  }
  /**
   * Returns the CSS font string of the current environment.
   *
   * @return A built string.
   */
  ;

  _proto17.buildCSSFont = function buildCSSFont() {
    var lines = this.elements.lines;
    return styles(lines, 'fontSize') + " " + styles(lines, 'fontFamily');
  }
  /**
   * Clears the all rect caches.
   */
  ;

  _proto17.clearRectCaches = function clearRectCaches() {
    this.rectCaches = {};
  }
  /**
   * Returns the top position of the line at the specified row.
   * This clamps the row index from 0 and the total length of lines.
   *
   * @param row - A row index.
   *
   * @return A top position in pixel.
   */
  ;

  _proto17.getTop = function getTop(row) {
    return clamp(row, 0, this.lines.length - 1) * this.lineHeight;
  }
  /**
   * Returns the bottom position of the line at the specified row.
   * This clamps the row index from 0 and the total length of lines.
   *
   * @param row - A row index.
   *
   * @return A bottom position in pixel.
   */
  ;

  _proto17.getBottom = function getBottom(row) {
    var Code = this.Code;
    var isLast = row >= Code.size - 1;
    return this.getTop(row + 1) + (isLast ? this.lineHeight : 0);
  }
  /**
   * Computes the closest row index to the offset `top` position.
   *
   * @param top - A offset position.
   *
   * @return The closest row index to the offset position.
   */
  ;

  _proto17.closest = function closest(top) {
    var row = round((top - this.padding.top) / this.lineHeight);
    return clamp(row, 0, this.lines.length - 1);
  }
  /**
   * Measures the provided string and returns the width.
   * This method caches each width of the character in the string for performance.
   *
   * @param string   - A string to measure.
   * @param useCache - Optional. Determines whether to use the cached width or not.
   *
   * @return The width of the string.
   */
  ;

  _proto17.measureWidth = function measureWidth(string, useCache) {
    if (useCache === void 0) {
      useCache = true;
    }

    return this.measureText.measure(string, useCache);
  }
  /**
   * Converts the passed position to the OffsetPosition object as `{ top: number, left: number }`.
   *
   * @param position - A position to convert.
   *
   * @return An object literal with top and left positions.
   */
  ;

  _proto17.getOffset = function getOffset(position) {
    var padding = this.padding;
    var line = position[0] === this.Selection.focus[0] ? this.Input.value : this.Code.getLine(position[0]); // console.log( line.slice( 0, position[ 1 ] ) );

    return {
      top: this.getTop(position[0]) + padding.top,
      left: this.measureWidth(line.slice(0, position[1])) + padding.left
    };
  }
  /**
   * Returns a DOMRect object of the editor element.
   *
   * @return A DOMRect object.
   */
  ;

  _createClass(Measure, [{
    key: "editorRect",
    get: function get() {
      return this.rectCaches.editor = this.rectCaches.editor || rect(this.elements.editor);
    }
    /**
     * Returns a DOMRect object of the scroller element.
     *
     * @return A DOMRect object.
     */

  }, {
    key: "scrollerRect",
    get: function get() {
      return this.rectCaches.scroller = this.rectCaches.scroller || rect(this.elements.scroller);
    }
    /**
     * Returns a DOMRect object of the container element.
     *
     * @return A DOMRect object.
     */

  }, {
    key: "containerRect",
    get: function get() {
      return this.rectCaches.container = this.rectCaches.container || rect(this.elements.container);
    }
    /**
     * Returns the editor line height in pixel.
     *
     * @return The line height in pixel.
     */

  }, {
    key: "lineHeight",
    get: function get() {
      return this.lineHeightCache = this.lineHeightCache || parseFloat(styles(this.elements.editor, 'lineHeight'));
    }
  }]);

  return Measure;
}(Component);
/**
 * The class for highlighting arbitrary texts.
 *
 * @since 0.1.0
 */


var Marker = /*#__PURE__*/function () {
  /**
   * The Marker constructor.
   *
   * @param Editor   - An Editor instance.
   * @param elements - A collection of editor elements.
   */
  function Marker(Editor, elements) {
    this.Editor = Editor;
    this.elements = elements;
    this.scroller = elements.scroller;
  }
  /**
   * Calculates boundaries for drawing the marker.
   *
   * @param anchor - An anchor position.
   * @param focus  - A focus position.
   *
   * @return An object with start and end boundaries.
   */


  var _proto18 = Marker.prototype;

  _proto18.calcBoundaries = function calcBoundaries(anchor, focus) {
    var Measure = this.Editor.Components.Measure;
    var isBackward = compare(anchor, focus) > 0;
    return {
      start: Measure.getOffset(isBackward ? focus : anchor),
      end: Measure.getOffset(isBackward ? anchor : focus)
    };
  }
  /**
   * Generates HTML of the marker.
   *
   * @param anchor   - An anchor position.
   * @param focus    - A focus position.
   * @param useCache - A focus position.
   *
   * @return The generated HTML string of the marker.
   */
  ;

  _proto18.html = function html(anchor, focus, useCache) {
    if (useCache === void 0) {
      useCache = true;
    }

    if (useCache && this.cache) {
      return this.cache;
    }

    var _this$Editor$Componen = this.Editor.Components.Measure,
        lineHeight = _this$Editor$Componen.lineHeight,
        padding = _this$Editor$Componen.padding;

    var _this$calcBoundaries = this.calcBoundaries(anchor, focus),
        start = _this$calcBoundaries.start,
        end = _this$calcBoundaries.end;

    var diff = end.top - start.top;
    var fillHeight = diff - lineHeight;
    var startLeft = max(start.left, padding.left);
    var html = '';

    if (diff) {
      html += this.buildLine(start.top, startLeft, '100%');
      html += this.buildLine(end.top, padding.left, max(end.left - padding.left, 0));

      if (fillHeight > 0) {
        html += this.buildLine(start.top + lineHeight, padding.left, '100%', fillHeight);
      }
    } else {
      html += this.buildLine(start.top, startLeft, max(end.left - startLeft, 0));
    }

    this.cache = html;
    return html;
  }
  /**
   * Builds HTML of each line.
   *
   * @param top    - A top position.
   * @param left   - A left position.
   * @param width  - Width.
   * @param height - Optional. Height.
   *
   * @return A generated HTML string.
   */
  ;

  _proto18.buildLine = function buildLine(top, left, width, height) {
    var styles = "top: " + unit(top) + "; left: " + unit(left) + "; width: " + unit(width) + ";";

    if (height) {
      styles += " height: " + unit(height) + ";";
    }

    return "<div class=\"" + CLASS_MARKER + "\" style=\"" + styles + "\"></div>";
  };

  return Marker;
}();
/**
 * The class for highlighting arbitrary texts.
 *
 * @since 0.1.0
 */


var StandaloneMarker = /*#__PURE__*/function (_Marker) {
  _inheritsLoose(StandaloneMarker, _Marker);

  /**
   * The Marker constructor.
   *
   * @param Editor   - An Editor instance.
   * @param elements - A collection of editor elements.
   * @param classes  - Optional. Class names for the wrapper element.
   */
  function StandaloneMarker(Editor, elements, classes) {
    var _this29;

    _this29 = _Marker.call(this, Editor, elements) || this;
    _this29.wrapper = div([CLASS_MARKERS].concat(classes), elements.background);
    return _this29;
  }
  /**
   * Draws the range for the anchor to the focus.
   *
   * @param anchor - An anchor position.
   * @param focus  - A focus position.
   */


  var _proto19 = StandaloneMarker.prototype;

  _proto19.draw = function draw(anchor, focus) {
    html$2(this.wrapper, this.html(anchor, focus, false));
  }
  /**
   * Clears the marker.
   */
  ;

  _proto19.clear = function clear() {
    html$2(this.wrapper, '');
  }
  /**
   * Checks if the provided client position is inside the current range or not.
   *
   * @param clientX - X position that is relative to the client.
   * @param clientY - Y position that is relative to the client.
   *
   * @return `true` if the position is inside the range, or otherwise `false`.
   */
  ;

  _proto19.isInside = function isInside(clientX, clientY) {
    var children = this.wrapper.children;

    for (var i = 0; i < children.length; i++) {
      var domRect = rect(children[i]);

      if (domRect.width && between(clientX, domRect.left, domRect.right) && between(clientY, domRect.top, domRect.bottom)) {
        return true;
      }
    }

    return false;
  }
  /**
   * Destroys the instance.
   */
  ;

  _proto19.destroy = function destroy() {
    _remove(this.wrapper);
  };

  return StandaloneMarker;
}(Marker);
/**
 * The modifier class for the selection marker.
 *
 * @since 0.1.0
 */


var CLASS_MARKER_SELECTION = CLASS_MARKERS + "--selection";
/**
 * The class for highlighting a selection range.
 *
 * @since 0.1.0
 */

var SelectionMarker = /*#__PURE__*/function (_StandaloneMarker) {
  _inheritsLoose(SelectionMarker, _StandaloneMarker);

  /**
   * The SelectionMarker constructor.
   *
   * @param editor   - An Editor instance.
   * @param elements - A collection of editor elements.
   */
  function SelectionMarker(editor, elements) {
    var _this30;

    _this30 = _StandaloneMarker.call(this, editor, elements, CLASS_MARKER_SELECTION) || this;

    _this30.listen();

    return _this30;
  }
  /**
   * Listens to some events.
   */


  var _proto20 = SelectionMarker.prototype;

  _proto20.listen = function listen() {
    var _this31 = this;

    var event = this.Editor.event;
    event.on(EVENT_SELECTED, this.onStateChanged.bind(this), this, 0);
    event.on(EVENT_SELECTING, rafThrottle(this.drawSelection.bind(this)));
    event.on(EVENT_RESIZE, function () {
      _this31.clear();

      _this31.drawSelection();
    });
  }
  /**
   * Called when the selection state is changed.
   *
   * @param e         - An EventBusEvent object.
   * @param Selection - A Selection instance.
   * @param state     - A new state.
   * @param prev      - A previous state.
   */
  ;

  _proto20.onStateChanged = function onStateChanged(e, Selection, state, prev) {
    if (Selection.is(COLLAPSED, CHANGED)) {
      this.clear();
    }

    if (Selection.is(CHANGED, SELECTED) && prev !== CLICKED_RIGHT) {
      this.drawSelection();
    }
  }
  /**
   * Draws the current selection.
   */
  ;

  _proto20.drawSelection = function drawSelection() {
    var Selection = this.Editor.Components.Selection;

    if (!Selection.isCollapsed()) {
      var range = Selection.get(false);
      this.draw(range.start, range.end);
    } else {
      this.clear();
    }
  };

  return SelectionMarker;
}(StandaloneMarker);
/**
 * The throttle duration for calling the `observe` method while scrolling.
 *
 * @since 0.1.0
 */


var OBSERVE_THROTTLE_DURATION = 200;
/**
 * Limits the number of ranges to register.
 *
 * @since 0.1.0
 */

var MAX_RANGES = 10000;
/**
 * The class for highlighting the selection and arbitrary ranges.
 *
 * @since 0.1.0
 */

var Range = /*#__PURE__*/function (_Component10) {
  _inheritsLoose(Range, _Component10);

  function Range() {
    var _this32;

    _this32 = _Component10.apply(this, arguments) || this;
    /**
     * Stores ranges with categorizing them into arbitrary groups.
     */

    _this32.ranges = {};
    /**
     * Stores wrapper elements of markers.
     */

    _this32.groups = {};
    return _this32;
  }
  /**
   * Initializes the component.
   *
   * @internal
   *
   * @param elements - A collection of editor elements.
   */


  var _proto21 = Range.prototype;

  _proto21.mount = function mount(elements) {
    _Component10.prototype.mount.call(this, elements);

    this.selection = new SelectionMarker(this.Editor, elements);
    var observe = this.observe.bind(this, false);
    this.on(EVENT_CHUNK_MOVED, throttle(observe, OBSERVE_THROTTLE_DURATION));
    this.on(EVENT_SCROLLED, observe);
    this.on([EVENT_FONT_LOADED, EVENT_RESIZE], this.observe.bind(this, true));
  }
  /**
   * Observes ranges and draw/hide them.
   *
   * @param refresh - Optional. If `true`, redraws markers without their caches.
   */
  ;

  _proto21.observe = function observe(refresh) {
    var _this33 = this;

    if (this.Editor) {
      forOwn$1(this.ranges, function (ranges, group) {
        if (_this33.groups[group]) {
          _this33.draw(group, refresh);
        }
      });
    }
  }
  /**
   * Draws visible markers.
   *
   * @param group   - A group to draw.
   * @param refresh - Optional. If `true`, redraws markers without their caches.
   */
  ;

  _proto21.draw = function draw(group, refresh) {
    var _this34 = this;

    var ranges = this.ranges[group];
    var html = '';
    ranges.forEach(function (data) {
      var range = data.range;

      if (_this34.isVisible(range)) {
        html += data.marker.html(range.start, range.end, !refresh);
      }
    });
    this.groups[group].innerHTML = html;
  }
  /**
   * Checks if the range should be drawn or not.
   * This returns `true` when the range boundary is inside the viewport, or the range contains it.
   *
   * @param range - A range to check.
   *
   * @return `true` if the range should be drawn or otherwise `false`.
   */
  ;

  _proto21.isVisible = function isVisible(range) {
    var Chunk = this.Chunk;
    var _range$start = range.start,
        startRow = _range$start[0];
    var _range$end = range.end,
        endRow = _range$end[0];
    return Chunk.includes(startRow) || Chunk.includes(endRow) || between(Chunk.start, startRow, endRow);
  }
  /**
   * Registers ranges to the group and draw them as markers.
   * They will remain until they are explicitly cleared by the `clear()` method.
   * If `concat` is `true`, sequential ranges will be concatenated as a single range.
   *
   * @example
   * ```ts
   * const ryuseiCode = new RyuseiCode();
   * ryuseiCode.apply( 'textarea' );
   *
   * const { Range } = ryuseiCode.Editor.Components;
   *
   * Range.register( 'my-ranges', [
   *   { start: [ 0, 0 ], end: [ 0, 5 ] },
   *   { start: [ 1, 0 ], end: [ 1, 3 ] },
   * ] );
   *
   * // Clear ranges after 2 seconds.
   * setTimeout( () => {
   *   Range.clear( 'my-ranges' );
   * }, 2000 );
   * ```
   *
   * @param group       - A group name.
   * @param ranges      - A range or ranges to draw.
   * @param concat      - Optional. Determines whether to concat sequential ranges into the single one or not.
   * @param constructor - Optional. Specifies the Marker constructor.
   */
  ;

  _proto21.register = function register(group, ranges, concat, constructor) {
    if (concat === void 0) {
      concat = true;
    }

    if (constructor === void 0) {
      constructor = Marker;
    }

    var info = this.ranges;
    var lastRange;
    info[group] = info[group] || [];
    ranges = ranges.slice(0, MAX_RANGES);

    for (var i = 0; i < ranges.length; i++) {
      var range = ranges[i];

      if (concat && lastRange && compare(lastRange.end, range.start) === 0) {
        lastRange.end = range.end;
      } else {
        lastRange = {
          start: range.start,
          end: range.end
        };
        info[group].push({
          range: lastRange,
          marker: new constructor(this.Editor, this.elements)
        });
      }
    }

    if (!this.groups[group]) {
      var classes = [CLASS_MARKERS, CLASS_MARKERS + "--" + group];
      this.groups[group] = div(classes, this.elements.background);
    }

    this.observe();
  }
  /**
   * Clears ranges and rendered markers that belong to the specified group.
   * If the group name is omitted, this method clears all ranges.
   *
   * @param group - Optional. A group name to clear.
   */
  ;

  _proto21.clear = function clear(group) {
    var _this35 = this;

    if (group) {
      var ranges = this.ranges[group];

      if (ranges) {
        text(this.groups[group], '');
        this.clearRanges(group);
      }
    } else {
      forOwn$1(this.ranges, function (markers, key) {
        _this35.clear(key);
      });
    }
  }
  /**
   * Clears ranges in the specified group, but rendered markers will remain.
   *
   * @param group - A group name to clear.
   */
  ;

  _proto21.clearRanges = function clearRanges(group) {
    this.ranges[group] = [];
  };

  return Range;
}(Component);
/**
 * The class for checking a current state or category.
 * States and categories are defined by language tokenizers.
 *
 * @since 0.1.0
 */


var Scope = /*#__PURE__*/function (_Component11) {
  _inheritsLoose(Scope, _Component11);

  function Scope() {
    return _Component11.apply(this, arguments) || this;
  }

  var _proto22 = Scope.prototype;

  /**
   * Checks if the current or specified position is in the specified state or category.
   * With the `!` negating notation, this returns `true` if the position is NOT inside the scope.
   *
   * Note that the Lexer (RyuseiLight) determines states and categories.
   *
   * @example
   * ```ts
   * // Returns `true` if the caret is inside a comment.
   * Scope.isIn( [ 'comment' ] );
   *
   * // Returns `true` if the caret is inside a "attr" state.
   * Scope.isIn( [ '#attr' ] );
   *
   * // Returns `true` if the caret is not inside a comment and a string.
   * Scope.isIn( [ '!comment', '!string' ] );
   * ```
   *
   * @param names    - A name or an array with names of states and/or categories.
   * @param position - Optional. Specifies the position to check.
   *
   * @return `true` if the start position is inside the scope.
   */
  _proto22.isIn = function isIn(names, position) {
    names = toArray(names);
    var states = names.filter(function (name) {
      return name.indexOf('#') > -1;
    });
    var categories = names.filter(function (name) {
      return name.indexOf('#') === -1;
    });
    return this.inState(states, position) && this.inCategory(categories, position);
  }
  /**
   * Checks if the current or specified position is in the specified state or not.
   * The `!` negating notation is acceptable.
   *
   * @param states   - A name or an array with names of states.
   * @param position - Optional. Specifies the position to check.
   */
  ;

  _proto22.inState = function inState(states, position) {
    return this.inScope(states, false, position);
  }
  /**
   * Checks if the current or specified position is in the specified category or not.
   * The `!` negating notation is acceptable.
   *
   * @param categories - A name or an array with names of categories.
   * @param position   - Optional. Specifies the position to check.
   */
  ;

  _proto22.inCategory = function inCategory(categories, position) {
    return this.inScope(categories, true, position);
  }
  /**
   * Checks if the current start position is in the specified state or not.
   * If `category` is `true`, this method checks if the position is in the category or not.
   *
   * @param names    - A state or state names.
   * @param category - Optional. Determines whether to check for a category or not.
   * @param position - Optional. Specifies the position to check.
   */
  ;

  _proto22.inScope = function inScope(names, category, position) {
    var _this36 = this;

    names = toArray(names);
    var negated = names.filter(function (name) {
      return startsWith$1(name, '!');
    }).map(function (name) {
      return name.slice(1);
    });

    if (negated.length && this.inScope(negated, category)) {
      return false;
    }

    names = names.filter(function (name) {
      return !startsWith$1(name, '!');
    });
    return !names.length || names.some(function (name) {
      var info = _this36.lines.getInfoAt(position || _this36.Selection.get().start);

      return info && info[category ? 'category' : 'state'] === name;
    });
  };

  return Scope;
}(Component);
/**
 * Sets the `contentEditable` attribute of the provided element.
 *
 * @param elm      - An element.
 * @param editable - Whether to set the value to `true` or `false`.
 */


function toggleEditable(elm, editable) {
  elm.contentEditable = editable ? 'true' : 'false';
}
/**
 * The origin position.
 *
 * @since 0.1.0
 */


var ORIGIN = [0, 0];
/**
 * The delay time for reselection after scroll ends.
 *
 * @since 0.1.0
 */

var DELAY_FOR_RESELECTION = 5;
/**
 * The class for provides the simple event system.
 *
 * @since 0.1.0
 */

var EventBus = /*#__PURE__*/function () {
  /**
   * The EventBus constructor.
   *
   * @param owner - Optional. The owner of the instance.
   */
  function EventBus(owner) {
    /**
     * Holds all handlers.
     */
    this.handlers = {};
    this.owner = owner;
  }
  /**
   * Registers an event handler.
   *
   * @param events   - An event name or names separated by spaces. Use a dot(.) to add a namespace.
   * @param callback - A callback function to register.
   * @param key      - Optional. An object for an identifier of the handler.
   * @param priority - Optional. A priority number for the order in which the callbacks are invoked.
   *                   Lower numbers correspond with earlier execution. The default value is 10.
   */


  var _proto23 = EventBus.prototype;

  _proto23.on = function on(events, callback, key, priority) {
    var _this37 = this;

    if (priority === void 0) {
      priority = 10;
    }

    toArray(events).filter(Boolean).join(' ').split(' ').forEach(function (eventNS) {
      var _eventNS$split = eventNS.split('.'),
          event = _eventNS$split[0],
          namespace = _eventNS$split[1];

      var eventHandlers = _this37.handlers[event] || [];
      eventHandlers.push({
        event: event,
        callback: callback,
        namespace: namespace,
        priority: priority,
        key: key
      });
      eventHandlers.sort(function (handler1, handler2) {
        return handler1.priority - handler2.priority;
      });
      _this37.handlers[event] = eventHandlers;
    });
  }
  /**
   * Removes event handlers registered by `on()`.
   * If only the event name is provided, all handlers that associate with the event are removed.
   * If the event name and namespace are specified, handlers that associate with the event and namespace are removed.
   *
   * @param events - An event name or names separated by spaces. Use a dot(.) to add a namespace.
   * @param key    - Optional. An object for an identifier of the handler.
   */
  ;

  _proto23.off = function off(events, key) {
    var _this38 = this;

    toArray(events).filter(Boolean).join(' ').split(' ').forEach(function (eventNS) {
      var _eventNS$split2 = eventNS.split('.'),
          event = _eventNS$split2[0],
          namespace = _eventNS$split2[1];

      var eventHandlers = _this38.handlers[event];

      if (eventHandlers) {
        if (key || namespace) {
          _this38.handlers[event] = eventHandlers.filter(function (handler) {
            return !(handler.key === key && handler.namespace === namespace);
          });
        } else {
          _this38.handlers[event] = [];
        }
      }
    });
  }
  /**
   * Triggers callback functions.
   *
   * @param event - An event name.
   * @param args  - Optional. Any number of arguments to pass to callback functions.
   */
  ;

  _proto23.emit = function emit(event) {
    for (var _len10 = arguments.length, args = new Array(_len10 > 1 ? _len10 - 1 : 0), _key10 = 1; _key10 < _len10; _key10++) {
      args[_key10 - 1] = arguments[_key10];
    }

    var eventHandlers = this.handlers[event];
    var eventObject = {
      type: event,
      owner: this.owner
    };

    if (eventHandlers) {
      eventHandlers.forEach(function (handler) {
        handler.callback.apply(handler, [eventObject].concat(args));
      });
    }
  }
  /**
   * Removes all handlers.
   */
  ;

  _proto23.destroy = function destroy() {
    this.handlers = {};
  };

  return EventBus;
}();
/**
 * The class for providing a simple state system.
 *
 * @since 0.1.0
 */


var State$1 = /*#__PURE__*/function () {
  /**
   * The State constructor.
   *
   * @param initial - An initial state.
   */
  function State$1(initial) {
    /**
     * The EventBus instance.
     */
    this.event = new EventBus();
    this.state = initial;
  }
  /**
   * Sets a new state.
   *
   * @param state - A state to change to.
   */


  var _proto24 = State$1.prototype;

  _proto24.set = function set(state) {
    if (this.state !== state && !this.held) {
      this.prev = this.state;
      this.state = state;
      this.event.emit('changed', state, this.prev);
    }
  }
  /**
   * Checks if the current state is a provided one or one of them.
   * If multiple states are passed, this method checks them by the `or` condition.
   *
   * @param states - A state or states to check.
   */
  ;

  _proto24.is = function is() {
    for (var _len11 = arguments.length, states = new Array(_len11), _key11 = 0; _key11 < _len11; _key11++) {
      states[_key11] = arguments[_key11];
    }

    return includes(slice(states), this.state);
  }
  /**
   * Checks if the previous state is a provided one or one of them.
   * If multiple states are passed, this method checks them by the `or` condition.
   *
   * @param states - A state or states to check.
   */
  ;

  _proto24.isPrev = function isPrev() {
    for (var _len12 = arguments.length, states = new Array(_len12), _key12 = 0; _key12 < _len12; _key12++) {
      states[_key12] = arguments[_key12];
    }

    return includes(slice(states), this.prev);
  }
  /**
   * Holds the current state so that it won't change.
   */
  ;

  _proto24.hold = function hold() {
    this.held = true;
  }
  /**
   * Disables to hold the state.
   */
  ;

  _proto24.release = function release() {
    this.held = false;
  }
  /**
   * Registers the event handler.
   *
   * @param events   - An event name or names separated by spaces.
   * @param callback - A callback function to register.
   * @param priority - Optional. A priority number for the order in which the callbacks are invoked.
   */
  ;

  _proto24.on = function on(events, callback, priority) {
    this.event.on(events, callback, this, priority);
  };

  return State$1;
}();
/**
 * The class for observing the selection states.
 *
 * @since 0.1.0
 */


var State = /*#__PURE__*/function (_State$) {
  _inheritsLoose(State, _State$);

  /**
   * The State constructor.
   *
   * @param Editor - An Editor instance.
   */
  function State(Editor) {
    var _this39;

    _this39 = _State$.call(this, IDLE) || this;
    /**
     * The WeakMap key for identifying event handlers(just uses a new empty object).
     */

    _this39.key = {};
    _this39.Editor = Editor;
    _this39.elements = Editor.elements;
    _this39.Selection = Editor.Components.Selection;

    _this39.listen();

    return _this39;
  }
  /**
   * Listens to some events.
   * Note that the `mouseup` event of `window` needs to be listened to instead of the editable element,
   * because users may release the mouse outside of it.
   */


  var _proto25 = State.prototype;

  _proto25.listen = function listen() {
    var editable = this.elements.editable;
    var event = this.Editor.event;
    var key = this.key;
    var onKeydown = this.onKeydown.bind(this);
    on(document, 'selectionchange', this.onSelectionChange.bind(this), key);
    on(window, 'pointerup', this.onSelectionEnd.bind(this), key);
    on(editable, 'pointerdown', this.onSelectionStart.bind(this), key);
    on(editable, 'keydown', onKeydown, key);
    on(editable, 'keyup', this.onKeyup.bind(this), key);
    event.on(EVENT_FOCUS, this.onFocus.bind(this));
    event.on(EVENT_BLUR, this.onBlur.bind(this));
  }
  /**
   * Called when the editor is focused.
   */
  ;

  _proto25.onFocus = function onFocus() {
    if (this.is(IDLE)) {
      this.set(COLLAPSED);
    }
  }
  /**
   * Called when the editor is blurred.
   * Needs to check the Components existence because this may be called after destruction.
   */
  ;

  _proto25.onBlur = function onBlur() {
    if (this.Editor.Components) {
      if (!this.isFocused()) {
        this.set(IDLE);
      }
    }
  }
  /**
   * Called whenever the selection of the document is changed.
   * - Only handles the change made by the editable element.
   * - Detects the selection change that made by the start action, such as `pointerdown` and
   *   makes the state go into the `CHANGED` state.
   * - If the selection changes after `CHANGED`, which means user selects texts and the range is not collapsed,
   *   makes the state go into the `SELECTING` state.
   * - In FF, the event is sometimes fired after `pointerdown`.
   * - In iOS, the event is fired after `pointerup`.
   */
  ;

  _proto25.onSelectionChange = function onSelectionChange() {
    if (activeElement() !== this.Editor.elements.editable) {
      return;
    }

    if (this.is(START, EXTEND)) {
      this.set(CHANGED);
    } else if (this.is(CHANGED)) {
      this.set(SELECTING);
    } else if (this.is(COLLAPSED, SELECTED)) {
      if (getSelection().isCollapsed) {
        this.set(CHANGED);
        this.set(COLLAPSED);
      } else {
        this.set(SELECTING);
        this.set(SELECTED);
      }
    }
  }
  /**
   * Called when the pointer becomes active or when arrow keys are pressed.
   * If a shift key is pressed,
   * that means the existing selection is being updated instead that a new one is created.
   *
   * @param e - An event object.
   */
  ;

  _proto25.onSelectionStart = function onSelectionStart(e) {
    if (isPrevented(e)) {
      return;
    }

    this.device = e instanceof PointerEvent ? 'pointer' : 'keyboard';
    var Selection = this.Selection;

    if (e instanceof PointerEvent) {
      if (e.button === 2 && Selection.isInside(e.clientX, e.clientY)) {
        this.set(CLICKED_RIGHT);
        return;
      }
    }

    this.set(e.shiftKey ? EXTEND : START);
  }
  /**
   * Called when the `pointerup` or `keyup` event is triggered on the window object.
   * Note that the state goes into `SELECTED` when the previous state is `EXTEND`
   * even if the native selection is collapsed,
   * because an anchor node may disappear after scrolling.
   * The selection is correctly handled by the Selection class.
   */
  ;

  _proto25.onSelectionEnd = function onSelectionEnd() {
    if (this.device && !this.is(IDLE)) {
      this.device = null;

      if (!this.is(CLICKED_RIGHT)) {
        if (this.is(EXTEND)) {
          this.set(SELECTED);
        } else {
          this.set(END);
          this.set(getSelection().isCollapsed ? COLLAPSED : SELECTED);
        }
      }
    }
  }
  /**
   * Called when any key is pressed.
   *
   * @param e - A KeyboardEvent object.
   */
  ;

  _proto25.onKeydown = function onKeydown(e) {
    if (includes(ARROW_KEYS, normalizeKey(e.key))) {
      this.onSelectionStart(e);
    }
  }
  /**
   * Called when any key is released.
   *
   * @param e - A KeyboardEvent object.
   */
  ;

  _proto25.onKeyup = function onKeyup(e) {
    if (includes(ARROW_KEYS, normalizeKey(e.key))) {
      this.onSelectionEnd();
    }
  }
  /**
   * Checks if the editor or the context menu has focus or not.
   *
   * @return `true` if they have focus or otherwise `false`.
   */
  ;

  _proto25.isFocused = function isFocused() {
    return this.elements.editor.contains(activeElement()) || this.Editor.Components.ContextMenu.isFocused();
  }
  /**
   * Should be called when the custom selection is manually updated.
   *
   * @param collapsed - Indicates whether the new selection is collapsed or not.
   */
  ;

  _proto25.update = function update(collapsed) {
    if (!this.is(START, EXTEND)) {
      this.set(UPDATE);
      this.set(collapsed ? COLLAPSED : SELECTED);
    }
  }
  /**
   * Attempts to refresh the selection state.
   *
   * @param collapsed - Indicates whether the new selection is collapsed or not.
   */
  ;

  _proto25.refresh = function refresh(collapsed) {
    if (!this.is(START, EXTEND)) {
      this.set(START);
      this.set(CHANGED);
      this.set(collapsed ? COLLAPSED : SELECTED);
    }
  }
  /**
   * Destroys the instance.
   */
  ;

  _proto25.destroy = function destroy() {
    this.event.destroy();
    off(null, '', this.key);
  };

  return State;
}(State$1);
/**
 * The class for handing both a native and custom selection.
 *
 * @since 0.1.0
 */


var Selection = /*#__PURE__*/function (_Component12) {
  _inheritsLoose(Selection, _Component12);

  function Selection() {
    var _this40;

    _this40 = _Component12.apply(this, arguments) || this;
    /**
     * The collection of selection states.
     *
     * | State | Description |
     * |---|---|
     * | `IDLE` | The editor is not active. |
     * | `COLLAPSED` | The selection is collapsed. |
     * | `START` | The selection will change soon. The native selection has not been updated at this timing. |
     * | `CHANGED` | Fired every time when the tween is updated. |
     * | `UPDATE` | The selection has just changed after the `START` state. The native selection has been updated. |
     * | `SELECTING` | An user starts selecting texts. |
     * | `EXTEND` | The existing selection is being extended. |
     * | `END` | User finishes the selection. The native selection has not been updated at this timing (in FF). |
     * | `SELECTED` | The selection is settled and it is not collapsed. |
     * | `SELECTED_ALL` | All contents are selected. |
     * | `CLICKED_RIGHT` | The selection is right-clicked. |
     */

    _this40.STATES = STATES;
    /**
     * The position where the selection starts.
     *
     * @readonly
     */

    _this40.anchor = ORIGIN;
    /**
     * The position where the selection ends.
     *
     * @readonly
     */

    _this40.focus = ORIGIN;
    return _this40;
  }
  /**
   * Initializes the component.
   *
   * @internal
   *
   * @param elements - A collection of essential elements.
   */


  var _proto26 = Selection.prototype;

  _proto26.mount = function mount(elements) {
    _Component12.prototype.mount.call(this, elements);

    this.state = new State(this.Editor);
    this.listen();
  }
  /**
   * Listens to some events.
   */
  ;

  _proto26.listen = function listen() {
    var editable = this.elements.editable;
    this.bind(document, 'selectionchange', this.onSelectionChange, this);

    if (isIE()) {
      this.bind(editable, 'dblclick', this.onDblClick, this);
    } else {
      this.bind(editable, 'mousedown', this.onMouseDown, this);
    }

    this.state.on('changed', this.onStateChanged.bind(this));
    this.on([EVENT_SCROLLER_SCROLL, EVENT_WINDOW_SCROLL], this.onScroll, this);
    this.on(EVENT_SCROLLED, this.ensureSelection, this);
  }
  /**
   * Called whenever the selection is changed.
   * Be aware that this is fired even when the editor is not focused.
   */
  ;

  _proto26.onSelectionChange = function onSelectionChange() {
    if (this.isFocused()) {
      if (this.is(SELECTING, EXTEND)) {
        var _focus = this.getNativeSelection(true);

        if (_focus) {
          this.focus = _focus;
          this.emit(EVENT_SELECTING);
        }
      }

      this.emit(EVENT_SELECTION_CHANGE);
    }
  }
  /**
   * Called when the mouse button is pressed.
   * Detects the double-click earlier than the `dblclick` to prevent the native smart selection.
   *
   * @param e - A MouseEvent object.
   */
  ;

  _proto26.onMouseDown = function onMouseDown(e) {
    if (e.detail > 1) {
      this.onDblClick();
      prevent(e);
    }
  }
  /**
   * Called when the code element is double-clicked.
   * If a word is clicked, selects it. Otherwise, selects a clicked node.
   */
  ;

  _proto26.onDblClick = function onDblClick() {
    var range = this.getWordRangeAt(this.anchor);

    if (range) {
      this.set(range.start, range.end);
    } else {
      var boundary = this.getNativeSelectionBoundary(false);

      if (boundary) {
        var node = boundary.node;
        var selection = getSelection();

        var _range = createRange();

        _range.selectNode(node);

        selection.removeAllRanges();
        selection.addRange(_range);
        var anchor = this.getNativeSelection();

        var _focus2 = this.getNativeSelection(true);

        if (anchor && _focus2) {
          this.set(anchor, _focus2);
        }
      }
    }
  }
  /**
   * Called whenever the selection state is changed.
   *
   * - Updating positions at the `START` state is too early
   *   because the native selection has not been updated yet.
   * - Jumps to the focus position just before extending the existing selection by a keyboard
   *   so that the native selection is able to be updated.
   * - The `EVENT_SELECTING` event must be emitted after `EVENT_SELECTED` event
   *   for listeners to prepare something at the `SELECTING` state.
   * - When the state goes into `SELECTED` state, the custom selection may be collapsed,
   *   e.g. single backward selection -> shift + arrow. To make sure the state becomes `COLLAPSED`,
   *   sets the native selection.
   *
   * @param e     - An EventBusEvent object.
   * @param state - A state number.
   * @param prev  - A previous state number.
   */
  ;

  _proto26.onStateChanged = function onStateChanged(e, state, prev) {
    if (prev !== UPDATE && prev !== CLICKED_RIGHT) {
      if (state === COLLAPSED || state === CHANGED || state === SELECTED) {
        this.anchor = this.getNativeSelection() || this.anchor;
        this.focus = this.getNativeSelection(true) || this.focus;
      }

      if (prev !== START && state === SELECTED) {
        if (this.detectSelectAll()) {
          var lines = this.lines,
              length = this.lines.length;
          var lastLineLength = lines[length - 1].text.length;

          if (compare(this.anchor, [0, 0]) !== 0 || compare(this.focus, [length - 1, lastLineLength]) !== 0) {
            this.selectAll();
            return;
          }
        }
      }
    }

    this.emit(EVENT_SELECTED, this, state, prev);

    if (state === SELECTING) {
      this.emit(EVENT_SELECTING);
    }
  }
  /**
   * Called when the window or scroller scrolls.
   */
  ;

  _proto26.onScroll = function onScroll() {
    var Input = this.Input;
    var top = window.pageYOffset + this.elements.scroller.scrollTop;

    if (this.isMultiline() && !Input.disabled && top !== this.scrollTop) {
      this.Input.disabled = true;
      this.scrollTop = top;
    }
  }
  /**
   * Sets a new selection.
   *
   * @param anchor - An anchor position.
   * @param focus  - Optional. A focus position. If omitted, the selection will be collapsed to the anchor.
   */
  ;

  _proto26.set = function set(anchor, focus) {
    this.setNativeSelection(anchor, focus) || this.update(anchor, focus);
  }
  /**
   * Returns positions of the current selection.
   * If the `normalize` is `true`, the `start` will be always preceding position.
   *
   * @param normalize - Optional. Whether to normalize the position or not.
   *
   * @return An object literal with anchor and focus positions.
   */
  ;

  _proto26.get = function get(normalize) {
    if (normalize === void 0) {
      normalize = true;
    }

    var anchor = this.anchor,
        focus = this.focus;
    var isBackward = this.isBackward();
    return {
      start: isBackward && normalize ? focus : anchor,
      end: isBackward && normalize ? anchor : focus
    };
  }
  /**
   * Updates the custom selection range without using the native selection.
   *
   * @param anchor   - An anchor position.
   * @param focus    - Optional. A focus position.
   * @param silently - Optional. Whether to change the state or not.
   */
  ;

  _proto26.update = function update(anchor, focus, silently) {
    this.anchor = anchor;
    this.focus = focus || anchor;

    if (!silently) {
      this.state.update(this.isCollapsed());
    }
  }
  /**
   * Selects the current or specified line.
   *
   * @param row       - Optional. A row index where to select.
   * @param refresh   - Optional. Determines whether to refresh the current selection or not.
   * @param backwards - Optional. Determines whether to select a line backwards or not.
   */
  ;

  _proto26.selectLine = function selectLine(row, refresh, backwards) {
    if (row === void 0) {
      row = this.focus[0];
    }

    if (refresh === void 0) {
      refresh = true;
    }

    var lines = this.lines;
    var line = lines[row];

    if (line) {
      var _start = [row, 0];
      var end = row < lines.length - 1 ? [row + 1, 0] : [row, line.text.length];
      var anchor = backwards ? end : _start;

      var _focus3 = backwards ? _start : end;

      if (refresh) {
        this.set(anchor, _focus3);
      } else {
        this.update(anchor, _focus3, true);
      }
    }
  }
  /**
   * Selects again the current selection.
   */
  ;

  _proto26.reselect = function reselect() {
    this.set(this.anchor, this.focus);
  }
  /**
   * Selects the whole code.
   */
  ;

  _proto26.selectAll = function selectAll() {
    var lines = this.lines;
    var endRow = lines.length - 1;
    this.set([0, 0], [endRow, lines[endRow].text.length]);
  }
  /**
   * Holds the current state so that it won't change.
   */
  ;

  _proto26.hold = function hold() {
    this.state.hold();
  }
  /**
   * Disables to hold the state so that it will change.
   */
  ;

  _proto26.release = function release() {
    this.state.release();
  }
  /**
   * Converts the selection to a string.
   * This returns an empty string when the selection is collapsed.
   *
   * @return A string representing the current selection.
   */
  ;

  _proto26.toString = function toString() {
    var range = this.get();
    return this.Code.sliceRange(range.start, range.end);
  }
  /**
   * Returns the DOMRect object of the native selection boundary.
   * Note that the boundary node is usually a Text node,
   * but sometimes the line or the editable element.
   *
   * @param focus - Determines whether to get the DOMRect of the focus or anchor node.
   *
   * @return A DOMRect object if available, or otherwise `null`.
   */
  ;

  _proto26.getRect = function getRect(focus) {
    var boundary = this.getNativeSelectionBoundary(focus);

    if (boundary) {
      var node = boundary.node,
          offset = boundary.offset;

      while (isHTMLElement(node)) {
        node = node.firstChild;
        offset = 0;

        if (isBr(node)) {
          return rect(node);
        }
      }

      if (node) {
        var range = createRange();
        range.setStart(node, offset);
        range.collapse(true);
        return rect(range);
      }
    }

    return null;
  }
  /**
   * Returns the current location as a string formatted by the i18n definition, such as `'Line: %s, Column: %s'`.
   *
   * @return A string that describes the current location.
   */
  ;

  _proto26.getLocation = function getLocation() {
    var focus = this.focus;
    return format(this.i18n.location, focus[0] + 1, focus[1] + 1);
  }
  /**
   * Checks if the selection state is one of the provided states or not.
   * This is just an alias of the `state.is()` method.
   *
   * @example
   * ```ts
   * // Checks if the state is COLLAPSED or not:
   * Selection.is( Selection.STATES.COLLAPSED );
   *
   * // Checks if the state is START, EXTEND or not:
   * Selection.is( Selection.STATES.START, Selection.STATES.EXTEND );
   * ```
   *
   * @param states - A state or states to check.
   *
   * @return `true` if the current state is one of the provided states, or otherwise `false`.
   */
  ;

  _proto26.is = function is() {
    var _this$state2;

    return (_this$state2 = this.state).is.apply(_this$state2, arguments);
  }
  /**
   * Collapses the selection to the anchor or focus position.
   *
   * @param toFocus - Optional. Collapses the selection to the focus position.
   */
  ;

  _proto26.collapse = function collapse(toFocus) {
    this.set(toFocus ? this.focus : this.anchor);
  }
  /**
   * Checks is the selection is backward or not.
   *
   * @return `true` if the selection is backward, or otherwise `false`.
   */
  ;

  _proto26.isBackward = function isBackward() {
    return compare(this.anchor, this.focus) > 0;
  }
  /**
   * Checks if the selection is collapsed or not.
   *
   * @return `true` if the selection is collapsed, or otherwise `false`.
   */
  ;

  _proto26.isCollapsed = function isCollapsed() {
    return compare(this.anchor, this.focus) === 0;
  }
  /**
   * Checks if more than one line is selected or not.
   *
   * @return `true` if more than one line is selected or otherwise `false`.
   */
  ;

  _proto26.isMultiline = function isMultiline() {
    return this.anchor[0] !== this.focus[0];
  }
  /**
   * Checks if the provided client position is inside the current selection or not.
   *
   * @param clientX - The X position that is relative to the client.
   * @param clientY - The Y position that is relative to the client.
   *
   * @return `true` if the position is inside the selection, or otherwise `false`.
   */
  ;

  _proto26.isInside = function isInside(clientX, clientY) {
    return this.Range.selection.isInside(clientX, clientY);
  }
  /**
   * Destroys the instance.
   *
   * @internal
   */
  ;

  _proto26.destroy = function destroy() {
    this.state.destroy();

    _Component12.prototype.destroy.call(this);
  }
  /**
   * Sets a native selection range.
   * Be aware that calling `setSelection` emits `selectionchange` only in IE, but does not in others.
   *
   * @param start - A start position.
   * @param end   - Optional. An end position. If omitted, the start position is used alternatively.
   *
   * @return `true` if the selection is successfully changed, or otherwise `undefined`.
   */
  ;

  _proto26.setNativeSelection = function setNativeSelection(start, end) {
    if (end === void 0) {
      end = start;
    }

    var Chunk = this.Chunk;
    var isSingle = start[0] === end[0];
    var startLine = Chunk.getLine(start[0]) || Chunk.addPreservedLine(false, start[0]);
    var endLine = isSingle ? startLine : Chunk.getLine(end[0]) || Chunk.addPreservedLine(true, end[0]);
    var collapsed = compare(start, end) === 0;
    var anchor = findSelectionBoundary(startLine, start[1]);
    var focus = collapsed ? anchor : findSelectionBoundary(endLine, end[1]);

    if (anchor && focus) {
      var anchorNode = anchor.node;
      var focusNode = focus.node;
      anchor.node = isBr(anchorNode) ? anchorNode.parentNode : anchorNode;
      focus.node = isBr(focusNode) ? focusNode.parentNode : focusNode;
      this.hold();
      setSelection(anchor, focus);
      this.release();
      this.state.refresh(collapsed);
    }

    return true;
  }
  /**
   * Converts the native selection boundary to a position represented as [ row, col ].
   * In FF, the selection
   *
   * @param focus - Optional. Whether to returns a position on the focus boundary or not.
   *
   * @return A converted position. If the position is not found, always returns [ 0, 0 ].
   */
  ;

  _proto26.getNativeSelection = function getNativeSelection(focus) {
    var line = this.findActiveLine(focus);
    var boundary = this.getNativeSelectionBoundary(focus);

    if (line && boundary) {
      var _Chunk = this.Chunk;
      var range = createRange();
      range.setStart(line, 0);
      range.setEnd(boundary.node, boundary.offset);

      var row = _Chunk.getRow(line);

      if (row < 0) {
        var anchor = _Chunk.getBoundary(false);

        var _focus4 = _Chunk.getBoundary(true);

        if (anchor.line === line) {
          row = anchor.row;
        } else if (_focus4.line === line) {
          row = _focus4.row;
        }
      }

      if (row > -1) {
        return [row, range.toString().length];
      }
    }

    return null;
  }
  /**
   * Finds a line where the native anchor node belongs.
   * If the `focus` is set to `true`, finds a line where the native focus node belongs.
   *
   * @param focus - Determines whether to find a line that has focus node or not.
   *
   * @return A line where an anchor or a focus node belongs.
   */
  ;

  _proto26.findActiveLine = function findActiveLine(focus) {
    var boundary = this.getNativeSelectionBoundary(focus);

    if (boundary) {
      var node = boundary.node;
      var elm = isText(node) ? node.parentNode : node;

      if (isHTMLElement(elm)) {
        return closest(elm, "." + CLASS_LINE);
      }
    }

    return null;
  }
  /**
   * Converts the provided position to the range for wrapping the word at the position.
   * If the text at the position is not a word, such as `/` or `-`, this returns `null`.
   *
   * @param row - A row index.
   * @param col - A col index.
   *
   * @return An object that describes the range of the word at the position.
   *         If the text is not a word, returns `null`.
   */
  ;

  _proto26.getWordRangeAt = function getWordRangeAt(_ref) {
    var row = _ref[0],
        col = _ref[1];
    var line = this.lines[row];

    if (line) {
      var string = line.text;
      var words = string.split(/[^\w]/);
      var _index2 = 0;

      for (var i = 0; i < words.length; i++) {
        var from = i > 0 ? _index2 + 1 : 0;
        var to = from + words[i].length;

        if (from <= col && col < to) {
          return {
            start: [row, from],
            end: [row, to]
          };
        }

        _index2 = to;
      }
    }

    return null;
  }
  /**
   * Returns a boundary node and offset of the native selection.
   * Be aware that the target node must be in the chunk,
   * or otherwise this method returns `null`.
   * Besides, IE returns a parent node as a boundary node, and child index as a offset
   * if the boundary is `<br>`(an empty line).
   *
   * @param focus - Whether to get the focus boundary or not.
   *
   * @return An object literal with a node and offset.
   */
  ;

  _proto26.getNativeSelectionBoundary = function getNativeSelectionBoundary(focus) {
    var editable = this.elements.editable;
    var selection = getSelection();
    var prefix = focus ? 'focus' : 'anchor';
    var node = selection[prefix + "Node"];
    var offset = selection[prefix + "Offset"];

    if (node === editable) {
      node = editable.children[offset];
      offset = 0;
    }

    return node ? {
      node: node,
      offset: offset
    } : null;
  }
  /**
   * Detects selection of all contents in a immediate way, such as the `Select All` iOS context menu.
   *
   * @return `true` if all contents are selected, or otherwise `false`.
   */
  ;

  _proto26.detectSelectAll = function detectSelectAll() {
    var lines = this.elements.lines;
    var anchorLine = this.findActiveLine(false);
    var focusLine = this.findActiveLine(true);
    var elms = slice(lines.children).filter(function (elm) {
      return !hasClass(elm, CLASS_EMPTY);
    });
    return anchorLine === elms[0] && focusLine === elms[elms.length - 1] && compare(this.anchor, this.focus) && this.anchor[1] === 0 && this.focus[1] === focusLine.textContent.length;
  }
  /**
   * The dirty code to ensure the selection contains the latest nodes.
   */
  ;

  _proto26.ensureSelection = function ensureSelection() {
    var _this41 = this;

    var Input = this.Input;
    var editable = this.elements.editable;
    var selection = getSelection();

    if (!isMobile() && this.isMultiline() && activeElement() === editable && selection.setBaseAndExtent) {
      var _editable = this.elements.editable;
      var anchorOffset = selection.anchorOffset,
          focusOffset = selection.focusOffset;
      var anchorNode = selection.anchorNode,
          focusNode = selection.focusNode;
      attr(_editable, {
        'aria-hidden': true
      });
      this.hold();
      selection.removeAllRanges();

      if (isGecko()) {
        var anchorClone = anchorNode.cloneNode(true);
        var focusClone = focusNode.cloneNode(true);
        anchorNode.parentNode.replaceChild(anchorClone, anchorNode);
        focusNode.parentNode.replaceChild(focusClone, focusNode);
        anchorNode = anchorClone;
        focusNode = focusClone;
      } else {
        toggleEditable(_editable, false);
      }

      setTimeout(function () {
        selection.setBaseAndExtent(anchorNode, anchorOffset, focusNode, focusOffset);
        nextTick(function () {
          _this41.Editor.focus();

          Input.disabled = false;
          toggleEditable(_editable, true);
          attr(_editable, {
            'aria-hidden': null
          });

          _this41.release();
        });
      }, DELAY_FOR_RESELECTION);
    } else {
      Input.disabled = false;
    }
  }
  /**
   * Checks if the editor is focused or not.
   *
   * @return `true` if the editor is focused, or otherwise `false`.
   */
  ;

  _proto26.isFocused = function isFocused() {
    return this.Editor && this.Editor.isFocused();
  };

  return Selection;
}(Component);
/**
 * The sample string.
 *
 * @since 0.1.3
 */


var SAMPLE = '    ';
/**
 * The timeout duration in milliseconds.
 *
 * @since 0.1.3
 */

var TIMEOUT = 5000;
/**
 * The class for observing the font loading.
 *
 * @since 0.1.3
 */

var FontObserver = /*#__PURE__*/function () {
  /**
   * The Observer constructor.
   *
   * @param Editor - An Editor instance.
   */
  function FontObserver(Editor) {
    /**
     * Keeps the time when the instance is created.
     */
    this.time = Date.now();
    this.Editor = Editor;
    this.Measure = this.Editor.Components.Measure;
    this.initialWidth = this.Measure.measureWidth(SAMPLE);
    this.observe();
  }
  /**
   * Observes the font loading.
   */


  var _proto27 = FontObserver.prototype;

  _proto27.observe = function observe() {
    var width = this.Measure.measureWidth(SAMPLE, false);

    if (width !== this.initialWidth) {
      this.Editor.event.emit(EVENT_FONT_LOADED);
    } else {
      if (Date.now() - this.time < TIMEOUT) {
        requestAnimationFrame(this.observe.bind(this));
      }
    }
  };

  return FontObserver;
}();
/**
 * The component for customizing some styles of the editor.
 *
 * @since 0.1.0
 */


var Style = /*#__PURE__*/function (_Component13) {
  _inheritsLoose(Style, _Component13);

  /**
   * The Style constructor.
   *
   * @param Editor - An Editor element.
   */
  function Style(Editor) {
    var _this42;

    _this42 = _Component13.call(this, Editor) || this;
    /**
     * Stores all styles.
     */

    _this42.selectors = {};

    _this42.init();

    _this42.on('view:open', function (e, append) {
      _this42.emit(EVENT_INIT_STYLE, _this42.add.bind(_assertThisInitialized(_this42)));

      append("<style id=\"" + _this42.options.id + "-style\">" + _this42.build() + "</style>");
    });

    return _this42;
  }
  /**
   * Adds styles defined in options.
   */


  var _proto28 = Style.prototype;

  _proto28.init = function init() {
    var _this43 = this;

    var options = this.options,
        _this$options = this.options,
        lineHeight = _this$options.lineHeight,
        tabSize = _this$options.tabSize;
    ['width', 'height', 'minWidth', 'minHeight', 'maxWidth', 'maxHeight'].forEach(function (prop) {
      var value = options[prop];

      if (value) {
        _this43.add('root', prop, unit(value));
      }
    });

    if (tabSize) {
      this.add('root', '-moz-tab-size', tabSize);
      this.add('root', 'tabSize', tabSize);
    }

    var height = lineHeight ? lineHeight + "em" : undefined;
    this.add("." + CLASS_EDITOR, {
      lineHeight: lineHeight,
      fontFamily: options.monospaceFont
    });
    this.add("." + CLASS_MARKER, 'minHeight', height);
    this.add("." + CLASS_CARET, 'height', height);
    this.add("." + CLASS_LINE + ":not(." + CLASS_EMPTY + "):not(." + CLASS_PRESERVED + ")", 'height', height);
  }
  /**
   * Converts the selectors object into a single style string.
   *
   * @return A built string.
   */
  ;

  _proto28.build = function build() {
    var html = '';
    forOwn$1(this.selectors, function (styles, selector) {
      var props = '';
      forOwn$1(styles, function (value, prop) {
        if (!isUndefined$1(value)) {
          props += camelToKebab(prop) + ": " + value + ";";
        }
      });

      if (props) {
        html += selector + "{" + props + "}";
      }
    });
    return html;
  }
  /**
   * Initializes the component.
   *
   * @internal
   *
   * @param elements - A collection of essential editor elements.
   */
  ;

  _proto28.mount = function mount(elements) {
    this.style = query(elements.root, 'style');

    _append(query(document, 'head'), this.style);

    if (this.options.monospaceFont) {
      new FontObserver(this.Editor);
    }
  }
  /**
   * Adds styles to the specified selector.
   * The `Editor#apply()` or `Editor#html()` applies the registered styles once,
   * and therefore initial styles must be added before them.
   * Otherwise, you should manually invoke the `apply()` method.
   *
   * @param selector - A selector string.
   * @param prop     - A CSS property or an objet literal with properties and values.
   * @param value    - Optional. A value for the property.
   */
  ;

  _proto28.add = function add(selector, prop, value) {
    var _this44 = this;

    if (isString(prop)) {
      if (!isUndefined$1(value)) {
        var selectors = this.selectors;
        selector = "#" + this.options.id + (selector === 'root' ? '' : ' ' + selector);
        selectors[selector] = selectors[selector] || {};
        selectors[selector][prop] = value;
      }
    } else {
      forOwn$1(prop, function (value, key) {
        _this44.add(selector, key, value);
      });
    }
  }
  /**
   * Applies registered styles to the style element.
   */
  ;

  _proto28.apply = function apply() {
    text(this.style, this.build());
  }
  /**
   * Destroys the component.
   *
   * @internal
   */
  ;

  _proto28.destroy = function destroy() {
    _Component13.prototype.destroy.call(this);

    _remove(this.style);
  };

  return Style;
}(Component);
/**
 * Max lines to asynchronously sync code to the Lines instance at once.
 *
 * @since 0.1.0
 */


var ASYNC_SYNC_LINES = 3000;
/**
 * Max lines to scan up for asynchronously sync.
 *
 * @since 0.1.0
 */

var ASYNC_SYNC_LINES_BACKWARDS = 100;
/**
 * Max lines to scan up for synchronously sync.
 *
 * @since 0.1.0
 */

var SYNC_LINES_BACKWARDS = 100;
/**
 * The class for syncing changes to Lines and View components.
 *
 * @since 0.1.0
 */

var Sync = /*#__PURE__*/function (_Component14) {
  _inheritsLoose(Sync, _Component14);

  function Sync() {
    var _this45;

    _this45 = _Component14.apply(this, arguments) || this;
    /**
     * Holds the minimum row for asynchronous syncing.
     */

    _this45.minStart = Infinity;
    /**
     * Holds the maximum row for asynchronous syncing.
     */

    _this45.maxEnd = 0;
    return _this45;
  }
  /**
   * Syncs changes between the start and end rows to other components.
   *
   * @example
   * Consider the following HTML as an example:
   *
   * ```html
   * <pre>
   * function message() {
   *   console.log( 'Hi!' );
   * }
   * </pre>
   * ```
   *
   * Let's attempt to modify the line 2 (the row index is `1`):
   *
   * ```ts
   * const ryuseiCode = new RyuseiCode();
   * ryuseiCode.apply( 'pre' );
   *
   * const { Code, Sync } = ryuseiCode.Editor.Components;
   *
   * // Only the Code component knows the change
   * Code.replaceLines( 1, 1, `  console.warn( 'error' );\n` );
   *
   * // Syncs the change to other components
   * Sync.sync( 1, 1 );
   * ```
   *
   * @param startRow - A start row index.
   * @param endRow   - An end row index.
   * @param jumpTo   - Optional. Jumps to the specified row before starting synchronization.
   */


  var _proto29 = Sync.prototype;

  _proto29.sync = function sync(startRow, endRow, jumpTo) {
    var Chunk = this.Chunk,
        View = this.View;
    var diff = this.lines.syncSize(startRow, this.Code.size);
    View.autoHeight();
    View.autoWidth();

    if (!isUndefined$1(jumpTo)) {
      View.jump(jumpTo);
    }

    if (Chunk.includes(startRow)) {
      this.run(startRow, Chunk.end - startRow + 1);
    } else {
      var _start2 = Chunk.start,
          end = Chunk.end;
      this.run(_start2, end - _start2 + 1, false);
      this.syncLines(startRow, endRow);
    }

    Chunk.syncDiff(startRow, diff);
    Chunk.sync();
  }
  /**
   * Starts the sync sequence.
   *
   * @param row    - A row index.
   * @param limit  - Limits the number of synchronously syncing.
   * @param strict - Optional. Determines whether the synchronization must be strict or not.
   */
  ;

  _proto29.run = function run(row, limit, strict) {
    if (strict === void 0) {
      strict = true;
    }

    var result = this.find(row, SYNC_LINES_BACKWARDS);
    var startRow = result.startRow;

    if (!strict && row - startRow > SYNC_LINES_BACKWARDS) {
      startRow = row - SYNC_LINES_BACKWARDS;
    }

    limit = row - startRow + limit;
    var changed = this.lines.sync(startRow, this.Code.after(startRow), limit, result.before);

    if (changed || this.syncing) {
      var size = this.Code.size;
      startRow = startRow + limit;

      if (startRow < size) {
        this.syncLines(startRow, size - 1);
      }
    }
  }
  /**
   * Asynchronously syncs lines between the provided range.
   * If the range is wider than the current running process, cancels it and starts a new process.
   *
   * @param startRow - A start row index.
   * @param endRow   - An end row index.
   */
  ;

  _proto29.syncLines = function syncLines(startRow, endRow) {
    var _this46 = this;

    this.minStart = min(startRow, this.minStart);
    this.maxEnd = max(endRow, this.maxEnd);
    this.syncing = true;
    var ranges = this.splitRows(this.minStart, this.maxEnd);
    this.syncRanges(ranges, function () {
      _this46.minStart = Infinity;
      _this46.maxEnd = 0;
      _this46.syncing = false;

      _this46.Chunk.sync();
    });
  }
  /**
   * Syncs provided ranges step by step.
   *
   * @param ranges   - An array with row ranges.
   * @param callback - Optional. A callback fired after the sync is completed.
   */
  ;

  _proto29.syncRanges = function syncRanges(ranges, callback) {
    var _this47 = this;

    var range = ranges.shift();

    var _this$find = this.find(range[0], ASYNC_SYNC_LINES_BACKWARDS),
        startRow = _this$find.startRow,
        before = _this$find.before;

    var limit = range[1] - startRow + 1;
    this.lines.asyncSync('syncRanges', startRow, this.Code.after(startRow), limit, before, function () {
      if (ranges.length) {
        _this47.syncRanges(ranges, callback);

        _this47.emit(EVENT_SYNCED, _this47, false);
      } else {
        if (callback) {
          callback();
        }

        _this47.emit(EVENT_SYNCED, _this47, true);
      }
    });
  }
  /**
   * Splits the provided row range into small fragments.
   *
   * @param startRow - A start row index.
   * @param endRow   - An end row index.
   *
   * @return An array with row ranges.
   */
  ;

  _proto29.splitRows = function splitRows(startRow, endRow) {
    var ranges = [];

    while (startRow <= endRow) {
      ranges.push([startRow, min(startRow + ASYNC_SYNC_LINES - 1, endRow)]);
      startRow += ASYNC_SYNC_LINES;
    }

    return ranges;
  }
  /**
   * Returns an info object to start syncing.
   *
   * @param row   - A row index.
   * @param limit - Limits the number of lines.
   *
   * @return An object with a start row index and code to prepend.
   */
  ;

  _proto29.find = function find(row, limit) {
    if (this.isEmbedded(row)) {
      return this.findStartInLanguageBlock(row, limit);
    }

    var startRow = this.findRoot(row);

    if (row - startRow > limit) {
      if (this.isEmbedded(row - limit)) {
        return this.findStartInLanguageBlock(row - limit, limit / 2);
      }

      return this.compress(startRow, row, '', limit);
    }

    return {
      startRow: startRow,
      before: ''
    };
  }
  /**
   * If the distance from the `row` to `startRow` is greater than the `limit`,
   * attempt to shorten the distance by generating pseudo code.
   *
   * @param startRow - A start row index.
   * @param row      - An original row index.
   * @param before   - A pseudo line to prepend.
   * @param limit    - A limit number of lines.
   *
   * @return An object with a start row index and code to prepend.
   */
  ;

  _proto29.compress = function compress(startRow, row, before, limit) {
    if (row - startRow > limit) {
      var _start3 = this.lines.findBlockStart([row - 1, 0]);

      if (_start3) {
        var _this$getLanguage = this.getLanguage(_start3),
            multiline = _this$getLanguage.multiline;

        var info = this.lines.getInfoAt(_start3);

        if (info && multiline) {
          for (var i = 0; i < multiline.length; i++) {
            var item = multiline[i];

            if (info.category === item[2] && (!item[3] || info.state === item[3])) {
              startRow = _start3[0] + 1;
              before += item[0];
              break;
            }
          }
        }
      }
    }

    return {
      startRow: startRow,
      before: before
    };
  }
  /**
   * Finds the likely appropriate index where tokenization should start.
   *
   * @param row   - A row index.
   * @param depth - Optional. Minimum depth of a line that can be a candidate.
   *
   * @return A better index for starting tokenization.
   */
  ;

  _proto29.findRoot = function findRoot(row, depth) {
    if (depth === void 0) {
      depth = 0;
    }

    var lines = this.lines;

    if (between(row, 0, lines.length, true)) {
      for (var i = row - 1; i >= 0; i--) {
        var line = lines[i];

        if (line.depth <= depth && line.tokens.length && !line.isEmpty()) {
          if (line.split) {
            i -= line.first[2].distance + 1;
          } else {
            return i;
          }
        }
      }
    }

    return 0;
  }
  /**
   * Finds a sync start info in an embedded language block.
   *
   * @param row   - A row index.
   * @param limit - A limit number of lines.
   *
   * @return An object with a start row index and code to prepend.
   */
  ;

  _proto29.findStartInLanguageBlock = function findStartInLanguageBlock(row, limit) {
    var lines = this.lines;
    var lang = lines[row].language;
    var config = this.language.use[lang];
    var startRow = this.findRoot(row, config.depth);
    var startLang = lines[startRow].language;

    if (startLang === lang) {
      return this.compress(startRow, row, config.code, limit);
    }

    return {
      startRow: startRow,
      before: ''
    };
  }
  /**
   * Checks if the line at the specified row is inside an embedded block or not.
   *
   * @param row - A row index.
   *
   * @return `true` if the row is inside an embedded block, or otherwise `false`.
   */
  ;

  _proto29.isEmbedded = function isEmbedded(row) {
    var line = this.lines[row];

    if (line) {
      var language = line.language;
      return language && this.language.language.id !== language;
    }
  };

  return Sync;
}(Component);
/**
 * The number of margin lines when jumping to a particular line.
 *
 * @since 0.1.0
 */


var JUMP_OFFSET = 1;
/**
 * Event names for the beginning of dragging.
 *
 * @since 0.1.0
 */

var DRAG_START_EVENTS = 'pointerdown';
/**
 * Event names for the end of dragging.
 *
 * @since 0.1.0
 */

var DRAG_END_EVENTS = 'pointerup';
/**
 * Event names on dragging.
 *
 * @since 0.1.0
 */

var DRAGGING_EVENTS = 'pointermove';
/**
 * The conversion map for vertical/horizontal props.
 *
 * @since 0.1.0
 */

var ORIENTATION_MAP = {
  vertical: 'horizontal',
  scrollHeight: 'scrollWidth',
  clientHeight: 'clientWidth',
  scrollTop: 'scrollLeft',
  minHeight: 'minWidth',
  maxHeight: 'maxWidth',
  height: 'width',
  top: 'left',
  pageY: 'pageX',
  translateY: 'translateX'
};
/**
 * The abstract class for creating a draggable bar.
 *
 * @since 0.1.0
 */

var AbstractDraggableBar = /*#__PURE__*/function () {
  /**
   * The AbstractDraggableBar constructor.
   *
   * @param classes  - A class or classes of the bar.
   * @param parent   - A parent element of the bar.
   * @param vertical - Determines whether to create a vertical or horizontal bar.
   */
  function AbstractDraggableBar(classes, parent, vertical) {
    var _this48 = this;

    /**
     * Holds the prop names determined by the bar direction.
     */
    this.names = {};
    this.elm = div(classes, parent);
    this.parent = parent;
    this.vertical = vertical;
    forOwn$1(ORIENTATION_MAP, function (prop, key) {
      _this48.names[key] = vertical ? key : prop;
    });
    this.bind();
  }
  /**
   * Listens to some events.
   */


  var _proto30 = AbstractDraggableBar.prototype;

  _proto30.bind = function bind() {
    this.onDrag = this.onDrag.bind(this);
    this.onDragging = this.onDragging.bind(this);
    this.onDragged = this.onDragged.bind(this);
    on(this.elm, DRAG_START_EVENTS, this.onDrag);
  }
  /**
   * Called when the element starts being dragged.
   *
   * @param e - A PointerEvent object.
   */
  ;

  _proto30.onDrag = function onDrag(e) {
    on(window, DRAG_END_EVENTS, this.onDragged);
    on(window, DRAGGING_EVENTS, this.onDragging);
    this.startCoord = this.getCoord(e);
    this.lastCoord = this.startCoord;
    this.toggleClass(true);
    prevent(e);
  }
  /**
   * Called while the element is dragged.
   *
   * @param e - A PointerEvent object.
   */
  ;

  _proto30.onDragging = function onDragging(e) {
    prevent(e);
  }
  /**
   * Called when the element is released.
   */
  ;

  _proto30.onDragged = function onDragged() {
    off(window, DRAG_END_EVENTS, this.onDragged);
    off(window, DRAGGING_EVENTS, this.onDragging);
    this.toggleClass(false);
  }
  /**
   * Returns the `pageX` and `pageY` coordinates provided by the event.
   *
   * @param e - A PointerEvent object.
   *
   * @return A pageX or pageY coordinate.
   */
  ;

  _proto30.getCoord = function getCoord(e) {
    return e[this.names.pageY];
  }
  /**
   * Toggles "dragging" classes of the element and parent element.
   *
   * @param add - Determines whether to add or remove classes.
   */
  ;

  _proto30.toggleClass = function toggleClass(add) {
    _toggleClass(this.elm, CLASS_DRAGGING, add);

    _toggleClass(this.parent, [CLASS_DRAGGING, CLASS_DRAGGING + "--" + this.names.vertical], add);
  }
  /**
   * Destroys the bar.
   */
  ;

  _proto30.destroy = function destroy() {
    off(this.elm, DRAG_START_EVENTS, this.onDrag);
    off(window, DRAG_END_EVENTS, this.onDragged);
    off(window, DRAGGING_EVENTS, this.onDragging);
  };

  return AbstractDraggableBar;
}();
/**
 * The class for creating a scrollbar.
 *
 * @since 0.1.0
 */


var Scrollbar = /*#__PURE__*/function (_AbstractDraggableBar) {
  _inheritsLoose(Scrollbar, _AbstractDraggableBar);

  /**
   * The Scrollbar constructor.
   *
   * @param Editor   - An EventBus instance.
   * @param parent   - A parent element.
   * @param scroller - A target element to scroll.
   * @param vertical - Determines whether to create a vertical or horizontal scroll bar.
   * @param margin   - Optional. Margins in pixel as `[ top, bottom ]` ( or `[ left, right ]` ).
   */
  function Scrollbar(Editor, parent, scroller, vertical, margin) {
    var _this49;

    if (margin === void 0) {
      margin = [0, 0];
    }

    _this49 = _AbstractDraggableBar.call(this, [CLASS_SCROLLBAR, CLASS_SCROLLBAR + "--" + (vertical ? 'vertical' : 'horizontal')], parent, vertical) || this;
    /**
     * The conversion ratio from the scroll offset to the bar offset.
     * - top = scrollTop * ratio
     * - scrollTop = top / ratio
     */

    _this49.ratio = 1;
    _this49.Editor = Editor;
    _this49.scroller = scroller;
    _this49.margin = isArray(margin) ? function () {
      return margin;
    } : margin;

    _this49.init();

    _this49.listen();

    return _this49;
  }
  /**
   * Initializes the instance.
   * Note that `aria-valuemin` and `aria-valuemax` is not necessary because their default values are `0` and `100`.
   *
   * @link https://www.w3.org/TR/wai-aria-1.2/#scrollbar
   */


  var _proto31 = Scrollbar.prototype;

  _proto31.init = function init() {
    var Editor = this.Editor,
        scroller = this.scroller;
    attr(this.elm, {
      role: 'scrollbar',
      'aria-controls': scroller.id,
      'aria-orientation': this.names.vertical,
      'aria-valuenow': 0,
      'aria-label': Editor.options.i18n.scrollbar
    });
    this.update = this.update.bind(this);
  }
  /**
   * Listens to some events.
   */
  ;

  _proto31.listen = function listen() {
    var _this50 = this;

    on(this.scroller, 'scroll', rafThrottle(this.update), this);
    this.Editor.event.on([EVENT_MOUNTED, EVENT_RESIZE], rafThrottle(function () {
      _this50.toggle();

      _this50.update();
    }));
  }
  /**
   * Called while the bar is dragged.
   *
   * @param e - A PointerEvent object.
   */
  ;

  _proto31.onDragging = function onDragging(e) {
    _AbstractDraggableBar.prototype.onDragging.call(this, e);

    var coord = this.getCoord(e);
    var diff = coord - this.lastCoord;
    this.scroller[this.names.scrollTop] += diff / this.ratio;
    this.lastCoord = coord;
  }
  /**
   * Updates the scrollbar height and offset according to the current scroll offset.
   */
  ;

  _proto31.update = function update() {
    var scroller = this.scroller,
        names = this.names,
        elm = this.elm;
    var style = elm.style;
    var sh = scroller[names.scrollHeight];
    var ch = scroller[names.clientHeight];
    var st = scroller[names.scrollTop];
    var margin = this.margin();
    var heightRatio = 1 - (margin[0] + margin[1]) / ch;
    var height = ch * ch / sh * heightRatio;

    if (this.lastHeight !== height) {
      style[names.height] = unit(height);
      this.lastHeight = height;
    }

    if (this.isActive()) {
      var offsetRatio = (ch * heightRatio - elm[names.clientHeight]) / (sh - ch);
      style.transform = names.translateY + "(" + unit(st * offsetRatio + margin[0]) + ")";
      attr(elm, {
        'aria-valuenow': round(100 * 100 * st / (sh - ch)) / 100
      });
      this.ratio = offsetRatio;
    }
  }
  /**
   * Checks if the scrollbar is active or not.
   *
   * @return `true` if the scrollbar is active, or otherwise `false`.
   */
  ;

  _proto31.isActive = function isActive() {
    return hasClass(this.elm, CLASS_ACTIVE);
  }
  /**
   * Toggles the scrollbar.
   */
  ;

  _proto31.toggle = function toggle() {
    var scroller = this.scroller,
        names = this.names,
        elm = this.elm;

    _toggleClass(elm, CLASS_ACTIVE, scroller[names.scrollHeight] > scroller[names.clientHeight]);
  }
  /**
   * Destroys the instance.
   */
  ;

  _proto31.destroy = function destroy() {
    off(null, '', this);

    _AbstractDraggableBar.prototype.destroy.call(this);
  };

  return Scrollbar;
}(AbstractDraggableBar);
/**
 * The class for creating a scrollbar.
 *
 * @since 0.1.0
 */


var EditorScrollbar = /*#__PURE__*/function (_Scrollbar) {
  _inheritsLoose(EditorScrollbar, _Scrollbar);

  function EditorScrollbar() {
    return _Scrollbar.apply(this, arguments) || this;
  }

  var _proto32 = EditorScrollbar.prototype;

  /**
   * Listens to some events.
   */
  _proto32.listen = function listen() {
    var _this51 = this;

    var event = this.Editor.event;
    event.on([EVENT_MOUNTED, EVENT_RESIZE, EVENT_SCROLL_HEIGHT_CHANGED, EVENT_SCROLL_WIDTH_CHANGED], throttle(rafThrottle(function () {
      _this51.toggle();

      _this51.update();
    }), 1));
    event.on(EVENT_SCROLL, rafThrottle(this.update));
  };

  return EditorScrollbar;
}(Scrollbar);
/**
 * The class for managing the viewport.
 *
 * @since 0.1.0
 */


var View = /*#__PURE__*/function (_Component15) {
  _inheritsLoose(View, _Component15);

  function View() {
    var _this52;

    _this52 = _Component15.apply(this, arguments) || this;
    /**
     * Keeps the previous width of the viewport.
     */

    _this52.lastWidth = 0;
    /**
     * Holds Scrollbar elements.
     */

    _this52.scrollbars = [];
    return _this52;
  }
  /**
   * Initializes the instance.
   *
   * @internal
   *
   * @param elements - A collection of essential editor elements.
   */


  var _proto33 = View.prototype;

  _proto33.mount = function mount(elements) {
    _Component15.prototype.mount.call(this, elements);

    this.emitResize = rafThrottle(this.emit.bind(this, 'resize'));
    elements.scroller.scrollTop = 0;
    this.create();
    this.autoHeight();
    this.listen();
  }
  /**
   * Listens to some events.
   */
  ;

  _proto33.listen = function listen() {
    this.bind(window, 'resize', this.emitResize);
    this.on([EVENT_MOUNTED, EVENT_RESIZE, EVENT_SCROLLED], this.autoWidth, this);
    this.on(EVENT_RESIZE, this.autoHeight.bind(this, true), null, 2);
    this.on(EVENT_SELECTED, this.onSelected, this);
    this.on(EVENT_SELECTING, this.clipScrollOffset, this);
  }
  /**
   * Called when the selection state is changed.
   *
   * @param e         - An EventBusEvent object.
   * @param Selection - A Selection instance.
   */
  ;

  _proto33.onSelected = function onSelected(e, Selection) {
    if (Selection.is(START, EXTEND) && Selection.state.device === 'keyboard') {
      this.jump(Selection.focus[0]);
    }

    if (Selection.is(CHANGED, SELECTING, SELECTED)) {
      this.clipScrollOffset();
    }
  }
  /**
   * Creates the scrollbar elements.
   */
  ;

  _proto33.create = function create() {
    var _this53 = this;

    var elements = this.elements,
        scroller = this.elements.scroller,
        Editor = this.Editor;
    var wrapper = div(CLASS_SCROLLBARS, elements.body);

    if (!isMobile()) {
      this.scrollbars = [new EditorScrollbar(Editor, wrapper, scroller, true), new EditorScrollbar(Editor, wrapper, scroller, false, function () {
        return [_this53.getWidthBeforeContainer(), 0];
      })];
    }

    var placeholder = this.options.placeholder;

    if (placeholder) {
      var placeholderElm = div(CLASS_PLACEHOLDER, elements.background);
      text(placeholderElm, placeholder);
    }
  }
  /**
   * Clips the caret position by all sides of the editor.
   * Only the left border refers the editor rect so that it includes the width of the fixed gutter.
   */
  ;

  _proto33.clipScrollOffset = function clipScrollOffset() {
    var caretRect = this.Caret.rect;
    var focus = this.Selection.focus;

    if (!caretRect || !this.Chunk.includes(focus[0])) {
      return;
    }

    var Measure = this.Measure;
    var scroller = this.elements.scroller;
    var padding = Measure.padding,
        scrollerRect = Measure.scrollerRect,
        lineHeight = Measure.lineHeight;
    var caretTop = caretRect.top,
        caretRight = caretRect.right,
        caretBottom = caretRect.bottom,
        caretLeft = caretRect.left;
    var editorRect = rect(this.elements.editor);
    var scrollTop = scroller.scrollTop,
        scrollLeft = scroller.scrollLeft;
    var top = scrollerRect.top + lineHeight / 2 + padding.top;
    var bottom = scrollerRect.bottom - lineHeight / 2 - padding.bottom;
    var left = (isIE() ? scrollerRect.left : editorRect.left + scrollLeft) + max(padding.left, lineHeight);
    var right = scrollerRect.right - max(padding.right, lineHeight);

    if (caretTop < top) {
      scrollTop -= top - caretTop;
    }

    if (caretBottom > bottom) {
      scrollTop += caretBottom - bottom;
    }

    if (caretLeft < left) {
      scrollLeft -= left - caretLeft;
    }

    if (caretRight > right) {
      scrollLeft += caretRight - right;
    }

    if (!focus[1]) {
      scrollLeft = 0;
    }

    scroller.scrollTop = scrollTop;
    scroller.scrollLeft = scrollLeft;
  }
  /**
   * Returns the width before the container element.
   *
   * @return The width before the container.
   */
  ;

  _proto33.getWidthBeforeContainer = function getWidthBeforeContainer() {
    var Measure = this.Measure;
    return Measure.editorRect.left - Measure.containerRect.left;
  }
  /**
   * Jumps to the specified row if it's not visible in the scroller.
   * If the `middle` is `true`, this method try to vertically center the target line.
   *
   * @param row        - A row index to jump to.
   * @param middle     - Optional. Determines whether to jump to the middle of the viewport or not.
   * @param lineOffset - Optional. A number of lines to offset.
   */
  ;

  _proto33.jump = function jump(row, middle, lineOffset) {
    if (lineOffset === void 0) {
      lineOffset = JUMP_OFFSET;
    }

    var Measure = this.Measure,
        Chunk = this.Chunk,
        scrollerRect = this.Measure.scrollerRect;

    if (middle) {
      Chunk.scroll(Measure.getBottom(row) - scrollerRect.height / 2 + Measure.lineHeight * lineOffset);
      return;
    }

    if (!this.isVisible(row)) {
      var center = Chunk.start + (Chunk.length - 1) / 2;
      var scrollTop;

      if (row > center) {
        row = min(row + lineOffset, this.lines.length - 1);
        scrollTop = Measure.getBottom(row) - scrollerRect.height + Measure.padding.top;
      } else {
        scrollTop = Measure.getTop(max(row - lineOffset, 0));
      }

      Chunk.scroll(scrollTop);
    }
  }
  /**
   * Adjusts the width of the lines element so that it can contain the longest line in the chunk.
   */
  ;

  _proto33.autoWidth = function autoWidth() {
    var Measure = this.Measure;
    var width = Measure.editorRect.width;

    if (width > Measure.scrollerRect.width - this.getWidthBeforeContainer() && width > this.lastWidth) {
      styles(this.elements.lines, {
        minWidth: unit(width)
      });
      this.lastWidth = width;
      this.emit(EVENT_SCROLL_WIDTH_CHANGED);
    }
  }
  /**
   * Adjusts the height of the container element so that it can contain all lines.
   * It won't be smaller than the scroller element when the editor has explicit height.
   *
   * @param skipLengthCheck - Optional. Whether to skip checking the number of lines or not.
   */
  ;

  _proto33.autoHeight = function autoHeight(skipLengthCheck) {
    var elements = this.elements,
        length = this.lines.length;

    if (skipLengthCheck || length !== this.lastLength) {
      var _Measure = this.Measure,
          padding = this.Measure.padding;

      var _height = _Measure.lineHeight * (length || 1) + padding.top + padding.bottom;

      if (elements.root.style.height || this.options.height) {
        _height = max(_height, _Measure.scrollerRect.height);
      }

      styles(elements.container, {
        height: unit(_height)
      });
      this.lastLength = length;
      this.emit(EVENT_SCROLL_HEIGHT_CHANGED);
    }
  }
  /**
   * Checks if the specified row is visible in the scroller or not.
   *
   * @param row        - A row index to check.
   * @param lineOffset - Optional. A number of lines to offset top and bottom borders.
   *
   * @return `true` if the row is in the scroller viewport, or otherwise `false`.
   */
  ;

  _proto33.isVisible = function isVisible(row, lineOffset) {
    if (lineOffset === void 0) {
      lineOffset = 0;
    }

    var Chunk = this.Chunk,
        Measure = this.Measure;

    if (Chunk.includes(row)) {
      var line = Chunk.getLine(row);

      if (line) {
        var scrollerRect = Measure.scrollerRect;
        var lineRect = rect(line);
        var offset = Measure.lineHeight * lineOffset;
        return lineRect.top >= scrollerRect.top + offset && lineRect.bottom <= scrollerRect.bottom - offset;
      }
    }

    return false;
  }
  /**
   * Destroys the component.
   *
   * @internal
   */
  ;

  _proto33.destroy = function destroy() {
    this.scrollbars.forEach(function (bar) {
      bar.destroy();
    });

    _Component15.prototype.destroy.call(this);
  };

  return View;
}(Component);

var CoreComponents = /*#__PURE__*/Object.freeze({
  __proto__: null,
  Caret: Caret,
  Chunk: Chunk,
  Code: Code,
  ContextMenu: ContextMenu,
  Edit: Edit,
  Input: Input,
  Keymap: Keymap,
  Measure: Measure,
  Range: Range,
  Scope: Scope,
  Selection: Selection,
  Style: Style,
  Sync: Sync,
  View: View
});
/**
 * Attributes for the editable area.
 *
 * @link https://www.w3.org/TR/wai-aria-1.2/#aria-roledescription
 * @link https://www.w3.org/TR/wai-aria-1.2/#aria-multiline
 *
 * @since 0.1.0
 */

var ATTRIBUTES_EDITABLE_AREA = {
  autocorrect: 'off',
  autocapitalize: 'off',
  spellcheck: 'false',
  role: 'textbox',
  'aria-multiline': true,
  'aria-roledescription': 'editor'
};
/**
 * The class for rendering the editor.
 *
 * @since 0.1.0
 */

var Renderer = /*#__PURE__*/function () {
  /**
   * The Renderer constructor.
   *
   * @param Code    - A Code instance.
   * @param event   - An EventBus instance.
   * @param options - Options.
   */
  function Renderer(Code, event, options) {
    this.Code = Code;
    this.lines = Code.Lines;
    this.event = event;
    this.options = options;
  }
  /**
   * Render lines until the number reaches the `maxInitialLines`.
   * Rest lines are rendered in the temporary `pre` element.
   *
   * @param append - The function to append a HTML string.
   */


  var _proto34 = Renderer.prototype;

  _proto34.renderLines = function renderLines(append) {
    var lines = this.lines;
    var max = min(lines.length, this.options.maxInitialLines);

    for (var i = 0; i < max; i++) {
      append(tag(CLASS_LINE) + lines[i].html + '</div>');
    }
  }
  /**
   * Builds the HTML for the editor.
   *
   * @param source - Optional. Determines whether to embed the source code as a pre element or not.
   *
   * @return The built HTML string.
   */
  ;

  _proto34.html = function html(source) {
    var _this54 = this;

    var html = '';
    var options = this.options,
        id = this.options.id;

    var append = function append(string) {
      html += string;
    };

    var classes = [CLASS_ROOT, CLASS_RENDERED].concat(options.rootClasses);
    var divs = [['root', classes, {
      id: id,
      role: 'code'
    }], ['view', [CLASS_VIEW].concat(options.viewClasses)], ['body', [CLASS_BODY]], ['scroller', [CLASS_SCROLLER]], ['container', [CLASS_CONTAINER]], ['editor', [CLASS_EDITOR]]];
    divs.forEach(function (settings) {
      _this54.event.emit(settings[0] + ":open", append, settings[1], _this54.lines);

      var attrs = assign$1({
        id: id + "-" + settings[0]
      }, settings[2]);
      html += tag(settings[1], attrs);
    });
    html += tag([CLASS_LINES], assign$1({
      'aria-label': options.i18n.inputLabel
    }, ATTRIBUTES_EDITABLE_AREA));
    this.renderLines(append);
    html += '</div>';

    if (source) {
      html += "<pre class=\"" + CLASS_SOURCE + "\">" + this.Code.value + "</pre>";
    }

    return html + repeat('</div>', divs.length);
  };

  return Renderer;
}();
/**
 * The debounce duration for evaluating `focusout` of the editor.
 *
 * @since 0.1.0
 */


var FOCUSOUT_DEBOUNCE_DURATION = 10;
/**
 * The core class for the editor.
 *
 * @since 0.1.0
 */

var Editor = /*#__PURE__*/function () {
  /**
   * The Editor constructor.
   *
   * @param language   - A Language object.
   * @param options    - Options.
   * @param extensions - An object with additional components.
   */
  function Editor(language, options, extensions) {
    var _this55 = this;

    if (extensions === void 0) {
      extensions = {};
    }

    /**
     * The collection of all core components.
     *
     * @readonly
     *
     * @example
     * ```ts
     * const ryuseiCode = new RyuseiCode();
     * const { Selection } = ryuseiCode.Editor.Components;
     * ```
     */
    this.Components = {};
    /**
     * Holds Extension instances.
     */

    this.Extensions = {};
    this.language = language;
    this.options = options;
    this.event = new EventBus(this);
    this.options.id = this.options.id || uniqueId(PROJECT_CODE);
    forOwn$1(CoreComponents, function (Component, name) {
      _this55.Components[name] = new Component(_this55);
    });
    forOwn$1(extensions, function (Extension, name) {
      var value = _this55.options[name.charAt(0).toLowerCase() + name.slice(1)];

      if (isUndefined$1(value) || value) {
        _this55.Extensions[name] = new Extension(_this55);
      }
    });
  }
  /**
   * Initializes the editor and components.
   */


  var _proto35 = Editor.prototype;

  _proto35.mount = function mount() {
    var options = this.options,
        event = this.event,
        elements = this.elements;
    this.listen();
    event.emit(EVENT_MOUNT, elements);
    forOwn$1(this.Components, function (Component) {
      Component.mount(elements);
    });
    forOwn$1(this.Extensions, function (Extension) {
      Extension.mount(elements);
    });
    event.emit(EVENT_MOUNTED, elements);
    this.readOnly = options.readOnly;

    if (options.autoFocus) {
      this.focus();
    }
  }
  /**
   * Collects essential elements that constitute the code editor.
   */
  ;

  _proto35.collect = function collect() {
    var root = this.root;
    var editor = query(root, "." + CLASS_EDITOR);
    var lines = query(root, "." + CLASS_LINES);
    toggleEditable(lines, true);
    attr(lines, {
      tabindex: 0
    });
    this.elements = Object.freeze({
      root: root,
      editor: editor,
      lines: lines,
      editable: lines,
      view: query(root, "." + CLASS_VIEW),
      body: query(root, "." + CLASS_BODY),
      scroller: query(root, "." + CLASS_SCROLLER),
      container: query(root, "." + CLASS_CONTAINER),
      overlay: div(CLASS_OVERLAY, root),
      background: div({
        "class": CLASS_BACKGROUND,
        'aria-hidden': true
      }, editor)
    });
  }
  /**
   * Listens to some events.
   */
  ;

  _proto35.listen = function listen() {
    var _this56 = this;

    var elements = this.elements,
        root = this.elements.root,
        event = this.event;
    var isFocused = this.isFocused.bind(this);
    var type;
    this.bind(root, 'pointerdown', function () {
      type = 'pointer';
    });
    this.bind(elements.editor, 'click', function () {
      if (!isFocused()) {
        _this56.focus(true);
      }
    });
    this.bind(root, 'focusin', function () {
      if (isFocused() && !hasClass(root, CLASS_FOCUSED)) {
        addClass(root, CLASS_FOCUSED);
        event.emit(EVENT_FOCUS, type);
      }
    });
    this.bind(root, 'focusout', debounce(function () {
      if (!isFocused() && hasClass(root, CLASS_FOCUSED)) {
        removeClass(root, CLASS_FOCUSED);
        event.emit(EVENT_BLUR);
        type = '';
      }
    }, FOCUSOUT_DEBOUNCE_DURATION));
    event.on([EVENT_MOUNTED, EVENT_CHANGED, EVENT_COMPOSITION_START, EVENT_RESET], function () {
      nextTick(function () {
        _toggleClass(root, CLASS_EMPTY, !_this56.value && !_this56.Components.Input.composing);
      });
    });
  }
  /**
   * Listens to native events.
   *
   * @param elm      - A document, a window or an element.
   * @param events   - An event name or names.
   * @param callback - A callback function.
   */
  ;

  _proto35.bind = function bind(elm, events, callback) {
    on(elm, events, callback, this);
  }
  /**
   * Applies the editor to the target element.
   *
   * @param target - A selector to find the target element, or a target element itself.
   * @param code   - Optional. The code to overwrite the content of the target element.
   */
  ;

  _proto35.apply = function apply(target, code) {
    assert$1(!this.root, 'Already initialized.');
    var elm = isString(target) ? query(document, target) : target;

    if (isHTMLElement(elm)) {
      this.source = elm;

      if (hasClass(elm, CLASS_RENDERED)) {
        this.root = elm;
        var pre = query(elm, 'pre');
        this.Components.Code.init(text(pre) || '');

        _remove(pre);
      } else {
        elm.insertAdjacentHTML('afterend', this.html(isUndefined$1(code) ? text(elm) : code, false));
        styles(elm, {
          display: 'none'
        });
        this.root = elm.nextElementSibling;
      }

      addClass(this.root, [CLASS_INITIALIZED, isMobile() ? CLASS_MOBILE : '']);
      this.collect();
      this.mount();
    } else {
      assert$1(false, target + " is invalid.");
    }
  }
  /**
   * Builds the HTML of the editor. This works without `document` and `window` objects,
   * but has no functionality.
   *
   * The [`maxInitialLines`](/guides/options#max-initial-lines) option limits the number of lines to generate.
   *
   * @param code   - The code for the editor.
   * @param source - Optional. Whether to embed the source code into the editor or not.
   *
   * @return The HTML of the editor.
   */
  ;

  _proto35.html = function html(code, source) {
    var Code = this.Components.Code;
    Code.init(code);
    return new Renderer(Code, this.event, this.options).html(source);
  }
  /**
   * Saves the content to the source element if available.
   *
   * For example, if you apply the editor to the empty `textarea` element,
   * it remains empty even after you edit the code by the editor.
   *
   * This method applies back the change to the `textarea` element.
   */
  ;

  _proto35.save = function save() {
    var source = this.source,
        value = this.value;

    if (source instanceof HTMLTextAreaElement) {
      source.value = value;
    } else {
      text(source, escapeHtml(value));
    }
  }
  /**
   * Sets focus on the editor.
   *
   * @param reselect - Determines whether to reselect the last position or not.
   */
  ;

  _proto35.focus = function focus(reselect) {
    if (reselect) {
      this.Components.Selection.reselect();
    } else {
      _focus5(this.elements.editable);
    }
  }
  /**
   * Removes the focus from the editor.
   */
  ;

  _proto35.blur = function blur() {
    var elm = activeElement();

    if (this.isFocused() && isHTMLElement(elm)) {
      elm.blur();
    }
  }
  /**
   * Attempts to invoke the public method of the specified extension.
   * In terms of the "loose coupling", you'd better try not to use this method.
   * Using events is enough in most cases.
   *
   * @example
   * ```ts
   * // Attempts to show the "search" toolbar.
   * Editor.invoke( 'Toolbar', 'show', 'search' );
   * ```
   *
   * @param name   - A name of the extension.
   * @param method - A method name to invoke.
   * @param args   - Optional. Arguments for the method.
   *
   * @return The return value of the method.
   */
  ;

  _proto35.invoke = function invoke(name, method) {
    var extension = this.Extensions[name];

    if (extension && isFunction(extension[method])) {
      for (var _len13 = arguments.length, args = new Array(_len13 > 2 ? _len13 - 2 : 0), _key13 = 2; _key13 < _len13; _key13++) {
        args[_key13 - 2] = arguments[_key13];
      }

      return extension[method].apply(extension, args);
    }
  }
  /**
   * Returns the specified extension.
   * In terms of the "loose coupling", you'd better try not to use this method.
   * Using events is enough in most cases.
   *
   * @param name - A name of an extension.
   *
   * @return The specified extension if found, or otherwise `undefined`.
   */
  ;

  _proto35.require = function require(name) {
    return this.Extensions[name];
  }
  /**
   * Checks if the editor has focus or not.
   *
   * @return `true` if the editor has focus, or otherwise `false`.
   */
  ;

  _proto35.isFocused = function isFocused() {
    return this.root.contains(activeElement());
  }
  /**
   * Saves the final value to the source element and destroys the editor for releasing the memory.
   */
  ;

  _proto35.destroy = function destroy() {
    var event = this.event;
    this.save();
    forOwn$1(assign$1(this.Components, this.Extensions), function (Component) {
      Component.destroy();
    });
    delete this.Components;
    delete this.Extensions;
    styles(this.source, {
      display: ''
    });

    _remove(this.elements.root);

    event.emit(EVENT_DESTROYED);
    event.destroy();
  }
  /**
   * Sets a new value to the editor and resets the editor.
   *
   * @param value - A new value.
   */
  ;

  _createClass(Editor, [{
    key: "value",
    get:
    /**
     * Returns the current value of the editor.
     *
     * @return The current value.
     */
    function get() {
      return this.Components.Code.value;
    }
    /**
     * Sets width of the root element.
     *
     * @param width - Width to set in pixel or in the CSS format, such as '50%'.
     */
    ,
    set: function set(value) {
      var Components = this.Components,
          _this$Components = this.Components,
          Code = _this$Components.Code,
          Selection = _this$Components.Selection;
      Code.value = value;
      Components.View.jump(0);
      Components.Sync.sync(0, Code.size - 1);

      if (this.isFocused()) {
        Selection.set([0, 0]);
      } else {
        Selection.update([0, 0], [0, 0], true);
      }

      this.event.emit(EVENT_RESET);
    }
  }, {
    key: "width",
    get:
    /**
     * Returns the width of the editor in pixel.
     *
     * @return The width of the editor in pixel.
     */
    function get() {
      return this.root.clientWidth;
    }
    /**
     * Sets the height of the root element.
     *
     * @param height - Height to set in pixel or in the CSS format, such as '50%'.
     */
    ,
    set: function set(width) {
      styles(this.root, {
        width: unit(width)
      });
      this.Components.View.emitResize();
    }
  }, {
    key: "height",
    get:
    /**
     * Returns the height of the editor in pixel.
     *
     * @return The height of the editor.
     */
    function get() {
      return this.root.clientHeight;
    }
    /**
     * Makes the editor mutable or immutable.
     * In the read-only mode, the primary caret gets hidden.
     *
     * @param readOnly - Whether to make the editor immutable or mutable.
     */
    ,
    set: function set(height) {
      styles(this.root, {
        height: unit(height)
      });
      this.Components.View.emitResize();
    }
  }, {
    key: "readOnly",
    get:
    /**
     * Indicates whether the editor is read-only or not.
     *
     * @return - `true` if the editor is read-only or `false` if not.
     */
    function get() {
      return this._readOnly;
    },
    set: function set(readOnly) {
      var elements = this.elements;

      _toggleClass(elements.root, CLASS_READONLY, readOnly);

      toggleEditable(elements.editable, !readOnly);
      this._readOnly = readOnly;
      this.event.emit(EVENT_READONLY, readOnly);
    }
  }]);

  return Editor;
}();
/**
 * The frontend class for the editor.
 *
 * @since 0.1.0
 */


var RyuseiCode = /*#__PURE__*/function () {
  /**
   * The constructor.
   *
   * @param options - Optional. Options.
   */
  function RyuseiCode(options) {
    this.mergeOptions(options);
    this.language = RyuseiCode.get(this.options.language);
    this.Editor = new Editor(this.language, this.options, RyuseiCode.Extensions);
  }
  /**
   * Registers a language or languages.
   *
   * @example
   * ```js
   * import { RyuseiCode, javascript, html } from '@ryusei/code';
   *
   * RyuseiLight.register( javascript() );
   *
   * // Or pass an array:
   * RyuseiLight.register( [ javascript(), html() ] );
   * ```
   *
   * If you want to register all languages the `languages` object is helpful:
   *
   * ```js
   * import { RyuseiCode, languages } from '@ryusei/code';
   *
   * RyuseiLight.register( Object.values( languages ).map( lang => lang() ) );
   * ```
   *
   * @param languages - A Language object or an array with objects.
   */


  RyuseiCode.register = function register(languages) {
    toArray(languages).forEach(function (language) {
      var lang = language.language,
          id = language.id;

      if (!RyuseiCode.languages[id]) {
        (lang.alias || []).concat(id).forEach(function (id) {
          RyuseiCode.languages[id] = language;
        });
      }
    });
  }
  /**
   * Registers extensions.
   *
   * @example
   * ```js
   * import { RyuseiCode, ActiveLine, History } from '@ryusei/code';
   *
   * RyuseiLight.register( { ActiveLine, History } );
   * ```
   *
   * If you want to compose all extensions, the `Extensions` object is helpful:
   *
   * ```js
   * import { RyuseiCode, Extensions } from '@ryusei/code';
   *
   * RyuseiLight.register( Extensions );
   * ```
   *
   * @param extensions - An object literal with extensions.
   */
  ;

  RyuseiCode.compose = function compose(extensions) {
    forOwn$1(extensions, function (Extension, name) {
      RyuseiCode.Extensions[name] = Extension;
    });
  }
  /**
   * Returns a Language object.
   *
   * @param id - The language ID.
   *
   * @return A Language object.
   */
  ;

  RyuseiCode.get = function get(id) {
    var languages = RyuseiCode.languages;
    assert$1(languages[id], id + " was not found.");
    return languages[id];
  }
  /**
   * Merges options with default values.
   *
   * @param options - Options to merge.
   */
  ;

  var _proto36 = RyuseiCode.prototype;

  _proto36.mergeOptions = function mergeOptions(options) {
    var _this57 = this;

    this.options = assign$1({}, DEFAULT_OPTIONS$6);
    forOwn$1(options, function (value, key) {
      if (!isUndefined$1(value)) {
        if (isObject$1(DEFAULT_OPTIONS$6[key])) {
          if (isObject$1(value)) {
            _this57.options[key] = assign$1({}, DEFAULT_OPTIONS$6[key], value);
          }
        } else {
          _this57.options[key] = value;
        }
      }
    });
  }
  /**
   * Applies the editor to the specified target element.
   *
   * @example
   * ```js
   * const ryuseiCode = new RyuseiCode();
   * ryuseiCode.apply( 'textarea' );
   *
   * // or
   * const textarea = document.querySelector( 'textarea' );
   * ryuseiCode.apply( textarea )
   * ```
   *
   * <div class="caution">
   * The instance can not have multiple targets.
   * If the <code>apply()</code> method is called twice to the same element, it throws an error.
   * </div>
   *
   * @param target - A selector to find the target element, or a target element itself.
   * @param code   - Optional. The code to overwrite the content of the target element.
   */
  ;

  _proto36.apply = function apply(target, code) {
    this.Editor.apply(target, code);
  }
  /**
   * Builds the HTML of the editor. This works without `document` and `window` objects,
   * but has no functionality.
   *
   * The [`maxInitialLines`](/guides/options#max-initial-lines) option limits the number of lines to generate.
   *
   * @param code - The code for the editor.
   *
   * @return The HTML string for the editor.
   */
  ;

  _proto36.html = function html(code) {
    return this.Editor.html(code, true);
  }
  /**
   * Attaches an event handler to the editor event or events.
   *
   * ```js
   * // ke is the native KeyboardEvent object
   * ryuseiCode.on( 'keydown', ( e, ke ) => {
   *   console.log( ke.key );
   * } );
   *
   * // With a namespace:
   * ryuseiCode.on( 'keydown.myNamespace', ( e, ke ) => {
   *   console.log( ke.key );
   * } );
   * ```
   *
   * @param events   - An event name or names separated by spaces, or an array with event names.
   *                   Use a dot(.) to add a namespace.
   * @param callback - A callback function.
   */
  ;

  _proto36.on = function on(events, callback) {
    this.Editor.event.on(events, callback);
  }
  /**
   * Detaches an event handler registered by `on()`.
   *
   * ```js
   * // Detach all handlers:
   * ryuseiCode.off( 'keydown' );
   *
   * // Detach handlers only in the namespace:
   * ryuseiCode.off( 'keydown.myNamespace' );
   * ```
   *
   * @param events - An event name or names separated by spaces, or or an array with event names.
   *                 Use a dot(.) to add a namespace.
   */
  ;

  _proto36.off = function off(events) {
    this.Editor.event.off(events);
  }
  /**
   * Saves the content to the source element if available.
   *
   * For example, if you apply the editor to the empty `textarea` element,
   * it remains empty even after you edit the code by the editor.
   *
   * This method applies back the change to the `textarea` element.
   */
  ;

  _proto36.save = function save() {
    this.Editor.save();
  }
  /**
   * Sets focus on the editor.
   *
   * @param reselect - Determines whether to reselect the last position or not.
   */
  ;

  _proto36.focus = function focus(reselect) {
    this.Editor.focus(reselect);
  }
  /**
   * Sets the caret position or selection range.
   *
   * @param start - A start position as `[ row, col ]`.
   * @param end   - Optional. An end position. If omitted, the selection will be collapsed to the start.
   */
  ;

  _proto36.setRange = function setRange(start, end) {
    this.Editor.Components.Selection.set(start, end);
  }
  /**
   * The alias of the `value` property that returns the current code as a string.
   *
   * @return The current code as a string.
   */
  ;

  _proto36.toString = function toString() {
    return this.value;
  }
  /**
   * Saves the final value to the source element and destroys the editor for releasing the memory.
   */
  ;

  _proto36.destroy = function destroy() {
    this.Editor.destroy();
    delete this.Editor;
  }
  /**
   * Sets a new value to the editor and resets the editor.
   *
   * @param value - A new value.
   */
  ;

  _createClass(RyuseiCode, [{
    key: "value",
    get:
    /**
     * Returns the current value as a string.
     *
     * @return The current value.
     */
    function get() {
      return this.Editor.value;
    },
    set: function set(value) {
      this.Editor.value = value;
    }
  }]);

  return RyuseiCode;
}();
/**
 * Stores all language objects.
 */


RyuseiCode.languages = {};
/**
 * Stores all Component classes.
 */

RyuseiCode.Extensions = {};
/**
 * The class name for the active line element.
 *
 * @since 0.1.0
 */

var CLASS_ACTIVE_LINE = PROJECT_CODE + "__active-line";
/**
 * The component for activating/deactivating lines according to the current selection.
 *
 * @since 0.1.0
 */

var ActiveLine = /*#__PURE__*/function (_Component16) {
  _inheritsLoose(ActiveLine, _Component16);

  /**
   * The ActiveLine constructor.
   *
   * @param Editor - An Editor instance.
   */
  function ActiveLine(Editor) {
    var _this58;

    _this58 = _Component16.call(this, Editor) || this;

    _this58.on(EVENT_INIT_STYLE, function (e, add) {
      add("." + CLASS_ACTIVE_LINE, 'height', _this58.options.lineHeight);
    });

    return _this58;
  }
  /**
   * Initializes the component.
   *
   * @param elements - A collection of essential elements.
   */


  var _proto37 = ActiveLine.prototype;

  _proto37.mount = function mount(elements) {
    var _this59 = this;

    _Component16.prototype.mount.call(this, elements);

    this.line = div({
      "class": CLASS_ACTIVE_LINE
    }, elements.background);
    this.on([EVENT_FOCUS, EVENT_FOCUS_LINE_CHANGED, EVENT_READONLY], function (e, readOnly) {
      if (e.type !== EVENT_READONLY || !readOnly) {
        _this59.activate();

        _this59.offset();
      } else {
        _this59.deactivate();
      }
    });
    this.on(EVENT_BLUR, this.deactivate, this);
    this.on(EVENT_RESIZE, this.offset, this);
  }
  /**
   * Activates the element.
   */
  ;

  _proto37.activate = function activate() {
    var Editor = this.Editor;

    if (Editor.isFocused() && !Editor.readOnly) {
      if (!this.isActive()) {
        addClass(this.line, CLASS_ACTIVE);
        this.emit('activeLine:activated');
      }
    }
  }
  /**
   * Offsets the active line element to the current focus node.
   */
  ;

  _proto37.offset = function offset() {
    if (this.isActive()) {
      var _Measure2 = this.Measure;

      var top = _Measure2.getTop(this.Selection.focus[0]) + _Measure2.padding.top;

      if (this.top !== top) {
        styles(this.line, {
          top: unit(this.top = top)
        });
        this.emit('activeLine:updated');
      }
    }
  }
  /**
   * Deactivates the element.
   */
  ;

  _proto37.deactivate = function deactivate() {
    removeClass(this.line, CLASS_ACTIVE);
    this.top = -1;
    this.emit('activeLine:deactivated');
  }
  /**
   * Checks if the element is active or not.
   *
   * @return `true` if the element is active, or otherwise `false`.
   */
  ;

  _proto37.isActive = function isActive() {
    return hasClass(this.line, CLASS_ACTIVE);
  };

  return ActiveLine;
}(Component);
/**
 * The component for auto closing brackets.
 *
 * @since 0.1.0
 */


var AutoClose = /*#__PURE__*/function (_Component17) {
  _inheritsLoose(AutoClose, _Component17);

  function AutoClose() {
    return _Component17.apply(this, arguments) || this;
  }

  var _proto38 = AutoClose.prototype;

  /**
   * Initializes the component.
   *
   * @param elements - A collection of essential elements.
   */
  _proto38.mount = function mount(elements) {
    var _this60 = this;

    _Component17.prototype.mount.call(this, elements);

    this.on(EVENT_KEYDOWN, function (e, ke) {
      _this60.skip(ke);

      _this60.remove(ke);
    });
    this.on(EVENT_CHANGED, function (e, type) {
      if (type === 'input') {
        _this60.close();
      }
    });
  }
  /**
   * Closes the entered opening character.
   */
  ;

  _proto38.close = function close() {
    var Input = this.Input;

    if (!Input.composing) {
      var _index3 = this.getChars(false).indexOf(Input.get().key);

      if (_index3 > -1 && this.validate(_index3, 'close')) {
        Input.apply({
          type: 'autoClose',
          insertion: this.getClosingString(_index3),
          offset: this.getOffset(_index3)
        });
      }
    }
  }
  /**
   * Skips the entered close character if the next character is already the closing character.
   *
   * @param e - A KeyboardEvent object.
   */
  ;

  _proto38.skip = function skip(e) {
    var Input = this.Input;

    if (!Input.composing) {
      var closingChars = this.getChars(true);

      var _index4 = closingChars.indexOf(normalizeKey(e.key));

      if (_index4 > -1 && this.validate(_index4, 'skip')) {
        if (closingChars[_index4] === Input["char"]()) {
          var _Selection4 = this.Selection,
              focus = this.Selection.focus;

          _Selection4.set([focus[0], focus[1] + 1]);

          prevent(e);
        }
      }
    }
  }
  /**
   * Automatically removes the paired characters when the backspace key is pressed.
   *
   * @param e - A KeyboardEvent object.
   */
  ;

  _proto38.remove = function remove(e) {
    var Input = this.Input;

    if (e.key === 'Backspace') {
      var _index5 = this.getChars(false).indexOf(Input["char"](Input.col - 1));

      if (_index5 > -1 && this.validate(_index5, 'remove')) {
        if (this.getChars(true)[_index5] === Input["char"]()) {
          var _Selection5 = this.Selection,
              focus = this.Selection.focus;
          Input.value = Input.before + Input.after.slice(1);

          _Selection5.set(focus);
        }
      }
    }
  }
  /**
   * Returns an array with opening/closing characters.
   *
   * @param closing - Determines whether to get closing or opening characters.
   *
   * @return An array with characters.
   */
  ;

  _proto38.getChars = function getChars(closing) {
    return this.getConfig().map(function (chars) {
      var value = chars[closing ? 1 : 0];
      return isString(value) ? value : '';
    });
  }
  /**
   * Returns a closing string.
   *
   * @param index - A config index.
   *
   * @return A closing string. This may be empty.
   */
  ;

  _proto38.getClosingString = function getClosingString(index) {
    var config = this.getConfig()[index];
    var closer = config && config[1];
    return isFunction(closer) ? closer(this.Editor) : closer || '';
  }
  /**
   * Returns a number of characters to offset.
   *
   * @param index - A config index.
   *
   * @return The number of characters to offset.
   */
  ;

  _proto38.getOffset = function getOffset(index) {
    var config = this.getConfig()[index];
    var data = config && config[2];
    return data ? data.offset || 0 : 0;
  }
  /**
   * Executes the validator defined by the language data.
   *
   * @param index - A config index.
   * @param key   - A key of the validator.
   *
   * @return `true` if the input satisfies the validator, or otherwise `false`.
   */
  ;

  _proto38.validate = function validate(index, key) {
    var Scope = this.Scope;
    var config = this.getConfig()[index];
    var data = config[2];

    if (!data) {
      return true;
    }

    var validator = data[key];

    if (isFunction(validator)) {
      return validator(this.Editor, config);
    }

    if (isString(validator)) {
      if (validator === '@quotes') {
        return this.validateQuote(key);
      }

      return false;
    }

    if (isArray(validator)) {
      return Scope.isIn(validator);
    }

    return validator;
  }
  /**
   * Determines whether to proceed completion of quotes or not.
   * - RegExp: checks the string after the input quote.
   *
   * @param key - The key of the validator.
   *
   * @return `true` if the completion process should be proceeded, or otherwise `false`.
   */
  ;

  _proto38.validateQuote = function validateQuote(key) {
    var _this$Selection$get = this.Selection.get(),
        start = _this$Selection$get.start;

    var Input = this.Input;
    var currInfo = this.lines.getInfoAt(start);
    var prevInfo = Input.info;

    if (currInfo) {
      if (currInfo.category === CATEGORY_STRING || prevInfo && prevInfo.category === CATEGORY_STRING) {
        if (key === 'skip' || key === 'remove') {
          return compare(start, [start[0], currInfo.to - 1]) === 0;
        }

        return false;
      }
    }

    var after = Input.after;
    return !this.Scope.isIn('comment') && (!after || /^\s/.test(after));
  }
  /**
   * Returns the config array.
   *
   * @return A config array.
   */
  ;

  _proto38.getConfig = function getConfig() {
    return this.getLanguage().autoClose || [];
  };

  return AutoClose;
}(Component);
/**
 * The default options for the BracketMatching component.
 *
 * @since 0.1.0
 */


var DEFAULT_OPTIONS$5 = {
  brackets: [['(', '[', '{', '<'], [')', ']', '}', '>']],
  maxScanLines: 1000
};
/**
 * The group ID for markers.
 *
 * @since 0.1.0
 */

var MARKER_ID$2 = 'brackets';
/**
 * The debounce duration for the clear method.
 *
 * @since 0.1.0
 */

var CLEAR_DEBOUNCE_DURATION = 50;
/**
 * The component for highlighting matched brackets.
 *
 * @since 0.1.0
 */

var BracketMatching = /*#__PURE__*/function (_Component18) {
  _inheritsLoose(BracketMatching, _Component18);

  function BracketMatching() {
    return _Component18.apply(this, arguments) || this;
  }

  var _proto39 = BracketMatching.prototype;

  /**
   * Initializes the component.
   *
   * @param elements - A collection of essential elements.
   */
  _proto39.mount = function mount(elements) {
    var _this61 = this;

    var options = this.getOptions('bracketMatching', DEFAULT_OPTIONS$5);
    this.brackets = options.brackets;
    this.maxScanLines = options.maxScanLines;

    _Component18.prototype.mount.call(this, elements);

    this.clear = debounce(function () {
      _this61.Range.clear(MARKER_ID$2);
    }, CLEAR_DEBOUNCE_DURATION);
    this.update = rafThrottle(this.update.bind(this));
    this.on(EVENT_SELECTED, this.onSelected, this);
    this.on(EVENT_BLUR, this.clear);
    this.on(EVENT_READONLY, function (e, readOnly) {
      if (readOnly) {
        _this61.clear();
      }
    });
  }
  /**
   * Called when the selection state is changed.
   *
   * @param e         - An EventBusEvent object.
   * @param Selection - A Selection instance.
   */
  ;

  _proto39.onSelected = function onSelected(e, Selection) {
    if (Selection.is(START, SELECTING, EXTEND)) {
      this.clear();
    } else if (Selection.is(CHANGED)) {
      if (!this.Editor.readOnly && Selection.isCollapsed()) {
        this.update();
      }
    }
  }
  /**
   * Checks the current location and renders markers.
   */
  ;

  _proto39.update = function update() {
    var _this62 = this;

    var focus = this.Selection.focus;
    var before = focus[1] > 0 ? [focus[0], focus[1] - 1] : null;
    this.clear.invoke();
    [before, focus].some(function (position) {
      if (position && _this62.Scope.inCategory(CATEGORY_BRACKET, position)) {
        _this62.draw(position[0], _this62.lines.getInfoAt(position));

        return true;
      }
    });
  }
  /**
   * Draws the provided bracket token and its counterpart.
   *
   * @param row  - A row index.
   * @param info - A TokenInfo object.
   */
  ;

  _proto39.draw = function draw(row, info) {
    var match = this.find(false, row, info) || this.find(true, row, info);

    if (match) {
      var _Range = this.Range;

      _Range.clear(MARKER_ID$2);

      _Range.register(MARKER_ID$2, [this.infoToRange(row, info), this.infoToRange(match.row, match.info)]);
    }
  }
  /**
   * Finds the counterpart of the provided token.
   *
   * @param findClosing - Determines whether to find closing part or not.
   * @param row         - A row index.
   * @param info        - A TokenInfo object.
   *
   * @return A counter token of the passed info if found, or otherwise `undefined`.
   */
  ;

  _proto39.find = function find(findClosing, row, info) {
    var brackets = this.brackets;
    var index = brackets[Number(!findClosing)].indexOf(info.code);

    if (index > -1) {
      var counterpart = brackets[Number(findClosing)][index];
      return this.lines["scan" + (findClosing ? 'Down' : 'Up')]([row, info.from], [CATEGORY_BRACKET, new RegExp(escapeRegExp(counterpart))], [CATEGORY_BRACKET, new RegExp(escapeRegExp(info.code))], 1, this.maxScanLines);
    }
  }
  /**
   * Converts the provided TokeInfo object to the range.
   *
   * @param row  - A row index.
   * @param info - A TokenInfo object to convert.
   *
   * @return A Range object.
   */
  ;

  _proto39.infoToRange = function infoToRange(row, info) {
    return {
      start: [row, info.from],
      end: [row, info.to]
    };
  };

  return BracketMatching;
}(Component);
/**
 * The collection of shortcuts for the Comment extension.
 *
 * @since 0.1.0
 */


var KEYMAP$5 = {
  lineComment: ['/', true],
  blockComment: ['?', true, true]
};
/**
 * The input type for comment or uncomment changes.
 *
 * @since 0.1.0
 */

var COMMENT_INPUT_TYPE = 'comment';
/**
 * The class for commenting out or uncommenting code.
 *
 * @since 0.1.0
 */

var Comment = /*#__PURE__*/function (_Component19) {
  _inheritsLoose(Comment, _Component19);

  /**
   * The Comment constructor.
   *
   * @param Editor - An Editor instance.
   */
  function Comment(Editor) {
    var _this63;

    _this63 = _Component19.call(this, Editor) || this;

    _this63.addKeyBindings(KEYMAP$5);

    return _this63;
  }
  /**
   * Initializes the component.
   *
   * @param elements - A collection of essential elements.
   */


  var _proto40 = Comment.prototype;

  _proto40.mount = function mount(elements) {
    _Component19.prototype.mount.call(this, elements);

    var language = this.language;

    if (language.blockComment) {
      this.on(EVENT_KEYMAP + ":blockComment", this.toggleBlock, this);
    }

    if (language.lineComment) {
      this.on(EVENT_KEYMAP + ":lineComment", this.toggleLine, this);
    }
  }
  /**
   * Toggles block comments.
   * If the `start` or `end` position of the selection is inside a comment, unwraps the comment.
   * Otherwise, comments out the selection.
   */
  ;

  _proto40.toggleBlock = function toggleBlock() {
    var _this$Selection$get2 = this.Selection.get(),
        start = _this$Selection$get2.start,
        end = _this$Selection$get2.end;

    var range = this.detectBlockComment(start) || this.detectBlockComment(end);
    this.emit(EVENT_CHANGE, COMMENT_INPUT_TYPE);

    if (range) {
      start = range.start;
      end = range.end;
      this.uncomment(start, end, false);
    } else {
      this.commentOut(start, end, false);
    }

    this.sync(start, end, !!range, false);
    this.emit(EVENT_CHANGED, COMMENT_INPUT_TYPE);
  }
  /**
   * Toggles line comments.
   */
  ;

  _proto40.toggleLine = function toggleLine() {
    var _this$Selection$get3 = this.Selection.get(),
        start = _this$Selection$get3.start,
        end = _this$Selection$get3.end;

    var lines = this.lines;
    this.emit(EVENT_CHANGE, COMMENT_INPUT_TYPE);
    var endPosition;
    var uncommented;

    for (var i = start[0]; i <= end[0]; i++) {
      var range = this.detectLineComment([i, lines[i].text.length]);

      if (range) {
        this.uncomment(range.start, range.end, true);
        endPosition = end;
        uncommented = true;
      }
    }

    if (!uncommented) {
      var minIndent = lines.findMinIndent(start[0], end[0]);

      for (var _i = start[0]; _i <= end[0]; _i++) {
        this.commentOut([_i, minIndent.length], [_i, lines[_i].text.length], true);
      }
    }

    this.sync(start, endPosition || end, uncommented, true);
    this.emit(EVENT_CHANGED, COMMENT_INPUT_TYPE);
  }
  /**
   * Comments out code between the start and end positions.
   *
   * @param start - A start position.
   * @param end   - An end position.
   * @param line  - Whether to use a line comment or not.
   */
  ;

  _proto40.commentOut = function commentOut(start, end, line) {
    var Code = this.Code;
    var comment = this.getConfig(line ? [start[0], 0] : start, line);

    if (comment) {
      var commentStart = comment[0] + (comment[1] ? '' : ' ');
      Code.replaceRange(start, end, "" + commentStart + Code.sliceRange(start, end) + (comment[1] || ''));
    }
  }
  /**
   * Converts back the commented out code into the source code.
   *
   * @param start - A start position.
   * @param end   - An end position.
   * @param line  - Whether to use a line comment or not.
   */
  ;

  _proto40.uncomment = function uncomment(start, end, line) {
    var Code = this.Code;
    var comment = this.getConfig(start, line);

    if (comment) {
      var replacement = Code.sliceRange(start, end);
      var source = "^" + escapeRegExp(comment[0]) + "[ ]?|[ ]?" + escapeRegExp(comment[1]) + "$";
      Code.replaceRange(start, end, replacement.replace(new RegExp(source, 'g'), ''));
    }
  }
  /**
   * Syncs the code to the viewport.
   *
   * @param start       - A start position
   * @param end         - An end position.
   * @param uncommented - Determines whether to sync code for uncommented or commented out lines.
   * @param line        - Determines whether to sync code for line or block comments.
   */
  ;

  _proto40.sync = function sync(start, end, uncommented, line) {
    var lines = this.lines;
    var range = this.Selection.get();
    var comment = this.getConfig(start, line);

    if (!comment) {
      return;
    }

    var row = uncommented && !line ? range.start[0] : end[0];
    var col = range.end[1];

    if (line) {
      row = min(row + 1, lines.length - 1);
    } else {
      var length = comment[0].length;

      if (uncommented) {
        if (row === start[0]) {
          col -= length;
        }
      } else {
        if (row === start[0]) {
          col += length;
        }
      }
    }

    this.View.jump(row);
    this.Sync.sync(start[0], end[0]);
    col = clamp(col, 0, this.lines[row].text.length);
    this.Selection.set([row, col]);
  }
  /**
   * Returns the comment config object at the position.
   *
   * @param position - A position.
   * @param line     - Determines whether to get a line comment configuration or not.
   *
   * @return An object with `start` and `end` that represent a comment syntax.
   */
  ;

  _proto40.getConfig = function getConfig(position, line) {
    return this.getLanguage(position)[(line ? 'line' : 'block') + "Comment"];
  }
  /**
   * Detects the range of a block comment around the provided position.
   *
   * @param position - A position that may be inside a block comment.
   *
   * @return A Range object if the passed position is inside a block comment.
   *         Otherwise, `null`.
   */
  ;

  _proto40.detectBlockComment = function detectBlockComment(position) {
    var lines = this.lines;
    var info = lines.getInfoAt(position);

    if (info && info.category === CATEGORY_COMMENT) {
      var _start4 = lines.findBlockStart(position);

      var end = lines.findBlockEnd(position);

      if (_start4 && end) {
        return {
          start: _start4,
          end: end
        };
      }
    }

    return null;
  }
  /**
   * Detects the range of a line comment at the provided position.
   * This method does not care that the code is actually categorized as a comment,
   * but only care about the representation of the line comment.
   *
   * @param position - A position that may be on the line containing a line comment.
   *
   * @return A Range object if the row contains a line comment. Otherwise, `null`.
   */
  ;

  _proto40.detectLineComment = function detectLineComment(position) {
    var _this$getConfig = this.getConfig(position, true),
        head = _this$getConfig[0],
        tail = _this$getConfig[1];

    var row = position[0];
    var line = this.lines[row].text;

    if (line) {
      var trimmed = line.trim();

      if (startsWith$1(trimmed, head) && (!tail || endsWith(trimmed, tail))) {
        var endCol = tail ? line.lastIndexOf(tail) : line.length;
        return {
          start: [row, line.indexOf(head)],
          end: [row, endCol]
        };
      }
    }

    return null;
  };

  return Comment;
}(Component);
/**
 * A collection of settings for general UI buttons.
 *
 * @since 0.1.0
 */


var GENERAL_UI_BUTTONS = {
  confirm: {
    id: 'confirm',
    click: 'confirm'
  },
  cancel: {
    id: 'cancel',
    click: 'hide',
    tabindex: 0
  }
};
/**
 * Classes for dialog components.
 *
 * @since 0.1.0
 */

var CLASS_DIALOG = PROJECT_CODE + "__dialog";
var CLASS_DIALOG_GROUP = CLASS_DIALOG + "__group";
var CLASS_DIALOG_HEADER = CLASS_DIALOG + "__header";
var CLASS_DIALOG_TITLE = CLASS_DIALOG + "__title";
var CLASS_DIALOG_BODY = CLASS_DIALOG + "__body";
var CLASS_DIALOG_FOOTER = CLASS_DIALOG + "__footer";
/**
 * The group ID of the common dialog.
 *
 * @since 0.1.0
 */

var COMMON_DIALOG_GROUP = PROJECT_CODE + "-common";
/**
 * The component for displaying a dialog.
 *
 * @since 0.1.0
 */

var Dialog = /*#__PURE__*/function (_UIComponent2) {
  _inheritsLoose(Dialog, _UIComponent2);

  function Dialog() {
    return _UIComponent2.apply(this, arguments) || this;
  }

  var _proto41 = Dialog.prototype;

  /**
   * Initializes the component.
   *
   * @param elements - A collection of editor elements.
   */
  _proto41.mount = function mount(elements) {
    _UIComponent2.prototype.mount.call(this, elements);

    this.register(COMMON_DIALOG_GROUP, div(), '');
  }
  /**
   * Listens to some events.
   */
  ;

  _proto41.listen = function listen() {
    var _this64 = this;

    this.bind(window, 'click', function (e) {
      if (!_this64.wrapper.contains(e.target)) {
        _this64.hide();
      }
    });
    this.on(EVENT_INIT_STYLE, function (e, add) {
      add("." + CLASS_DIALOG + " code", 'fontFamily', _this64.options.monospaceFont);
    });
  }
  /**
   * Creates dialog elements.
   * Note that the dialog element must/should have:
   * - an accessible name by `aria-label` or `aria-labelledby`.
   * - at least one focusable descendant element.
   *
   * @link https://www.w3.org/TR/wai-aria-1.2/#dialog
   */
  ;

  _proto41.create = function create() {
    var elements = this.elements;
    var id = elements.root.id + "-dialog";
    this.wrapper = div({
      id: id,
      "class": CLASS_DIALOG,
      role: 'dialog',
      'aria-labelledby': id + "-title",
      'aria-describedby': id + "-body"
    }, elements.overlay);
  }
  /**
   * Called when the general confirm button is clicked.
   *
   * @internal
   */
  ;

  _proto41.confirm = function confirm() {
    this.emit("dialog:" + this.group + ":confirmed", this);
    this.hide();
  }
  /**
   * Registers a new dialog.
   * Use `message()` instead just for showing a message.
   *
   * @example
   * ```ts
   * const ryuseiCode = new RyuseiCode();
   * const Dialog     = ryuseiCode.Editor.require( 'Dialog' );
   *
   * // The Dialog extension may not exist.
   * if ( Dialog ) {
   *   const body = document.createElement( 'p' );
   *   body.textContent = 'Hello!';
   *   Dialog.register( 'sample', body, 'Sample Dialog', [ 'confirm' ] );
   *   Dialog.show( 'sample' );
   * }
   * ```
   *
   * If you want to add custom buttons, pass an array with button settings to the `buttons`.
   *
   * ```ts
   * const settings = [
   *   {
   *     id: 'myButton',
   *     html: 'Click Me',
   *     click() {
   *       console.log( 'Clicked!' );
   *     },
   *   }
   * ];
   *
   * Dialog.register( 'sample', body, 'Sample Dialog', settings );
   * ```
   *
   * @param group   - A group ID.
   * @param elm     - An element to display as a dialog body.
   * @param title   - A title of a dialog.
   * @param buttons - Optional. General button names, `'confirm'`, `'cancel'`, or objects with button settings.
   */
  ;

  _proto41.register = function register(group, elm, title, buttons) {
    var settings = (buttons || ['confirm']).map(function (settings) {
      return isString(settings) ? GENERAL_UI_BUTTONS[settings] : settings;
    }).filter(Boolean);
    assert$1(settings.length);
    var id = this.wrapper.id;
    var groupElm = div(CLASS_DIALOG_GROUP);

    var headerElm = _create('header', CLASS_DIALOG_HEADER);

    var titleElm = _create('h3', {
      id: id + "-title",
      "class": CLASS_DIALOG_TITLE
    }, headerElm);

    var footerElm = _create('footer', CLASS_DIALOG_FOOTER);

    var button = this.createCloseButton({
      'aria-controls': id
    });
    attr(elm, {
      id: id + "-body",
      "class": CLASS_DIALOG_BODY
    });
    text(titleElm, title);
    addClass(button, CLASS_DIALOG + "__close");

    _append(groupElm, [headerElm, elm, footerElm, button]);

    this.groups[group] = {
      elm: groupElm,
      title: titleElm,
      body: elm,
      buttons: this.createButtons(settings, footerElm, this)
    };
  }
  /**
   * Opens the specified dialog. The dialog must be registered by `register()` before opening it.
   *
   * @param group - A dialog ID to open.
   */
  ;

  _proto41.show = function show(group) {
    this.hide();

    _UIComponent2.prototype.show.call(this, group);

    this.Editor.readOnly = true;
    addClass(this.elements.overlay, CLASS_ACTIVE);
    this.autoFocus(group);
    this.emit('dialog:opened', this, group);
  }
  /**
   * Closes the dialog which is visible now. Nothing will happen when there is no shown dialog.
   */
  ;

  _proto41.hide = function hide() {
    if (this.isActive()) {
      this.Editor.readOnly = false;

      _UIComponent2.prototype.hide.call(this);

      removeClass(this.elements.overlay, CLASS_ACTIVE);
      this.Selection.reselect();
      this.emit('dialog:closed', this, this.group);
    }
  }
  /**
   * Displays a message with a common dialog. No registration required.
   *
   * @param message - A message to display.
   * @param title   - Optional. A title of a dialog. If omitted, uses the `notice` in the `i18n` collection.
   */
  ;

  _proto41.message = function message(_message, title) {
    var data = this.groups[COMMON_DIALOG_GROUP];
    text(data.title, title || this.i18n.notice);
    text(data.body, _message);
    this.show(COMMON_DIALOG_GROUP);
  };

  return Dialog;
}(UIComponent);
/**
 * The class for rendering the indent guide.
 *
 * @since 0.1.0
 */


var IndentMarker = /*#__PURE__*/function (_Marker2) {
  _inheritsLoose(IndentMarker, _Marker2);

  function IndentMarker() {
    return _Marker2.apply(this, arguments) || this;
  }

  var _proto42 = IndentMarker.prototype;

  /**
   * Calculates boundaries for drawing the marker.
   * Because every indent size is same, this method uses the cache of the width for the better performance.
   *
   * @param anchor - An anchor position.
   *
   * @return An object with start and end boundaries.
   */
  _proto42.calcBoundaries = function calcBoundaries(anchor) {
    var indent = this.Editor.options.indent;
    var _this$Editor$Componen2 = this.Editor.Components,
        Measure = _this$Editor$Componen2.Measure,
        padding = _this$Editor$Componen2.Measure.padding;
    var width = Measure.measureWidth(indent, true);
    var top = Measure.getTop(anchor[0]) + padding.top;
    var left = floor(anchor[1] / indent.length) * width + padding.left;
    return {
      start: {
        top: top,
        left: left
      },
      end: {
        top: top,
        left: left + width
      }
    };
  };

  return IndentMarker;
}(Marker);
/**
 * The group ID for markers of indent guides.
 *
 * @since 0.1.0
 */


var MARKER_ID$1 = 'indent';
/**
 * The component for drawing guide lines.
 *
 * @since 0.1.0
 */

var Guide = /*#__PURE__*/function (_Component20) {
  _inheritsLoose(Guide, _Component20);

  function Guide() {
    return _Component20.apply(this, arguments) || this;
  }

  var _proto43 = Guide.prototype;

  /**
   * Initializes the component.
   *
   * @param elements - A collection of editor elements.
   */
  _proto43.mount = function mount(elements) {
    _Component20.prototype.mount.call(this, elements);

    this.listen();
  }
  /**
   * Listens some events.
   */
  ;

  _proto43.listen = function listen() {
    var draw = this.draw.bind(this);
    this.on(EVENT_CHANGED, rafThrottle(draw));
    this.on([EVENT_MOUNTED, EVENT_CHUNK_MOVED], draw);
  }
  /**
   * Clears current guides and draw new ranges for guides.
   */
  ;

  _proto43.draw = function draw() {
    var Range = this.Range;
    var ranges = this.parse();
    Range.clearRanges(MARKER_ID$1);
    Range.register(MARKER_ID$1, ranges, false, IndentMarker);
  }
  /**
   * Parses chunk lines and returns ranges for guides.
   *
   * @return An array with ranges.
   */
  ;

  _proto43.parse = function parse() {
    var _this$Chunk = this.Chunk,
        start = _this$Chunk.start,
        end = _this$Chunk.end;
    var ranges = [];
    var prev = 0;

    for (var i = max(start, 0); i <= end; i++) {
      var line = this.lines[i];

      if (!line) {
        break;
      }

      var depth = line.indentDepth - 1;

      if (line.isEmpty() && prev > 0) {
        depth = prev;
      }

      if (depth > 0) {
        for (var j = 0; j < depth; j++) {
          var length = this.options.indent.length;
          ranges.push({
            start: [i, j * length],
            end: [i, (j + 1) * length]
          });
        }

        prev = depth;
      } else {
        prev = 0;
      }
    }

    return ranges;
  };

  return Guide;
}(Component);
/**
 * The class name for the gutter.
 *
 * @since 0.1.0
 */


var CLASS_GUTTER = PROJECT_CODE + "__gutter";
/**
 * The class name for the inner element.
 *
 * @since 0.1.0
 */

var CLASS_GUTTER_FLOAT = CLASS_GUTTER + "__float";
/**
 * The class name for each row element.
 *
 * @since 0.1.0
 */

var CLASS_GUTTER_ROW = CLASS_GUTTER + "__row";
/**
 * The class name for each line number element.
 *
 * @since 0.1.0
 */

var CLASS_LINE_NUMBER = CLASS_GUTTER + "__number";
/**
 * The modifier class to apply `sticky`.
 *
 * @since 0.1.0
 */

var CLASS_STICKY = CLASS_GUTTER + "--sticky";
/**
 * The status class for the root element.
 *
 * @since 0.1.0
 */

var CLASS_HAS_GUTTER = 'has-gutter';
/**
 * The default options for the Gutter component.
 *
 * @since 0.1.0
 */

var DEFAULT_OPTIONS$4 = {
  selectLine: true,
  start: 1,
  sticky: true
};
/**
 * The class for a gutter.
 *
 * @since 0.1.0
 */

var Gutter = /*#__PURE__*/function (_Component21) {
  _inheritsLoose(Gutter, _Component21);

  /**
   * The Gutter constructor.
   *
   * @param Editor - An Editor instance.
   */
  function Gutter(Editor) {
    var _this65;

    _this65 = _Component21.call(this, Editor) || this;
    _this65.opts = _this65.getOptions('gutter', DEFAULT_OPTIONS$4);
    _this65.start = _this65.opts.start;

    _this65.on(EVENT_INIT_STYLE, function (e, add) {
      add("." + CLASS_GUTTER, 'fontFamily', _this65.options.monospaceFont);
    });

    _this65.render();

    return _this65;
  }
  /**
   * Renders a gutter element and rows.
   */


  var _proto44 = Gutter.prototype;

  _proto44.render = function render() {
    var _this66 = this;

    this.on('root:open', function (e, append, classes) {
      classes.push(CLASS_HAS_GUTTER);
    });
    this.on('editor:open', function (e, append, classes, lines) {
      append(tag([CLASS_GUTTER, _this66.opts.sticky ? CLASS_STICKY : ''], {
        'aria-hidden': true
      }));
      append(tag(CLASS_GUTTER_FLOAT));
      append(_this66.renderRows(lines, append));
      append(repeat('</div>', 2)); // float and gutter
    });
    this.on(EVENT_INIT_STYLE, function (e, add) {
      var lineHeight = _this66.options.lineHeight;
      add("." + CLASS_GUTTER_ROW, {
        height: lineHeight ? lineHeight + "em" : undefined,
        lineHeight: lineHeight
      });
    });
  }
  /**
   * Renders rows of a gutter.
   * `+1` creates an extra row for measurement of the gutter width.
   *
   * @param lines  - An array containing lines.
   * @param append - The function that appends a HTML string.
   */
  ;

  _proto44.renderRows = function renderRows(lines, append) {
    var html = [];
    var max = min(lines.length, this.options.maxInitialLines) + 1;

    for (var i = 0; i < max; i++) {
      var number = (i === max - 1 ? lines.length - 1 : i) + this.start;
      append(tag(CLASS_GUTTER_ROW));
      append("<span class=\"" + CLASS_LINE_NUMBER + "\">" + number + "</span>");
      this.emit('gutter:row', html, i, number);
      append("</div>");
    }

    return html.join('');
  }
  /**
   * Initializes the component.
   *
   * @param elements - A collection of essential elements.
   */
  ;

  _proto44.mount = function mount(elements) {
    _Component21.prototype.mount.call(this, elements);

    this.gutter = query(elements.root, "." + CLASS_GUTTER);
    this["float"] = query(this.gutter, "." + CLASS_GUTTER_FLOAT);

    if (this.gutter) {
      var children = this["float"].children;
      var diff = this.Chunk.length - children.length;

      if (diff > 0) {
        this.supply(diff);
      } else if (diff < 0) {
        _remove(slice(children, diff));
      }

      this.listen();
      this.update();
    }
  }
  /**
   * Supplies the specified number of row and line number elements.
   *
   * @param length - The number of elements to create.
   */
  ;

  _proto44.supply = function supply(length) {
    for (var i = 0; i < length; i++) {
      _create('span', CLASS_LINE_NUMBER, div(CLASS_GUTTER_ROW, this["float"]));
    }
  }
  /**
   * Listens to some events.
   */
  ;

  _proto44.listen = function listen() {
    var _this67 = this;

    this.on(EVENT_CHUNK_SUPPLIED, function (e, chunk, diff) {
      _this67.supply(diff);
    });
    this.on([EVENT_CHUNK_MOVED, EVENT_SCROLL_HEIGHT_CHANGED, EVENT_RESIZE], this.update, this);
    this.on('activeLine:updated', this.activate, this);
    this.on('activeLine:deactivated', this.deactivate, this);

    if (this.opts.selectLine) {
      this.bind(this.gutter, 'pointerdown', this.onPointerDown, this);
    }
  }
  /**
   * Called when the gutter emits the `pointerdown` event.
   *
   * @param e - A PointerEvent object.
   */
  ;

  _proto44.onPointerDown = function onPointerDown(e) {
    var target = e.target;

    if (isHTMLElement(target) && hasClass(target, CLASS_LINE_NUMBER)) {
      var number = +text(target);

      if (!isNaN(number)) {
        this.Selection.selectLine(number - this.start, true, true);
        prevent(e);
      }
    }
  }
  /**
   * Updates line numbers and offsets the float element to the Chunk position.
   */
  ;

  _proto44.update = function update() {
    var chunkStart = this.Chunk.start,
        start = this.start;
    var length = this.lines.length;
    var rows = this["float"].children;

    for (var i = 0; i < rows.length; i++) {
      var elm = rows[i];
      var number = (i === rows.length - 1 ? length - 1 : chunkStart + i) + start;
      text(elm.firstChild, between(number, start, length + start - 1) ? "" + number : '');
    }

    this.offset();
    this.activate();
  }
  /**
   * Offsets the float element to the current Chunk position.
   */
  ;

  _proto44.offset = function offset() {
    var Chunk = this.Chunk,
        start = this.Chunk.start;
    var offset = Chunk.offsetY + (start < 0 ? start * this.Measure.lineHeight : 0);
    styles(this["float"], {
      top: unit(offset)
    });
  }
  /**
   * Activates the specified row.
   */
  ;

  _proto44.activate = function activate() {
    var row = this.Selection.focus[0];
    var elm = this.getElm(row);
    this.deactivate();

    if (elm && this.Editor.isFocused()) {
      addClass(elm, CLASS_ACTIVE);
      this.activeElm = elm;
      this.emit('gutter:activated', elm);
    }
  }
  /**
   * Deactivates the active row if there is.
   */
  ;

  _proto44.deactivate = function deactivate() {
    var activeElm = this.activeElm;

    if (activeElm) {
      _toggleClass(activeElm, CLASS_ACTIVE, false);

      this.emit('gutter:deactivated', activeElm);
      this.activeElm = null;
    }
  }
  /**
   * Returns the element at the row index.
   *
   * @param row - A row index.
   *
   * @return A row element if available, or otherwise `undefined`.
   */
  ;

  _proto44.getElm = function getElm(row) {
    return row > -1 ? this["float"].children[row - this.Chunk.start] : undefined;
  };

  return Gutter;
}(Component);
/**
 * The default options for the History component.
 *
 * @since 0.1.0
 */


var DEFAULT_OPTIONS$3 = {
  limit: 100,
  debounce: 300
};
/**
 * The collection of shortcuts for the History extension.
 *
 * @since 0.1.0
 */

var KEYMAP$4 = {
  undo: ['Z', true, false],
  redo: ['Z', true, true]
};
/**
 * The input type of the history.
 *
 * @since 0.1.0
 */

var RESTORATION_INPUT_TYPE = 'history';
/**
 * The component for managing history.
 * This component requires the Keymap component.
 *
 * @since 0.1.0
 */

var History = /*#__PURE__*/function (_Component22) {
  _inheritsLoose(History, _Component22);

  /**
   * The Comment constructor.
   *
   * @param Editor - An Editor instance.
   */
  function History(Editor) {
    var _this68;

    _this68 = _Component22.call(this, Editor) || this;
    /**
     * Holds history records.
     */

    _this68.history = [];
    /**
     * Indicates the current history index.
     */

    _this68.index = 0;

    _this68.addKeyBindings(KEYMAP$4);

    return _this68;
  }
  /**
   * Initialized the instance.
   */


  var _proto45 = History.prototype;

  _proto45.mount = function mount(elements) {
    _Component22.prototype.mount.call(this, elements);

    this.opts = this.getOptions('history', DEFAULT_OPTIONS$3);
    this.debouncedPush = debounce(this.push.bind(this), this.opts.debounce);
    this.listen();
  }
  /**
   * Listens to some internal events.
   */
  ;

  _proto45.listen = function listen() {
    var _this69 = this;

    this.on(EVENT_CHANGE, this.onChange, this);
    this.on(EVENT_CHANGED, this.onChanged, this);
    this.on(EVENT_KEYMAP + ":undo " + EVENT_KEYMAP + ":redo", function (e, ke, action) {
      ke.preventDefault();

      if (!_this69.Editor.readOnly) {
        _this69[action]();
      }
    });
    this.on(EVENT_RESET, function () {
      _this69.history.length = 0;
    });
  }
  /**
   * Creates a history record object.
   *
   * @return A created HistoryRecord object.
   */
  ;

  _proto45.record = function record() {
    return {
      range: this.Selection.get(),
      value: this.Code.value,
      length: this.lines.length
    };
  }
  /**
   * Restores the provided record.
   * Needs to apply the latest code to the input before sync.
   *
   * @param record - A record to restore.
   */
  ;

  _proto45.restore = function restore(record) {
    var range = record.range,
        length = record.length;
    var start = range.start,
        end = range.end;
    this.emit(EVENT_CHANGE, RESTORATION_INPUT_TYPE);
    this.Code.value = record.value;
    this.Sync.sync(0, length - 1, start[0]);
    this.Selection.set(start, end);
    this.emit(EVENT_CHANGED, RESTORATION_INPUT_TYPE);
    this.emit('history:restored', record);
  }
  /**
   * Pushes a record to the history and resets the index.
   * If the `record` is not provided, a new record will be generated via the current editor status.
   *
   * @param record - Optional. A record to push.
   */
  ;

  _proto45.push = function push(record) {
    var current = this.history[this.index];

    if (current && this.isSame(current, record)) {
      return;
    }

    this.history.push(record);

    if (this.length > this.opts.limit) {
      this.history.shift();
    }

    this.index = this.length - 1;
    this.emit('history:pushed', record);
    this.debouncedPush.cancel();
  }
  /**
   * Checks if the provided 2 records are same or not.
   *
   * @param record1 - A record to check.
   * @param record2 - Another record to check.
   *
   * @return `true` if the records are same, or otherwise `false`.
   */
  ;

  _proto45.isSame = function isSame(record1, record2) {
    return record1.value === record2.value && !compare(record1.range.start, record2.range.start) && !compare(record1.range.end, record2.range.end);
  }
  /**
   * Checks if an old record is now active or not.
   *
   * @return `true` if an old record is active, or `false` otherwise.
   */
  ;

  _proto45.isUndoing = function isUndoing() {
    return this.index !== this.length - 1;
  }
  /**
   * Called when the code is being changed.
   *
   * @param e    - A EventBusEvent object.
   * @param type - An input type. This may be empty.
   */
  ;

  _proto45.onChange = function onChange(e, type) {
    if (type !== RESTORATION_INPUT_TYPE) {
      var history = this.history;

      if (this.isUndoing()) {
        history.splice(this.index + 1, history.length);
      }

      if (!this.Selection.isCollapsed() || !this.length || type === 'replace') {
        this.push(this.record());
      }
    }
  }
  /**
   * Called just after the code is changed.
   *
   * @param e    - A EventBusEvent object.
   * @param type - An input type. This may be empty.
   */
  ;

  _proto45.onChanged = function onChanged(e, type) {
    if (!this.Input.composing && type !== RESTORATION_INPUT_TYPE) {
      if (type === 'input') {
        this.debouncedPush(this.record());
      } else {
        this.push(this.record());
      }
    }
  }
  /**
   * Performs undo.
   */
  ;

  _proto45.undo = function undo() {
    this.debouncedPush.invoke();

    if (0 < this.index && this.index < this.length) {
      this.restore(this.history[--this.index]);
    }
  }
  /**
   * Performs redo only if previously undo() is operated.
   */
  ;

  _proto45.redo = function redo() {
    if (this.index < this.length - 1) {
      this.restore(this.history[++this.index]);
    }
  }
  /**
   * Returns the current history length.
   *
   * @return The number of records.
   */
  ;

  _createClass(History, [{
    key: "length",
    get: function get() {
      return this.history.length;
    }
  }]);

  return History;
}(Component);
/**
 * The default options for the Tab component.
 *
 * @since 0.1.0
 */


var DEFAULT_OPTIONS$2 = {
  help: true,
  deepIndent: true
};
/**
 * The collection of i18n strings.
 *
 * @since 0.1.0
 */

var I18N$3 = {
  indentNotice: 'Indent/Move Focus',
  indentDisabled: 'Inserting indents by the Tab is currently disabled. You can toggle it by %s.'
};
/**
 * The collection of shortcuts for the Indentation extension.
 *
 * @since 0.1.0
 */

var KEYMAP$3 = {
  indent: ['Tab'],
  unindent: ['Tab', false, true],
  toggleTabMode: ['M', true]
};
/**
 * The dialog ID for the indent notice.
 *
 * @since 0.1.0
 */

var DIALOG_ID = 'tab-notice';
/**
 * The component for handing the Tab key to insert/remove indents.
 * Just overriding the default behavior of the Tab key can not satisfy the "No Keyboard Trap" criterion.
 * Therefore as default, the Tab indentation is initially disabled, and it will be enabled when:
 * - the editor is focused by pointer devices, such as a mouse
 * - users explicitly enable it via CTRL+M
 *
 * @link https://www.w3.org/TR/WCAG21/#no-keyboard-trap
 *
 * @since 0.1.0
 */

var Indentation = /*#__PURE__*/function (_Component23) {
  _inheritsLoose(Indentation, _Component23);

  /**
   * The Indentation constructor.
   *
   * @param Editor - An Editor instance.
   */
  function Indentation(Editor) {
    var _this70;

    _this70 = _Component23.call(this, Editor) || this;

    _this70.addI18n(I18N$3);

    _this70.addKeyBindings(KEYMAP$3);

    return _this70;
  }
  /**
   * Initializes the component.
   * This component requires the Dialog component.
   *
   * @param elements - A collection of essential elements.
   */


  var _proto46 = Indentation.prototype;

  _proto46.mount = function mount(elements) {
    if (!(this.Dialog = this.require('Dialog'))) {
      return;
    }

    _Component23.prototype.mount.call(this, elements);

    this.space = this.options.indent;
    this.opts = this.getOptions('indentation', DEFAULT_OPTIONS$2);
    this.disabled = this.opts.activation !== 'load';
    this.register();
    this.listen();
  }
  /**
   * Explicitly enables or disables the component.
   *
   * @param disabled - Determines whether to disable the component or not.
   */
  ;

  _proto46.setDisabled = function setDisabled(disabled) {
    this.disabled = disabled;
    Indentation.noticed = true;
  }
  /**
   * Listens to some events.
   */
  ;

  _proto46.listen = function listen() {
    var _this71 = this;

    var focused;
    this.on(EVENT_FOCUS, function (e, type) {
      if (type === 'pointer' && !focused) {
        _this71.setDisabled(false);
      }

      focused = true;
    });
    this.on(EVENT_KEYMAP + ":indent " + EVENT_KEYMAP + ":unindent", function (e, ke, action) {
      if (!_this71.disabled) {
        if (action === 'indent') {
          _this71.indent();
        } else {
          _this71.unindent();
        }

        prevent(ke);
      }
    });
    this.on(EVENT_KEYMAP + ":toggleTabMode", function (e, ke) {
      _this71.setDisabled(!_this71.disabled);

      prevent(ke);
    });
    this.on(EVENT_NEWLINE, function () {
      _this71.indentNewline();

      if (_this71.opts.deepIndent) {
        _this71.indentDeep();
      }
    });
    this.on(EVENT_KEYDOWN, this.onKeydown, this);
  }
  /**
   * Called when any key is pressed on the editor.
   *
   * @param e     - An EventBusEvent object.
   * @param ke    - A KeyboardEvent object.
   */
  ;

  _proto46.onKeydown = function onKeydown(e, ke) {
    if (this.opts.help && !Indentation.noticed && ke.key === 'Tab') {
      this.Dialog.show(DIALOG_ID);
      Indentation.noticed = true;
      prevent(ke);
      return;
    }

    this.remove(ke);
  }
  /**
   * Registers the dialog for the indentation notice.
   */
  ;

  _proto46.register = function register() {
    var _this72 = this;

    var i18n = this.i18n;
    var body = div();
    html$2(body, format("<p>" + i18n.indentDisabled + "</p>", "<strong>" + this.Keymap.getShortcut('toggleTabMode') + "</strong>"));
    this.Dialog.register(DIALOG_ID, body, i18n.indentNotice, [{
      id: 'activate',
      click: function click() {
        _this72.setDisabled(false);

        _this72.Dialog.hide();
      }
    }, 'confirm']);
  }
  /**
   * Prepends indents to all selected lines.
   */
  ;

  _proto46.indent = function indent() {
    var Input = this.Input,
        Selection = this.Selection,
        space = this.space,
        size = this.space.length;

    if (Selection.isCollapsed()) {
      Input.apply({
        type: 'indent',
        insertion: space,
        offset: size
      });
    } else {
      this.emit(EVENT_CHANGE);

      var _Selection$get3 = Selection.get(),
          _start5 = _Selection$get3.start,
          end = _Selection$get3.end;

      this.Code.replaceLinesBy(_start5[0], end[0], function (line) {
        return space + line;
      });
      this.Sync.sync(_start5[0], end[0]);
      Selection.set([_start5[0], _start5[1] + size], [end[0], end[1] + size]);
      this.emit(EVENT_CHANGED);
    }
  }
  /**
   * Removes indents from all selected lines.
   */
  ;

  _proto46.unindent = function unindent() {
    var _this73 = this;

    var space = this.space;

    var _this$Selection$get4 = this.Selection.get(),
        start = _this$Selection$get4.start,
        end = _this$Selection$get4.end;

    var startOffset = 0;
    var endOffset = 0;
    var changed;
    this.Code.replaceLinesBy(start[0], end[0], function (line, index, array) {
      var match = line.match(new RegExp("^(" + space + "| {0," + space.length + "})"));

      if (match) {
        var indent = match[0];
        line = line.replace(indent, '');

        if (index === 0) {
          _this73.emit(EVENT_CHANGE);

          startOffset -= indent.length;
        }

        if (index === array.length - 1) {
          endOffset -= indent.length;
        }

        changed = true;
      }

      return line;
    });

    if (changed) {
      var startCol = max(start[1] + startOffset, 0);
      var endCol = max(end[1] + endOffset, 0);
      this.Sync.sync(start[0], end[0]);
      this.Selection.set([start[0], startCol], [end[0], endCol]);
      this.emit(EVENT_CHANGED);
    }
  }
  /**
   * Adds an indent to the newline when the enter key is pressed.
   */
  ;

  _proto46.indentNewline = function indentNewline() {
    var Input = this.Input;
    var indent = this.lines[Input.row].getIndent();

    if (indent) {
      Input.set('newline', {
        value: Input.before + LINE_BREAK$1 + indent + Input.after.replace(/^[ \t]+/, ''),
        position: [Input.row + 1, indent.length]
      });
    }
  }
  /**
   * Adds an indent after specific patterns.
   */
  ;

  _proto46.indentDeep = function indentDeep() {
    var index = this.findConfigIndex();

    if (index > -1 && this.shouldIndentDeep(index)) {
      var _Input = this.Input,
          space = this.space;

      var indent = this.lines[_Input.row].getIndent();

      var string = LINE_BREAK$1 + indent + space + (this.isClosed(index) ? LINE_BREAK$1 + indent : '');

      _Input.set('indentDeep', {
        key: 'Enter',
        insertion: string,
        position: [_Input.row + 1, indent.length + space.length]
      });
    }
  }
  /**
   * Returns an indent config index.
   *
   * @return A config index if found, or -1 if not.
   */
  ;

  _proto46.findConfigIndex = function findConfigIndex() {
    var config = this.getConfig();

    for (var i = 0; i < config.length; i++) {
      var settings = config[i];

      if (isFunction(settings[0])) {
        return settings[0](this.Editor) ? i : -1;
      }

      var _Input2 = this.Input;

      if (settings[0].test(_Input2.before.trim())) {
        return i;
      }
    }

    return -1;
  }
  /**
   * Determines whether to increase the indent level or not.
   *
   * @param index - A config index.
   *
   * @return `true` if the level should be increased, or otherwise `false`.
   */
  ;

  _proto46.shouldIndentDeep = function shouldIndentDeep(index) {
    var config = this.getConfig()[index];
    var condition = config && config[2];

    if (isFunction(condition)) {
      return condition(this.Editor);
    }

    return !condition || this.Scope.isIn(condition);
  }
  /**
   * Checks if the position where the indentation is being added is enclosed by paired characters or not.
   *
   * @param index - A config index.
   *
   * @return `true` if the closing representation is found, or otherwise `false`.
   */
  ;

  _proto46.isClosed = function isClosed(index) {
    var config = this.getConfig()[index];
    var condition = config && config[1];

    if (!condition) {
      return false;
    }

    if (isFunction(condition)) {
      return condition(this.Editor);
    }

    var Input = this.Input;
    return condition.test(Input.after.trim());
  }
  /**
   * When the backspace key is pressed,
   * removes indents of a line if they are same with the previous one's.
   *
   * @param e - A KeyboardEvent object.
   */
  ;

  _proto46.remove = function remove(e) {
    var Selection = this.Selection;

    if (e.key === 'Backspace' && Selection.isCollapsed()) {
      var lines = this.lines;

      var _Selection$get4 = Selection.get(),
          _start6 = _Selection$get4.start;

      var prevRow = _start6[0] - 1;
      var prevLine = lines[prevRow];

      if (!prevLine) {
        return;
      }

      var prevIndent = prevLine.getIndent();

      var curIndent = lines[_start6[0]].getIndent();

      if (prevIndent && prevIndent === curIndent && _start6[1] === curIndent.length) {
        this.emit(EVENT_CHANGE);
        var position = [prevRow, prevLine.text.length];
        this.Code.replaceRange(position, _start6, '');
        this.Sync.sync(prevRow, _start6[0]);
        Selection.set(position);
        this.emit(EVENT_CHANGED);
        prevent(e);
      }
    }
  }
  /**
   * Returns a config for indentation.
   *
   * @return A config array.
   */
  ;

  _proto46.getConfig = function getConfig() {
    return this.getLanguage().indent || [];
  };

  return Indentation;
}(Component);
/**
 * The collection of i18n strings.
 *
 * @since 0.1.0
 */


var I18N$2 = {
  jumpToLine: 'Jump to Line',
  jumpToolbar: 'Jump Toolbar'
};
/**
 * The collection of shortcuts for the Jump extension.
 *
 * @since 0.1.0
 */

var KEYMAP$2 = {
  jumpToLine: ['G', true]
};
/**
 * The ID for the "Jump to the Line" toolbar.
 *
 * @since 0.1.0
 */

var TOOLBAR_ID$1 = 'jump-to-line';
/**
 * The throttle duration for applying the input result to the range.
 *
 * @since 0.1.0
 */

var JUMP_DEBOUNCE_DURATION = 10;
/**
 * The class for jumping to the specific line.
 *
 * @since 0.1.0
 */

var Jump = /*#__PURE__*/function (_Component24) {
  _inheritsLoose(Jump, _Component24);

  /**
   * The Indentation constructor.
   *
   * @param Editor - An Editor instance.
   */
  function Jump(Editor) {
    var _this74;

    _this74 = _Component24.call(this, Editor) || this;

    _this74.addI18n(I18N$2);

    _this74.addKeyBindings(KEYMAP$2);

    return _this74;
  }
  /**
   * Initializes the component.
   *
   * @param elements - A collection of essential elements.
   */


  var _proto47 = Jump.prototype;

  _proto47.mount = function mount(elements) {
    if (!(this.Toolbar = this.require('Toolbar'))) {
      return;
    }

    _Component24.prototype.mount.call(this, elements);

    this.create();
    this.listen();
  }
  /**
   * Creates elements for the jump interface and registers the wrapper to the toolbar.
   */
  ;

  _proto47.create = function create() {
    var wrapper = div();
    this.field = this.Toolbar.createField({
      id: 'jumpToLine',
      tabindex: 1
    }, wrapper);

    if (!this.getOptions('jump').hideLocation) {
      this.location = _create('span', null, wrapper);
    }

    this.Toolbar.register(TOOLBAR_ID$1, wrapper, this.i18n.jumpToolbar);
  }
  /**
   * Listens to some events.
   */
  ;

  _proto47.listen = function listen() {
    var _this75 = this;

    this.on(EVENT_KEYMAP + ":jumpToLine", function (e, ke) {
      _this75.update();

      _this75.Toolbar.show(TOOLBAR_ID$1);

      prevent(ke);
    });
    this.bind(this.field, 'input', debounce(this.jump.bind(this), JUMP_DEBOUNCE_DURATION));
    this.bind(this.field, 'keydown', function (e) {
      if (matchesKey(e, _this75.options.keymap.jumpToLine)) {
        prevent(e);
      }
    });
  }
  /**
   * Jumps to the line specified by the input.
   */
  ;

  _proto47.jump = function jump() {
    var row = parseInt(this.field.value) - 1;

    if (!isNaN(row) && between(row, 0, this.lines.length - 1)) {
      this.View.jump(row, true);
      this.Selection.set([row, 0]);
      this.field.focus();
      this.update();
      this.emit('jump:jumped');
    }
  }
  /**
   * Updates the location.
   */
  ;

  _proto47.update = function update() {
    if (this.location) {
      text(this.location, this.Selection.getLocation());
    }
  };

  return Jump;
}(Component);
/**
 * The default options for the Resize component.
 *
 * @since 0.1.0
 */


var DEFAULT_OPTIONS$1 = {
  horizontal: true,
  vertical: true
};
/**
 * The collection of i18n strings.
 *
 * @since 0.1.0
 */

var I18N$1 = {
  resizeBar: 'Drag to Resize/Double Click to Reset'
};
/**
 * The class name for the resize bar.
 *
 * @since 0.1.0
 */

var CLASS_SIZER_BAR = PROJECT_CODE + "__sizer__bar";
/**
 * The class for creating a resize bar.
 *
 * @since 0.1.0
 */

var ResizeBar = /*#__PURE__*/function (_AbstractDraggableBar2) {
  _inheritsLoose(ResizeBar, _AbstractDraggableBar2);

  /**
   * The ResizeBar constructor.
   *
   * @param Editor   - An Editor instance.
   * @param parent   - A parent element where the bar will be appended.
   * @param vertical - Determines whether to create a vertical or horizontal sizer.
   */
  function ResizeBar(Editor, parent, vertical) {
    var _this76;

    _this76 = _AbstractDraggableBar2.call(this, [CLASS_SIZER_BAR, CLASS_SIZER_BAR + "--" + (vertical ? 'vertical' : 'horizontal')], parent, vertical) || this;
    _this76.Editor = Editor;

    _this76.init();

    return _this76;
  }
  /**
   * Initializes the instance.
   * Note that `aria-valuemin` and `aria-valuemax` is not necessary because their default values are `0` and `100`.
   *
   * @link https://www.w3.org/TR/wai-aria-1.2/#separator
   */


  var _proto48 = ResizeBar.prototype;

  _proto48.init = function init() {
    var _this77 = this;

    var Editor = this.Editor;
    var resizeBar = Editor.options.i18n.resizeBar;
    attr(this.elm, {
      role: 'separator',
      'aria-controls': Editor.elements.root.id,
      'aria-orientation': this.vertical ? 'horizontal' : 'vertical',
      'aria-valuenow': 0,
      'aria-label': resizeBar,
      title: resizeBar
    });
    Editor.event.on(EVENT_RESIZE, this.updateAria.bind(this));
    on(this.elm, 'dblclick', function () {
      Editor[_this77.names.height] = '';
    });
  }
  /**
   * Called when the bar starts being dragged.
   *
   * @param e - A PointerEvent object.
   */
  ;

  _proto48.onDrag = function onDrag(e) {
    _AbstractDraggableBar2.prototype.onDrag.call(this, e);

    this.startSize = this.Editor[this.names.height];
  }
  /**
   * Called while the bar is dragged.
   *
   * @param e - A PointerEvent object.
   */
  ;

  _proto48.onDragging = function onDragging(e) {
    _AbstractDraggableBar2.prototype.onDragging.call(this, e);

    var diff = this.getCoord(e) - this.startCoord;
    this.Editor[this.names.height] = unit(this.startSize + diff);
  }
  /**
   * Updates aria attributes related with the separator role.
   * This method will be called through the event bus.
   */
  ;

  _proto48.updateAria = function updateAria() {
    var names = this.names;
    var min = this.convertValueToPixel(names.minHeight) || 0;
    var max = this.convertValueToPixel(names.maxHeight);
    var now = this.Editor[names.height] - min;

    if (max > min) {
      attr(this.elm, {
        'aria-valuenow': round(100 * 100 * now / (max - min)) / 100
      });
    }
  }
  /**
   * Converts the CSS value to pixel.
   *
   * @param prop - A CSS prop name.
   *
   * @return A value in pixel.
   */
  ;

  _proto48.convertValueToPixel = function convertValueToPixel(prop) {
    var names = this.names;
    var root = this.Editor.elements.root;
    var value = styles(root, prop);

    if (endsWith(value, '%')) {
      return parseFloat(value) * root.parentElement[names.scrollHeight] / 100;
    }

    return parseFloat(value);
  }
  /**
   * Destroys the instance.
   */
  ;

  _proto48.destroy = function destroy() {
    off(null, '', this);

    _AbstractDraggableBar2.prototype.destroy.call(this);
  };

  return ResizeBar;
}(AbstractDraggableBar);
/**
 * The class name for the wrapper element that contains resize bars.
 *
 * @since 0.1.0
 */


var CLASS_SIZER = PROJECT_CODE + "__sizer";
/**
 * The component for resizing the editor by drag bars.
 *
 * @since 0.1.0
 */

var Resize = /*#__PURE__*/function (_Component25) {
  _inheritsLoose(Resize, _Component25);

  function Resize() {
    var _this78;

    _this78 = _Component25.apply(this, arguments) || this;
    /**
     * Stores ResizeBar instances.
     */

    _this78.bars = [];
    return _this78;
  }
  /**
   * Initializes the component.
   *
   * @param elements - A collection of essential elements.
   */


  var _proto49 = Resize.prototype;

  _proto49.mount = function mount(elements) {
    _Component25.prototype.mount.call(this, elements);

    var Editor = this.Editor,
        bars = this.bars;
    var wrapper = div(CLASS_SIZER, elements.overlay);
    var options = this.getOptions('resize', DEFAULT_OPTIONS$1);
    this.addI18n(I18N$1);

    if (options.horizontal) {
      bars.push(new ResizeBar(Editor, wrapper, false));
    }

    if (options.vertical) {
      bars.push(new ResizeBar(Editor, wrapper, true));
    }
  }
  /**
   * Destroys the component.
   */
  ;

  _proto49.destroy = function destroy() {
    this.bars.forEach(function (bar) {
      bar.destroy();
    });

    _Component25.prototype.destroy.call(this);
  };

  return Resize;
}(Component);
/**
 * Buttons settings for the search interface.
 */


var SEARCH_BUTTONS = [{
  id: 'matchCase',
  icon: 'matchCase',
  click: 'toggleMatchCase',
  checkbox: true
}, {
  id: 'wholeWord',
  icon: 'word',
  click: 'toggleWholeWord',
  checkbox: true
}, {
  id: 'regexp',
  icon: 'regexp',
  click: 'toggleRegExp',
  checkbox: true
}, {
  id: 'prevMatch',
  icon: 'arrowUp',
  click: 'prev'
}, {
  id: 'nextMatch',
  icon: 'arrowDown',
  click: 'next'
}];
/**
 * Buttons settings for the replace interface.
 */

var REPLACE_BUTTONS = [{
  id: 'replace',
  click: 'replace'
}, {
  id: 'replaceAll',
  click: 'replaceAll'
}];
/**
 * The class for the search interface.
 */

var CLASS_SEARCH = PROJECT_CODE + "__search";
/**
 * The class for the replace interface.
 */

var CLASS_REPLACE = PROJECT_CODE + "__replace";
/**
 * The class for controls in the search interface.
 */

var CLASS_SEARCH_CONTROLS = CLASS_SEARCH + "__controls";
/**
 * The class for controls in the replace interface.
 */

var CLASS_REPLACE_CONTROLS = CLASS_REPLACE + "__controls";
/**
 * The class for displaying matches count.
 */

var CLASS_MATCHES_COUNT = CLASS_SEARCH + "__matches";
/**
 * The ID for the search toolbar.
 *
 * @since 0.1.0
 */

var TOOLBAR_ID = 'search';
/**
 * The group ID for markers.
 *
 * @since 0.1.0
 */

var MARKER_ID = 'match';
/**
 * The group ID for an active marker.
 *
 * @since 0.1.0
 */

var ACTIVE_MARKER_ID = 'active-match';
/**
 * The throttle duration for applying the input result to the range.
 *
 * @since 0.1.0
 */

var SEARCH_THROTTLE_DURATION = 10;
/**
 * The delay time until jumping to the next match after replace.
 *
 * @since 0.1.0
 */

var JUMP_DELAY_AFTER_REPLACE = 20;
/**
 * The default options for the Search component.
 *
 * @since 0.1.0
 */

var DEFAULT_OPTIONS = {
  hideButtons: []
};
/**
 * The collection of i18n strings.
 *
 * @since 0.1.0
 */

var I18N = {
  search: 'Search',
  searchToolbar: 'Search/Replace Toolbar',
  wholeWord: 'Match Whole Word',
  prevMatch: 'Previous Match',
  nextMatch: 'Next Match',
  replace: 'Replace',
  replaceAll: 'Replace All',
  matchCase: 'Match Case',
  regexp: 'Regex',
  noResults: 'No results'
};
/**
 * Icons for the Search component.
 *
 * @since 0.1.0
 */

var ICONS = {
  regexp: ['m15 2a1.5 1.5 0 0 0-1.5 1.5v3.4l-3.1-1.7a1.5 1.5 0 0 0-2 0.57 1.5 1.5 0 0 0 0.58 2l3 1.7-3 1.7a1.5 1.5 0 0 0-0.58 2 1.5 1.5 0 0 0 2 0.58l3.1-1.7v3.4a1.5 1.5 0 0 0 1.5 1.5 1.5 1.5 0 0 0 1.5-1.5v-3.4l3.1 1.7a1.5 1.5 0 0 0 2-0.58 1.5 1.5 0 0 0-0.58-2l-3-1.7 3-1.7a1.5 1.5 0 0 0 0.58-2 1.5 1.5 0 0 0-2-0.57l-3.1 1.7v-3.4a1.5 1.5 0 0 0-1.5-1.5zm-9.7 13c-1.8 0-3.3 1.5-3.3 3.3s1.5 3.3 3.3 3.3c1.8 0 3.3-1.5 3.3-3.3s-1.5-3.3-3.3-3.3z'],
  word: ['m22 4h-2.95l-2.37 11.3-2.56-11.3h-3.94l-2.44 11.3-2.51-11.3h-3.16l4.11 16h2.87l3.02-11.8 3.04 11.8h2.9z'],
  matchCase: ['m6.9 4.2c-3.7 0-5.6 2-5.6 6v3.5c0 4 1.8 6 5.5 6 1.7 0 3-0.42 4-1.3 0.97-0.88 1.5-2.1 1.5-3.8v-0.15h-2.8v0.18c0 0.77-0.22 1.4-0.66 1.8s-1.1 0.66-1.9 0.66c-0.92 0-1.6-0.26-2-0.84-0.44-0.55-0.64-1.5-0.64-2.7v-3.3c0-1.3 0.2-2.2 0.62-2.8s1.1-0.86 2-0.86c0.81 0 1.5 0.24 1.9 0.68 0.44 0.46 0.68 1.1 0.68 1.8v0.13h2.9v-0.15c0-1.6-0.51-2.8-1.5-3.7-0.99-0.88-2.3-1.3-4-1.3zm11 3.8c-1.5 0-2.6 0.4-3.4 1.2-0.84 0.79-1.2 2-1.2 3.6v2.1c0 1.6 0.4 2.9 1.2 3.6 0.84 0.79 2 1.2 3.4 1.2 1.4 0 2.5-0.35 3.3-1.1 0.79-0.73 1.2-1.7 1.2-3v-0.15h-2.6v0.13c0 0.53-0.18 0.95-0.51 1.2-0.33 0.31-0.77 0.44-1.3 0.44-0.64 0-1.1-0.18-1.5-0.55-0.35-0.35-0.51-0.97-0.51-1.8v-2.1c0-1.6 0.66-2.4 2-2.4 0.57 0 1 0.15 1.3 0.46 0.33 0.31 0.51 0.75 0.51 1.3v0.13h2.6v-0.22c0-1.3-0.4-2.3-1.2-3-0.79-0.7-1.9-1.1-3.3-1.1z']
};
/**
 * The collection of shortcuts for the Search extension.
 *
 * @since 0.1.0
 */

var KEYMAP$1 = {
  search: ['F', true],
  searchNext: ['F3'],
  searchPrev: ['F3', false, true],
  replace: ['F', true, true]
};
/**
 * The class for searching texts in the code.
 *
 * @since 0.1.0
 */

var Search = /*#__PURE__*/function (_Component26) {
  _inheritsLoose(Search, _Component26);

  /**
   * The Search constructor.
   *
   * @param Editor - An Editor instance.
   */
  function Search(Editor) {
    var _this79;

    _this79 = _Component26.call(this, Editor) || this;
    /**
     * Holds matched ranges.
     */

    _this79.ranges = [];
    /**
     * The current range index.
     */

    _this79.index = -1;

    _this79.addIcons(ICONS);

    _this79.addI18n(I18N);

    _this79.addKeyBindings(KEYMAP$1);

    return _this79;
  }
  /**
   * Initializes the component.
   *
   * @param elements - A collection of essential elements.
   */


  var _proto50 = Search.prototype;

  _proto50.mount = function mount(elements) {
    if (!(this.Toolbar = this.require('Toolbar'))) {
      return;
    }

    _Component26.prototype.mount.call(this, elements);

    this.opts = this.getOptions('search', DEFAULT_OPTIONS);
    this.throttledSearch = throttle(this.search.bind(this), SEARCH_THROTTLE_DURATION);
    this.create();
    this.Toolbar.register(TOOLBAR_ID, this.wrapper, this.i18n.searchToolbar);
    this.listen();
  }
  /**
   * Creates elements for the search interface.
   */
  ;

  _proto50.create = function create() {
    var _this80 = this;

    var Toolbar = this.Toolbar;
    var wrapper = div();
    var searchBar = div(CLASS_SEARCH, wrapper);
    var replaceBar = div(CLASS_REPLACE, wrapper);
    this.searchField = Toolbar.createField({
      id: 'search',
      tabindex: 1
    }, searchBar);
    this.replaceField = Toolbar.createField({
      id: 'replace',
      tabindex: 1
    }, replaceBar);
    var searchControls = div(CLASS_SEARCH_CONTROLS, searchBar);
    var replaceControls = div(CLASS_REPLACE_CONTROLS, replaceBar);
    var searchButtons = SEARCH_BUTTONS.filter(function (settings) {
      return !includes(_this80.opts.hideButtons, settings.id);
    });
    var replaceButtons = REPLACE_BUTTONS.filter(function (settings) {
      return !includes(_this80.opts.hideButtons, settings.id);
    });
    this.buttons = assign$1(Toolbar.createButtons(searchButtons, searchControls, this), Toolbar.createButtons(replaceButtons, replaceControls, this));

    if (!this.opts.hideMatchCount) {
      this.counter = _create('span', CLASS_MATCHES_COUNT, searchControls);
    }

    this.wrapper = wrapper;
    this.searchBar = searchBar;
    this.replaceBar = replaceBar;
  }
  /**
   * Listens to some events.
   */
  ;

  _proto50.listen = function listen() {
    var _this81 = this;

    var searchField = this.searchField;
    this.on(EVENT_KEYMAP + ":search", function (e, ke) {
      _this81.show(!_this81.options.keymap.replace);

      prevent(ke);
    });
    this.on(EVENT_KEYMAP + ":replace", function (e, ke) {
      _this81.show(true);

      prevent(ke);
    });
    this.bind(searchField, 'input', this.onInput, this);
    this.bind(searchField, 'keydown', this.onSearchFieldKeydown, this);
    this.bind(this.replaceField, 'keydown', this.onReplaceFieldKeydown, this);
    this.on('toolbar:opened', function (e, toolbar, id) {
      if (id !== TOOLBAR_ID) {
        _this81.clear();
      }
    });
    this.on('toolbar:closed', this.clear, this);
    this.on([EVENT_CHANGED, EVENT_SYNCED], function () {
      var value = searchField.value;

      if (_this81.isActive() && value) {
        _this81.throttledSearch(value, _this81.index);
      }
    });
    this.on(EVENT_READONLY, function (e, readOnly) {
      if (_this81.isActive()) {
        _this81.toggleReplace(!readOnly);
      }
    });
  }
  /**
   * Called when any key is pressed on the search field.
   *
   * @param e - A KeyboardEvent object.
   */
  ;

  _proto50.onSearchFieldKeydown = function onSearchFieldKeydown(e) {
    if (e.key === 'Enter') {
      this.next();
      prevent(e);
      return;
    }

    this.onKeydown(e);
  }
  /**
   * Called when any key is pressed on the replace field.
   *
   * @param e - A KeyboardEvent object.
   */
  ;

  _proto50.onReplaceFieldKeydown = function onReplaceFieldKeydown(e) {
    if (e.key === 'Enter') {
      this.replace();
      prevent(e);
      return;
    }

    this.onKeydown(e);
  }
  /**
   * Called when any key is pressed on both the search and input fields.
   *
   * @param e - A KeyboardEvent object.
   */
  ;

  _proto50.onKeydown = function onKeydown(e) {
    var key = e.key.toUpperCase();
    var Keymap = this.Keymap;
    var matches = Keymap.matches.bind(Keymap, e);
    var next = matches('searchNext');
    var prev = matches('searchPrev');

    if (next || prev) {
      this[prev ? 'prev' : 'next']();
      prevent(e);
    } else if (matches('search')) {
      this.show(false);
      prevent(e);
    } else if (matches('replace')) {
      this.show(true);
      prevent(e);
    } else if (e.ctrlKey) {
      if (key !== 'A' && key !== 'X' && key === 'C') {
        prevent(e);
      }
    } else if (e.altKey) {
      prevent(e);
    }
  }
  /**
   * Called when the field receives input.
   */
  ;

  _proto50.onInput = function onInput() {
    var value = this.searchField.value;

    if (value) {
      this.throttledSearch(value);
    } else {
      this.clear();
      this.toggleDisabled();
    }
  }
  /**
   * Searches the provided string with current settings.
   *
   * @param search - Optional. A string to search.
   * @param index  - Optional. An index to activate.
   *
   * @return An array with tuples that contains `[ index, length ]`.
   */
  ;

  _proto50.search = function search(_search2, index) {
    if (_search2 === void 0) {
      _search2 = this.searchField.value;
    }

    var Range = this.Range;
    var source;

    try {
      source = this.regexp && _search2 ? new RegExp(_search2) : _search2;
    } catch (e) {
      return;
    }

    var ranges = this.Code.search(source, !this.matchCase, this.wholeWord, MAX_RANGES);
    this.clear();
    Range.register(MARKER_ID, ranges);
    this.ranges = ranges;

    if (isUndefined$1(index) || index < 0) {
      this.index = -1;
      this.next();
    } else {
      this.index = clamp(index, 0, ranges.length - 1);
      this.activate(this.index);
    }

    this.updateMatchesCount();
    this.toggleDisabled();
  }
  /**
   * Search again without changing the current index.
   *
   * @param index - Optional. An index to activate.
   */
  ;

  _proto50.rematch = function rematch(index) {
    this.search(undefined, index);
  }
  /**
   * Updates matches counter.
   */
  ;

  _proto50.updateMatchesCount = function updateMatchesCount() {
    if (this.counter) {
      var length = this.ranges.length;
      var string;

      if (!length) {
        string = this.i18n.noResults;
      } else if (length > MAX_RANGES) {
        string = MAX_RANGES + "+";
      } else {
        string = this.index + 1 + "/" + length;
      }

      text(this.counter, string);
    }
  }
  /**
   * Toggles `disabled` property of some buttons.
   */
  ;

  _proto50.toggleDisabled = function toggleDisabled() {
    var _this82 = this;

    ['prevMatch', 'nextMatch', 'replace', 'replaceAll'].forEach(function (name) {
      var button = _this82.buttons[name];

      if (button) {
        button.disabled = !_this82.ranges.length;
      }
    });
  }
  /**
   * Jumps to the start position of the range specified by the index.
   *
   * @param index - An index of the range to jump to.
   */
  ;

  _proto50.jump = function jump(index) {
    var range = this.ranges[index];

    if (range) {
      this.View.jump(range.start[0], true);
    }
  }
  /**
   * Highlights the prev or next matched text and jumps there.
   *
   * @param prev - Whether to highlight the previous or next match.
   */
  ;

  _proto50.move = function move(prev) {
    var length = this.ranges.length;
    var index = this.index + (prev ? -1 : 1);

    if (index >= length) {
      index = 0;
    } else if (index < 0) {
      index = length - 1;
    }

    this.activate(index);
    this.jump(index);
    this.index = index;
    this.updateMatchesCount();
  }
  /**
   * Toggles the active class and the `aria-checked` attribute.
   *
   * @param button  - A target button element.
   * @param checked - Determines whether to check or uncheck them.
   */
  ;

  _proto50.toggleChecked = function toggleChecked(button, checked) {
    _toggleClass(button, CLASS_ACTIVE, checked);

    attr(button, {
      'aria-checked': checked
    });
  }
  /**
   * Toggles the replace UI.
   *
   * @param show - Determines whether to show the replace UI or not.
   */
  ;

  _proto50.toggleReplace = function toggleReplace(show) {
    _toggleClass(this.replaceBar, CLASS_ACTIVE, show && !this.Editor.readOnly && !this.opts.hideReplace);
  }
  /**
   * Checks if the search toolbar is active or not.
   *
   * @return `true` if the search toolbar is active, or otherwise `false`.
   */
  ;

  _proto50.isActive = function isActive() {
    return this.Toolbar.isActive(TOOLBAR_ID);
  }
  /**
   * Toggles the "Match Case" mode.
   *
   * @param activate - Optional. Whether to activate the "Match Case" mode or not.
   */
  ;

  _proto50.toggleMatchCase = function toggleMatchCase(activate) {
    if (activate === void 0) {
      activate = !this.matchCase;
    }

    this.toggleChecked(this.buttons.matchCase, this.matchCase = activate);
    this.search();
  }
  /**
   * Toggles the "RegExp" mode.
   *
   * @param activate - Optional. Whether to activate the "RegExp" mode or not.
   */
  ;

  _proto50.toggleRegExp = function toggleRegExp(activate) {
    if (activate === void 0) {
      activate = !this.regexp;
    }

    this.toggleChecked(this.buttons.regexp, this.regexp = activate);
    this.search();
  }
  /**
   * Toggles the "Match Whole Word" mode.
   *
   * @param wholeWord - Optional. Whether to activate the "Match Whole Word" mode or not.
   */
  ;

  _proto50.toggleWholeWord = function toggleWholeWord(wholeWord) {
    if (wholeWord === void 0) {
      wholeWord = !this.wholeWord;
    }

    this.toggleChecked(this.buttons.wholeWord, this.wholeWord = wholeWord);
    this.search();
  }
  /**
   * Highlights the matched text at the index.
   *
   * @param index - An index of the range to highlight.
   */
  ;

  _proto50.activate = function activate(index) {
    var activeRange = this.ranges[index];

    if (activeRange) {
      var _Range2 = this.Range;

      _Range2.clear(ACTIVE_MARKER_ID);

      _Range2.register(ACTIVE_MARKER_ID, [activeRange]);
    }
  }
  /**
   * Highlights the next matched text and jumps there.
   */
  ;

  _proto50.next = function next() {
    this.move(false);
  }
  /**
   * Highlights the previous matched text and jumps there.
   */
  ;

  _proto50.prev = function prev() {
    this.move(true);
  }
  /**
   * Replaces the search result with the provided replacement string.
   * If the length of ranges does not change after replacing,
   * that means the replacement includes the original word itself.
   *
   * @param replacement - Optional. A replacement string.
   * @param index       - Optional. An index to replace.
   */
  ;

  _proto50.replace = function replace(replacement, index) {
    var _this83 = this;

    if (replacement === void 0) {
      replacement = this.replaceField.value;
    }

    if (index === void 0) {
      index = this.index;
    }

    var ranges = this.ranges;
    var activeRange = ranges[index];

    if (activeRange) {
      var _Selection6 = this.Selection;
      var _start7 = activeRange.start,
          end = activeRange.end;
      var nextRange = ranges[index + 1];

      _Selection6.update(_start7, _start7, true);

      this.emit(EVENT_CHANGE, 'replace');
      this.jump(index);
      this.Code.replaceRange(_start7, end, replacement);
      this.Sync.sync(_start7[0], end[0]);
      this.emit(EVENT_CHANGED, 'replace');
      this.rematch(index);

      if (nextRange) {
        this.index = this.toIndex(nextRange);
        this.activate(this.index);
      }

      this.jumpTimerAfterReplace = setTimeout(function () {
        _this83.jump(_this83.index);
      }, JUMP_DELAY_AFTER_REPLACE);
    }
  }
  /**
   * Converts the provided range to the range index.
   *
   * @param range - A range to convert into a range index.
   *
   * @return A range index if available, or otherwise `-1`.
   */
  ;

  _proto50.toIndex = function toIndex(range) {
    var ranges = this.ranges;

    for (var i = 0; i < ranges.length; i++) {
      if (!compare(ranges[i].start, range.start) && !compare(ranges[i].end, range.end)) {
        return i;
      }
    }

    return -1;
  }
  /**
   * Replaces all matched strings with the replacement.
   *
   * @param replacement - Optional. A replacement string.
   */
  ;

  _proto50.replaceAll = function replaceAll(replacement) {
    var _this84 = this;

    if (replacement === void 0) {
      replacement = this.replaceField.value;
    }

    var ranges = this.ranges;

    if (ranges.length) {
      this.emit(EVENT_CHANGE);
      ranges.forEach(function (range) {
        _this84.Code.replaceRange(range.start, range.end, replacement);
      });
      var endRow = ranges[ranges.length - 1].end[0];
      this.View.jump(endRow);
      this.Sync.sync(ranges[0].start[0], endRow);
      this.clear();
      this.emit(EVENT_CHANGED);
    }
  }
  /**
   * Shows the toolbar.
   *
   * @param replace - Whether to display the replace interface or not.
   */
  ;

  _proto50.show = function show(replace) {
    var Selection = this.Selection,
        searchField = this.searchField;
    this.toggleReplace(replace);

    if (!Selection.isCollapsed()) {
      if (!Selection.isMultiline()) {
        searchField.value = Selection.toString();
      }
    }

    this.Toolbar.show(TOOLBAR_ID);
    this.rematch();
  }
  /**
   * Clears all markers.
   */
  ;

  _proto50.clear = function clear() {
    var Range = this.Range;
    Range.clear(MARKER_ID);
    Range.clear(ACTIVE_MARKER_ID);
    this.ranges = [];
    this.updateMatchesCount();
    this.throttledSearch.cancel();
    clearTimeout(this.jumpTimerAfterReplace);
  };

  return Search;
}(Component);
/**
 * The collection of shortcuts for the Shortcut extension.
 *
 * @since 0.1.0
 */


var KEYMAP = {
  cutLine: ['X', true],
  copyLine: ['C', true],
  moveUp: ['ArrowUp', true],
  moveDown: ['ArrowDown', true]
};
/**
 * The class for handling some shortcuts.
 *
 * @since 0.1.0
 */

var Shortcut = /*#__PURE__*/function (_Component27) {
  _inheritsLoose(Shortcut, _Component27);

  /**
   * The Search constructor.
   *
   * @param Editor - An Editor instance.
   */
  function Shortcut(Editor) {
    var _this85;

    _this85 = _Component27.call(this, Editor) || this;

    _this85.addKeyBindings(KEYMAP);

    return _this85;
  }
  /**
   * Initializes the component.
   *
   * @param elements - A collection of essential elements.
   */


  var _proto51 = Shortcut.prototype;

  _proto51.mount = function mount(elements) {
    _Component27.prototype.mount.call(this, elements);

    var Selection = this.Selection,
        Measure = this.Measure,
        Edit = this.Edit;
    this.on(EVENT_KEYMAP + ":copyLine", function (e, ke) {
      if (Selection.isCollapsed() && !isPrevented(ke)) {
        Selection.selectLine(undefined, true, true);
        Edit.copy();
        prevent(ke);
      }
    });
    this.on(EVENT_KEYMAP + ":cutLine", function (e, ke) {
      if (Selection.isCollapsed() && !isPrevented(ke)) {
        Edit.cutLine();
        prevent(ke);
      }
    });
    this.on(EVENT_KEYMAP + ":moveUp " + EVENT_KEYMAP + ":moveDown", function (e, ke) {
      var scroller = elements.scroller;
      scroller.scrollTop += (endsWith(e.type, 'n') ? 1 : -1) * Measure.lineHeight;
      prevent(ke);
    });
  };

  return Shortcut;
}(Component);
/**
 * Classes for the toolbar components.
 *
 * @since 0.1.0
 */


var CLASS_TOOLBAR = PROJECT_CODE + "__toolbar";
var CLASS_TOOLBAR_BODY = CLASS_TOOLBAR + "__body";
var CLASS_TOOLBAR_UI = CLASS_TOOLBAR + "__ui";
var CLASS_TOOLBAR_GROUP = CLASS_TOOLBAR + "__group";
/**
 * The class for creating a toolbar.
 *
 * @since 0.1.0
 */

var Toolbar = /*#__PURE__*/function (_UIComponent3) {
  _inheritsLoose(Toolbar, _UIComponent3);

  function Toolbar() {
    return _UIComponent3.apply(this, arguments) || this;
  }

  var _proto52 = Toolbar.prototype;

  /**
   * Listens to some events and receives requests from other components.
   */
  _proto52.listen = function listen() {
    _UIComponent3.prototype.listen.call(this);

    this.on(EVENT_RESIZE, this.resize, this);
  }
  /**
   * Creates toolbar elements.
   *
   * @link https://www.w3.org/TR/wai-aria-1.2/#toolbar
   */
  ;

  _proto52.create = function create() {
    var elements = this.elements;
    var id = elements.root.id + "-toolbar";
    var wrapper = div({
      id: id,
      role: 'toolbar',
      "class": CLASS_TOOLBAR
    });
    var close = this.createCloseButton({
      'aria-controls': id
    });
    this.body = div(CLASS_TOOLBAR_BODY, wrapper);

    _append(div(CLASS_TOOLBAR_UI, wrapper), close);

    prepend(elements.view, wrapper);
    this.wrapper = wrapper;
  }
  /**
   * Appends the group element to the body element instead of the wrapper element.
   *
   * @param group - A group ID.
   */
  ;

  _proto52.append = function append(group) {
    _append(this.body, this.groups[group].elm);
  }
  /**
   * Resizes the scroller according to the toolbar height.
   */
  ;

  _proto52.resize = function resize() {
    if (isIE() && this.isActive()) {
      var maxHeight = styles(this.elements.root, 'maxHeight');
      styles(this.elements.body, {
        maxHeight: "calc(" + maxHeight + " - " + unit(height(this.wrapper)) + ")"
      });
    }
  }
  /**
   * Registers a group to the toolbar.
   *
   * @param group - A group ID.
   * @param elm   - An element to register.
   * @param label - A label of the toolbar.
   */
  ;

  _proto52.register = function register(group, elm, label) {
    addClass(elm, CLASS_TOOLBAR_GROUP);
    this.groups[group] = {
      elm: elm,
      label: label
    };
  }
  /**
   * Displays the toolbar.
   *
   * @param group - A group ID to display.
   */
  ;

  _proto52.show = function show(group) {
    var _window2 = window,
        pageXOffset = _window2.pageXOffset,
        pageYOffset = _window2.pageYOffset;
    var wrapper = this.wrapper;

    _UIComponent3.prototype.show.call(this, group);

    this.resize();

    if (this.group) {
      removeClass(wrapper, CLASS_TOOLBAR + "--" + this.group);
    }

    addClass(wrapper, CLASS_TOOLBAR + "--" + group);
    attr(wrapper, {
      'aria-label': this.groups[group].label
    });
    this.autoFocus(group);
    window.scrollTo(pageXOffset, pageYOffset);
    this.View.emitResize();
    this.emit('toolbar:opened', this, group);
  }
  /**
   * Hides the toolbar.
   */
  ;

  _proto52.hide = function hide() {
    var _window3 = window,
        pageXOffset = _window3.pageXOffset,
        pageYOffset = _window3.pageYOffset;

    _UIComponent3.prototype.hide.call(this);

    removeClass(this.wrapper, CLASS_TOOLBAR + "--" + this.group);
    styles(this.elements.body, {
      maxHeight: ''
    });
    this.Selection.reselect();
    window.scrollTo(pageXOffset, pageYOffset);
    this.View.emitResize();
    this.emit('toolbar:closed', this, this.group);
  };

  return Toolbar;
}(UIComponent);

var index$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  ActiveLine: ActiveLine,
  AutoClose: AutoClose,
  BracketMatching: BracketMatching,
  Comment: Comment,
  Dialog: Dialog,
  Guide: Guide,
  Gutter: Gutter,
  History: History,
  Indentation: Indentation,
  Jump: Jump,
  Resize: Resize,
  Search: Search,
  Shortcut: Shortcut,
  Toolbar: Toolbar
});
/**
 * Extends the original Lexer class to add custom data to the 3rd parameter of each token.
 *
 * @since 0.1.0
 */

var Lexer = /*#__PURE__*/function (_Lexer$) {
  _inheritsLoose(Lexer, _Lexer$);

  function Lexer() {
    return _Lexer$.apply(this, arguments) || this;
  }

  var _proto53 = Lexer.prototype;

  /**
   * Runs the tokenization and adds custom data to each token.
   *
   * @param text  - A text to tokenize.
   * @param limit - Optional. Limits the number of lines.
   *
   * @return An array with arrays of tokens.
   */
  _proto53.run = function run(text, limit) {
    var lines = this.tokenize(text, limit);

    for (var i = 0; i < lines.length; i++) {
      var tokens = lines[i];
      var offset = 0;

      for (var j = 0; j < tokens.length; j++) {
        var token = tokens[j];
        var length = token[1].length;
        var info = token[2];
        var classes = CLASS_TOKEN + " " + PROJECT_CODE_SHORT + "__" + token[0].split('.')[0];
        var escaped = token[1].replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

        var _html4 = "<code class=\"" + classes + "\">" + escaped + "</code>";

        token[2] = {
          category: token[0],
          code: token[1],
          html: _html4,
          from: offset,
          to: offset + length,
          index: j,
          state: info.state,
          depth: info.depth,
          head: info.head,
          tail: info.tail,
          distance: info.distance,
          language: info.language,
          split: info.split
        };
        offset += length;
      }
    }

    return lines;
  };

  return Lexer;
}(Lexer$1);
/**
 * Returns a CSS Language object.
 *
 * @since 0.1.0
 *
 * @return A Language object.
 */


function css() {
  var language = css$1();
  return assign$1({
    id: language.id,
    language: language,
    lexer: new Lexer(language)
  }, cssConfig());
}
/**
 * Returns a CSS LanguageConfig object.
 *
 * @private
 * @since 0.1.0
 *
 * @return A LanguageConfig object.
 */


function cssConfig() {
  var scope = ['!comment', '!string'];
  var bracketsCompletionData = {
    close: scope,
    skip: scope,
    remove: scope
  };
  var quotesCompletionData = {
    close: '@quotes',
    skip: '@quotes',
    remove: '@quotes'
  };
  return {
    lineComment: ['/*', '*/'],
    blockComment: ['/*', '*/'],
    multiline: [['/*', '*/', CATEGORY_COMMENT]],
    indent: [[/{$/, /^}/, scope]],
    autoClose: [['(', ')', bracketsCompletionData], ['[', ']', bracketsCompletionData], ['{', '}', bracketsCompletionData], ["'", "'", quotesCompletionData], ['"', '"', quotesCompletionData]]
  };
}
/**
 * Returns a JavaScript Language object.
 *
 * @since 0.1.0
 *
 * @return A Language object.
 */


function javascript() {
  var language = javascript$1();
  return assign$1({
    id: language.id,
    language: language,
    lexer: new Lexer(language)
  }, javascriptConfig());
}
/**
 * Returns a JavaScript LanguageConfig object.
 *
 * @private
 * @since 0.1.0
 *
 * @return A LanguageConfig object.
 */


function javascriptConfig() {
  var scope = ['!comment', '!string'];
  var bracketsCompletionData = {
    close: scope,
    skip: scope,
    remove: scope
  };
  var quotesCompletionData = {
    close: '@quotes',
    skip: '@quotes',
    remove: '@quotes'
  };
  return {
    lineComment: ['//', ''],
    blockComment: ['/*', '*/'],
    multiline: [['`', '`', CATEGORY_STRING, '#backtick'], ['/*', '*/', CATEGORY_COMMENT]],
    indent: [[/\($/, /^\)/, scope], [/\[$/, /^]/, scope], [/{$/, /^}/, scope]],
    autoClose: [['(', ')', bracketsCompletionData], ['[', ']', bracketsCompletionData], ['{', '}', bracketsCompletionData], ["'", "'", quotesCompletionData], ['"', '"', quotesCompletionData], ['`', '`', {
      close: shouldCloseBacktick,
      skip: shouldSkipOrRemoveBacktick,
      remove: shouldSkipOrRemoveBacktick
    }]]
  };
}
/**
 * Determines whether to close the backtick or not.
 * A backtick should not be completed when:
 * - the entered backtick is closing a string (`aaa[`]).
 * - the next character of the entered backtick is not empty ([`]aaa).
 *
 * @param Editor - An editor instance.
 *
 * @return `true` if the backtick should be closed.
 */


function shouldCloseBacktick(Editor) {
  var Components = Editor.Components;
  var Input = Components.Input;
  var prevInfo = Input.info;

  if (prevInfo && prevInfo.category === CATEGORY_STRING) {
    return false;
  }

  var after = Input.after;
  return !Components.Scope.isIn('comment') && (!after || /^\s/.test(after));
}
/**
 * Determines whether to skip/remove the backtick or not.
 *
 * @param Editor - An editor instance.
 *
 * @return `true` if the backtick should be skipped or removed.
 */


function shouldSkipOrRemoveBacktick(Editor) {
  var Components = Editor.Components;

  var _Components$Selection = Components.Selection.get(),
      start = _Components$Selection.start;

  var info = Components.Code.lines.getInfoAt(start);

  if (info && info.category === CATEGORY_STRING) {
    return compare(start, [start[0], info.to - 1]) === 0;
  }

  return false;
}
/**
 * A collection of self-closing tags.
 *
 * @link https://developer.mozilla.org/en-US/docs/Glossary/Empty_element
 *
 * @since 0.1.0
 */


var SELF_CLOSING_TAGS = ['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'keygen', 'link', 'meta', 'param', 'source', 'track', 'wbr'];
/**
 * The max number of lines to scan up for an opening/closing tag.
 */

var SCAN_UP_LIMIT = 500;
/**
 * Returns a HTML Language object.
 *
 * @since 0.1.0
 *
 * @param options - Optional. Options.
 *
 * @return A Language object.
 */

function html(options) {
  var _use;

  if (options === void 0) {
    options = {};
  }

  var _script = options.script || {
    language: javascript(),
    use: {
      config: javascript(),
      code: '<script>',
      depth: 2
    }
  };

  var _style = options.style || {
    language: css(),
    use: {
      config: css(),
      code: '<style>',
      depth: 2
    }
  };

  var language = html$1({
    script: function script() {
      return _script.language.language;
    },
    style: function style() {
      return _style.language.language;
    }
  });
  return assign$1({
    id: language.id,
    language: language,
    lexer: new Lexer(language),
    use: (_use = {}, _use[_script.language.id] = _script.use, _use[_style.language.id] = _style.use, _use)
  }, htmlConfig());
}
/**
 * Returns a HTML LanguageConfig object.
 *
 * @since 0.1.0
 *
 * @return A LanguageConfig object.
 */


function htmlConfig() {
  var quotesCompletionData = {
    close: shouldClose,
    skip: shouldSkipOrRemove,
    remove: shouldSkipOrRemove
  };
  return {
    lineComment: ['<!--', '-->'],
    blockComment: ['<!--', '-->'],
    multiline: [['<!--', '-->', CATEGORY_COMMENT]],
    indent: [[shouldIndent, /^<\/\w+/]],
    autoClose: [["'", "'", quotesCompletionData], ['"', '"', quotesCompletionData], ['>', closeCurrentTag], ['/', closeTag], ['=', '""', {
      close: shouldAppendQuotes,
      offset: 1
    }]]
  };
}
/**
 * Determines whether to append `""` after `=` in a tag.
 *
 * @param Editor - An editor instance.
 *
 * @return `true` if quotes should be appended, or otherwise `false`.
 */


function shouldAppendQuotes(Editor) {
  var Components = Editor.Components;
  return Components.Scope.isIn(['#attr', '#tag', '#openTag', '!value']) && /(^|[ \t])[^\s/<>"'=]+=$/.test(Components.Input.before);
}
/**
 * Determines whether to indent deep or not.
 *
 * @param editor - An editor instance.
 *
 * @return `true` if the indent levent should be increased.
 */


function shouldIndent(editor) {
  return !!getOpeningTagName(editor);
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


function validateQuotes(Editor, config, skipOrRemove) {
  var Components = Editor.Components;

  if (Components.Scope.isIn(['#attr'])) {
    if (skipOrRemove) {
      return true;
    }

    var _Input3 = Components.Input;
    return new RegExp("=\\s*?" + config[0] + "$").test(_Input3.before);
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


function shouldClose(Editor, config) {
  return validateQuotes(Editor, config, false);
}
/**
 * Determines whether to skip/remove quotes or not.
 *
 * @param Editor - An Editor instance.
 * @param config - A target config.
 *
 * @return `true` if inputting a quote should be skipped.
 */


function shouldSkipOrRemove(Editor, config) {
  return validateQuotes(Editor, config, true);
}
/**
 * Returns an opening tag name at the current position.
 *
 * @param Editor - An Editor instance.
 *
 * @return A tag name if found, or an empty string if not.
 */


function getOpeningTagName(Editor) {
  var Components = Editor.Components;
  var range = Components.Selection.get();
  var col = range.start[1] - 1;

  if (col >= 0) {
    var _Code = Components.Code,
        lines = Components.Code.lines;
    var _range$start2 = range.start,
        tailRow = _range$start2[0];
    var tailInfo = lines.getInfoAt([tailRow, col]);

    if (tailInfo && tailInfo.category === CATEGORY_BRACKET && tailInfo.code === '>') {
      var _lines$scanUp = lines.scanUp([tailRow, tailInfo.from], [CATEGORY_BRACKET, /</]),
          headRow = _lines$scanUp.row,
          headInfo = _lines$scanUp.info;

      var code = _Code.sliceRange([headRow, headInfo.from], [tailRow, tailInfo.to]);

      var _matches = /<([^\s/<>"'=]+)/.exec(code);

      if (_matches && !includes(SELF_CLOSING_TAGS, _matches[1])) {
        return _matches[1];
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


function closeCurrentTag(editor) {
  var tag = getOpeningTagName(editor);
  return tag ? "</" + tag + ">" : '';
}
/**
 * Attempts to close the tag when the `/` is entered.
 * This function is not strict for nested tags.
 *
 * @param Editor - An Editor instance.
 *
 * @return A closing tag.
 */


function closeTag(Editor) {
  var Components = Editor.Components;

  var _Components$Selection2 = Components.Selection.get(),
      start = _Components$Selection2.start;

  var lines = Components.Code.lines;
  var closingInfo = lines.scanUp(start, [CATEGORY_TAG_CLOSE, /./], null, 0, SCAN_UP_LIMIT);
  var openingInfo = lines.scanUp(start, [CATEGORY_TAG, /./], null, 0, SCAN_UP_LIMIT);

  if (openingInfo) {
    if (closingInfo) {
      if ((openingInfo.row - closingInfo.row || openingInfo.info.from - closingInfo.info.from) < 0) {
        return '>';
      }
    }
  }

  var tag = openingInfo.info.code;

  if (includes(SELF_CLOSING_TAGS, tag)) {
    return '>';
  }

  return tag + ">";
}
/**
 * Returns a JSON Language object.
 *
 * @since 0.1.0
 *
 * @return A Language object.
 */


function json() {
  var language = json$1();
  return assign$1({
    id: language.id,
    language: language,
    lexer: new Lexer(language)
  }, jsonConfig());
}
/**
 * Returns a JSON LanguageConfig object.
 *
 * @private
 * @since 0.1.0
 *
 * @return A LanguageConfig object.
 */


function jsonConfig() {
  var scope = ['!string'];
  var bracketsCompletionData = {
    close: scope,
    skip: scope,
    remove: scope
  };
  var quotesCompletionData = {
    close: '@quotes',
    skip: '@quotes',
    remove: '@quotes'
  };
  return {
    indent: [[/{$/, /^}/, scope], [/\[$/, /^]/, scope]],
    autoClose: [['[', ']', bracketsCompletionData], ['{', '}', bracketsCompletionData], ['"', '"', quotesCompletionData]]
  };
}
/**
 * Returns a JSX Language object.
 *
 * @since 0.1.0
 *
 * @return A Language object.
 */


function jsx() {
  var language = jsx$1();
  return assign$1({
    id: language.id,
    language: language,
    lexer: new Lexer(language)
  }, jsxConfig());
}
/**
 * Returns a JSX LanguageConfig object.
 *
 * @private
 * @since 0.1.0
 *
 * @return A LanguageConfig object.
 */


function jsxConfig() {
  var _js$indent, _js$autoClose;

  var js = javascriptConfig();
  var html = htmlConfig();

  (_js$indent = js.indent).push.apply(_js$indent, html.indent);

  var autoClose = html.autoClose;
  var config = autoClose.filter(function (config) {
    return config[0] === '=';
  })[0];

  if (config) {
    config[1] = '{}';
  }

  (_js$autoClose = js.autoClose).push.apply(_js$autoClose, html.autoClose);

  return js;
}
/**
 * Returns a `none` Language object.
 *
 * @since 0.1.0
 *
 * @return A Language object.
 */


function none() {
  var language = none$1();
  return {
    id: language.id,
    language: language,
    lexer: new Lexer(language)
  };
}
/**
 * Returns a SCSS Language object.
 *
 * @since 0.1.0
 *
 * @return A Language object.
 */


function scss() {
  var language = scss$1();
  return assign$1({
    id: language.id,
    language: language,
    lexer: new Lexer(language)
  }, scssConfig());
}
/**
 * Returns a SCSS LanguageConfig object.
 *
 * @private
 * @since 0.1.0
 *
 * @return A LanguageConfig object.
 */


function scssConfig() {
  return assign$1(cssConfig(), {
    lineComment: ['//', '']
  });
}
/**
 * Returns a TypeScript Language object.
 *
 * @since 0.1.0
 *
 * @return A Language object.
 */


function typescript() {
  var language = typescript$1();
  return assign$1({
    id: language.id,
    language: language,
    lexer: new Lexer(language)
  }, javascriptConfig());
}
/**
 * Returns a Vue Language object.
 *
 * @since 0.1.0
 *
 * @return A Language object.
 */


function vue(options) {
  var _use2;

  if (options === void 0) {
    options = {};
  }

  var _script2 = options.script || {
    language: javascript(),
    use: {
      config: javascript(),
      code: '<script>',
      depth: 2
    }
  };

  var _style2 = options.style || {
    language: css(),
    use: {
      config: css(),
      code: '<style>',
      depth: 2
    }
  };

  var language = vue$1({
    script: function script() {
      return _script2.language.language;
    },
    style: function style() {
      return _style2.language.language;
    }
  });
  return assign$1({
    id: language.id,
    language: language,
    lexer: new Lexer(language),
    use: (_use2 = {}, _use2[_script2.language.id] = _script2.use, _use2[_style2.language.id] = _style2.use, _use2)
  }, vueConfig());
}
/**
 * Returns a Vue LanguageConfig object.
 *
 * @private
 * @since 0.1.0
 *
 * @return A LanguageConfig object.
 */


function vueConfig() {
  return htmlConfig();
}
/**
 * Returns a XML Language object.
 *
 * @since 0.1.0
 *
 * @return A Language object.
 */


function xml() {
  var language = xml$1();
  return assign$1({
    id: language.id,
    language: language,
    lexer: new Lexer(language)
  }, xmlConfig());
}
/**
 * Returns a XML LanguageConfig object.
 *
 * @private
 * @since 0.1.0
 *
 * @return A LanguageConfig object.
 */


function xmlConfig() {
  return htmlConfig();
}

var index = /*#__PURE__*/Object.freeze({
  __proto__: null,
  css: css,
  html: html,
  javascript: javascript,
  json: json,
  jsx: jsx,
  none: none,
  scss: scss,
  typescript: typescript,
  vue: vue,
  xml: xml
});
exports.ActiveLine = ActiveLine;
exports.AutoClose = AutoClose;
exports.BracketMatching = BracketMatching;
exports.Comment = Comment;
exports.Component = Component;
exports.Dialog = Dialog;
exports.Extensions = index$1;
exports.Guide = Guide;
exports.Gutter = Gutter;
exports.History = History;
exports.Indentation = Indentation;
exports.Jump = Jump;
exports.Resize = Resize;
exports.RyuseiCode = RyuseiCode;
exports.Search = Search;
exports.Shortcut = Shortcut;
exports.Toolbar = Toolbar;
exports.css = css;
exports["default"] = RyuseiCode;
exports.html = html;
exports.javascript = javascript;
exports.json = json;
exports.jsx = jsx;
exports.languages = index;
exports.none = none;
exports.scss = scss;
exports.typescript = typescript;
exports.vue = vue;
exports.xml = xml;
