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
            _history2.default.write(this.name, "info", message, details);

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
        key: 'error',
        value: function error(message, details) {
            _history2.default.write(this.name, "error", message, details);

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