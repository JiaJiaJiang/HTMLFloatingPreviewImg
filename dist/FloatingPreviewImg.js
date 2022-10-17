(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.FloatingPreviewImg = factory());
})(this, (function () { 'use strict';

  function _regeneratorRuntime() {
    _regeneratorRuntime = function () {
      return exports;
    };
    var exports = {},
      Op = Object.prototype,
      hasOwn = Op.hasOwnProperty,
      $Symbol = "function" == typeof Symbol ? Symbol : {},
      iteratorSymbol = $Symbol.iterator || "@@iterator",
      asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator",
      toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
    function define(obj, key, value) {
      return Object.defineProperty(obj, key, {
        value: value,
        enumerable: !0,
        configurable: !0,
        writable: !0
      }), obj[key];
    }
    try {
      define({}, "");
    } catch (err) {
      define = function (obj, key, value) {
        return obj[key] = value;
      };
    }
    function wrap(innerFn, outerFn, self, tryLocsList) {
      var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator,
        generator = Object.create(protoGenerator.prototype),
        context = new Context(tryLocsList || []);
      return generator._invoke = function (innerFn, self, context) {
        var state = "suspendedStart";
        return function (method, arg) {
          if ("executing" === state) throw new Error("Generator is already running");
          if ("completed" === state) {
            if ("throw" === method) throw arg;
            return doneResult();
          }
          for (context.method = method, context.arg = arg;;) {
            var delegate = context.delegate;
            if (delegate) {
              var delegateResult = maybeInvokeDelegate(delegate, context);
              if (delegateResult) {
                if (delegateResult === ContinueSentinel) continue;
                return delegateResult;
              }
            }
            if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) {
              if ("suspendedStart" === state) throw state = "completed", context.arg;
              context.dispatchException(context.arg);
            } else "return" === context.method && context.abrupt("return", context.arg);
            state = "executing";
            var record = tryCatch(innerFn, self, context);
            if ("normal" === record.type) {
              if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue;
              return {
                value: record.arg,
                done: context.done
              };
            }
            "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg);
          }
        };
      }(innerFn, self, context), generator;
    }
    function tryCatch(fn, obj, arg) {
      try {
        return {
          type: "normal",
          arg: fn.call(obj, arg)
        };
      } catch (err) {
        return {
          type: "throw",
          arg: err
        };
      }
    }
    exports.wrap = wrap;
    var ContinueSentinel = {};
    function Generator() {}
    function GeneratorFunction() {}
    function GeneratorFunctionPrototype() {}
    var IteratorPrototype = {};
    define(IteratorPrototype, iteratorSymbol, function () {
      return this;
    });
    var getProto = Object.getPrototypeOf,
      NativeIteratorPrototype = getProto && getProto(getProto(values([])));
    NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype);
    var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
    function defineIteratorMethods(prototype) {
      ["next", "throw", "return"].forEach(function (method) {
        define(prototype, method, function (arg) {
          return this._invoke(method, arg);
        });
      });
    }
    function AsyncIterator(generator, PromiseImpl) {
      function invoke(method, arg, resolve, reject) {
        var record = tryCatch(generator[method], generator, arg);
        if ("throw" !== record.type) {
          var result = record.arg,
            value = result.value;
          return value && "object" == typeof value && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) {
            invoke("next", value, resolve, reject);
          }, function (err) {
            invoke("throw", err, resolve, reject);
          }) : PromiseImpl.resolve(value).then(function (unwrapped) {
            result.value = unwrapped, resolve(result);
          }, function (error) {
            return invoke("throw", error, resolve, reject);
          });
        }
        reject(record.arg);
      }
      var previousPromise;
      this._invoke = function (method, arg) {
        function callInvokeWithMethodAndArg() {
          return new PromiseImpl(function (resolve, reject) {
            invoke(method, arg, resolve, reject);
          });
        }
        return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
      };
    }
    function maybeInvokeDelegate(delegate, context) {
      var method = delegate.iterator[context.method];
      if (undefined === method) {
        if (context.delegate = null, "throw" === context.method) {
          if (delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel;
          context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method");
        }
        return ContinueSentinel;
      }
      var record = tryCatch(method, delegate.iterator, context.arg);
      if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel;
      var info = record.arg;
      return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel);
    }
    function pushTryEntry(locs) {
      var entry = {
        tryLoc: locs[0]
      };
      1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry);
    }
    function resetTryEntry(entry) {
      var record = entry.completion || {};
      record.type = "normal", delete record.arg, entry.completion = record;
    }
    function Context(tryLocsList) {
      this.tryEntries = [{
        tryLoc: "root"
      }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0);
    }
    function values(iterable) {
      if (iterable) {
        var iteratorMethod = iterable[iteratorSymbol];
        if (iteratorMethod) return iteratorMethod.call(iterable);
        if ("function" == typeof iterable.next) return iterable;
        if (!isNaN(iterable.length)) {
          var i = -1,
            next = function next() {
              for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next;
              return next.value = undefined, next.done = !0, next;
            };
          return next.next = next;
        }
      }
      return {
        next: doneResult
      };
    }
    function doneResult() {
      return {
        value: undefined,
        done: !0
      };
    }
    return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) {
      var ctor = "function" == typeof genFun && genFun.constructor;
      return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name));
    }, exports.mark = function (genFun) {
      return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun;
    }, exports.awrap = function (arg) {
      return {
        __await: arg
      };
    }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
      return this;
    }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
      void 0 === PromiseImpl && (PromiseImpl = Promise);
      var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
      return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) {
        return result.done ? result.value : iter.next();
      });
    }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () {
      return this;
    }), define(Gp, "toString", function () {
      return "[object Generator]";
    }), exports.keys = function (object) {
      var keys = [];
      for (var key in object) keys.push(key);
      return keys.reverse(), function next() {
        for (; keys.length;) {
          var key = keys.pop();
          if (key in object) return next.value = key, next.done = !1, next;
        }
        return next.done = !0, next;
      };
    }, exports.values = values, Context.prototype = {
      constructor: Context,
      reset: function (skipTempReset) {
        if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined);
      },
      stop: function () {
        this.done = !0;
        var rootRecord = this.tryEntries[0].completion;
        if ("throw" === rootRecord.type) throw rootRecord.arg;
        return this.rval;
      },
      dispatchException: function (exception) {
        if (this.done) throw exception;
        var context = this;
        function handle(loc, caught) {
          return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught;
        }
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i],
            record = entry.completion;
          if ("root" === entry.tryLoc) return handle("end");
          if (entry.tryLoc <= this.prev) {
            var hasCatch = hasOwn.call(entry, "catchLoc"),
              hasFinally = hasOwn.call(entry, "finallyLoc");
            if (hasCatch && hasFinally) {
              if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
              if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
            } else if (hasCatch) {
              if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
            } else {
              if (!hasFinally) throw new Error("try statement without catch or finally");
              if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
            }
          }
        }
      },
      abrupt: function (type, arg) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
            var finallyEntry = entry;
            break;
          }
        }
        finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null);
        var record = finallyEntry ? finallyEntry.completion : {};
        return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record);
      },
      complete: function (record, afterLoc) {
        if ("throw" === record.type) throw record.arg;
        return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel;
      },
      finish: function (finallyLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel;
        }
      },
      catch: function (tryLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.tryLoc === tryLoc) {
            var record = entry.completion;
            if ("throw" === record.type) {
              var thrown = record.arg;
              resetTryEntry(entry);
            }
            return thrown;
          }
        }
        throw new Error("illegal catch attempt");
      },
      delegateYield: function (iterable, resultName, nextLoc) {
        return this.delegate = {
          iterator: values(iterable),
          resultName: resultName,
          nextLoc: nextLoc
        }, "next" === this.method && (this.arg = undefined), ContinueSentinel;
      }
    }, exports;
  }
  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
      var info = gen[key](arg);
      var value = info.value;
    } catch (error) {
      reject(error);
      return;
    }
    if (info.done) {
      resolve(value);
    } else {
      Promise.resolve(value).then(_next, _throw);
    }
  }
  function _asyncToGenerator(fn) {
    return function () {
      var self = this,
        args = arguments;
      return new Promise(function (resolve, reject) {
        var gen = fn.apply(self, args);
        function _next(value) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
        }
        function _throw(err) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
        }
        _next(undefined);
      });
    };
  }
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }
  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }
    return obj;
  }
  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }
  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
    return arr2;
  }
  function _createForOfIteratorHelper(o, allowArrayLike) {
    var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
    if (!it) {
      if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
        if (it) o = it;
        var i = 0;
        var F = function () {};
        return {
          s: F,
          n: function () {
            if (i >= o.length) return {
              done: true
            };
            return {
              done: false,
              value: o[i++]
            };
          },
          e: function (e) {
            throw e;
          },
          f: F
        };
      }
      throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    var normalCompletion = true,
      didErr = false,
      err;
    return {
      s: function () {
        it = it.call(o);
      },
      n: function () {
        var step = it.next();
        normalCompletion = step.done;
        return step;
      },
      e: function (e) {
        didErr = true;
        err = e;
      },
      f: function () {
        try {
          if (!normalCompletion && it.return != null) it.return();
        } finally {
          if (didErr) throw err;
        }
      }
    };
  }

  var $$3 = require('../internals/export');
  var assign = require('../internals/object-assign');

  // `Object.assign` method
  // https://tc39.es/ecma262/#sec-object.assign
  // eslint-disable-next-line es/no-object-assign -- required for testing
  $$3({
    target: 'Object',
    stat: true,
    arity: 2,
    forced: Object.assign !== assign
  }, {
    assign: assign
  });

  var $$2 = require('../internals/export');
  var uncurryThis$1 = require('../internals/function-uncurry-this');
  var getOwnPropertyDescriptor = require('../internals/object-get-own-property-descriptor').f;
  var toLength = require('../internals/to-length');
  var toString$3 = require('../internals/to-string');
  var notARegExp = require('../internals/not-a-regexp');
  var requireObjectCoercible = require('../internals/require-object-coercible');
  var correctIsRegExpLogic = require('../internals/correct-is-regexp-logic');
  var IS_PURE$1 = require('../internals/is-pure');

  // eslint-disable-next-line es/no-string-prototype-startswith -- safe
  var nativeStartsWith = uncurryThis$1(''.startsWith);
  var stringSlice = uncurryThis$1(''.slice);
  var min = Math.min;
  var CORRECT_IS_REGEXP_LOGIC = correctIsRegExpLogic('startsWith');
  // https://github.com/zloirock/core-js/pull/702
  var MDN_POLYFILL_BUG = !IS_PURE$1 && !CORRECT_IS_REGEXP_LOGIC && !!function () {
    var descriptor = getOwnPropertyDescriptor(String.prototype, 'startsWith');
    return descriptor && !descriptor.writable;
  }();

  // `String.prototype.startsWith` method
  // https://tc39.es/ecma262/#sec-string.prototype.startswith
  $$2({
    target: 'String',
    proto: true,
    forced: !MDN_POLYFILL_BUG && !CORRECT_IS_REGEXP_LOGIC
  }, {
    startsWith: function startsWith(searchString /* , position = 0 */) {
      var that = toString$3(requireObjectCoercible(this));
      notARegExp(searchString);
      var index = toLength(min(arguments.length > 1 ? arguments[1] : undefined, that.length));
      var search = toString$3(searchString);
      return nativeStartsWith ? nativeStartsWith(that, search, index) : stringSlice(that, index, index + search.length) === search;
    }
  });

  var $$1 = require('../internals/export');
  var uncurryThis = require('../internals/function-uncurry-this');
  var aCallable = require('../internals/a-callable');
  var toObject$1 = require('../internals/to-object');
  var lengthOfArrayLike$1 = require('../internals/length-of-array-like');
  var deletePropertyOrThrow = require('../internals/delete-property-or-throw');
  var toString$2 = require('../internals/to-string');
  var fails$1 = require('../internals/fails');
  var internalSort = require('../internals/array-sort');
  var arrayMethodIsStrict = require('../internals/array-method-is-strict');
  var FF = require('../internals/engine-ff-version');
  var IE_OR_EDGE = require('../internals/engine-is-ie-or-edge');
  var V8 = require('../internals/engine-v8-version');
  var WEBKIT = require('../internals/engine-webkit-version');
  var test = [];
  var nativeSort = uncurryThis(test.sort);
  var push = uncurryThis(test.push);

  // IE8-
  var FAILS_ON_UNDEFINED = fails$1(function () {
    test.sort(undefined);
  });
  // V8 bug
  var FAILS_ON_NULL = fails$1(function () {
    test.sort(null);
  });
  // Old WebKit
  var STRICT_METHOD = arrayMethodIsStrict('sort');
  var STABLE_SORT = !fails$1(function () {
    // feature detection can be too slow, so check engines versions
    if (V8) return V8 < 70;
    if (FF && FF > 3) return;
    if (IE_OR_EDGE) return true;
    if (WEBKIT) return WEBKIT < 603;
    var result = '';
    var code, chr, value, index;

    // generate an array with more 512 elements (Chakra and old V8 fails only in this case)
    for (code = 65; code < 76; code++) {
      chr = String.fromCharCode(code);
      switch (code) {
        case 66:
        case 69:
        case 70:
        case 72:
          value = 3;
          break;
        case 68:
        case 71:
          value = 4;
          break;
        default:
          value = 2;
      }
      for (index = 0; index < 47; index++) {
        test.push({
          k: chr + index,
          v: value
        });
      }
    }
    test.sort(function (a, b) {
      return b.v - a.v;
    });
    for (index = 0; index < test.length; index++) {
      chr = test[index].k.charAt(0);
      if (result.charAt(result.length - 1) !== chr) result += chr;
    }
    return result !== 'DGBEFHACIJK';
  });
  var FORCED$1 = FAILS_ON_UNDEFINED || !FAILS_ON_NULL || !STRICT_METHOD || !STABLE_SORT;
  var getSortCompare = function (comparefn) {
    return function (x, y) {
      if (y === undefined) return -1;
      if (x === undefined) return 1;
      if (comparefn !== undefined) return +comparefn(x, y) || 0;
      return toString$2(x) > toString$2(y) ? 1 : -1;
    };
  };

  // `Array.prototype.sort` method
  // https://tc39.es/ecma262/#sec-array.prototype.sort
  $$1({
    target: 'Array',
    proto: true,
    forced: FORCED$1
  }, {
    sort: function sort(comparefn) {
      if (comparefn !== undefined) aCallable(comparefn);
      var array = toObject$1(this);
      if (STABLE_SORT) return comparefn === undefined ? nativeSort(array) : nativeSort(array, comparefn);
      var items = [];
      var arrayLength = lengthOfArrayLike$1(array);
      var itemsLength, index;
      for (index = 0; index < arrayLength; index++) {
        if (index in array) push(items, array[index]);
      }
      internalSort(items, getSortCompare(comparefn));
      itemsLength = lengthOfArrayLike$1(items);
      index = 0;
      while (index < itemsLength) array[index] = items[index++];
      while (index < arrayLength) deletePropertyOrThrow(array, index++);
      return array;
    }
  });

  var $ = require('../internals/export');
  var fails = require('../internals/fails');
  var isArray = require('../internals/is-array');
  var isObject = require('../internals/is-object');
  var toObject = require('../internals/to-object');
  var lengthOfArrayLike = require('../internals/length-of-array-like');
  var doesNotExceedSafeInteger = require('../internals/does-not-exceed-safe-integer');
  var createProperty = require('../internals/create-property');
  var arraySpeciesCreate = require('../internals/array-species-create');
  var arrayMethodHasSpeciesSupport = require('../internals/array-method-has-species-support');
  var wellKnownSymbol$1 = require('../internals/well-known-symbol');
  var V8_VERSION = require('../internals/engine-v8-version');
  var IS_CONCAT_SPREADABLE = wellKnownSymbol$1('isConcatSpreadable');

  // We can't use this feature detection in V8 since it causes
  // deoptimization and serious performance degradation
  // https://github.com/zloirock/core-js/issues/679
  var IS_CONCAT_SPREADABLE_SUPPORT = V8_VERSION >= 51 || !fails(function () {
    var array = [];
    array[IS_CONCAT_SPREADABLE] = false;
    return array.concat()[0] !== array;
  });
  var SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('concat');
  var isConcatSpreadable = function (O) {
    if (!isObject(O)) return false;
    var spreadable = O[IS_CONCAT_SPREADABLE];
    return spreadable !== undefined ? !!spreadable : isArray(O);
  };
  var FORCED = !IS_CONCAT_SPREADABLE_SUPPORT || !SPECIES_SUPPORT;

  // `Array.prototype.concat` method
  // https://tc39.es/ecma262/#sec-array.prototype.concat
  // with adding support of @@isConcatSpreadable and @@species
  $({
    target: 'Array',
    proto: true,
    arity: 1,
    forced: FORCED
  }, {
    // eslint-disable-next-line no-unused-vars -- required for `.length`
    concat: function concat(arg) {
      var O = toObject(this);
      var A = arraySpeciesCreate(O, 0);
      var n = 0;
      var i, k, length, len, E;
      for (i = -1, length = arguments.length; i < length; i++) {
        E = i === -1 ? O : arguments[i];
        if (isConcatSpreadable(E)) {
          len = lengthOfArrayLike(E);
          doesNotExceedSafeInteger(n + len);
          for (k = 0; k < len; k++, n++) if (k in E) createProperty(A, n, E[k]);
        } else {
          doesNotExceedSafeInteger(n + 1);
          createProperty(A, n++, E);
        }
      }
      A.length = n;
      return A;
    }
  });

  var toIndexedObject = require('../internals/to-indexed-object');
  var addToUnscopables = require('../internals/add-to-unscopables');
  var Iterators = require('../internals/iterators');
  var InternalStateModule$1 = require('../internals/internal-state');
  var defineProperty = require('../internals/object-define-property').f;
  var defineIterator$1 = require('../internals/iterator-define');
  var createIterResultObject$1 = require('../internals/create-iter-result-object');
  var IS_PURE = require('../internals/is-pure');
  var DESCRIPTORS = require('../internals/descriptors');
  var ARRAY_ITERATOR = 'Array Iterator';
  var setInternalState$1 = InternalStateModule$1.set;
  var getInternalState$1 = InternalStateModule$1.getterFor(ARRAY_ITERATOR);

  // `Array.prototype.entries` method
  // https://tc39.es/ecma262/#sec-array.prototype.entries
  // `Array.prototype.keys` method
  // https://tc39.es/ecma262/#sec-array.prototype.keys
  // `Array.prototype.values` method
  // https://tc39.es/ecma262/#sec-array.prototype.values
  // `Array.prototype[@@iterator]` method
  // https://tc39.es/ecma262/#sec-array.prototype-@@iterator
  // `CreateArrayIterator` internal method
  // https://tc39.es/ecma262/#sec-createarrayiterator
  module.exports = defineIterator$1(Array, 'Array', function (iterated, kind) {
    setInternalState$1(this, {
      type: ARRAY_ITERATOR,
      target: toIndexedObject(iterated),
      // target
      index: 0,
      // next index
      kind: kind // kind
    });
    // `%ArrayIteratorPrototype%.next` method
    // https://tc39.es/ecma262/#sec-%arrayiteratorprototype%.next
  }, function () {
    var state = getInternalState$1(this);
    var target = state.target;
    var kind = state.kind;
    var index = state.index++;
    if (!target || index >= target.length) {
      state.target = undefined;
      return createIterResultObject$1(undefined, true);
    }
    if (kind == 'keys') return createIterResultObject$1(index, false);
    if (kind == 'values') return createIterResultObject$1(target[index], false);
    return createIterResultObject$1([index, target[index]], false);
  }, 'values');

  // argumentsList[@@iterator] is %ArrayProto_values%
  // https://tc39.es/ecma262/#sec-createunmappedargumentsobject
  // https://tc39.es/ecma262/#sec-createmappedargumentsobject
  var values = Iterators.Arguments = Iterators.Array;

  // https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
  addToUnscopables('keys');
  addToUnscopables('values');
  addToUnscopables('entries');

  // V8 ~ Chrome 45- bug
  if (!IS_PURE && DESCRIPTORS && values.name !== 'values') try {
    defineProperty(values, 'name', {
      value: 'values'
    });
  } catch (error) {/* empty */}

  var TO_STRING_TAG_SUPPORT = require('../internals/to-string-tag-support');
  var defineBuiltIn = require('../internals/define-built-in');
  var toString$1 = require('../internals/object-to-string');

  // `Object.prototype.toString` method
  // https://tc39.es/ecma262/#sec-object.prototype.tostring
  if (!TO_STRING_TAG_SUPPORT) {
    defineBuiltIn(Object.prototype, 'toString', toString$1, {
      unsafe: true
    });
  }

  // TODO: Remove this module from `core-js@4` since it's replaced to module below
  require('../modules/es.set.constructor');

  var charAt = require('../internals/string-multibyte').charAt;
  var toString = require('../internals/to-string');
  var InternalStateModule = require('../internals/internal-state');
  var defineIterator = require('../internals/iterator-define');
  var createIterResultObject = require('../internals/create-iter-result-object');
  var STRING_ITERATOR = 'String Iterator';
  var setInternalState = InternalStateModule.set;
  var getInternalState = InternalStateModule.getterFor(STRING_ITERATOR);

  // `String.prototype[@@iterator]` method
  // https://tc39.es/ecma262/#sec-string.prototype-@@iterator
  defineIterator(String, 'String', function (iterated) {
    setInternalState(this, {
      type: STRING_ITERATOR,
      string: toString(iterated),
      index: 0
    });
    // `%StringIteratorPrototype%.next` method
    // https://tc39.es/ecma262/#sec-%stringiteratorprototype%.next
  }, function next() {
    var state = getInternalState(this);
    var string = state.string;
    var index = state.index;
    var point;
    if (index >= string.length) return createIterResultObject(undefined, true);
    point = charAt(string, index);
    state.index += point.length;
    return createIterResultObject(point, false);
  });

  var global = require('../internals/global');
  var DOMIterables = require('../internals/dom-iterables');
  var DOMTokenListPrototype = require('../internals/dom-token-list-prototype');
  var ArrayIteratorMethods = require('../modules/es.array.iterator');
  var createNonEnumerableProperty = require('../internals/create-non-enumerable-property');
  var wellKnownSymbol = require('../internals/well-known-symbol');
  var ITERATOR = wellKnownSymbol('iterator');
  var TO_STRING_TAG = wellKnownSymbol('toStringTag');
  var ArrayValues = ArrayIteratorMethods.values;
  var handlePrototype = function (CollectionPrototype, COLLECTION_NAME) {
    if (CollectionPrototype) {
      // some Chrome versions have non-configurable methods on DOMTokenList
      if (CollectionPrototype[ITERATOR] !== ArrayValues) try {
        createNonEnumerableProperty(CollectionPrototype, ITERATOR, ArrayValues);
      } catch (error) {
        CollectionPrototype[ITERATOR] = ArrayValues;
      }
      if (!CollectionPrototype[TO_STRING_TAG]) {
        createNonEnumerableProperty(CollectionPrototype, TO_STRING_TAG, COLLECTION_NAME);
      }
      if (DOMIterables[COLLECTION_NAME]) for (var METHOD_NAME in ArrayIteratorMethods) {
        // some Chrome versions have non-configurable methods on DOMTokenList
        if (CollectionPrototype[METHOD_NAME] !== ArrayIteratorMethods[METHOD_NAME]) try {
          createNonEnumerableProperty(CollectionPrototype, METHOD_NAME, ArrayIteratorMethods[METHOD_NAME]);
        } catch (error) {
          CollectionPrototype[METHOD_NAME] = ArrayIteratorMethods[METHOD_NAME];
        }
      }
    }
  };
  for (var COLLECTION_NAME in DOMIterables) {
    handlePrototype(global[COLLECTION_NAME] && global[COLLECTION_NAME].prototype, COLLECTION_NAME);
  }
  handlePrototype(DOMTokenListPrototype, 'DOMTokenList');

  window.addEventListener('mousemove', function (e) {
    var _iterator = _createForOfIteratorHelper(FloatingPreviewImg.activePreviews),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var c = _step.value;
        try {
          var el = void 0;
          if (el = c.shouldShow(e.target)) {
            c.show(el);
          } else {
            if (c._showingSource) c.hide();
          }
        } catch (err) {
          console.error(err);
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  });
  var FloatingPreviewImg = /*#__PURE__*/function () {
    /**
     * Creates an instance of FloatingPreviewImg.
     * @param {object} [opts={}]
     * @param {string} [opts.id] id of the preview image
     * @param {number} [opts.targetSize=500] a size for preview to fit in
     * @param {number} [opts.maxSize=500] images larger than this size will be ignored
     * @param {number} [opts.minScale=1] when targetSize divides source image's size is lower than this value, will use this scale
     * @param {number} [opts.marign=20] margin of the floating image to the screen
     * @param {function(HTMLImageElement):{width,height,src}} [opts.sourceInfoFunc]
     * @param {function(HTMLElement):HTMLElement|undefined} [opts.shouldShow]
     */
    function FloatingPreviewImg() {
      var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      _classCallCheck(this, FloatingPreviewImg);
      _defineProperty(this, "_showingSource", null);
      _defineProperty(this, "_cachedInfo", void 0);
      _defineProperty(this, "_previewImg", document.createElement('img'));
      _defineProperty(this, "targetSize", 500);
      _defineProperty(this, "maxSize", 500);
      _defineProperty(this, "minScale", 1);
      _defineProperty(this, "marign", 20);
      _defineProperty(this, "sourceInfoFunc", void 0);
      opts = Object.assign({
        id: "el_floatingPreviewImg_".concat(Math.random() * 0xffffffff | 0)
      }, opts);
      this._previewImg.id = opts.id;
      this._previewImg.style.cssText = "display:block;\n\t\tz-index: 99999999999;\n\t\ttransform:translate3d(0, 0, 0);\n\t\tposition:fixed;\n\t\ttop:0;\n\t\tleft:0;\n\t\tpointer-events:none;\n\t\topacity:0;\n\t\tbox-shadow:0 0 1em #000;\n\t\theight:0;\n\t\twidth:0;\n\t\ttransition:width .1s,height .1s,transform .1s,opacity .05s;";
      for (var o in opts) {
        if (o.startsWith('_') || o in this === false) continue;
        this[o] = opts[o];
      }
      FloatingPreviewImg.activePreviews.add(this);
    }
    /**
     *show preview for the image
     *
     * @param {Image} sourceImg
     */
    _createClass(FloatingPreviewImg, [{
      key: "id",
      get: function get() {
        return this._previewImg.id;
      }
    }, {
      key: "shouldShow",
      value:
      /**
       *The default function for resolving a image for showing preview, if returns falsy, nothing will happen.
       *This function is called when mousemove event emits, and the event target element will be passed in.
       *The default behaviour is to check if the element is an image and has attribute "showPreview".
       * 
       * @param {HTMLElement} el the event target element from mousemove event
       * @returns {HTMLElement|undefined} return the image element for showing preview
       */
      function shouldShow(el) {
        var target = e.target;
        if (target.localName === 'img' && target.hasAttribute('showPreview')) {
          return el;
        }
        return;
      }
    }, {
      key: "show",
      value: function () {
        var _show = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(sourceImg) {
          var sourceInfo, rawWidth, rawHeight, src, marign, wWidth, wHeight, scale, preWidth, preHeight, pos, top, left, bottom, right, targetCenter, areas, x, y, offset;
          return _regeneratorRuntime().wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  if (this._previewImg.isConnected === false) {
                    document.body.appendChild(this._previewImg);
                  }
                  if (!(sourceImg.complete === false)) {
                    _context.next = 3;
                    break;
                  }
                  return _context.abrupt("return");
                case 3:
                  if (!(this._showingSource === sourceImg)) {
                    _context.next = 7;
                    break;
                  }
                  _context.t0 = this._cachedInfo;
                  _context.next = 15;
                  break;
                case 7:
                  if (!(typeof this.sourceInfoFunc === 'function')) {
                    _context.next = 13;
                    break;
                  }
                  _context.next = 10;
                  return this.sourceInfoFunc(sourceImg);
                case 10:
                  _context.t1 = _context.sent;
                  _context.next = 14;
                  break;
                case 13:
                  _context.t1 = {
                    width: sourceImg.width,
                    height: sourceImg.height,
                    src: sourceImg.src
                  };
                case 14:
                  _context.t0 = _context.t1;
                case 15:
                  sourceInfo = _context.t0;
                  if (sourceInfo) {
                    _context.next = 18;
                    break;
                  }
                  return _context.abrupt("return");
                case 18:
                  this._showingSource = sourceImg;
                  this._cachedInfo = sourceInfo;
                  rawWidth = sourceInfo.width, rawHeight = sourceInfo.height, src = sourceInfo.src;
                  if (!(rawWidth > this.maxSize || rawHeight > this.maxSize)) {
                    _context.next = 23;
                    break;
                  }
                  return _context.abrupt("return");
                case 23:
                  //ignore big enough images
                  marign = this.marign, wWidth = window.innerWidth, wHeight = window.innerHeight, scale = Math.max(Math.min(this.targetSize / rawWidth, this.targetSize / rawHeight), this.minScale), preWidth = rawWidth * scale, preHeight = rawHeight * scale;
                  this._previewImg.style.opacity = '1';
                  if (this._previewImg.src !== src) {
                    this._previewImg.src = src;
                    this._previewImg.style.width = preWidth + 'px';
                    this._previewImg.style.height = preHeight + 'px';
                  }
                  pos = sourceImg.getBoundingClientRect();
                  top = pos.top, left = pos.left, bottom = pos.bottom, right = pos.right;
                  bottom = wHeight - bottom;
                  right = wWidth - right;
                  targetCenter = [left + rawWidth / 2, top + rawHeight / 2]; //find out the largest free space
                  areas = [['top', top], ['bottom', bottom], ['left', left], ['right', right]].sort(function (a, b) {
                    return b[1] - a[1];
                  });
                  _context.t2 = areas[0][0];
                  _context.next = _context.t2 === 'top' ? 35 : _context.t2 === 'bottom' ? 38 : _context.t2 === 'left' ? 41 : _context.t2 === 'right' ? 44 : 47;
                  break;
                case 35:
                  x = targetCenter[0] - preWidth / 2;
                  y = top - marign - preHeight;
                  return _context.abrupt("break", 47);
                case 38:
                  x = targetCenter[0] - preWidth / 2;
                  y = top + rawHeight + marign;
                  return _context.abrupt("break", 47);
                case 41:
                  x = left - marign - preWidth;
                  y = targetCenter[1] - preHeight / 2;
                  return _context.abrupt("break", 47);
                case 44:
                  x = left + rawWidth + marign;
                  y = targetCenter[1] - preHeight / 2;
                  return _context.abrupt("break", 47);
                case 47:
                  //adjust overflow
                  offset = 0;
                  if ((offset = x + preWidth - wWidth) > 0) {
                    x -= offset + marign;
                  }
                  if ((offset = y + preHeight - wHeight) > 0) {
                    y -= offset + marign;
                  }
                  if (x < 0) x = marign;
                  if (y < 0) y = marign;
                  this._previewImg.style.transform = "translate3d(".concat(x, "px, ").concat(y, "px, 0)");
                case 53:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, this);
        }));
        function show(_x) {
          return _show.apply(this, arguments);
        }
        return show;
      }() /**
           *hide preview image
           */
    }, {
      key: "hide",
      value: function hide() {
        this._showingSource = null;
        this._previewImg.style.opacity = '0';
      }
    }, {
      key: "close",
      value: function close() {
        if (this._previewImg.isConnected) {
          this._previewImg.parentNode.removeChild(this._previewImg);
        }
        this._showingSource = null;
        this._previewImg = null;
        FloatingPreviewImg.activePreviews["delete"](this);
      }
    }]);
    return FloatingPreviewImg;
  }();
  _defineProperty(FloatingPreviewImg, "activePreviews", new Set());

  return FloatingPreviewImg;

}));
