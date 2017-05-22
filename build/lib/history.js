"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _format = require("../helpers/format");

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

        this.localStorage = false;
        this.showTimeStamps = false;
        this.messages = [];
    }

    _createClass(History, [{
        key: "config",
        value: function config(options) {
            this.localStorage = options.useMemory;
            this.showTimeStamps = options.showTime;
        }
    }, {
        key: "write",
        value: function write(module, type, message, details) {
            checkLogDetails(details);

            this.messages.push({
                moduleName: module,
                type: type,
                message: message,
                details: details
            });
        }
    }, {
        key: "getTrace",
        value: function getTrace() {
            if (this.localStorage) {
                console.log("read all from local storage");
                // return localstorage trace
            } else {
                return this.messages;
            }
        }
    }]);

    return History;
}();

exports.default = new History();