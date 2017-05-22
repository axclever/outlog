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
        console.log('%c [' + log.moduleName + "] " + '%c ' + log.message + ' ', 'background: #24292e; color: #FFF', ' color: #fff; background: #107cb7');

        console.log('%c Details: ', 'background: #e5e5e5; color: #666');
        var detailsString = '%c';

        if (log.details) {
            Object.keys(log.details).forEach(function (key) {
                detailsString += symbols.arrow + key + ": " + log.details[key] + " \n";
            });

            console.log(detailsString + '\n\n', ' color: #555');
        }
    }

    if (log.type == "error") {
        console.log('%c [' + log.moduleName + "] " + ' %c ' + symbols.error + log.message + ' ', 'background: #24292e; color: #FFF', 'background: #b90000; color: #fff');
        var _detailsString = '%c';

        if (log.details) {
            Object.keys(log.details).forEach(function (key) {
                _detailsString += symbols.arrow + key + ": " + log.details[key] + " \n";
            });
        }

        console.log(_detailsString + '\n\n', ' color: #b90000');
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