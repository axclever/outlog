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