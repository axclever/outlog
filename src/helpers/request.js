export const sendToServer = (serverUrl, data) => {
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
            moduleName: data.moduleName,
            content: data.content
        }
    });

    xhr.open("POST", serverUrl, true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(jsonData);
};