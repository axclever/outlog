/*
 * @author Alex Clever <axclever@gmail.com>
 *
 */

var OutLog = function (options) {
    var history = [];
    var serverUrl = "";
    var serverLog = false;

    //TODO: Check and validate Url
    if (options.serverUrl) {
        serverLog = true;
        serverUrl = options.serverUrl
    }


    var getTimeStamp = function (now) {
        return ((now.getMonth() + 1) + '/' +
        (now.getDate()) + '/' +
        now.getFullYear() + " " +
        now.getHours() + ':' +
        ((now.getMinutes() < 10)
            ? ("0" + now.getMinutes())
            : (now.getMinutes())) + ':' +
        ((now.getSeconds() < 10)
            ? ("0" + now.getSeconds())
            : (now.getSeconds())));
    };

    var sendToServer = function (data) {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (this.readyState != 4) return;

            if (this.status != 200) {
                console.log("OutLog: connection error");
            }
        };

        var jsonData = JSON.stringify({
            timeStamp: data.timeStamp,
            domain: document.location.origin,
            url: document.location.href,
            details: {
                type: data.type,
                message: data.msg,
                name: data.head
            }
        });

        xhr.open("POST", serverUrl, true);
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhr.send(jsonData);
    };

    var methods = {
        info: function (msg) {
            var now = new Date();
            var timeStamp = getTimeStamp(now);

            var point = {
                type: "info",
                head: options.moduleName,
                msg: msg,
                timeStamp: now
            };

            history.push(point);

            if (serverLog) {
                sendToServer(point);
            }

            if (options.debug) {
                console.log("info: " + options.moduleName + " " + msg + " (" + timeStamp + ")");
            }
        },

        error: function (msg) {
            var now = new Date();
            var timeStamp = getTimeStamp(now);

            var point = {
                type: "info",
                head: options.moduleName,
                msg: msg,
                timeStamp: now
            };

            history.push(point);

            if (serverLog) {
                sendToServer(point);
            }

            if (options.debug) {
                console.log("ERROR: " + options.moduleName + " " + msg + " (" + timeStamp + ")");
            }
        },

        getHistory: function () {
            history.forEach(function (item) {
                var timeStamp = getTimeStamp(item.timeStamp);
                console.log(item.type + ": " + options.moduleName + " " + item.msg + " (" + timeStamp + ")");
            });
        }
    };

    if (!options.debug) {
        window.OutLog = methods;
    }

    return methods;
};
