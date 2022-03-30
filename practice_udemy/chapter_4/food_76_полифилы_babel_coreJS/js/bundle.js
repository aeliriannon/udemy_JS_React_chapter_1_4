/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "../../../node_modules/es6-promise/dist/es6-promise.js":
/*!*************************************************************!*\
  !*** ../../../node_modules/es6-promise/dist/es6-promise.js ***!
  \*************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*!
 * @overview es6-promise - a tiny implementation of Promises/A+.
 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
 * @license   Licensed under MIT license
 *            See https://raw.githubusercontent.com/stefanpenner/es6-promise/master/LICENSE
 * @version   v4.2.8+1e68dce6
 */

(function (global, factory) {
	 true ? module.exports = factory() :
	0;
}(this, (function () { 'use strict';

function objectOrFunction(x) {
  var type = typeof x;
  return x !== null && (type === 'object' || type === 'function');
}

function isFunction(x) {
  return typeof x === 'function';
}



var _isArray = void 0;
if (Array.isArray) {
  _isArray = Array.isArray;
} else {
  _isArray = function (x) {
    return Object.prototype.toString.call(x) === '[object Array]';
  };
}

var isArray = _isArray;

var len = 0;
var vertxNext = void 0;
var customSchedulerFn = void 0;

var asap = function asap(callback, arg) {
  queue[len] = callback;
  queue[len + 1] = arg;
  len += 2;
  if (len === 2) {
    // If len is 2, that means that we need to schedule an async flush.
    // If additional callbacks are queued before the queue is flushed, they
    // will be processed by this flush that we are scheduling.
    if (customSchedulerFn) {
      customSchedulerFn(flush);
    } else {
      scheduleFlush();
    }
  }
};

function setScheduler(scheduleFn) {
  customSchedulerFn = scheduleFn;
}

function setAsap(asapFn) {
  asap = asapFn;
}

var browserWindow = typeof window !== 'undefined' ? window : undefined;
var browserGlobal = browserWindow || {};
var BrowserMutationObserver = browserGlobal.MutationObserver || browserGlobal.WebKitMutationObserver;
var isNode = typeof self === 'undefined' && typeof process !== 'undefined' && {}.toString.call(process) === '[object process]';

// test for web worker but not in IE10
var isWorker = typeof Uint8ClampedArray !== 'undefined' && typeof importScripts !== 'undefined' && typeof MessageChannel !== 'undefined';

// node
function useNextTick() {
  // node version 0.10.x displays a deprecation warning when nextTick is used recursively
  // see https://github.com/cujojs/when/issues/410 for details
  return function () {
    return process.nextTick(flush);
  };
}

// vertx
function useVertxTimer() {
  if (typeof vertxNext !== 'undefined') {
    return function () {
      vertxNext(flush);
    };
  }

  return useSetTimeout();
}

function useMutationObserver() {
  var iterations = 0;
  var observer = new BrowserMutationObserver(flush);
  var node = document.createTextNode('');
  observer.observe(node, { characterData: true });

  return function () {
    node.data = iterations = ++iterations % 2;
  };
}

// web worker
function useMessageChannel() {
  var channel = new MessageChannel();
  channel.port1.onmessage = flush;
  return function () {
    return channel.port2.postMessage(0);
  };
}

function useSetTimeout() {
  // Store setTimeout reference so es6-promise will be unaffected by
  // other code modifying setTimeout (like sinon.useFakeTimers())
  var globalSetTimeout = setTimeout;
  return function () {
    return globalSetTimeout(flush, 1);
  };
}

var queue = new Array(1000);
function flush() {
  for (var i = 0; i < len; i += 2) {
    var callback = queue[i];
    var arg = queue[i + 1];

    callback(arg);

    queue[i] = undefined;
    queue[i + 1] = undefined;
  }

  len = 0;
}

function attemptVertx() {
  try {
    var vertx = Function('return this')().require('vertx');
    vertxNext = vertx.runOnLoop || vertx.runOnContext;
    return useVertxTimer();
  } catch (e) {
    return useSetTimeout();
  }
}

var scheduleFlush = void 0;
// Decide what async method to use to triggering processing of queued callbacks:
if (isNode) {
  scheduleFlush = useNextTick();
} else if (BrowserMutationObserver) {
  scheduleFlush = useMutationObserver();
} else if (isWorker) {
  scheduleFlush = useMessageChannel();
} else if (browserWindow === undefined && "function" === 'function') {
  scheduleFlush = attemptVertx();
} else {
  scheduleFlush = useSetTimeout();
}

function then(onFulfillment, onRejection) {
  var parent = this;

  var child = new this.constructor(noop);

  if (child[PROMISE_ID] === undefined) {
    makePromise(child);
  }

  var _state = parent._state;


  if (_state) {
    var callback = arguments[_state - 1];
    asap(function () {
      return invokeCallback(_state, child, callback, parent._result);
    });
  } else {
    subscribe(parent, child, onFulfillment, onRejection);
  }

  return child;
}

/**
  `Promise.resolve` returns a promise that will become resolved with the
  passed `value`. It is shorthand for the following:

  ```javascript
  let promise = new Promise(function(resolve, reject){
    resolve(1);
  });

  promise.then(function(value){
    // value === 1
  });
  ```

  Instead of writing the above, your code now simply becomes the following:

  ```javascript
  let promise = Promise.resolve(1);

  promise.then(function(value){
    // value === 1
  });
  ```

  @method resolve
  @static
  @param {Any} value value that the returned promise will be resolved with
  Useful for tooling.
  @return {Promise} a promise that will become fulfilled with the given
  `value`
*/
function resolve$1(object) {
  /*jshint validthis:true */
  var Constructor = this;

  if (object && typeof object === 'object' && object.constructor === Constructor) {
    return object;
  }

  var promise = new Constructor(noop);
  resolve(promise, object);
  return promise;
}

var PROMISE_ID = Math.random().toString(36).substring(2);

function noop() {}

var PENDING = void 0;
var FULFILLED = 1;
var REJECTED = 2;

function selfFulfillment() {
  return new TypeError("You cannot resolve a promise with itself");
}

function cannotReturnOwn() {
  return new TypeError('A promises callback cannot return that same promise.');
}

function tryThen(then$$1, value, fulfillmentHandler, rejectionHandler) {
  try {
    then$$1.call(value, fulfillmentHandler, rejectionHandler);
  } catch (e) {
    return e;
  }
}

function handleForeignThenable(promise, thenable, then$$1) {
  asap(function (promise) {
    var sealed = false;
    var error = tryThen(then$$1, thenable, function (value) {
      if (sealed) {
        return;
      }
      sealed = true;
      if (thenable !== value) {
        resolve(promise, value);
      } else {
        fulfill(promise, value);
      }
    }, function (reason) {
      if (sealed) {
        return;
      }
      sealed = true;

      reject(promise, reason);
    }, 'Settle: ' + (promise._label || ' unknown promise'));

    if (!sealed && error) {
      sealed = true;
      reject(promise, error);
    }
  }, promise);
}

function handleOwnThenable(promise, thenable) {
  if (thenable._state === FULFILLED) {
    fulfill(promise, thenable._result);
  } else if (thenable._state === REJECTED) {
    reject(promise, thenable._result);
  } else {
    subscribe(thenable, undefined, function (value) {
      return resolve(promise, value);
    }, function (reason) {
      return reject(promise, reason);
    });
  }
}

function handleMaybeThenable(promise, maybeThenable, then$$1) {
  if (maybeThenable.constructor === promise.constructor && then$$1 === then && maybeThenable.constructor.resolve === resolve$1) {
    handleOwnThenable(promise, maybeThenable);
  } else {
    if (then$$1 === undefined) {
      fulfill(promise, maybeThenable);
    } else if (isFunction(then$$1)) {
      handleForeignThenable(promise, maybeThenable, then$$1);
    } else {
      fulfill(promise, maybeThenable);
    }
  }
}

function resolve(promise, value) {
  if (promise === value) {
    reject(promise, selfFulfillment());
  } else if (objectOrFunction(value)) {
    var then$$1 = void 0;
    try {
      then$$1 = value.then;
    } catch (error) {
      reject(promise, error);
      return;
    }
    handleMaybeThenable(promise, value, then$$1);
  } else {
    fulfill(promise, value);
  }
}

function publishRejection(promise) {
  if (promise._onerror) {
    promise._onerror(promise._result);
  }

  publish(promise);
}

function fulfill(promise, value) {
  if (promise._state !== PENDING) {
    return;
  }

  promise._result = value;
  promise._state = FULFILLED;

  if (promise._subscribers.length !== 0) {
    asap(publish, promise);
  }
}

function reject(promise, reason) {
  if (promise._state !== PENDING) {
    return;
  }
  promise._state = REJECTED;
  promise._result = reason;

  asap(publishRejection, promise);
}

function subscribe(parent, child, onFulfillment, onRejection) {
  var _subscribers = parent._subscribers;
  var length = _subscribers.length;


  parent._onerror = null;

  _subscribers[length] = child;
  _subscribers[length + FULFILLED] = onFulfillment;
  _subscribers[length + REJECTED] = onRejection;

  if (length === 0 && parent._state) {
    asap(publish, parent);
  }
}

function publish(promise) {
  var subscribers = promise._subscribers;
  var settled = promise._state;

  if (subscribers.length === 0) {
    return;
  }

  var child = void 0,
      callback = void 0,
      detail = promise._result;

  for (var i = 0; i < subscribers.length; i += 3) {
    child = subscribers[i];
    callback = subscribers[i + settled];

    if (child) {
      invokeCallback(settled, child, callback, detail);
    } else {
      callback(detail);
    }
  }

  promise._subscribers.length = 0;
}

function invokeCallback(settled, promise, callback, detail) {
  var hasCallback = isFunction(callback),
      value = void 0,
      error = void 0,
      succeeded = true;

  if (hasCallback) {
    try {
      value = callback(detail);
    } catch (e) {
      succeeded = false;
      error = e;
    }

    if (promise === value) {
      reject(promise, cannotReturnOwn());
      return;
    }
  } else {
    value = detail;
  }

  if (promise._state !== PENDING) {
    // noop
  } else if (hasCallback && succeeded) {
    resolve(promise, value);
  } else if (succeeded === false) {
    reject(promise, error);
  } else if (settled === FULFILLED) {
    fulfill(promise, value);
  } else if (settled === REJECTED) {
    reject(promise, value);
  }
}

function initializePromise(promise, resolver) {
  try {
    resolver(function resolvePromise(value) {
      resolve(promise, value);
    }, function rejectPromise(reason) {
      reject(promise, reason);
    });
  } catch (e) {
    reject(promise, e);
  }
}

var id = 0;
function nextId() {
  return id++;
}

function makePromise(promise) {
  promise[PROMISE_ID] = id++;
  promise._state = undefined;
  promise._result = undefined;
  promise._subscribers = [];
}

function validationError() {
  return new Error('Array Methods must be provided an Array');
}

var Enumerator = function () {
  function Enumerator(Constructor, input) {
    this._instanceConstructor = Constructor;
    this.promise = new Constructor(noop);

    if (!this.promise[PROMISE_ID]) {
      makePromise(this.promise);
    }

    if (isArray(input)) {
      this.length = input.length;
      this._remaining = input.length;

      this._result = new Array(this.length);

      if (this.length === 0) {
        fulfill(this.promise, this._result);
      } else {
        this.length = this.length || 0;
        this._enumerate(input);
        if (this._remaining === 0) {
          fulfill(this.promise, this._result);
        }
      }
    } else {
      reject(this.promise, validationError());
    }
  }

  Enumerator.prototype._enumerate = function _enumerate(input) {
    for (var i = 0; this._state === PENDING && i < input.length; i++) {
      this._eachEntry(input[i], i);
    }
  };

  Enumerator.prototype._eachEntry = function _eachEntry(entry, i) {
    var c = this._instanceConstructor;
    var resolve$$1 = c.resolve;


    if (resolve$$1 === resolve$1) {
      var _then = void 0;
      var error = void 0;
      var didError = false;
      try {
        _then = entry.then;
      } catch (e) {
        didError = true;
        error = e;
      }

      if (_then === then && entry._state !== PENDING) {
        this._settledAt(entry._state, i, entry._result);
      } else if (typeof _then !== 'function') {
        this._remaining--;
        this._result[i] = entry;
      } else if (c === Promise$1) {
        var promise = new c(noop);
        if (didError) {
          reject(promise, error);
        } else {
          handleMaybeThenable(promise, entry, _then);
        }
        this._willSettleAt(promise, i);
      } else {
        this._willSettleAt(new c(function (resolve$$1) {
          return resolve$$1(entry);
        }), i);
      }
    } else {
      this._willSettleAt(resolve$$1(entry), i);
    }
  };

  Enumerator.prototype._settledAt = function _settledAt(state, i, value) {
    var promise = this.promise;


    if (promise._state === PENDING) {
      this._remaining--;

      if (state === REJECTED) {
        reject(promise, value);
      } else {
        this._result[i] = value;
      }
    }

    if (this._remaining === 0) {
      fulfill(promise, this._result);
    }
  };

  Enumerator.prototype._willSettleAt = function _willSettleAt(promise, i) {
    var enumerator = this;

    subscribe(promise, undefined, function (value) {
      return enumerator._settledAt(FULFILLED, i, value);
    }, function (reason) {
      return enumerator._settledAt(REJECTED, i, reason);
    });
  };

  return Enumerator;
}();

/**
  `Promise.all` accepts an array of promises, and returns a new promise which
  is fulfilled with an array of fulfillment values for the passed promises, or
  rejected with the reason of the first passed promise to be rejected. It casts all
  elements of the passed iterable to promises as it runs this algorithm.

  Example:

  ```javascript
  let promise1 = resolve(1);
  let promise2 = resolve(2);
  let promise3 = resolve(3);
  let promises = [ promise1, promise2, promise3 ];

  Promise.all(promises).then(function(array){
    // The array here would be [ 1, 2, 3 ];
  });
  ```

  If any of the `promises` given to `all` are rejected, the first promise
  that is rejected will be given as an argument to the returned promises's
  rejection handler. For example:

  Example:

  ```javascript
  let promise1 = resolve(1);
  let promise2 = reject(new Error("2"));
  let promise3 = reject(new Error("3"));
  let promises = [ promise1, promise2, promise3 ];

  Promise.all(promises).then(function(array){
    // Code here never runs because there are rejected promises!
  }, function(error) {
    // error.message === "2"
  });
  ```

  @method all
  @static
  @param {Array} entries array of promises
  @param {String} label optional string for labeling the promise.
  Useful for tooling.
  @return {Promise} promise that is fulfilled when all `promises` have been
  fulfilled, or rejected if any of them become rejected.
  @static
*/
function all(entries) {
  return new Enumerator(this, entries).promise;
}

/**
  `Promise.race` returns a new promise which is settled in the same way as the
  first passed promise to settle.

  Example:

  ```javascript
  let promise1 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 1');
    }, 200);
  });

  let promise2 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 2');
    }, 100);
  });

  Promise.race([promise1, promise2]).then(function(result){
    // result === 'promise 2' because it was resolved before promise1
    // was resolved.
  });
  ```

  `Promise.race` is deterministic in that only the state of the first
  settled promise matters. For example, even if other promises given to the
  `promises` array argument are resolved, but the first settled promise has
  become rejected before the other promises became fulfilled, the returned
  promise will become rejected:

  ```javascript
  let promise1 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 1');
    }, 200);
  });

  let promise2 = new Promise(function(resolve, reject){
    setTimeout(function(){
      reject(new Error('promise 2'));
    }, 100);
  });

  Promise.race([promise1, promise2]).then(function(result){
    // Code here never runs
  }, function(reason){
    // reason.message === 'promise 2' because promise 2 became rejected before
    // promise 1 became fulfilled
  });
  ```

  An example real-world use case is implementing timeouts:

  ```javascript
  Promise.race([ajax('foo.json'), timeout(5000)])
  ```

  @method race
  @static
  @param {Array} promises array of promises to observe
  Useful for tooling.
  @return {Promise} a promise which settles in the same way as the first passed
  promise to settle.
*/
function race(entries) {
  /*jshint validthis:true */
  var Constructor = this;

  if (!isArray(entries)) {
    return new Constructor(function (_, reject) {
      return reject(new TypeError('You must pass an array to race.'));
    });
  } else {
    return new Constructor(function (resolve, reject) {
      var length = entries.length;
      for (var i = 0; i < length; i++) {
        Constructor.resolve(entries[i]).then(resolve, reject);
      }
    });
  }
}

/**
  `Promise.reject` returns a promise rejected with the passed `reason`.
  It is shorthand for the following:

  ```javascript
  let promise = new Promise(function(resolve, reject){
    reject(new Error('WHOOPS'));
  });

  promise.then(function(value){
    // Code here doesn't run because the promise is rejected!
  }, function(reason){
    // reason.message === 'WHOOPS'
  });
  ```

  Instead of writing the above, your code now simply becomes the following:

  ```javascript
  let promise = Promise.reject(new Error('WHOOPS'));

  promise.then(function(value){
    // Code here doesn't run because the promise is rejected!
  }, function(reason){
    // reason.message === 'WHOOPS'
  });
  ```

  @method reject
  @static
  @param {Any} reason value that the returned promise will be rejected with.
  Useful for tooling.
  @return {Promise} a promise rejected with the given `reason`.
*/
function reject$1(reason) {
  /*jshint validthis:true */
  var Constructor = this;
  var promise = new Constructor(noop);
  reject(promise, reason);
  return promise;
}

function needsResolver() {
  throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
}

function needsNew() {
  throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
}

/**
  Promise objects represent the eventual result of an asynchronous operation. The
  primary way of interacting with a promise is through its `then` method, which
  registers callbacks to receive either a promise's eventual value or the reason
  why the promise cannot be fulfilled.

  Terminology
  -----------

  - `promise` is an object or function with a `then` method whose behavior conforms to this specification.
  - `thenable` is an object or function that defines a `then` method.
  - `value` is any legal JavaScript value (including undefined, a thenable, or a promise).
  - `exception` is a value that is thrown using the throw statement.
  - `reason` is a value that indicates why a promise was rejected.
  - `settled` the final resting state of a promise, fulfilled or rejected.

  A promise can be in one of three states: pending, fulfilled, or rejected.

  Promises that are fulfilled have a fulfillment value and are in the fulfilled
  state.  Promises that are rejected have a rejection reason and are in the
  rejected state.  A fulfillment value is never a thenable.

  Promises can also be said to *resolve* a value.  If this value is also a
  promise, then the original promise's settled state will match the value's
  settled state.  So a promise that *resolves* a promise that rejects will
  itself reject, and a promise that *resolves* a promise that fulfills will
  itself fulfill.


  Basic Usage:
  ------------

  ```js
  let promise = new Promise(function(resolve, reject) {
    // on success
    resolve(value);

    // on failure
    reject(reason);
  });

  promise.then(function(value) {
    // on fulfillment
  }, function(reason) {
    // on rejection
  });
  ```

  Advanced Usage:
  ---------------

  Promises shine when abstracting away asynchronous interactions such as
  `XMLHttpRequest`s.

  ```js
  function getJSON(url) {
    return new Promise(function(resolve, reject){
      let xhr = new XMLHttpRequest();

      xhr.open('GET', url);
      xhr.onreadystatechange = handler;
      xhr.responseType = 'json';
      xhr.setRequestHeader('Accept', 'application/json');
      xhr.send();

      function handler() {
        if (this.readyState === this.DONE) {
          if (this.status === 200) {
            resolve(this.response);
          } else {
            reject(new Error('getJSON: `' + url + '` failed with status: [' + this.status + ']'));
          }
        }
      };
    });
  }

  getJSON('/posts.json').then(function(json) {
    // on fulfillment
  }, function(reason) {
    // on rejection
  });
  ```

  Unlike callbacks, promises are great composable primitives.

  ```js
  Promise.all([
    getJSON('/posts'),
    getJSON('/comments')
  ]).then(function(values){
    values[0] // => postsJSON
    values[1] // => commentsJSON

    return values;
  });
  ```

  @class Promise
  @param {Function} resolver
  Useful for tooling.
  @constructor
*/

var Promise$1 = function () {
  function Promise(resolver) {
    this[PROMISE_ID] = nextId();
    this._result = this._state = undefined;
    this._subscribers = [];

    if (noop !== resolver) {
      typeof resolver !== 'function' && needsResolver();
      this instanceof Promise ? initializePromise(this, resolver) : needsNew();
    }
  }

  /**
  The primary way of interacting with a promise is through its `then` method,
  which registers callbacks to receive either a promise's eventual value or the
  reason why the promise cannot be fulfilled.
   ```js
  findUser().then(function(user){
    // user is available
  }, function(reason){
    // user is unavailable, and you are given the reason why
  });
  ```
   Chaining
  --------
   The return value of `then` is itself a promise.  This second, 'downstream'
  promise is resolved with the return value of the first promise's fulfillment
  or rejection handler, or rejected if the handler throws an exception.
   ```js
  findUser().then(function (user) {
    return user.name;
  }, function (reason) {
    return 'default name';
  }).then(function (userName) {
    // If `findUser` fulfilled, `userName` will be the user's name, otherwise it
    // will be `'default name'`
  });
   findUser().then(function (user) {
    throw new Error('Found user, but still unhappy');
  }, function (reason) {
    throw new Error('`findUser` rejected and we're unhappy');
  }).then(function (value) {
    // never reached
  }, function (reason) {
    // if `findUser` fulfilled, `reason` will be 'Found user, but still unhappy'.
    // If `findUser` rejected, `reason` will be '`findUser` rejected and we're unhappy'.
  });
  ```
  If the downstream promise does not specify a rejection handler, rejection reasons will be propagated further downstream.
   ```js
  findUser().then(function (user) {
    throw new PedagogicalException('Upstream error');
  }).then(function (value) {
    // never reached
  }).then(function (value) {
    // never reached
  }, function (reason) {
    // The `PedgagocialException` is propagated all the way down to here
  });
  ```
   Assimilation
  ------------
   Sometimes the value you want to propagate to a downstream promise can only be
  retrieved asynchronously. This can be achieved by returning a promise in the
  fulfillment or rejection handler. The downstream promise will then be pending
  until the returned promise is settled. This is called *assimilation*.
   ```js
  findUser().then(function (user) {
    return findCommentsByAuthor(user);
  }).then(function (comments) {
    // The user's comments are now available
  });
  ```
   If the assimliated promise rejects, then the downstream promise will also reject.
   ```js
  findUser().then(function (user) {
    return findCommentsByAuthor(user);
  }).then(function (comments) {
    // If `findCommentsByAuthor` fulfills, we'll have the value here
  }, function (reason) {
    // If `findCommentsByAuthor` rejects, we'll have the reason here
  });
  ```
   Simple Example
  --------------
   Synchronous Example
   ```javascript
  let result;
   try {
    result = findResult();
    // success
  } catch(reason) {
    // failure
  }
  ```
   Errback Example
   ```js
  findResult(function(result, err){
    if (err) {
      // failure
    } else {
      // success
    }
  });
  ```
   Promise Example;
   ```javascript
  findResult().then(function(result){
    // success
  }, function(reason){
    // failure
  });
  ```
   Advanced Example
  --------------
   Synchronous Example
   ```javascript
  let author, books;
   try {
    author = findAuthor();
    books  = findBooksByAuthor(author);
    // success
  } catch(reason) {
    // failure
  }
  ```
   Errback Example
   ```js
   function foundBooks(books) {
   }
   function failure(reason) {
   }
   findAuthor(function(author, err){
    if (err) {
      failure(err);
      // failure
    } else {
      try {
        findBoooksByAuthor(author, function(books, err) {
          if (err) {
            failure(err);
          } else {
            try {
              foundBooks(books);
            } catch(reason) {
              failure(reason);
            }
          }
        });
      } catch(error) {
        failure(err);
      }
      // success
    }
  });
  ```
   Promise Example;
   ```javascript
  findAuthor().
    then(findBooksByAuthor).
    then(function(books){
      // found books
  }).catch(function(reason){
    // something went wrong
  });
  ```
   @method then
  @param {Function} onFulfilled
  @param {Function} onRejected
  Useful for tooling.
  @return {Promise}
  */

  /**
  `catch` is simply sugar for `then(undefined, onRejection)` which makes it the same
  as the catch block of a try/catch statement.
  ```js
  function findAuthor(){
  throw new Error('couldn't find that author');
  }
  // synchronous
  try {
  findAuthor();
  } catch(reason) {
  // something went wrong
  }
  // async with promises
  findAuthor().catch(function(reason){
  // something went wrong
  });
  ```
  @method catch
  @param {Function} onRejection
  Useful for tooling.
  @return {Promise}
  */


  Promise.prototype.catch = function _catch(onRejection) {
    return this.then(null, onRejection);
  };

  /**
    `finally` will be invoked regardless of the promise's fate just as native
    try/catch/finally behaves
  
    Synchronous example:
  
    ```js
    findAuthor() {
      if (Math.random() > 0.5) {
        throw new Error();
      }
      return new Author();
    }
  
    try {
      return findAuthor(); // succeed or fail
    } catch(error) {
      return findOtherAuther();
    } finally {
      // always runs
      // doesn't affect the return value
    }
    ```
  
    Asynchronous example:
  
    ```js
    findAuthor().catch(function(reason){
      return findOtherAuther();
    }).finally(function(){
      // author was either found, or not
    });
    ```
  
    @method finally
    @param {Function} callback
    @return {Promise}
  */


  Promise.prototype.finally = function _finally(callback) {
    var promise = this;
    var constructor = promise.constructor;

    if (isFunction(callback)) {
      return promise.then(function (value) {
        return constructor.resolve(callback()).then(function () {
          return value;
        });
      }, function (reason) {
        return constructor.resolve(callback()).then(function () {
          throw reason;
        });
      });
    }

    return promise.then(callback, callback);
  };

  return Promise;
}();

Promise$1.prototype.then = then;
Promise$1.all = all;
Promise$1.race = race;
Promise$1.resolve = resolve$1;
Promise$1.reject = reject$1;
Promise$1._setScheduler = setScheduler;
Promise$1._setAsap = setAsap;
Promise$1._asap = asap;

/*global self*/
function polyfill() {
  var local = void 0;

  if (typeof __webpack_require__.g !== 'undefined') {
    local = __webpack_require__.g;
  } else if (typeof self !== 'undefined') {
    local = self;
  } else {
    try {
      local = Function('return this')();
    } catch (e) {
      throw new Error('polyfill failed because global object is unavailable in this environment');
    }
  }

  var P = local.Promise;

  if (P) {
    var promiseToString = null;
    try {
      promiseToString = Object.prototype.toString.call(P.resolve());
    } catch (e) {
      // silently ignored
    }

    if (promiseToString === '[object Promise]' && !P.cast) {
      return;
    }
  }

  local.Promise = Promise$1;
}

// Strange compat..
Promise$1.polyfill = polyfill;
Promise$1.Promise = Promise$1;

return Promise$1;

})));



//# sourceMappingURL=es6-promise.map


/***/ }),

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calc() {
    //=== Calc ===

    const result = document.querySelector('.calculating__result span');

    let sex, height, weight, age, ratio;

    if (localStorage.getItem('sex')) {
        sex = localStorage.getItem('sex');
    } else {
        sex = 'female';
        localStorage.setItem('sex', 'female');
    }

    if (localStorage.getItem('ratio')) {
        ratio = localStorage.getItem('ratio');
    } else {
        ratio = 1.375;
        localStorage.setItem('ratio', 1.375);
    }


    function initlocalSettings(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.classList.remove(activeClass);
            if (elem.getAttribute('id') === localStorage.getItem('sex')) {
                elem.classList.add(activeClass);
            }
            if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                elem.classList.add(activeClass);
            }
        });
    }

    initlocalSettings('#gender div', 'calculating__choose-item_active');
    initlocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');

    function calcTotal() { //будет выполнятся каждый раз при изменении какого либо параметра
        //делаем проверку заплнены ли все данные, если хоть что-то не заполнено, то подсчеты не делаются
        if (!sex || !height || !weight || !age || !ratio) {
            result.textContent = '____';
            // если хоть какй то параметр отсутствует, вставляем текст 4псевдопробела
            return; //и прирываем функцию
        }

        //считаем коллории для женщин
        if (sex === 'female') {
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        } else {
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }

    }

    calcTotal();

    function getStaticInformation(selector, activeClass) {
        //получаем информацию со статичных блоков
        const elements = document.querySelectorAll(selector);
        //получаю все дивы внутри введенного родителя

        elements.forEach(elem => {
            elem.addEventListener('click', (e) => {
                //если объект события содержит атрибут data-ratio, то изменяем ratio, иначе получаем id
                if (e.target.getAttribute('data-ratio')) {
                    ratio = +e.target.getAttribute('data-ratio');
                    localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
                } else {
                    sex = e.target.getAttribute('id');
                    localStorage.setItem('sex', e.target.getAttribute('id'));
                }

                //сбрасываем класс активности у элементов и задем тот. на который кликнули
                elements.forEach(elem => {
                    elem.classList.remove(activeClass);
                });

                e.target.classList.add(activeClass);

                calcTotal();
            });
        });

    }

    getStaticInformation('#gender div', 'calculating__choose-item_active');
    getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');

    function getDynamicInformation(selector) {
        const input = document.querySelector(selector);

        input.addEventListener('input', () => {
            if (input.value.match(/\D/g)) {
                input.style.border = '1px solid red';
            } else {
                input.style.border = 'none';
            }

            switch (input.getAttribute('id')) {
                case 'height':
                    height = +input.value;
                    break;
                case 'weight':
                    weight = +input.value;
                    break;
                case 'age':
                    age = +input.value;
                    break;
            }

            calcTotal();
        });


    }

    getDynamicInformation('#height');
    getDynamicInformation('#weight');
    getDynamicInformation('#age');
}

// module.exports = calc;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function cards() {
    //--- Карточки рецептов ---

    //--- мое решение -- создание класса для карточки меню ---

    // const menuItem = document.querySelector('.menu__field .container');

    // class MenuItemCard {
    //     constructor(src, title, description, cost, alt) {
    //         this.src = src;
    //         this.alt = alt;
    //         this.title = title;
    //         this.description = description;
    //         this.cost = cost;
    //     }

    //     addedImage() {
    //         menuItem.insertAdjacentHTML('beforeend', `<div class="menu__item"> <img src="${this.src}" alt="${this.src}"><h3 class="menu__item-subtitle">${this.title}</h3> <div class="menu__item-descr">${this.description}</div> <div class="menu__item-divider"></div> <div class="menu__item-price"> <div class="menu__item-cost">Цена:</div> <div class="menu__item-total"><span>${this.cost}</span> грн/день</div> </div> </div>`);
    //     }
    // }

    // const itemFirst = new MenuItemCard('img/tabs/vegy.jpg', 'Меню "Фитнес"', 'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!', '229', 'vegy');
    // const secondFirst = new MenuItemCard('img/tabs/post.jpg', 'Меню "Фитнес 2"', 'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!', '229', 'vegy');
    // const nextFirst = new MenuItemCard('img/tabs/elite.jpg', 'Меню "Фитнес 3"', 'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!', '229', 'vegy');

    // itemFirst.addedImage();
    // secondFirst.addedImage();
    // nextFirst.addedImage();

    //--- Решение преподаваиеля ---

    // class MenuCard { //создаем новый класс, название класса с большой буквы
    //     constructor(src, alt, title, descr, price, parentSelector) { //вызываем конструктор с аргументами 
    //         this.src = src;
    //         this.alt = alt;
    //         this.title = title;
    //         this.descr = descr;
    //         this.price = price;
    //         this.parent = document.querySelector(parentSelector);
    //         this.transfer = 27; //создаем свойство с курсом валют, для перевода в гривны
    //         this.changeToUAH(); //методы можно вызывать прямо внутри конструктора, чтобы он вывел нам итоговую сумму в гривнах
    //     }

    //     changeToUAH() { //создаем метод для конвертации валют в гривны
    //         this.price = this.price * this.transfer;

    //     }

    //     render() { //метод для создания верстки
    //         const element = document.createElement('div'); //создаем элемент, пока он существуект только в скриптах
    //         // вставляем в наш див нашу html структуру
    //         element.innerHTML = `
    //             <div class="menu__item">
    //                 <img src="${this.src}" alt="${this.alt}">
    //                 <h3 class="menu__item-subtitle">${this.title}</h3>
    //                 <div class="menu__item-descr">
    //                     ${this.descr}
    //                 </div>
    //                 <div class="menu__item-divider"></div>
    //                 <div class="menu__item-price">
    //                     <div class="menu__item-cost">Цена:</div>
    //                     <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
    //                 </div>
    //             </div>
    //         `;

    //         this.parent.append(element); //говорим что в нашего родителя добавили наш элемент

    //     }

    // }

    // const div1 = new MenuCard(
    //     'img/tabs/vegy.jpg', 
    //     'vegy',
    //     'Меню "Фитнес"', 
    //     'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!', 
    //     9,
    //     '.menu .container');

    // const div2 = new MenuCard(
    //     'img/tabs/elite.jpg', 
    //     'elite',
    //     'Меню “Премиум”', 
    //     'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!', 
    //     9,
    //     '.menu .container');

    // const div3 = new MenuCard(
    //     'img/tabs/post.jpg', 
    //     'post',
    //     'Меню "Постное"', 
    //     'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.', 
    //     9,
    //     '.menu .container');

    // div1.render();
    // div2.render();
    // div3.render();

    //new MenuCard().render(); -- можно делать такую запись если объект используется только здесь и сейчас

    //--- REST оператор и параметры по умолчанию

    // class MenuCard { //создаем новый класс, название класса с большой буквы
    //     constructor(src, alt, title, descr, price, parentSelector, ...classes) { //вызываем конструктор с аргументами, последним аргументом передаем классы для элемента, который добавляем
    //         this.src = src;
    //         this.alt = alt;
    //         this.title = title;
    //         this.descr = descr;
    //         this.price = price;
    //         this.classes = classes; //переадваться будет массив классов из оператора rest
    //         this.parent = document.querySelector(parentSelector);
    //         this.transfer = 27; //создаем свойство с курсом валют, для перевода в гривны
    //         this.changeToUAH(); //методы можно вызывать прямо внутри конструктора, чтобы он вывел нам итоговую сумму в гривнах
    //     }

    //     changeToUAH() { //создаем метод для конвертации валют в гривны
    //         this.price = this.price * this.transfer;

    //     }

    //     render() { //метод для создания верстки
    //         const element = document.createElement('div'); //создаем элемент, пока он существуект только в скриптах

    //         if (this.classes.length === 0) { //так как мы для rest оператора не можем назначить значения по дефолту, и он будет в любом случае true, так как даже если не будет введен класс, то он создаст пустой массив, а пустой массив это тру
    //             //то проверяем на длину массива, если он равен нулю, то назначаем значение по умолчанию
    //             this.element = 'menu__item'; //создваем новое свойство для данного элемента значение элемнета
    //             element.classList.add(this.element); //и голворим, что значение нового свойства добавим как новый класс в наш элемент

    //         } else {
    //             this.classes.forEach(className => element.classList.add(className)); //берем массив классов, перебираем его и каждый класс добавляем нашему новосозданному элементу

    //         }
    //         // вставляем в наш див нашу html структуру
    //         element.innerHTML = `
    //             <img src="${this.src}" alt="${this.alt}">
    //             <h3 class="menu__item-subtitle">${this.title}</h3>
    //             <div class="menu__item-descr">
    //                 ${this.descr}
    //             </div>
    //             <div class="menu__item-divider"></div>
    //             <div class="menu__item-price">
    //                 <div class="menu__item-cost">Цена:</div>
    //                 <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
    //             </div>
    //         `;

    //         this.parent.append(element); //говорим что в нашего родителя добавили наш элемент

    //     }

    // }

    // const div1 = new MenuCard(
    //     'img/tabs/vegy.jpg',
    //     'vegy',
    //     'Меню "Фитнес"',
    //     'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    //     9,
    //     '.menu .container');

    // const div2 = new MenuCard(
    //     'img/tabs/elite.jpg',
    //     'elite',
    //     'Меню “Премиум”',
    //     'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
    //     9,
    //     '.menu .container');

    // const div3 = new MenuCard(
    //     'img/tabs/post.jpg',
    //     'post',
    //     'Меню "Постное"',
    //     'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
    //     9,
    //     '.menu .container');

    // div1.render();
    // div2.render();
    // div3.render();

    //---!! способ создания карточек с данными получеными из базы данных !!---

    // const getResource = async (url) => { //создаем функцию запроса данных для карточек товаров из json файла
    //     let res = await fetch(url); //вызываем fetch с адресом ресурса

    //     if (!res.ok) { //пишем запрос на статус объекта, если НЕ ок
    //         throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    //     }
    //     return await res.json(); //возвращаем промис в виде js
    // };

    // // getResource('http://localhost:3000/menu') //вызываем функцию getResources с адресом на нашу базу данных
    // //     .then(data => { //берем полученные данные, которые у нас уже в виде объекта(в нашем случае массива)
    //         // data.forEach(({
    //         //     img,
    //         //     altimg,
    //         //     title,
    //         //     descr,
    //         //     price
    //         // }) => { //используем диструкторизацию объекта, в фиг.скобках, укаазываем свойства объекта, значения которых нам необходимо применить
    //         //     new MenuCard(img, altimg, title, descr, price, '.menu .container').render(); //вызываем наш конструктор MenuCard столько раз, сколько объектов придет с сервера


    //         // });
    // //     });

    // // getResource('http://localhost:3000/menu') //вызываем функцию getResources с адресом на нашу базу данных
    // //     .then(data => createCard(data));

    // axios.get('http://localhost:3000/menu')
    // .then(data => {
    //     data.data.forEach(({
    //         img,
    //         altimg,
    //         title,
    //         descr,
    //         price
    //     }) => { //используем диструкторизацию объекта, в фиг.скобках, укаазываем свойства объекта, значения которых нам необходимо применить
    //         new MenuCard(img, altimg, title, descr, price, '.menu .container').render(); //вызываем наш конструктор MenuCard столько раз, сколько объектов придет с сервера


    //     });
    // });

    // function createCard(data) { //создаем функцию, которая будет формировать карточки на странице, как атрибут будут данные пришедшие с сервера
    //     data.forEach(({ //перебираем массив объектов полученых с сервера, как аргументы вносим деструктуризацию объекта
    //         img,
    //         altimg,
    //         title,
    //         descr,
    //         price
    //     }) => {
    //         const element = document.createElement('div'); //создаем новый див
    //         element.classList.add('menu__item'); //задем этому элементу класс
    //         // вставляем в наш див нашу html структуру
    //         element.innerHTML = ` 
    //             <img src="${img}" alt="${altimg}">
    //             <h3 class="menu__item-subtitle">${title}</h3>
    //             <div class="menu__item-descr">
    //                 ${descr}
    //             </div>
    //             <div class="menu__item-divider"></div>
    //             <div class="menu__item-price">
    //                 <div class="menu__item-cost">Цена:</div>
    //                 <div class="menu__item-total"><span>${price}</span> грн/день</div>
    //             </div>
    //         `;

    //         document.querySelector('.menu .container').append(element); //вставляем наш новый элемент в меню контейнер
    //     });
    // }

}

// module.exports = cards;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");
 // импортируем именованые функции из modal


function forms(formSelector, modalTimerId) {
    // Отпаравука данных на сервер Forms

    const form = document.querySelectorAll(formSelector); //берем все формы с нашего сайта
    const message = { //создаем объект с ответами на нашу олтправку формы
        loading: 'icons/spinner.svg', //пока идет заргрузка формы
        success: 'Спасибо! Скоро мы с Вами свяжемся!', //при удачной отправке формы
        failure: 'Что-то пошло не так...' //при ошибке загрузки
    };

    form.forEach(item => { //перебираем наши формы
        bindPostData(item); //и вызываем отправку формы текущей на сервер

    });



    function bindPostData(form) { //Функция которая будет отправлять данные на сервер, как аргумент выступает форма для отправки
        form.addEventListener('submit', (e) => { //навешиваем на форму обработчик события сабмит, оно срабатывает при попытке отправить форму
            //событие отправик срабатывает либо при нажатии клавиши Enter, либо при клике на поле у которого стоит type='submit'
            e.preventDefault(); //отменяекм стандартное поведение браузера(перезагрузку страницы при отправке формы)

            const statusMessage = document.createElement('img'); //создаем новый элекмент на страницек для показа спинера при загрузке
            statusMessage.src = message.loading; //добавляем к картинке аттрибут src в котором будет прописан путь к картинке со спинером
            //прописываем инлайн-стили для нашей картинки со спинером
            statusMessage.style.cssText = `
                    display: block;
                    margin: 0 auto;
                `;
            // form.append(statusMessage); //добавляем этот элемент-сообщение в нашу форму

            form.insertAdjacentElement('afterend', statusMessage); //добавляем наш спинер в структуру штмл, первый аттрибут указывает куда вставляем(после формы)
            //второй аттрибут что вставляем(наш спинер)

            //---!! УСТАРЕВШИЙ  способ отправки запросов на сервер

            // const request = new XMLHttpRequest(); //создаем объект запроса с помощью конструктора XMLHttpRequest
            // request.open('POST', 'server.php'); //открывавем запрос(вводим данные по запросу: тип запроса и путь на который мы будем ссылаться)
            // request.setRequestHeader('Content-type', 'application/json'); //создаем заголовки запроса, что нам будет приходить


            const formData = new FormData(form); //формируем новый объект, с помощью конструктора formData который возьмет все данные пользователя из формы
            //как аргумент передаем ту форму из которой нам нужно собрать данные

            // const object = {}; //создаем пустой объект, в который будут записываться данные из массива FormData

            // formData.forEach(function (value, key) { //перебираем массив formData и передаем в функцию аргументы - значените и ключ, для формирования объекта
            //     object[key] = value; //берем наш объект и говорим, что ключ(индекс элекмента) объекта равен значению
            // });

            const json = JSON.stringify(Object.fromEntries(formData.entries())); //превразщаем полученые данные в массив массивов, а потом обратно в объект, а затем в json


            // const json = JSON.stringify(object); //конвертируем наш полученный объект в json формат

            // request.send(json); //отправляем нашу объект, который мы сформировали с помощью json, на сервер

            //---!! СОВРЕМЕННЫЙ  способ отправки запросов на сервер


            (0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postData)('http://localhost:3000/requests', json)
                .then(data => { //получаем с сервера какие то данные
                    console.log(data); // выводим ответ на наш запрос
                    showThanksModal(message.success); //вызываем функцию показа сообщений, в котором говорим, что все прошло успешно
                    statusMessage.remove(); //и удаляем спинер со странички
                })
                .catch(() => { //при ошибки отправки запроса
                    // при fetch не сработает c ошибкой в пути, так как получит все равно после запроса true с той только разницей, что в статусе будет false
                    //сработает только с системными ошибками(например отстутствие интернета)
                    showThanksModal(message.failure); //при неудачной загрузке вызываем функцию показа сообщений, в котором говорим, что все прошло плохо
                })
                .finally(() => { //выполняем при любом исходе запроса очистку формы
                    form.reset(); //чистим данные формы, которые ввели
                });

            // request.addEventListener('load', () => { //на нашу отправку вешаем обработчик события и отслеживаем полную загрузку формы
            //     if (request.status === 200) { //проверяем что статус отправки положительный, все хорошо
            //         console.log(request.response); // выводим ответ на наш запрос
            //         showThanksModal(message.success); //вызываем функцию показа сообщений, в котором говорим, что все прошло успешно
            //         form.reset(); //чистим данные формы, которые ввели
            //         statusMessage.remove(); //и удаляем спинер со странички
            //     } else {
            //         showThanksModal(message.failure); //при неудачной загрузке вызываем функцию показа сообщений, в котором говорим, что все прошло плохо
            //     }
            // });
        });
    }

    //---Наводим красоту ---

    function showThanksModal(message) { //создаем функцию, которая выводит(заменяет) модальное окно с сообщением для пользователя
        const prevModalDialog = document.querySelector('.modal__dialog'); //получаем наше модальное окно с сайта

        prevModalDialog.classList.add('hide'); // добавляем rjyntyne мод. окнf c формой класс hide, который скроет его от пользователя до того как его откроют
        (0,_modal__WEBPACK_IMPORTED_MODULE_0__.openModal)('.modal', modalTimerId); //далее открываем модальное окно 

        const thanksModal = document.createElement('div'); //Zсоздаем новый элемент для модального окна с сообщениями для клиента
        thanksModal.classList.add('modal__dialog'); //добавляем новому элементу класс modal-dialog чтобы подтянулись стили для обертки контентной части модального окна
        //далее в наш блок кладем html-структуру
        thanksModal.innerHTML = `
                <div class="modal__content">
                    <div data-close class="modal__close">&times;</div>
                    <div class="modal__title">${message}</div>
                </div>
    
            `;

        document.querySelector('.modal').append(thanksModal); //берем элемент модал и добавляем в него наш новый элемент modal-dialog
        setTimeout(() => { //устанавливаем таймер, который будет убирать сообщение и опять показывать форму
            thanksModal.remove(); //убираем сообщение
            prevModalDialog.classList.add('show'); //добавляем класс showи показываем обратно окно с формой
            prevModalDialog.classList.remove('hide'); //убираем класс hide
            (0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)('.modal'); //и закрываем модальное окно полностью
        }, 4000); //через 4 секунды
    }

    // //---!! API - интерфейс какого-то программного обеспечения, либо приложения !!---
    // //---!! набор каких то инструментов и возможностей, которое нам дает какое то уже готовое решение !!---
    // //---!! DOM API - это различные методы, которые дают нам возможность работать с элементами на странице !!---
    // //---!! FECH API - встроеные в браузер инструмент, который позволяет общаться с сервером с помощью promise !!---

}

// module.exports = forms;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);

// //--- GET запрос

// fetch('https://jsonplaceholder.typicode.com/todos/1') //как аргумент передается тот url на который мы будем посылать запрос
// //в данном случаем мы просто получаем get запрос с этого url
// //вернется именно promise
//     .then(response => response.json()) //обрабатываем полученный промис с помощью then(при удачном выполнении запроса)
//     //вернется тоже promise и если удачно прошло то
//     //в данном случае мы берем ответ и добавляем к нему метод json() который полученный json превратит в обычный объект js
//     .then(json => console.log(json));//при удачной обработке файла мы выводим наш объект в консоль

// //--- POST запрос
// fetch('https://jsonplaceholder.typicode.com/posts', {
//     method: 'POST', //ОБЯЗАТЕЛЬНОЕ СВОЙСТВО
//     body: JSON.stringify({name: 'Alex'}), //ОБЯЗАТЕЛЬНОЕ СВОЙСТВО
//     headers: { //Желательное свойство, добавляем заголовки, какого типа данные мы отправляем
//         'Content-type': 'application/json'
//     }
// }) //как второй аргумент добавляется объект, с двумя обязательными свойствами - метод (POST), body(тело, данные, которые отправляем)
// //в данном случае оборачиваем новый объект в метод stringify, чтобы он этот объект сконвертировал и добавил в json
// .then(response => response.json()) 
// .then(json => console.log(json));

//---!! NPM-пакеты и JSON-server !!---
//---!! Прежде, чем установить npm пакеты, необходимо развернуть npm-проект  !!---

// 1 - инциализируем npm - (npm init) - заполняем все поля или пропускаем
// 2 - получаем package.json - в нем содержиться вся информация о проекте и будет информация о подключенных пакетах
// 3 - установка npm пакетов(предпочтительнее устанавливать ЛОКАЛЬНЫЕ пакеты(-g - глобальный, без ярлыка - локальный))
//     npm install - команда которая устанавливает все необходимые пакеты, которые указаны в json афйле
//     --save-dev - указывает, что устанавливаемый пакет будет использован только для разработки
//     --save - указывает, что это обязательный пакет, составляет костяк проекта и необходим внутри пакета
// json-server - (npm i json-server --save-dev) - позволяет работать с json файлами и использовать их как маленькую базу данный, позволяет отправлять и POST-запросы
// запуск json-server - в терминале пишем (npx json-server [файл_который_хотим_использовать]) - пример: json-server db.json


//---!! Использование JSON-файла как базу данных !!--

// fetch('http://localhost:3000/menu') //используем fetch и как путь указываем наш жсон файл, get запрос, который возвращает promise
//     .then(data => data.json()) //возьмем полученый json и превратим его в обычный объект с помощью метода json()
//     .then(result => console.log(result)); //затем полученый результат выводим в консоль

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "closeModal": () => (/* binding */ closeModal),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "openModal": () => (/* binding */ openModal)
/* harmony export */ });
//чтобы код не повторялся два раза. необходимо создать одну функцию с повторяющимся кодом и использовать
function closeModal(modalSelector) {
    const modal = document.querySelector(modalSelector);
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';
}

function openModal(modalSelector, modalTimerId) { //создаем функцию для открытия модального окна
    const modal = document.querySelector(modalSelector);
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';
    if (modalTimerId) {
        clearInterval(modalTimerId); //говорим, что если действия выше уже отработали(пользователь сам открыл окно), то таймер отключить
    }
}

function modal(triggerSelector, modalSelector, modalTimerId) {
    //--- Модальное окно ---

    //Назначаем data-атрибуты для кнопок, по клику на которые будет появляться модальное окно

    //--- Мой вариант решения ---

    // const btnModal = document.querySelectorAll('[data-modal]');
    // const btnClose = document.querySelector('[data-close]');
    // const modalWindow = document.querySelector('.modal');

    // btnModal.forEach(item => {  //перебираем псевдомассив кнопок с дата атрибутом
    //     item.addEventListener('click', () => { //отслеживаем клик по каждой кнопке       
    //         modalWindow.classList.add('show', 'fade');  // говорим, что при клике, для элемента модальное окно, добавляем класс show
    //         modalWindow.classList.remove('hide'); //убрать класс hide
    //     });
    // });
    // btnClose.addEventListener('click', () => { //отслеживаем клик по кнопке close     
    //     modalWindow.classList.add('hide');  // говорим, что при клике, для элемента модальное окно, добавляем класс hide
    //     modalWindow.classList.remove('show', 'fade'); //говорим, чтобы удалил классы show и fade
    // });

    //--- Решение с преподавателем ---

    const modalTrigger = document.querySelectorAll(triggerSelector),
        modal = document.querySelector(modalSelector, modalTimerId);
    // modalCloseBtn = document.querySelector('[data-close]'); //---не будет работать с элементами, которые создаются динамически


    modalTrigger.forEach(btn => { //перебираем все кнопки
        btn.addEventListener('click', () => //отслеживаем на каждой кнопке клик
            // modal.classList.add('show'); //при клике на кнопку, модальному окну назначаем класс show
            // modal.classList.remove('hide'); // и убираем, если есть класс hide
            // document.body.style.overflow = 'hidden'; // также обращаемся к элементу body и прописываем ему инлайн стиль overflow: hidden, чтобы не прокручивалась страница
            openModal(modalSelector)
        );
    });



    // modalCloseBtn.addEventListener('click', () => {//отслеживаем на кнопке клик
    //     modal.classList.add('hide');//при клике на кнопку, модальному окну назначаем класс hide
    //     modal.classList.remove('show');// и убираем, если есть класс show
    //     document.body.style.overflow = ''; // также обращаемся к элементу body и прописываем ему инлайн стиль overflow(оставляем пустое значение, чтобы браузер сам решил какое значение по дефолту подставить)

    // });

    // modalCloseBtn.addEventListener('click', closeModal); //не вызываем функцию, а просто передаем, она сработает только после клика на элемент

    modal.addEventListener('click', function (e) { //отслеживаем клик на модальное окно
        if (e.target === modal || e.target.getAttribute('data-close') == '') { //проверяем, если событие таргет равно непосредственно модальному окну(серая подложка), 
            // или у самого элемента, на который мы кликнули есть аттрибут data-close(равно пустой строке, потому что мы туда ничего не помещаем), то
            // modal.classList.add('hide');//модальному окну назначаем класс hide
            // modal.classList.remove('show');// и убираем, если есть класс show
            // document.body.style.overflow = ''; // также обращаемся к элементу body и прописываем ему инлайн стиль overflow(оставляем пустое значение, чтобы браузер сам решил какое значение по дефолту подставить)    
            closeModal(modalSelector); //а здесь функцию именно вызываем, так как нам надо ее выполнить только после того как выполнится условие
        }
    });

    document.addEventListener('keydown', (e) => { //отслеживаем нажатие клавиши на клавиатуре и передаем объект события
        if (e.code === 'Escape' && modal.classList.contains('show')) { //если код клавиши по которой кликнули равна строке искейп,
            //и так же проверяем содержит ли можальное окно класс show
            closeModal(modalSelector); //если условия соблюдены, то закрываем модальное окно
        }
    });


    //--- Модификации модального окна ---
    //--- Вызываем модальное окно через определенный промежуток времени ---

    //--- задача,если пользователь долистал страницу до конца, то открываем модальное окно ---

    function showModalByScroll() { //создаем функцию, открытия окна при скроллинге страницы вниз
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
            //если высоте пролистанного контента(невидимого) + высота видимого контента больше или равно высоте всего документа(видимая и невидимая часть)
            openModal(modalSelector, modalTimerId);
            window.removeEventListener('scroll', showModalByScroll); //говорим, что для окна браузера после того как окно модальное было ужек открыто,
            // мы убираем отслеживание события скролл и отработку функции открытия окна модального
        }
    }

    window.addEventListener('scroll', showModalByScroll); //отслеживаем скроллинг страницы и после этого определяем функцию открытия можального окна


}

// module.exports = modal;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal); //создаем один дефолтный модуль

 //и два именованых

/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function slider({
    container,
    slide,
    nextArrow,
    prevArrow,
    totalCounter,
    currentCounter,
    wrapper,
    field
}) {


    //---SLIDER V1 ---

    //--- Мой код, НЕ зарабюотал ---

    // const prevArrow = document.querySelector('.offer__slider-prev'),
    //       nextArrow = document.querySelector('.offer__slider-next'),
    //       parentArrows = document.querySelector('offer__slider-counter'),
    //       currentCounter = document.querySelector('#current'),
    //       totalCounter = document.querySelector('#total'),
    //       sliderItems = document.querySelectorAll('.offer__slide');

    //     console.log(sliderItems);

    //     function startSliderItem() {
    //         sliderItems.forEach((item, i) => {
    //             if(i === 0) {
    //                 item.classList.add('show');
    //                 item.classList.remove('hide');
    //                 if(i+1 < 10) {
    //                     currentCounter.innerHTML = `0${i+1}`;
    //                 } else {
    //                     currentCounter.innerHTML = `${i+1}`;
    //                 }  
    //             } else {
    //                 item.classList.add('hide');
    //             }        
    //         });
    //     }



    // function checkNumberItems(arrow, box) {
    //     const arrowItems = sliderItems.length;
    //     if(arrowItems < 10) {
    //         box.innerHTML = `0${arrowItems}`;
    //     } else {
    //         box.innerHTML = `${arrowItems}`;
    //     }        
    // }    

    // function nextSlide() {
    //     nextArrow.addEventListener('click', (event) => {
    //         const target = event.target; 

    //         if(target && target.classList.contains('offer__slider-next')) {
    //             const num = + currentCounter.innerHTML;
    //             const index = num -1;

    //             console.log(num);
    //             console.log(index);
    //             console.log(sliderItems.length);
    //             if(num > sliderItems.length - 1) {
    //                 startSliderItem();
    //             }  else {

    //                 sliderItems[index].classList.add('hide');
    //                 sliderItems[index].classList.remove('show');
    //                 sliderItems[num].classList.add('show');
    //                 sliderItems[num].classList.remove('hide');
    //                 if(num + 1 < 10) {
    //                     currentCounter.innerHTML = `0${num + 1}`;
    //                 } else {
    //                     currentCounter.innerHTML = `${num + 1}`;
    //                 }

    //             }


    //         }


    //     });
    // }

    // function prevSlide() {
    //     prevArrow.addEventListener('click', (event) => {
    //         const target = event.target; 

    //         if(target && target.classList.contains('offer__slider-prev')) {
    //             let num = + currentCounter.innerHTML;
    //             let index = num - 1;

    //             if(num < 2) {
    //                 num = + sliderItems.length -1;
    //                 index = num - 1;
    //             }  
    //             console.log(num);
    //             console.log(index);
    //             console.log('prev');

    //             sliderItems[index].classList.add('hide');
    //             sliderItems[index].classList.remove('show');
    //             sliderItems[index - 1].classList.add('show');
    //             sliderItems[index - 1].classList.remove('hide');
    //             if(num - 1 < 10) {
    //                 currentCounter.innerHTML = `0${num - 1}`;
    //             } else {
    //                 currentCounter.innerHTML = `${num - 1}`;
    //             }


    //         } 

    //     });
    // }


    // function showSliderItem() {
    //     startSliderItem();
    //     nextSlide();
    //     prevSlide();

    // }
    // showSliderItem();

    // checkNumberItems(sliderItems, totalCounter);


    //--- Вариант преподавателя ---

    const slides = document.querySelectorAll(slide),
        slider = document.querySelector(container),
        prev = document.querySelector(prevArrow),
        next = document.querySelector(nextArrow),
        total = document.querySelector(totalCounter),
        current = document.querySelector(currentCounter),
        slidesWrapper = document.querySelector(wrapper),
        slidesField = document.querySelector(field),
        width = window.getComputedStyle(slidesWrapper).width; //обращаемся к окнцу браузера и просим данные о стилях, которые были применены уже к определенным блокам
    //(в данном случае обертке слайдера и получаем ширину)
    let slideIndex = 1,
        offset = 0; //переменная показывающая сколько мы уже отступили



    //--- slider 2 ---

    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
        current.textContent = `0${slideIndex}`;
    } else {
        total.textContent = slides.length;
        current.textContent = slideIndex;
    }

    slidesField.style.width = 100 * slides.length + '%'; //задаем для контейнера всех слайдеров ширину равную количество слайдов * 100%
    //так как каждый слайд будет занимать 100% видимого родителя
    slidesField.style.display = 'flex'; //меняем для контейнера слайдов дисплей на флекс, чтобы слайды выстроились в ряд
    slidesField.style.transition = '0.5s all'; //и говорим, что слайды заменяться должны плавно

    slidesWrapper.style.overflow = 'hidden'; //для видимого родителя назначаем overflow:hidden, чтобы обрезать лишние файлы

    slides.forEach(slide => { //перебираем каждый слайд
        slide.style.width = width; //каждому слайду назначаем ширину равную ширине видимого родителя
    });

    slider.style.position = 'relative';
    const indicators = document.createElement('ol'),
        dots = [];


    indicators.classList.add('carousel-indicators');
    slider.append(indicators);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.classList.add('dot');
        dot.setAttribute('data-slide-to', i + 1);
        //добавляем к li data-фттрибут со значением равным i+1((индекс в массиве + 1))
        if (i == 0) {
            dot.style.opacity = 1;
        }

        indicators.append(dot);
        dots.push(dot);
    }

    function deleteNotDigits(str) {
        return +str.replace(/\D/g, '');
    }

    next.addEventListener('click', () => { //сдвиг слайдера на следующий слайд
        //делаем проверку не дошел ли слайдер до последнего слайда
        if (offset == deleteNotDigits(width) * (slides.length - 1)) { //если наш отступ равен ширине всех наших слайдов(то есть дошли до конца слайдов)
            //+width - превращаем строку в числовойтип данных
            //затем вырезаем из строки ширины все символы начиная с нулевого заканчивая 3им с конца
            //то есть два крайних, которые в строке (px) выкидываем
            offset = 0; //то устанавливаем ему значение 0(то есть говорим отсчитывать слайды сначала)
        } else { //если отступ не дошел до конца
            offset += deleteNotDigits(width); //мы к нему прибавляем ширину одного слайда, то есть сдвигаем на шаг
        }

        slidesField.style.transform = `translateX(-${offset}px)`;
        //обращаемся к контейнеру слайдеров и говорим, что он должен сдвинуться влево на определенное количесатво пикселей

        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }

        dots.forEach(dot => dot.style.opacity = '.5');
        dots[slideIndex - 1].style.opacity = 1;

    });

    prev.addEventListener('click', () => { //сдвиг слайдера на следующий слайд
        //делаем проверку не дошел ли слайдер до последнего слайда
        if (offset == 0) {
            offset = deleteNotDigits(width) * (slides.length - 1);
        } else {
            offset -= deleteNotDigits(width);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }

        dots.forEach(dot => dot.style.opacity = '.5');
        dots[slideIndex - 1].style.opacity = 1;
    });

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');
            //получаем значение аттрибута того элемента по которому кликнули

            slideIndex = slideTo;
            offset = deleteNotDigits(width) * (slideTo - 1);

            slidesField.style.transform = `translateX(-${offset}px)`;


            if (slides.length < 10) {
                current.textContent = `0${slideIndex}`;
            } else {
                current.textContent = slideIndex;
            }

            dots.forEach(dot => dot.style.opacity = '.5');
            dots[slideIndex - 1].style.opacity = 1;


        });
    });
}

// module.exports = slider;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
    // --- Tabs ---

    //--- Создаем переменные ---

    const tabs = document.querySelectorAll(tabsSelector), //получаем псевдомассив табов из меню
        tabsContent = document.querySelectorAll(tabsContentSelector), //получаем псевдомассив блоков с контентом табов
        tabsParent = document.querySelector(tabsParentSelector); // получаем родителя всех табов из меню

    //--- Скрываем ненужный контент для табов и убираем класс active с самих табов ---

    function hideTabContent() {
        tabsContent.forEach(item => { //перебираем псевдомассив блоков с контентом, берем каждый отдельно
            // item.style.display = 'none'; //обращаемся к свойству style и прописываем ему в свойство display значение none(инлайновые стили)
            item.classList.remove('show', 'fade');
            item.classList.add('hide');
        });

        tabs.forEach(item => { //перебираем псевдомассив табов
            item.classList.remove(activeClass); //берем каждый таб, обращаемся к объекту класслист и задаем метод ремув - удаляем указанный класс
        });
    }

    //--- Показываем нужный контент для табов и добавляем класс active на нужный нам тьаб ---

    function showTabContent(i = 0) { //стандарт es6, если не передается аргумент, то подставится 0
        // tabsContent[i].style.display = 'block'; //прописываем для конкретного блока с контентом инлайновый стиль дисплей блок
        tabsContent[i].classList.remove('hide');
        tabsContent[i].classList.add('show', 'fade');
        tabs[i].classList.add(activeClass); //для конкретнгого таба добавляем класс активности
    }

    //--- вызываем функции ---

    hideTabContent();
    showTabContent();

    //--- используем делегирование, отслеживаем клик на один из табов, задаем ему классактивности  и открываем нужный таб ---

    tabsParent.addEventListener('click', (event) => { //отслеживаем клик в родителе табов
        const target = event.target; //создаем переменную с объектом таргет

        if (target && target.classList.contains(tabsSelector.slice(1))) { //проверяем есть ли вообще объект таргет у события и проверяем соответствие класса, по тому ли элементу мы кликнули
            tabs.forEach((item, i) => { //перебираем псевдомассив всех табов, берем таб и его индекс
                if (target == item) { //если объект таргет равен нашему данному элементу
                    hideTabContent();
                    showTabContent(i); //переключаем табы
                }

            });

        }

    });
}

// module.exports = tabs;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timer(id, deadline) {
    //--- Timer ---
    function getTimeRemaining(endtime) { //созда ем функцию, которая будет вычислять сколько времени между сегодняшним днем и окончанием акции
        const t = Date.parse(endtime) - Date.parse(new Date()),
            //создаем техническую переменную, в  которой передаем разницу между окончанием акции в миллисекундах и текущей даты в миллисекундах
            days = Math.floor(t / (1000 * 60 * 60 * 24)), //переводим миллисекунды в количество дней
            //создаем переменную, которая роавна -> округляем до целого деление (нашей разницы во времени на произведение ->)
            // 1000миллисекунд * 60 (секунд) * 60часов * 24часа в сутках => столько миллисекунд в сутках
            hours = Math.floor((t / (1000 * 60 * 60) % 24)), //переводим миллисекунды в количество часов
            //миллисекунды разницы течения нашей акции деленная на произведение 1000миллисекунд * 60сек * 60мин => получим всю акцию в часах
            //поскольку нам нужен остаток часов менее суток, то %24 делим с остатком на 24 и этот остаток округляем до целого - получаем часы
            minutes = Math.floor((t / (1000 * 60) % 60)), //получаем остаток менее часа  - оставшиеся минуты акции
            seconds = Math.floor((t / 1000) % 60); //получаем секунда - остаток меньше минуты

        return { //возвращаем полученные данные в виде объекта
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function getZero(num) { //функция, которое будет просверять число, если оно меньше 10, то спереди будет добавлять 0
        if (num >= 0 && num < 10) { //если наше число  больше или ровно 0 И меньше 10
            return `0${num}`; //то возвращаем вместо числа строку с 0 впереди
        } else {
            return num; //иначе ничего не модифицируем, а просто возвращаем число
        }
    }

    function setClock(selector, endtime) { //устанавливаем наши часы на сайте
        const timer = document.querySelector(selector), //берем элемент с таймером со страницы
            days = timer.querySelector('#days'), //элемент для записи дней
            hours = timer.querySelector('#hours'), //элемент для записи часов
            minutes = timer.querySelector('#minutes'), //элемент для записи минут
            seconds = timer.querySelector('#seconds'), //элемент для записи секунд
            timeInterval = setInterval(updateClock, 1000); //говорим что функцию обновления счетчика надо обновлять каждую секунду

        updateClock(); //вызываем функцию первый раз, чтобы не ждать обновления таймера 1000миллисекунд

        function updateClock() { //создаем функцию, которая будет обновлять наш счетчик каждую секунду
            const t = getTimeRemaining(endtime); //получаем наш объект с оставшимися днями минутами часами

            days.innerHTML = getZero(t.days); // в элемент с индетификатором days записываем данные из рассчитанного выше объекта свойство days
            hours.innerHTML = getZero(t.hours); //записываем оставшиеся часы
            minutes.innerHTML = getZero(t.minutes); //записываем оставшиеся минуты
            seconds.innerHTML = getZero(t.seconds); //записываем оставшиеся секунды

            if (t.total <= 0) { //если общее колличество миллисекунд меньше или равно 0
                clearInterval(timeInterval); //останавливаем обновление нашей функции
            }
        }

    }

    setClock(id, deadline);
}

// module.exports = timer;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "postData": () => (/* binding */ postData)
/* harmony export */ });
const postData = async (url, data) => { //создаем функцию, которая постит наши данные, как переменные вводим адрес запроса и данные, которые будут поститься
    //с помощью async мы говорим, что внутри функции будет асинхронный код
    //async - прописывается перед  функцией в которой будет какой-то асинхронный код
    //а await - перед кодом, которого необходимо дождаться, перед тем как дальше выполнять функцию
    let res = await fetch(url, {
        method: 'POST', //метод отправки POST- запрос
        headers: { //прописываем заголовки
            'Content-type': 'application/json'
        },
        body: data //и как тело отправки указываем наш объект formData 
    }); //получаем promise который нам возвращает fetch

    return await res.json(); //возвращаем промис в виде json
};



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!********************!*\
  !*** ./js/main.js ***!
  \********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");


(__webpack_require__(/*! es6-promise */ "../../../node_modules/es6-promise/dist/es6-promise.js").polyfill)();










window.addEventListener('DOMContentLoaded', () => { //отслеживаем загрузку контента на странице

    const modalTimerId = setTimeout(() => (0,_modules_modal__WEBPACK_IMPORTED_MODULE_4__["default"])('.modal', modalTimerId), 50000); //создаем таймер отработки функции по открытию можального окна, говорим чтобы сработала она через 3 секунды


    // const tabs = require('./modules/tabs'),
    //     calc = require('./modules/calc'),
    //     cards = require('./modules/cards'),
    //     forms = require('./modules/forms'),
    //     modal = require('./modules/modal'),
    //     slider = require('./modules/slider'),
    //     timer = require('./modules/timer');



    (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    (0,_modules_calc__WEBPACK_IMPORTED_MODULE_1__["default"])();
    (0,_modules_cards__WEBPACK_IMPORTED_MODULE_2__["default"])();
    (0,_modules_forms__WEBPACK_IMPORTED_MODULE_3__["default"])('form', modalTimerId);
    (0,_modules_modal__WEBPACK_IMPORTED_MODULE_4__["default"])('[data-modal]', '.modal', modalTimerId);
    (0,_modules_slider__WEBPACK_IMPORTED_MODULE_5__["default"])({
        container: '.offer__slider',
        slide: '.offer__slide',
        nextArrow: '.offer__slider-next',
        prevArrow: '.offer__slider-prev',
        totalCounter: '#total',
        currentCounter: '#current',
        wrapper: '.offer__slider-wrapper',
        field: '.offer__slider-inner'
    });


    (0,_modules_timer__WEBPACK_IMPORTED_MODULE_6__["default"])('.timer', '2022-06-11');

});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map