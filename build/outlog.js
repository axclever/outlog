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
            memory: false,
            publicKey: null
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