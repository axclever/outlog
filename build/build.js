(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var getTimeStamp = exports.getTimeStamp = function getTimeStamp(date) {
    return now.getMonth() + 1 + '/' + now.getDate() + '/' + now.getFullYear() + " " + now.getHours() + ':' + (now.getMinutes() < 10 ? "0" + now.getMinutes() : now.getMinutes()) + ':' + (now.getSeconds() < 10 ? "0" + now.getSeconds() : now.getSeconds());
};

var symbols = {
    success: '✔︎ ',
    error: '✘ ',
    warn: '⚑ ',
    arrow: '➤ '
};

var rawRender = exports.rawRender = function rawRender(log) {
    console.log(log);
};

var isBrowser = function isBrowser() {
    return !!global.Navigator;
};

var renderInBrowser = function renderInBrowser(log) {
    if (log.type == "info") {
        console.log('%c [' + log.moduleName + "] " + '%c ' + log.message + ' ', 'background: #24292e; color: #FFF', ' color: #fff; background: #8a939a');

        if (log.details) {
            // console.log('%c Details: ', 'background: #e5e5e5; color: #666');
            var detailsString = '%c';

            Object.keys(log.details).forEach(function (key) {
                detailsString += symbols.arrow + key + ": " + log.details[key] + " \n";
            });

            console.log(detailsString + '\n\n', ' color: #8a939a');
        }
    }

    if (log.type == "error") {
        console.log('%c [' + log.moduleName + "] " + ' %c ' + symbols.error + log.message + ' ', 'background: #24292e; color: #FFF', 'background: #b90000; color: #fff');

        if (log.details) {
            var _detailsString = '%c';
            Object.keys(log.details).forEach(function (key) {
                _detailsString += symbols.arrow + key + ": " + log.details[key] + " \n";
            });
            console.log(_detailsString + '\n\n', ' color: #b90000');
        }
    }

    if (log.type == "warning") {
        console.log('%c [' + log.moduleName + "] " + ' %c ' + symbols.warn + log.message + ' ', 'background: #24292e; color: #FFF', 'background: #bf7121; color: #fff;');

        if (log.details) {
            var _detailsString2 = '%c';
            Object.keys(log.details).forEach(function (key) {
                _detailsString2 += symbols.arrow + key + ": " + log.details[key] + " \n";
            });
            console.log(_detailsString2 + '\n\n', ' color: #bf7121');
        }
    }

    if (log.type == "success") {
        console.log('%c [' + log.moduleName + "] " + ' %c ' + symbols.success + log.message + ' ', 'background: #24292e; color: #FFF', 'background: #1a9635; color: #fff;');

        if (log.details) {
            var _detailsString3 = '%c';
            Object.keys(log.details).forEach(function (key) {
                _detailsString3 += symbols.arrow + key + ": " + log.details[key] + " \n";
            });
            console.log(_detailsString3 + '\n\n', ' color: #1a9635');
        }
    }
};

var renderInConsole = function renderInConsole(log) {
    console.log(log.type.toUpperCase() + ":" + "[ " + log.moduleName + " ] " + log.message);
};

var render = exports.render = function render(log) {
    if (isBrowser()) {
        renderInBrowser(log);
    } else {
        renderInConsole(log);
    }
};
var renderWithTime = exports.renderWithTime = function renderWithTime(log) {};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var send = exports.send = function send(serverUrl, data) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (this.readyState != 4) return;

        if (this.status != 200) {
            console.log("OutLog: connection error");
        }
    };

    var jsonData = JSON.stringify({
        moduleName: data.moduleName,
        type: data.type,
        message: data.message,
        details: data.details,
        meta: {
            domain: document.location.origin,
            url: document.location.href
        }
    });

    xhr.open("POST", serverUrl, true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(jsonData);
};

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _format = require('../helpers/format');

var _request = require('../helpers/request');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var checkLogDetails = function checkLogDetails(data) {
    if (!data) return true;

    Object.keys(data).forEach(function (key) {
        if (data[key] instanceof Function) {
            throw new Error("Outlog: You can't pass multidimensional data to logger or functions");
        }

        if (data[key] instanceof Object) {

            Object.keys(data[key]).forEach(function (k2) {
                if (data[key][k2] instanceof Object) {
                    throw new Error("Outlog: You can't pass multidimensional data to logger");
                }

                if (data[key][k2] instanceof Array) {
                    throw new Error("Outlog: You can't pass multidimensional data to logger");
                }
            });
        }
    });
};

var History = function () {
    function History() {
        _classCallCheck(this, History);

        this.state = {
            localStorage: false,
            timeStamp: false,
            serverUrl: false,
            sync: true
        };

        this.messages = [];
    }

    _createClass(History, [{
        key: 'config',
        value: function config(options) {
            this.state = _extends(this.state, options);
        }
    }, {
        key: 'write',
        value: function write(module, type, message, details, options) {
            checkLogDetails(details);

            var logData = {
                moduleName: module,
                type: type,
                message: message,
                details: details
            };

            this.messages.push(logData);

            if (options.sync == false) {
                return false;
            }

            var serverUrl = this.state.serverUrl;

            if (serverUrl && this.state.sync) {
                (0, _request.send)(serverUrl, logData);
            }
        }
    }, {
        key: 'getTrace',
        value: function getTrace() {
            if (this.state.localStorage) {
                console.log("read all from local storage [ not implemented ]");
                // return localstorage trace
            } else {
                return this.messages;
            }
        }
    }]);

    return History;
}();

exports.default = new History();

},{"../helpers/format":1,"../helpers/request":2}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _history = require('./history');

var _history2 = _interopRequireDefault(_history);

var _format = require('../helpers/format');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Module = function () {
    function Module(name, opts) {
        _classCallCheck(this, Module);

        this.options = opts;
        this.name = name;
    }

    _createClass(Module, [{
        key: 'info',
        value: function info(message, details) {
            _history2.default.write(this.name, "info", message, details, this.options);

            if (this.options.debug) {
                (0, _format.render)({
                    moduleName: this.name,
                    message: message,
                    details: details,
                    type: "info"
                });
            }
        }
    }, {
        key: 'warning',
        value: function warning(message, details) {
            _history2.default.write(this.name, "warning", message, details, this.options);

            if (this.options.debug) {
                (0, _format.render)({
                    moduleName: this.name,
                    message: message,
                    details: details,
                    type: "warning"
                });
            }
        }
    }, {
        key: 'success',
        value: function success(message, details) {
            _history2.default.write(this.name, "success", message, details, this.options);

            if (this.options.debug) {
                (0, _format.render)({
                    moduleName: this.name,
                    message: message,
                    details: details,
                    type: "success"
                });
            }
        }
    }, {
        key: 'error',
        value: function error(message, details) {
            _history2.default.write(this.name, "error", message, details, this.options);

            if (this.options.debug) {
                (0, _format.render)({
                    moduleName: this.name,
                    message: message,
                    details: details,
                    type: "error"
                });
            }
        }
    }, {
        key: 'trace',
        value: function trace(args) {
            var allHistory = _history2.default.getTrace();

            allHistory.forEach(function (log) {
                (0, _format.render)(log);
            });
        }
    }]);

    return Module;
}();

exports.default = Module;

},{"../helpers/format":1,"./history":3}],5:[function(require,module,exports){
(function (global){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @author Alex Clever <axclever@gmail.com>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *  Outlog Library
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * */

var _module2 = require('./lib/module');

var _module3 = _interopRequireDefault(_module2);

var _history = require('./lib/history');

var _history2 = _interopRequireDefault(_history);

var _format = require('./helpers/format');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Modules = {};

var Outlog = function () {
    function Outlog() {
        _classCallCheck(this, Outlog);

        this.options = {
            debug: false,
            colors: true,
            serverUrl: false,
            sync: true,
            memory: false
        };

        this.trace = {
            all: function all(args) {
                var allHistory = _history2.default.getTrace();

                allHistory.forEach(function (message) {
                    (0, _format.render)(message);
                });
            }
        };
    }

    _createClass(Outlog, [{
        key: 'config',
        value: function config(args) {
            this.options = _extends({}, this.options, args);
            _history2.default.config(this.options);
        }
    }, {
        key: 'init',
        value: function init(moduleName, args) {
            if (typeof moduleName != 'string') {
                throw new Error("init method: wrong parameter 'moduleName'. Should be string");
            }

            if (!args instanceof Object) {
                throw new Error("init method: wrong parameter 'args'. Should be an object");
            }

            var options = _extends({}, this.options, args);
            var trimmedName = moduleName.trim().replace(/\ /ig, "_");

            if (!Modules[trimmedName]) {
                var _module = new _module3.default(trimmedName, options);
                Modules[trimmedName] = _module;
                this.trace[trimmedName] = _module.trace;
                return _module;
            } else {
                throw new Error("Outlog Error: module already exist, use another name");
            }
        }
    }]);

    return Outlog;
}();

if (global.window) {
    window.Outlog = new Outlog();
}

module.exports = new Outlog();

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./helpers/format":1,"./lib/history":3,"./lib/module":4}]},{},[5])

//# sourceMappingURL=build.js.map
