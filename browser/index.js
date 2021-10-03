var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[Object.keys(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[Object.keys(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __reExport = (target, module, desc) => {
  if (module && typeof module === "object" || typeof module === "function") {
    for (let key of __getOwnPropNames(module))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, { get: () => module[key], enumerable: !(desc = __getOwnPropDesc(module, key)) || desc.enumerable });
  }
  return target;
};
var __toModule = (module) => {
  return __reExport(__markAsModule(__defProp(module != null ? __create(__getProtoOf(module)) : {}, "default", module && module.__esModule && "default" in module ? { get: () => module.default, enumerable: true } : { value: module, enumerable: true })), module);
};

// browser/node-shims.js
var process;
var init_node_shims = __esm({
  "browser/node-shims.js"() {
    process = {
      env: {}
    };
  }
});

// node_modules/axios/lib/helpers/bind.js
var require_bind = __commonJS({
  "node_modules/axios/lib/helpers/bind.js"(exports, module) {
    init_node_shims();
    "use strict";
    module.exports = function bind(fn, thisArg) {
      return function wrap() {
        var args = new Array(arguments.length);
        for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i];
        }
        return fn.apply(thisArg, args);
      };
    };
  }
});

// node_modules/axios/lib/utils.js
var require_utils = __commonJS({
  "node_modules/axios/lib/utils.js"(exports, module) {
    init_node_shims();
    "use strict";
    var bind = require_bind();
    var toString = Object.prototype.toString;
    function isArray(val) {
      return toString.call(val) === "[object Array]";
    }
    function isUndefined(val) {
      return typeof val === "undefined";
    }
    function isBuffer(val) {
      return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor) && typeof val.constructor.isBuffer === "function" && val.constructor.isBuffer(val);
    }
    function isArrayBuffer(val) {
      return toString.call(val) === "[object ArrayBuffer]";
    }
    function isFormData(val) {
      return typeof FormData !== "undefined" && val instanceof FormData;
    }
    function isArrayBufferView(val) {
      var result;
      if (typeof ArrayBuffer !== "undefined" && ArrayBuffer.isView) {
        result = ArrayBuffer.isView(val);
      } else {
        result = val && val.buffer && val.buffer instanceof ArrayBuffer;
      }
      return result;
    }
    function isString(val) {
      return typeof val === "string";
    }
    function isNumber(val) {
      return typeof val === "number";
    }
    function isObject(val) {
      return val !== null && typeof val === "object";
    }
    function isPlainObject(val) {
      if (toString.call(val) !== "[object Object]") {
        return false;
      }
      var prototype = Object.getPrototypeOf(val);
      return prototype === null || prototype === Object.prototype;
    }
    function isDate(val) {
      return toString.call(val) === "[object Date]";
    }
    function isFile(val) {
      return toString.call(val) === "[object File]";
    }
    function isBlob(val) {
      return toString.call(val) === "[object Blob]";
    }
    function isFunction(val) {
      return toString.call(val) === "[object Function]";
    }
    function isStream(val) {
      return isObject(val) && isFunction(val.pipe);
    }
    function isURLSearchParams(val) {
      return typeof URLSearchParams !== "undefined" && val instanceof URLSearchParams;
    }
    function trim(str) {
      return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, "");
    }
    function isStandardBrowserEnv() {
      if (typeof navigator !== "undefined" && (navigator.product === "ReactNative" || navigator.product === "NativeScript" || navigator.product === "NS")) {
        return false;
      }
      return typeof window !== "undefined" && typeof document !== "undefined";
    }
    function forEach(obj, fn) {
      if (obj === null || typeof obj === "undefined") {
        return;
      }
      if (typeof obj !== "object") {
        obj = [obj];
      }
      if (isArray(obj)) {
        for (var i = 0, l = obj.length; i < l; i++) {
          fn.call(null, obj[i], i, obj);
        }
      } else {
        for (var key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) {
            fn.call(null, obj[key], key, obj);
          }
        }
      }
    }
    function merge() {
      var result = {};
      function assignValue(val, key) {
        if (isPlainObject(result[key]) && isPlainObject(val)) {
          result[key] = merge(result[key], val);
        } else if (isPlainObject(val)) {
          result[key] = merge({}, val);
        } else if (isArray(val)) {
          result[key] = val.slice();
        } else {
          result[key] = val;
        }
      }
      for (var i = 0, l = arguments.length; i < l; i++) {
        forEach(arguments[i], assignValue);
      }
      return result;
    }
    function extend(a, b, thisArg) {
      forEach(b, function assignValue(val, key) {
        if (thisArg && typeof val === "function") {
          a[key] = bind(val, thisArg);
        } else {
          a[key] = val;
        }
      });
      return a;
    }
    function stripBOM(content) {
      if (content.charCodeAt(0) === 65279) {
        content = content.slice(1);
      }
      return content;
    }
    module.exports = {
      isArray,
      isArrayBuffer,
      isBuffer,
      isFormData,
      isArrayBufferView,
      isString,
      isNumber,
      isObject,
      isPlainObject,
      isUndefined,
      isDate,
      isFile,
      isBlob,
      isFunction,
      isStream,
      isURLSearchParams,
      isStandardBrowserEnv,
      forEach,
      merge,
      extend,
      trim,
      stripBOM
    };
  }
});

// node_modules/axios/lib/helpers/buildURL.js
var require_buildURL = __commonJS({
  "node_modules/axios/lib/helpers/buildURL.js"(exports, module) {
    init_node_shims();
    "use strict";
    var utils = require_utils();
    function encode(val) {
      return encodeURIComponent(val).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
    }
    module.exports = function buildURL(url, params, paramsSerializer) {
      if (!params) {
        return url;
      }
      var serializedParams;
      if (paramsSerializer) {
        serializedParams = paramsSerializer(params);
      } else if (utils.isURLSearchParams(params)) {
        serializedParams = params.toString();
      } else {
        var parts = [];
        utils.forEach(params, function serialize(val, key) {
          if (val === null || typeof val === "undefined") {
            return;
          }
          if (utils.isArray(val)) {
            key = key + "[]";
          } else {
            val = [val];
          }
          utils.forEach(val, function parseValue(v) {
            if (utils.isDate(v)) {
              v = v.toISOString();
            } else if (utils.isObject(v)) {
              v = JSON.stringify(v);
            }
            parts.push(encode(key) + "=" + encode(v));
          });
        });
        serializedParams = parts.join("&");
      }
      if (serializedParams) {
        var hashmarkIndex = url.indexOf("#");
        if (hashmarkIndex !== -1) {
          url = url.slice(0, hashmarkIndex);
        }
        url += (url.indexOf("?") === -1 ? "?" : "&") + serializedParams;
      }
      return url;
    };
  }
});

// node_modules/axios/lib/core/InterceptorManager.js
var require_InterceptorManager = __commonJS({
  "node_modules/axios/lib/core/InterceptorManager.js"(exports, module) {
    init_node_shims();
    "use strict";
    var utils = require_utils();
    function InterceptorManager() {
      this.handlers = [];
    }
    InterceptorManager.prototype.use = function use(fulfilled, rejected, options) {
      this.handlers.push({
        fulfilled,
        rejected,
        synchronous: options ? options.synchronous : false,
        runWhen: options ? options.runWhen : null
      });
      return this.handlers.length - 1;
    };
    InterceptorManager.prototype.eject = function eject(id) {
      if (this.handlers[id]) {
        this.handlers[id] = null;
      }
    };
    InterceptorManager.prototype.forEach = function forEach(fn) {
      utils.forEach(this.handlers, function forEachHandler(h) {
        if (h !== null) {
          fn(h);
        }
      });
    };
    module.exports = InterceptorManager;
  }
});

// node_modules/axios/lib/helpers/normalizeHeaderName.js
var require_normalizeHeaderName = __commonJS({
  "node_modules/axios/lib/helpers/normalizeHeaderName.js"(exports, module) {
    init_node_shims();
    "use strict";
    var utils = require_utils();
    module.exports = function normalizeHeaderName(headers, normalizedName) {
      utils.forEach(headers, function processHeader(value, name) {
        if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
          headers[normalizedName] = value;
          delete headers[name];
        }
      });
    };
  }
});

// node_modules/axios/lib/core/enhanceError.js
var require_enhanceError = __commonJS({
  "node_modules/axios/lib/core/enhanceError.js"(exports, module) {
    init_node_shims();
    "use strict";
    module.exports = function enhanceError(error, config, code, request, response) {
      error.config = config;
      if (code) {
        error.code = code;
      }
      error.request = request;
      error.response = response;
      error.isAxiosError = true;
      error.toJSON = function toJSON() {
        return {
          message: this.message,
          name: this.name,
          description: this.description,
          number: this.number,
          fileName: this.fileName,
          lineNumber: this.lineNumber,
          columnNumber: this.columnNumber,
          stack: this.stack,
          config: this.config,
          code: this.code,
          status: this.response && this.response.status ? this.response.status : null
        };
      };
      return error;
    };
  }
});

// node_modules/axios/lib/core/createError.js
var require_createError = __commonJS({
  "node_modules/axios/lib/core/createError.js"(exports, module) {
    init_node_shims();
    "use strict";
    var enhanceError = require_enhanceError();
    module.exports = function createError(message, config, code, request, response) {
      var error = new Error(message);
      return enhanceError(error, config, code, request, response);
    };
  }
});

// node_modules/axios/lib/core/settle.js
var require_settle = __commonJS({
  "node_modules/axios/lib/core/settle.js"(exports, module) {
    init_node_shims();
    "use strict";
    var createError = require_createError();
    module.exports = function settle(resolve, reject, response) {
      var validateStatus = response.config.validateStatus;
      if (!response.status || !validateStatus || validateStatus(response.status)) {
        resolve(response);
      } else {
        reject(createError("Request failed with status code " + response.status, response.config, null, response.request, response));
      }
    };
  }
});

// node_modules/axios/lib/helpers/cookies.js
var require_cookies = __commonJS({
  "node_modules/axios/lib/helpers/cookies.js"(exports, module) {
    init_node_shims();
    "use strict";
    var utils = require_utils();
    module.exports = utils.isStandardBrowserEnv() ? function standardBrowserEnv() {
      return {
        write: function write(name, value, expires, path, domain, secure) {
          var cookie = [];
          cookie.push(name + "=" + encodeURIComponent(value));
          if (utils.isNumber(expires)) {
            cookie.push("expires=" + new Date(expires).toGMTString());
          }
          if (utils.isString(path)) {
            cookie.push("path=" + path);
          }
          if (utils.isString(domain)) {
            cookie.push("domain=" + domain);
          }
          if (secure === true) {
            cookie.push("secure");
          }
          document.cookie = cookie.join("; ");
        },
        read: function read(name) {
          var match = document.cookie.match(new RegExp("(^|;\\s*)(" + name + ")=([^;]*)"));
          return match ? decodeURIComponent(match[3]) : null;
        },
        remove: function remove(name) {
          this.write(name, "", Date.now() - 864e5);
        }
      };
    }() : function nonStandardBrowserEnv() {
      return {
        write: function write() {
        },
        read: function read() {
          return null;
        },
        remove: function remove() {
        }
      };
    }();
  }
});

// node_modules/axios/lib/helpers/isAbsoluteURL.js
var require_isAbsoluteURL = __commonJS({
  "node_modules/axios/lib/helpers/isAbsoluteURL.js"(exports, module) {
    init_node_shims();
    "use strict";
    module.exports = function isAbsoluteURL(url) {
      return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
    };
  }
});

// node_modules/axios/lib/helpers/combineURLs.js
var require_combineURLs = __commonJS({
  "node_modules/axios/lib/helpers/combineURLs.js"(exports, module) {
    init_node_shims();
    "use strict";
    module.exports = function combineURLs(baseURL, relativeURL) {
      return relativeURL ? baseURL.replace(/\/+$/, "") + "/" + relativeURL.replace(/^\/+/, "") : baseURL;
    };
  }
});

// node_modules/axios/lib/core/buildFullPath.js
var require_buildFullPath = __commonJS({
  "node_modules/axios/lib/core/buildFullPath.js"(exports, module) {
    init_node_shims();
    "use strict";
    var isAbsoluteURL = require_isAbsoluteURL();
    var combineURLs = require_combineURLs();
    module.exports = function buildFullPath(baseURL, requestedURL) {
      if (baseURL && !isAbsoluteURL(requestedURL)) {
        return combineURLs(baseURL, requestedURL);
      }
      return requestedURL;
    };
  }
});

// node_modules/axios/lib/helpers/parseHeaders.js
var require_parseHeaders = __commonJS({
  "node_modules/axios/lib/helpers/parseHeaders.js"(exports, module) {
    init_node_shims();
    "use strict";
    var utils = require_utils();
    var ignoreDuplicateOf = [
      "age",
      "authorization",
      "content-length",
      "content-type",
      "etag",
      "expires",
      "from",
      "host",
      "if-modified-since",
      "if-unmodified-since",
      "last-modified",
      "location",
      "max-forwards",
      "proxy-authorization",
      "referer",
      "retry-after",
      "user-agent"
    ];
    module.exports = function parseHeaders(headers) {
      var parsed = {};
      var key;
      var val;
      var i;
      if (!headers) {
        return parsed;
      }
      utils.forEach(headers.split("\n"), function parser(line) {
        i = line.indexOf(":");
        key = utils.trim(line.substr(0, i)).toLowerCase();
        val = utils.trim(line.substr(i + 1));
        if (key) {
          if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
            return;
          }
          if (key === "set-cookie") {
            parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
          } else {
            parsed[key] = parsed[key] ? parsed[key] + ", " + val : val;
          }
        }
      });
      return parsed;
    };
  }
});

// node_modules/axios/lib/helpers/isURLSameOrigin.js
var require_isURLSameOrigin = __commonJS({
  "node_modules/axios/lib/helpers/isURLSameOrigin.js"(exports, module) {
    init_node_shims();
    "use strict";
    var utils = require_utils();
    module.exports = utils.isStandardBrowserEnv() ? function standardBrowserEnv() {
      var msie = /(msie|trident)/i.test(navigator.userAgent);
      var urlParsingNode = document.createElement("a");
      var originURL;
      function resolveURL(url) {
        var href = url;
        if (msie) {
          urlParsingNode.setAttribute("href", href);
          href = urlParsingNode.href;
        }
        urlParsingNode.setAttribute("href", href);
        return {
          href: urlParsingNode.href,
          protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, "") : "",
          host: urlParsingNode.host,
          search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, "") : "",
          hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, "") : "",
          hostname: urlParsingNode.hostname,
          port: urlParsingNode.port,
          pathname: urlParsingNode.pathname.charAt(0) === "/" ? urlParsingNode.pathname : "/" + urlParsingNode.pathname
        };
      }
      originURL = resolveURL(window.location.href);
      return function isURLSameOrigin(requestURL) {
        var parsed = utils.isString(requestURL) ? resolveURL(requestURL) : requestURL;
        return parsed.protocol === originURL.protocol && parsed.host === originURL.host;
      };
    }() : function nonStandardBrowserEnv() {
      return function isURLSameOrigin() {
        return true;
      };
    }();
  }
});

// node_modules/axios/lib/cancel/Cancel.js
var require_Cancel = __commonJS({
  "node_modules/axios/lib/cancel/Cancel.js"(exports, module) {
    init_node_shims();
    "use strict";
    function Cancel(message) {
      this.message = message;
    }
    Cancel.prototype.toString = function toString() {
      return "Cancel" + (this.message ? ": " + this.message : "");
    };
    Cancel.prototype.__CANCEL__ = true;
    module.exports = Cancel;
  }
});

// node_modules/axios/lib/adapters/xhr.js
var require_xhr = __commonJS({
  "node_modules/axios/lib/adapters/xhr.js"(exports, module) {
    init_node_shims();
    "use strict";
    var utils = require_utils();
    var settle = require_settle();
    var cookies = require_cookies();
    var buildURL = require_buildURL();
    var buildFullPath = require_buildFullPath();
    var parseHeaders = require_parseHeaders();
    var isURLSameOrigin = require_isURLSameOrigin();
    var createError = require_createError();
    var defaults = require_defaults();
    var Cancel = require_Cancel();
    module.exports = function xhrAdapter(config) {
      return new Promise(function dispatchXhrRequest(resolve, reject) {
        var requestData = config.data;
        var requestHeaders = config.headers;
        var responseType = config.responseType;
        var onCanceled;
        function done() {
          if (config.cancelToken) {
            config.cancelToken.unsubscribe(onCanceled);
          }
          if (config.signal) {
            config.signal.removeEventListener("abort", onCanceled);
          }
        }
        if (utils.isFormData(requestData)) {
          delete requestHeaders["Content-Type"];
        }
        var request = new XMLHttpRequest();
        if (config.auth) {
          var username = config.auth.username || "";
          var password = config.auth.password ? unescape(encodeURIComponent(config.auth.password)) : "";
          requestHeaders.Authorization = "Basic " + btoa(username + ":" + password);
        }
        var fullPath = buildFullPath(config.baseURL, config.url);
        request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true);
        request.timeout = config.timeout;
        function onloadend() {
          if (!request) {
            return;
          }
          var responseHeaders = "getAllResponseHeaders" in request ? parseHeaders(request.getAllResponseHeaders()) : null;
          var responseData = !responseType || responseType === "text" || responseType === "json" ? request.responseText : request.response;
          var response = {
            data: responseData,
            status: request.status,
            statusText: request.statusText,
            headers: responseHeaders,
            config,
            request
          };
          settle(function _resolve(value) {
            resolve(value);
            done();
          }, function _reject(err) {
            reject(err);
            done();
          }, response);
          request = null;
        }
        if ("onloadend" in request) {
          request.onloadend = onloadend;
        } else {
          request.onreadystatechange = function handleLoad() {
            if (!request || request.readyState !== 4) {
              return;
            }
            if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf("file:") === 0)) {
              return;
            }
            setTimeout(onloadend);
          };
        }
        request.onabort = function handleAbort() {
          if (!request) {
            return;
          }
          reject(createError("Request aborted", config, "ECONNABORTED", request));
          request = null;
        };
        request.onerror = function handleError() {
          reject(createError("Network Error", config, null, request));
          request = null;
        };
        request.ontimeout = function handleTimeout() {
          var timeoutErrorMessage = "timeout of " + config.timeout + "ms exceeded";
          var transitional = config.transitional || defaults.transitional;
          if (config.timeoutErrorMessage) {
            timeoutErrorMessage = config.timeoutErrorMessage;
          }
          reject(createError(timeoutErrorMessage, config, transitional.clarifyTimeoutError ? "ETIMEDOUT" : "ECONNABORTED", request));
          request = null;
        };
        if (utils.isStandardBrowserEnv()) {
          var xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName ? cookies.read(config.xsrfCookieName) : void 0;
          if (xsrfValue) {
            requestHeaders[config.xsrfHeaderName] = xsrfValue;
          }
        }
        if ("setRequestHeader" in request) {
          utils.forEach(requestHeaders, function setRequestHeader(val, key) {
            if (typeof requestData === "undefined" && key.toLowerCase() === "content-type") {
              delete requestHeaders[key];
            } else {
              request.setRequestHeader(key, val);
            }
          });
        }
        if (!utils.isUndefined(config.withCredentials)) {
          request.withCredentials = !!config.withCredentials;
        }
        if (responseType && responseType !== "json") {
          request.responseType = config.responseType;
        }
        if (typeof config.onDownloadProgress === "function") {
          request.addEventListener("progress", config.onDownloadProgress);
        }
        if (typeof config.onUploadProgress === "function" && request.upload) {
          request.upload.addEventListener("progress", config.onUploadProgress);
        }
        if (config.cancelToken || config.signal) {
          onCanceled = function(cancel) {
            if (!request) {
              return;
            }
            reject(!cancel || cancel && cancel.type ? new Cancel("canceled") : cancel);
            request.abort();
            request = null;
          };
          config.cancelToken && config.cancelToken.subscribe(onCanceled);
          if (config.signal) {
            config.signal.aborted ? onCanceled() : config.signal.addEventListener("abort", onCanceled);
          }
        }
        if (!requestData) {
          requestData = null;
        }
        request.send(requestData);
      });
    };
  }
});

// node_modules/axios/lib/defaults.js
var require_defaults = __commonJS({
  "node_modules/axios/lib/defaults.js"(exports, module) {
    init_node_shims();
    "use strict";
    var utils = require_utils();
    var normalizeHeaderName = require_normalizeHeaderName();
    var enhanceError = require_enhanceError();
    var DEFAULT_CONTENT_TYPE = {
      "Content-Type": "application/x-www-form-urlencoded"
    };
    function setContentTypeIfUnset(headers, value) {
      if (!utils.isUndefined(headers) && utils.isUndefined(headers["Content-Type"])) {
        headers["Content-Type"] = value;
      }
    }
    function getDefaultAdapter() {
      var adapter;
      if (typeof XMLHttpRequest !== "undefined") {
        adapter = require_xhr();
      } else if (typeof process !== "undefined" && Object.prototype.toString.call(process) === "[object process]") {
        adapter = require_xhr();
      }
      return adapter;
    }
    function stringifySafely(rawValue, parser, encoder) {
      if (utils.isString(rawValue)) {
        try {
          (parser || JSON.parse)(rawValue);
          return utils.trim(rawValue);
        } catch (e) {
          if (e.name !== "SyntaxError") {
            throw e;
          }
        }
      }
      return (encoder || JSON.stringify)(rawValue);
    }
    var defaults = {
      transitional: {
        silentJSONParsing: true,
        forcedJSONParsing: true,
        clarifyTimeoutError: false
      },
      adapter: getDefaultAdapter(),
      transformRequest: [function transformRequest(data, headers) {
        normalizeHeaderName(headers, "Accept");
        normalizeHeaderName(headers, "Content-Type");
        if (utils.isFormData(data) || utils.isArrayBuffer(data) || utils.isBuffer(data) || utils.isStream(data) || utils.isFile(data) || utils.isBlob(data)) {
          return data;
        }
        if (utils.isArrayBufferView(data)) {
          return data.buffer;
        }
        if (utils.isURLSearchParams(data)) {
          setContentTypeIfUnset(headers, "application/x-www-form-urlencoded;charset=utf-8");
          return data.toString();
        }
        if (utils.isObject(data) || headers && headers["Content-Type"] === "application/json") {
          setContentTypeIfUnset(headers, "application/json");
          return stringifySafely(data);
        }
        return data;
      }],
      transformResponse: [function transformResponse(data) {
        var transitional = this.transitional || defaults.transitional;
        var silentJSONParsing = transitional && transitional.silentJSONParsing;
        var forcedJSONParsing = transitional && transitional.forcedJSONParsing;
        var strictJSONParsing = !silentJSONParsing && this.responseType === "json";
        if (strictJSONParsing || forcedJSONParsing && utils.isString(data) && data.length) {
          try {
            return JSON.parse(data);
          } catch (e) {
            if (strictJSONParsing) {
              if (e.name === "SyntaxError") {
                throw enhanceError(e, this, "E_JSON_PARSE");
              }
              throw e;
            }
          }
        }
        return data;
      }],
      timeout: 0,
      xsrfCookieName: "XSRF-TOKEN",
      xsrfHeaderName: "X-XSRF-TOKEN",
      maxContentLength: -1,
      maxBodyLength: -1,
      validateStatus: function validateStatus(status) {
        return status >= 200 && status < 300;
      },
      headers: {
        common: {
          "Accept": "application/json, text/plain, */*"
        }
      }
    };
    utils.forEach(["delete", "get", "head"], function forEachMethodNoData(method) {
      defaults.headers[method] = {};
    });
    utils.forEach(["post", "put", "patch"], function forEachMethodWithData(method) {
      defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
    });
    module.exports = defaults;
  }
});

// node_modules/axios/lib/core/transformData.js
var require_transformData = __commonJS({
  "node_modules/axios/lib/core/transformData.js"(exports, module) {
    init_node_shims();
    "use strict";
    var utils = require_utils();
    var defaults = require_defaults();
    module.exports = function transformData(data, headers, fns) {
      var context = this || defaults;
      utils.forEach(fns, function transform(fn) {
        data = fn.call(context, data, headers);
      });
      return data;
    };
  }
});

// node_modules/axios/lib/cancel/isCancel.js
var require_isCancel = __commonJS({
  "node_modules/axios/lib/cancel/isCancel.js"(exports, module) {
    init_node_shims();
    "use strict";
    module.exports = function isCancel(value) {
      return !!(value && value.__CANCEL__);
    };
  }
});

// node_modules/axios/lib/core/dispatchRequest.js
var require_dispatchRequest = __commonJS({
  "node_modules/axios/lib/core/dispatchRequest.js"(exports, module) {
    init_node_shims();
    "use strict";
    var utils = require_utils();
    var transformData = require_transformData();
    var isCancel = require_isCancel();
    var defaults = require_defaults();
    var Cancel = require_Cancel();
    function throwIfCancellationRequested(config) {
      if (config.cancelToken) {
        config.cancelToken.throwIfRequested();
      }
      if (config.signal && config.signal.aborted) {
        throw new Cancel("canceled");
      }
    }
    module.exports = function dispatchRequest(config) {
      throwIfCancellationRequested(config);
      config.headers = config.headers || {};
      config.data = transformData.call(config, config.data, config.headers, config.transformRequest);
      config.headers = utils.merge(config.headers.common || {}, config.headers[config.method] || {}, config.headers);
      utils.forEach(["delete", "get", "head", "post", "put", "patch", "common"], function cleanHeaderConfig(method) {
        delete config.headers[method];
      });
      var adapter = config.adapter || defaults.adapter;
      return adapter(config).then(function onAdapterResolution(response) {
        throwIfCancellationRequested(config);
        response.data = transformData.call(config, response.data, response.headers, config.transformResponse);
        return response;
      }, function onAdapterRejection(reason) {
        if (!isCancel(reason)) {
          throwIfCancellationRequested(config);
          if (reason && reason.response) {
            reason.response.data = transformData.call(config, reason.response.data, reason.response.headers, config.transformResponse);
          }
        }
        return Promise.reject(reason);
      });
    };
  }
});

// node_modules/axios/lib/core/mergeConfig.js
var require_mergeConfig = __commonJS({
  "node_modules/axios/lib/core/mergeConfig.js"(exports, module) {
    init_node_shims();
    "use strict";
    var utils = require_utils();
    module.exports = function mergeConfig(config1, config2) {
      config2 = config2 || {};
      var config = {};
      function getMergedValue(target, source) {
        if (utils.isPlainObject(target) && utils.isPlainObject(source)) {
          return utils.merge(target, source);
        } else if (utils.isPlainObject(source)) {
          return utils.merge({}, source);
        } else if (utils.isArray(source)) {
          return source.slice();
        }
        return source;
      }
      function mergeDeepProperties(prop) {
        if (!utils.isUndefined(config2[prop])) {
          return getMergedValue(config1[prop], config2[prop]);
        } else if (!utils.isUndefined(config1[prop])) {
          return getMergedValue(void 0, config1[prop]);
        }
      }
      function valueFromConfig2(prop) {
        if (!utils.isUndefined(config2[prop])) {
          return getMergedValue(void 0, config2[prop]);
        }
      }
      function defaultToConfig2(prop) {
        if (!utils.isUndefined(config2[prop])) {
          return getMergedValue(void 0, config2[prop]);
        } else if (!utils.isUndefined(config1[prop])) {
          return getMergedValue(void 0, config1[prop]);
        }
      }
      function mergeDirectKeys(prop) {
        if (prop in config2) {
          return getMergedValue(config1[prop], config2[prop]);
        } else if (prop in config1) {
          return getMergedValue(void 0, config1[prop]);
        }
      }
      var mergeMap = {
        "url": valueFromConfig2,
        "method": valueFromConfig2,
        "data": valueFromConfig2,
        "baseURL": defaultToConfig2,
        "transformRequest": defaultToConfig2,
        "transformResponse": defaultToConfig2,
        "paramsSerializer": defaultToConfig2,
        "timeout": defaultToConfig2,
        "timeoutMessage": defaultToConfig2,
        "withCredentials": defaultToConfig2,
        "adapter": defaultToConfig2,
        "responseType": defaultToConfig2,
        "xsrfCookieName": defaultToConfig2,
        "xsrfHeaderName": defaultToConfig2,
        "onUploadProgress": defaultToConfig2,
        "onDownloadProgress": defaultToConfig2,
        "decompress": defaultToConfig2,
        "maxContentLength": defaultToConfig2,
        "maxBodyLength": defaultToConfig2,
        "transport": defaultToConfig2,
        "httpAgent": defaultToConfig2,
        "httpsAgent": defaultToConfig2,
        "cancelToken": defaultToConfig2,
        "socketPath": defaultToConfig2,
        "responseEncoding": defaultToConfig2,
        "validateStatus": mergeDirectKeys
      };
      utils.forEach(Object.keys(config1).concat(Object.keys(config2)), function computeConfigValue(prop) {
        var merge = mergeMap[prop] || mergeDeepProperties;
        var configValue = merge(prop);
        utils.isUndefined(configValue) && merge !== mergeDirectKeys || (config[prop] = configValue);
      });
      return config;
    };
  }
});

// node_modules/axios/lib/env/data.js
var require_data = __commonJS({
  "node_modules/axios/lib/env/data.js"(exports, module) {
    init_node_shims();
    module.exports = {
      "version": "0.22.0"
    };
  }
});

// node_modules/axios/lib/helpers/validator.js
var require_validator = __commonJS({
  "node_modules/axios/lib/helpers/validator.js"(exports, module) {
    init_node_shims();
    "use strict";
    var VERSION = require_data().version;
    var validators = {};
    ["object", "boolean", "number", "function", "string", "symbol"].forEach(function(type, i) {
      validators[type] = function validator(thing) {
        return typeof thing === type || "a" + (i < 1 ? "n " : " ") + type;
      };
    });
    var deprecatedWarnings = {};
    validators.transitional = function transitional(validator, version, message) {
      function formatMessage(opt, desc) {
        return "[Axios v" + VERSION + "] Transitional option '" + opt + "'" + desc + (message ? ". " + message : "");
      }
      return function(value, opt, opts) {
        if (validator === false) {
          throw new Error(formatMessage(opt, " has been removed" + (version ? " in " + version : "")));
        }
        if (version && !deprecatedWarnings[opt]) {
          deprecatedWarnings[opt] = true;
          console.warn(formatMessage(opt, " has been deprecated since v" + version + " and will be removed in the near future"));
        }
        return validator ? validator(value, opt, opts) : true;
      };
    };
    function assertOptions(options, schema, allowUnknown) {
      if (typeof options !== "object") {
        throw new TypeError("options must be an object");
      }
      var keys = Object.keys(options);
      var i = keys.length;
      while (i-- > 0) {
        var opt = keys[i];
        var validator = schema[opt];
        if (validator) {
          var value = options[opt];
          var result = value === void 0 || validator(value, opt, options);
          if (result !== true) {
            throw new TypeError("option " + opt + " must be " + result);
          }
          continue;
        }
        if (allowUnknown !== true) {
          throw Error("Unknown option " + opt);
        }
      }
    }
    module.exports = {
      assertOptions,
      validators
    };
  }
});

// node_modules/axios/lib/core/Axios.js
var require_Axios = __commonJS({
  "node_modules/axios/lib/core/Axios.js"(exports, module) {
    init_node_shims();
    "use strict";
    var utils = require_utils();
    var buildURL = require_buildURL();
    var InterceptorManager = require_InterceptorManager();
    var dispatchRequest = require_dispatchRequest();
    var mergeConfig = require_mergeConfig();
    var validator = require_validator();
    var validators = validator.validators;
    function Axios(instanceConfig) {
      this.defaults = instanceConfig;
      this.interceptors = {
        request: new InterceptorManager(),
        response: new InterceptorManager()
      };
    }
    Axios.prototype.request = function request(config) {
      if (typeof config === "string") {
        config = arguments[1] || {};
        config.url = arguments[0];
      } else {
        config = config || {};
      }
      config = mergeConfig(this.defaults, config);
      if (config.method) {
        config.method = config.method.toLowerCase();
      } else if (this.defaults.method) {
        config.method = this.defaults.method.toLowerCase();
      } else {
        config.method = "get";
      }
      var transitional = config.transitional;
      if (transitional !== void 0) {
        validator.assertOptions(transitional, {
          silentJSONParsing: validators.transitional(validators.boolean),
          forcedJSONParsing: validators.transitional(validators.boolean),
          clarifyTimeoutError: validators.transitional(validators.boolean)
        }, false);
      }
      var requestInterceptorChain = [];
      var synchronousRequestInterceptors = true;
      this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
        if (typeof interceptor.runWhen === "function" && interceptor.runWhen(config) === false) {
          return;
        }
        synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;
        requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
      });
      var responseInterceptorChain = [];
      this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
        responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
      });
      var promise;
      if (!synchronousRequestInterceptors) {
        var chain = [dispatchRequest, void 0];
        Array.prototype.unshift.apply(chain, requestInterceptorChain);
        chain = chain.concat(responseInterceptorChain);
        promise = Promise.resolve(config);
        while (chain.length) {
          promise = promise.then(chain.shift(), chain.shift());
        }
        return promise;
      }
      var newConfig = config;
      while (requestInterceptorChain.length) {
        var onFulfilled = requestInterceptorChain.shift();
        var onRejected = requestInterceptorChain.shift();
        try {
          newConfig = onFulfilled(newConfig);
        } catch (error) {
          onRejected(error);
          break;
        }
      }
      try {
        promise = dispatchRequest(newConfig);
      } catch (error) {
        return Promise.reject(error);
      }
      while (responseInterceptorChain.length) {
        promise = promise.then(responseInterceptorChain.shift(), responseInterceptorChain.shift());
      }
      return promise;
    };
    Axios.prototype.getUri = function getUri(config) {
      config = mergeConfig(this.defaults, config);
      return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\?/, "");
    };
    utils.forEach(["delete", "get", "head", "options"], function forEachMethodNoData(method) {
      Axios.prototype[method] = function(url, config) {
        return this.request(mergeConfig(config || {}, {
          method,
          url,
          data: (config || {}).data
        }));
      };
    });
    utils.forEach(["post", "put", "patch"], function forEachMethodWithData(method) {
      Axios.prototype[method] = function(url, data, config) {
        return this.request(mergeConfig(config || {}, {
          method,
          url,
          data
        }));
      };
    });
    module.exports = Axios;
  }
});

// node_modules/axios/lib/cancel/CancelToken.js
var require_CancelToken = __commonJS({
  "node_modules/axios/lib/cancel/CancelToken.js"(exports, module) {
    init_node_shims();
    "use strict";
    var Cancel = require_Cancel();
    function CancelToken(executor) {
      if (typeof executor !== "function") {
        throw new TypeError("executor must be a function.");
      }
      var resolvePromise;
      this.promise = new Promise(function promiseExecutor(resolve) {
        resolvePromise = resolve;
      });
      var token = this;
      this.promise.then(function(cancel) {
        if (!token._listeners)
          return;
        var i;
        var l = token._listeners.length;
        for (i = 0; i < l; i++) {
          token._listeners[i](cancel);
        }
        token._listeners = null;
      });
      this.promise.then = function(onfulfilled) {
        var _resolve;
        var promise = new Promise(function(resolve) {
          token.subscribe(resolve);
          _resolve = resolve;
        }).then(onfulfilled);
        promise.cancel = function reject() {
          token.unsubscribe(_resolve);
        };
        return promise;
      };
      executor(function cancel(message) {
        if (token.reason) {
          return;
        }
        token.reason = new Cancel(message);
        resolvePromise(token.reason);
      });
    }
    CancelToken.prototype.throwIfRequested = function throwIfRequested() {
      if (this.reason) {
        throw this.reason;
      }
    };
    CancelToken.prototype.subscribe = function subscribe(listener) {
      if (this.reason) {
        listener(this.reason);
        return;
      }
      if (this._listeners) {
        this._listeners.push(listener);
      } else {
        this._listeners = [listener];
      }
    };
    CancelToken.prototype.unsubscribe = function unsubscribe(listener) {
      if (!this._listeners) {
        return;
      }
      var index = this._listeners.indexOf(listener);
      if (index !== -1) {
        this._listeners.splice(index, 1);
      }
    };
    CancelToken.source = function source() {
      var cancel;
      var token = new CancelToken(function executor(c) {
        cancel = c;
      });
      return {
        token,
        cancel
      };
    };
    module.exports = CancelToken;
  }
});

// node_modules/axios/lib/helpers/spread.js
var require_spread = __commonJS({
  "node_modules/axios/lib/helpers/spread.js"(exports, module) {
    init_node_shims();
    "use strict";
    module.exports = function spread(callback) {
      return function wrap(arr) {
        return callback.apply(null, arr);
      };
    };
  }
});

// node_modules/axios/lib/helpers/isAxiosError.js
var require_isAxiosError = __commonJS({
  "node_modules/axios/lib/helpers/isAxiosError.js"(exports, module) {
    init_node_shims();
    "use strict";
    module.exports = function isAxiosError(payload) {
      return typeof payload === "object" && payload.isAxiosError === true;
    };
  }
});

// node_modules/axios/lib/axios.js
var require_axios = __commonJS({
  "node_modules/axios/lib/axios.js"(exports, module) {
    init_node_shims();
    "use strict";
    var utils = require_utils();
    var bind = require_bind();
    var Axios = require_Axios();
    var mergeConfig = require_mergeConfig();
    var defaults = require_defaults();
    function createInstance(defaultConfig) {
      var context = new Axios(defaultConfig);
      var instance = bind(Axios.prototype.request, context);
      utils.extend(instance, Axios.prototype, context);
      utils.extend(instance, context);
      instance.create = function create(instanceConfig) {
        return createInstance(mergeConfig(defaultConfig, instanceConfig));
      };
      return instance;
    }
    var axios2 = createInstance(defaults);
    axios2.Axios = Axios;
    axios2.Cancel = require_Cancel();
    axios2.CancelToken = require_CancelToken();
    axios2.isCancel = require_isCancel();
    axios2.VERSION = require_data().version;
    axios2.all = function all(promises) {
      return Promise.all(promises);
    };
    axios2.spread = require_spread();
    axios2.isAxiosError = require_isAxiosError();
    module.exports = axios2;
    module.exports.default = axios2;
  }
});

// node_modules/axios/index.js
var require_axios2 = __commonJS({
  "node_modules/axios/index.js"(exports, module) {
    init_node_shims();
    module.exports = require_axios();
  }
});

// src/index.ts
init_node_shims();

// src/lib/RumpusCE.ts
init_node_shims();
var import_axios = __toModule(require_axios2());

// src/lib/api/index.ts
init_node_shims();

// src/lib/api/levelhead/aliases.ts
init_node_shims();

// src/lib/utility.ts
init_node_shims();
function csv(items) {
  if (typeof items == "string") {
    return items;
  }
  return items.join(",");
}
function avatarUrl(avatarId, pixels, imgType = "png") {
  const width = Math.max(Math.min(pixels || 128, 512), 16);
  return `https://img.bscotch.net/fit-in/${width}x${width}/avatars/${avatarId}.${imgType}`;
}
function attachAvatarUrlToItem(item) {
  item.avatarUrl = (pixels, imgType = "png") => avatarUrl(item.avatarId, pixels, imgType);
  return item;
}
function attachAvatarUrlToArrayItems(items) {
  for (const item of items) {
    attachAvatarUrlToItem(item);
  }
  return items;
}
function cleanQuery(query) {
  const cleanQuery2 = {};
  if (!query) {
    return cleanQuery2;
  }
  for (const field of Object.keys(query)) {
    if (typeof query[field] != "undefined" && query[field] !== null && (!Array.isArray(query[field]) || query[field].length)) {
      cleanQuery2[field] = Array.isArray(query[field]) ? query[field].join(",") : query[field];
    }
  }
  return cleanQuery2;
}
function capitalize(string) {
  if (!string || typeof string != "string") {
    return "";
  }
  return `${string[0].toLocaleUpperCase()}${string.slice(1)}`;
}

// src/lib/api/classes/Alias.ts
init_node_shims();

// src/lib/api/classes/Base.ts
init_node_shims();
var Base = class {
  constructor(client, data) {
    this.client = client;
    this.data = data;
  }
  get _id() {
    return this.data._id;
  }
  toJSON() {
    return __spreadValues({}, this.data);
  }
};

// src/lib/api/classes/Alias.ts
var Alias = class extends Base {
  get userId() {
    return this.data.userId;
  }
  get alias() {
    return this.data.alias;
  }
  get name() {
    return this.alias;
  }
  get context() {
    return this.data.context;
  }
  get avatarId() {
    return this.data.avatarId;
  }
  createAvatarUrl(pixels) {
    return avatarUrl(this.avatarId, pixels);
  }
};

// src/lib/api/levelhead/aliases.ts
async function getLevelheadAliases(userIds, query, options) {
  const res = await this.get(`/api/levelhead/aliases`, __spreadProps(__spreadValues({}, options), {
    query: cleanQuery(__spreadProps(__spreadValues({}, query), { userIds: csv(userIds) }))
  }));
  if (res.status == 200) {
    const aliases = res.data.map((alias) => new Alias(this, alias));
    return aliases;
  } else {
    throw new Error(`Alias search failed with status ${res.status}`);
  }
}

// src/lib/api/levelhead/levels.ts
init_node_shims();

// src/lib/api/levelhead/bookmarks.ts
init_node_shims();
async function getLevelheadBookmarks(query, options) {
  const queryParams = __spreadValues({}, query);
  queryParams.sort = queryParams.sort || "createdAt";
  const res = await this.get(`/api/levelhead/bookmarks`, __spreadProps(__spreadValues({}, options), {
    query: cleanQuery(query)
  }));
  if (res.status == 200) {
    return res.data;
  }
  throw new Error(`Bookmark search failed with status ${res.status}`);
}
async function bookmarkLevelheadLevel(levelId, options) {
  const res = await this.put(`/api/levelhead/bookmarks/${levelId}`, options);
  if (res.status != 204) {
    console.log(res);
    throw new Error(res.status == 404 ? "Level does not exist!" : "Unable to bookmark level");
  }
  return true;
}
async function unbookmarkLevelheadLevel(levelId, options) {
  const res = await this.delete(`/api/levelhead/bookmarks/${levelId}`, options);
  if (res.status != 204) {
    console.log(res);
    throw new Error("Unable to unbookmark level");
  }
  return true;
}

// src/lib/api/paging.ts
init_node_shims();
async function blankResultsPage() {
  const results = [];
  results.nextPage = blankResultsPage;
  return results;
}
function addNextPageSearchFunction(client, page, nextLink, query, options, search) {
  var _a;
  page.nextPage = blankResultsPage;
  const hasNextPage = page.length && (nextLink || !(query == null ? void 0 : query.limit) || query.limit == page.length);
  if (hasNextPage) {
    const queryParams = __spreadValues({}, query);
    const sortParam = queryParams.sort || "";
    const lastLevel = page[page.length - 1];
    const sortField = sortParam.replace(/^-/, "");
    let skipFilter = sortParam[0] == "-" ? "min" : "max";
    skipFilter += capitalize(sortField);
    queryParams[skipFilter] = lastLevel[sortField] || ((_a = lastLevel.stats) == null ? void 0 : _a[sortField]);
    if (typeof queryParams[skipFilter] != "undefined") {
      queryParams.tiebreakerItemId = lastLevel._id;
      page.nextPage = () => search.call(client, queryParams, options);
    }
  }
  return page;
}

// src/lib/api/levelhead/levels.ts
async function getLevelheadLevelTags(options) {
  const res = await this.get(`/api/levelhead/level-tags/counts`, __spreadValues({}, options));
  if (res.status == 200) {
    const tags = res.data;
    return tags;
  } else {
    throw new Error(`Level tags request failed with status ${res.status}`);
  }
}
async function getLevelheadLevelUserList(listType, levelId, query, options) {
  const res = await this.get(`/api/levelhead/levels/${levelId}/${listType}`, __spreadProps(__spreadValues({}, options), {
    query: cleanQuery(query)
  }));
  if (res.status == 200) {
    const users = res.data;
    const lastId = users.length && (!(query == null ? void 0 : query.limit) || query.limit == users.length) ? users[users.length - 1]._id : false;
    users.nextPage = () => {
      if (lastId) {
        const newQuery = __spreadProps(__spreadValues({}, query), { beforeId: lastId });
        return getLevelheadLevelUserList.bind(this)(listType, levelId, newQuery, options);
      }
      return blankResultsPage();
    };
    return users;
  } else {
    throw new Error(`Level ${listType} failed with status ${res.status}`);
  }
}
async function getLevelheadLevelLikes(levelId, query, options) {
  return getLevelheadLevelUserList.call(this, "likes", levelId, query, options);
}
async function getLevelheadLevelFavorites(levelId, query, options) {
  return getLevelheadLevelUserList.call(this, "favorites", levelId, query, options);
}
function addLevelFunctionality(client, level) {
  const fancyLevel = level;
  fancyLevel.getLikes = (query, options) => getLevelheadLevelLikes.call(client, level.levelId, query, options);
  fancyLevel.getFavorites = (query, options) => getLevelheadLevelFavorites.call(client, level.levelId, query, options);
  fancyLevel.bookmark = (options) => bookmarkLevelheadLevel.call(client, level.levelId, options);
  fancyLevel.unbookmark = (options) => unbookmarkLevelheadLevel.call(client, level.levelId, options);
  return fancyLevel;
}
async function getLevelheadLevels(query, options) {
  const queryParams = __spreadValues({}, query);
  queryParams.sort = queryParams.sort || "createdAt";
  const res = await this.get(`/api/levelhead/levels`, __spreadProps(__spreadValues({}, options), {
    query: cleanQuery(queryParams)
  }));
  if (res.status == 200) {
    const levels = res.data.map((level) => addLevelFunctionality(this, level));
    attachAvatarUrlToArrayItems(levels);
    addNextPageSearchFunction(this, levels, res.next, queryParams, options, getLevelheadLevels);
    return levels;
  } else {
    throw new Error(`Level search failed with status ${res.status}`);
  }
}

// src/lib/api/levelhead/players.ts
init_node_shims();

// src/lib/api/classes/LevelheadPlayer.ts
init_node_shims();
var LevelheadPlayer = class extends Base {
  constructor(client, data) {
    super(client, data);
    if (data.alias) {
      this._alias = Promise.resolve(new Alias(client, data.alias));
    }
  }
  get userId() {
    return this.data.userId;
  }
  get createdAt() {
    return new Date(this.data.createdAt);
  }
  get updatedAt() {
    return new Date(this.data.updatedAt);
  }
  get stats() {
    return __spreadValues({}, this.data.stats);
  }
  get alias() {
    if (this._alias) {
      return this._alias;
    }
    this._alias = this.client.levelhead.aliases.search(this.userId).then((aliases) => aliases[0]);
    return this._alias;
  }
  get avatarId() {
    return this.alias.then((alias) => alias.avatarId);
  }
  async createAvatarUrl(size) {
    return (await this.alias).createAvatarUrl(size);
  }
  async getLevels(query, options) {
    return await getLevelheadLevels.call(this, query, options);
  }
  async getLikedLevels(query, options) {
    return await getLevelheadLikedLevels.call(this.client, this.userId, query, options);
  }
  async getFavoritedLevels(query, options) {
    return await getLevelheadFavoritedLevels.call(this.client, this.userId, query, options);
  }
  async getFollowers(query, options) {
    return await getLevelheadPlayerFollowers.call(this.client, this.userId, query, options);
  }
  async getFollowing(query, options) {
    return await getLevelheadPlayerFollowing.call(this.client, this.userId, query, options);
  }
  async follow(options) {
    return await followLevelheadPlayer.call(this.client, this.userId, options);
  }
  async unfollow(options) {
    return await unfollowLevelheadPlayer.call(this.client, this.userId, options);
  }
};

// src/lib/api/levelhead/players.ts
async function getLevelheadPlayerLevelList(listType, userId, query, options) {
  const res = await this.get(`/api/levelhead/players/${userId}/${listType}`, __spreadProps(__spreadValues({}, options), {
    query: cleanQuery(query)
  }));
  if (res.status == 200) {
    const levels = res.data;
    const lastId = levels.length && (!(query == null ? void 0 : query.limit) || query.limit == levels.length) ? levels[levels.length - 1]._id : false;
    levels.nextPage = () => {
      if (lastId) {
        const newQuery = __spreadProps(__spreadValues({}, query), { beforeId: lastId });
        return getLevelheadPlayerLevelList.bind(this)(listType, userId, newQuery, options);
      }
      return blankResultsPage();
    };
    return levels;
  } else {
    throw new Error(`Level ${listType} failed with status ${res.status}`);
  }
}
async function getLevelheadLikedLevels(userId = "@me", query, options) {
  return getLevelheadPlayerLevelList.call(this, "likes", userId, query, options);
}
async function getLevelheadFavoritedLevels(userId = "@me", query, options) {
  return getLevelheadPlayerLevelList.call(this, "favorites", userId, query, options);
}
async function getLevelheadPlayerFollows(listType, userId, query, options) {
  const res = await this.get(`/api/levelhead/players/${userId}/${listType}`, __spreadProps(__spreadValues({}, options), {
    query: cleanQuery(query)
  }));
  if (res.status == 200) {
    const players = res.data;
    const lastId = players.length && (!(query == null ? void 0 : query.limit) || query.limit == players.length) ? players[players.length - 1]._id : false;
    players.nextPage = () => {
      if (lastId) {
        const newQuery = __spreadProps(__spreadValues({}, query), { beforeId: lastId });
        return getLevelheadPlayerFollows.bind(this)(listType, userId, newQuery, options);
      }
      return blankResultsPage();
    };
    return players;
  } else {
    throw new Error(`Player ${listType} search failed with status ${res.status}`);
  }
}
async function getLevelheadPlayerFollowers(userId = "@me", query, options) {
  return getLevelheadPlayerFollows.call(this, "followers", userId, query, options);
}
async function getLevelheadPlayerFollowing(userId = "@me", query, options) {
  return getLevelheadPlayerFollows.call(this, "following", userId, query, options);
}
async function followLevelheadPlayer(userId, options) {
  const res = await this.put(`/api/levelhead/following/${userId}`, options);
  if (res.status != 204) {
    throw new Error(res.status == 404 ? "Player does not exist!" : "Unable to follow player");
  }
  return true;
}
async function unfollowLevelheadPlayer(userId, options) {
  const res = await this.delete(`/api/levelhead/following/${userId}`, options);
  if (res.status != 204) {
    throw new Error("Unable to unfollow player");
  }
  return true;
}
async function getLevelheadPlayers(query, options) {
  const queryParams = __spreadValues({}, query);
  queryParams.sort = queryParams.sort || "createdAt";
  const res = await this.get(`/api/levelhead/players`, __spreadProps(__spreadValues({}, options), {
    query: cleanQuery(queryParams)
  }));
  if (res.status == 200) {
    const players = res.data.map((player) => new LevelheadPlayer(this, player));
    addNextPageSearchFunction(this, players, res.next, queryParams, options, getLevelheadPlayers);
    return players;
  } else {
    throw new Error(`Player search failed with status ${res.status}`);
  }
}
async function getLevelheadPlayer(userId = "@me", options) {
  const players = await getLevelheadPlayers.call(this, { userIds: userId, limit: 1 }, options);
  if (!players.length) {
    throw new Error("That player does not exist");
  }
  return players[0];
}

// src/lib/api/index.ts
function createLevelheadAPI(client) {
  const api = {
    aliases: {
      search: getLevelheadAliases.bind(client)
    },
    bookmarks: {
      search: getLevelheadBookmarks.bind(client),
      add: bookmarkLevelheadLevel.bind(client),
      remove: unbookmarkLevelheadLevel.bind(client)
    },
    levels: {
      search: getLevelheadLevels.bind(client),
      getTags: getLevelheadLevelTags.bind(client),
      getLikes: getLevelheadLevelLikes.bind(client),
      getFavorites: getLevelheadLevelFavorites.bind(client)
    },
    players: {
      search: getLevelheadPlayers.bind(client),
      getPlayer: getLevelheadPlayer.bind(client),
      getLikedLevels: getLevelheadLikedLevels.bind(client),
      getFavoritedLevels: getLevelheadFavoritedLevels.bind(client),
      getFollowers: getLevelheadPlayerFollowers.bind(client),
      getFollowing: getLevelheadPlayerFollowing.bind(client),
      follow: followLevelheadPlayer.bind(client),
      unfollow: unfollowLevelheadPlayer.bind(client)
    }
  };
  return api;
}

// src/lib/RumpusCE.ts
var RumpusCE = class {
  constructor(defaultDelegationKey = process.env.RUMPUS_DELEGATION_KEY, server = "beta", auth) {
    this.defaultDelegationKey = defaultDelegationKey;
    this._server = server;
    this._baseUrl = server == "local" ? "http://localhost:8080" : `https://${this._server}.bscotch.net`;
    this._request = import_axios.default.create({ baseURL: this._baseUrl, auth });
    this._levelheadAPI = createLevelheadAPI(this);
  }
  get server() {
    return this._server;
  }
  get baseUrl() {
    return this._baseUrl;
  }
  get levelhead() {
    return this._levelheadAPI;
  }
  async version() {
    const res = await this.get("/api/version", {
      doNotUseKey: true
    });
    return {
      server: this._server,
      rumpus: res.data,
      terms: res.headers["version-terms"],
      "terms-rce": res.headers["version-terms-rce"],
      privacy: res.headers["version-privacy"]
    };
  }
  async delegationKeyPermissions(delegationKey) {
    const res = await this.get("/api/delegation/keys/@this", {
      delegationKey
    });
    if (res.status == 200) {
      return {
        userId: res.data.userId,
        passId: res.data._id,
        permissions: res.data.permissions
      };
    } else if ([400, 403].includes(res.status)) {
      throw new Error("Malformed or missing delegation key.");
    } else if (res.status == 401) {
      throw new Error("Expired delegation key.");
    } else {
      throw new Error("Unexpected server response.");
    }
  }
  get(url, options) {
    return this.request("get", url, options);
  }
  post(url, options) {
    return this.request("post", url, options);
  }
  put(url, options) {
    return this.request("put", url, options);
  }
  patch(url, options) {
    return this.request("patch", url, options);
  }
  delete(url, options) {
    return this.request("delete", url, options);
  }
  async request(method, url, options) {
    const headers = {};
    const key = (options == null ? void 0 : options.delegationKey) || this.defaultDelegationKey;
    if (!(options == null ? void 0 : options.doNotUseKey) && key) {
      headers["Rumpus-Delegation-Key"] = key;
    }
    const reqOpts = {
      method,
      url,
      headers,
      responseType: "json"
    };
    reqOpts.data = options == null ? void 0 : options.body;
    reqOpts.params = options == null ? void 0 : options.query;
    let res;
    try {
      res = await this._request(reqOpts);
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      res = err.response;
    }
    return __spreadProps(__spreadValues({}, res.data), {
      headers: res.headers,
      status: res.status,
      requestId: res.headers["x-request-id"],
      remainingRequests: +res.headers["x-rate-limit-remaining"]
    });
  }
  createLogoUrl(size) {
    size = Math.round(Math.min(Math.max(size, 16), 256));
    return `https://img.bscotch.net/fit-in/${size}x${size}/logos/rumpus-ce.png`;
  }
};

// src/types/aliases.ts
init_node_shims();

// src/types/bookmarks.ts
init_node_shims();

// src/types/levels.ts
init_node_shims();

// src/types/players.ts
init_node_shims();

// src/types/auth.ts
init_node_shims();

// src/index.ts
var RumpusCE2 = RumpusCE;
var src_default = RumpusCE2;
if (window) {
  window.RumpusCE = RumpusCE2;
}
export {
  RumpusCE2 as RumpusCE,
  src_default as default
};
//# sourceMappingURL=index.js.map
