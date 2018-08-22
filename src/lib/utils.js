export const Cookie = {
    createCookie: function (name, value, expireTime) {
        expireTime = !!expireTime ? expireTime : (15 * 60 * 1000); // Default 15 min
        var date = new Date();
        date.setTime(date.getTime() + expireTime);
        var expires = "; expires=" + date.toGMTString();
        document.cookie = name + "=" + value + expires + "; path=/";
    },
    getCookie: function (name) {
        var value = "; " + document.cookie;
        var parts = value.split("; " + name + "=");
        if (parts.length == 2) {
            return parts.pop().split(";").shift();
        }
    },
    deleteCookie: function (name) {
        document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }
};