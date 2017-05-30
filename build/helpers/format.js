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