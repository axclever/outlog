"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var Cookie = exports.Cookie = {
    createCookie: function createCookie(name, value, expireTime) {
        expireTime = !!expireTime ? expireTime : 15 * 60 * 1000; // Default 15 min
        var date = new Date();
        date.setTime(date.getTime() + expireTime);
        var expires = "; expires=" + date.toGMTString();
        document.cookie = name + "=" + value + expires + "; path=/";
    },
    getCookie: function getCookie(name) {
        var value = "; " + document.cookie;
        var parts = value.split("; " + name + "=");
        if (parts.length == 2) {
            return parts.pop().split(";").shift();
        }
    },
    deleteCookie: function deleteCookie(name) {
        document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }
};