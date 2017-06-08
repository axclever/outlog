import {getTimeStamp} from '../helpers/format'
import {send} from '../helpers/request'


const checkLogDetails = (data)=> {
    if (!data) return true;

    Object.keys(data).forEach((key)=> {
        if (data[key] instanceof Function) {
            throw new Error("Outlog: You can't pass multidimensional data to logger or functions");
        }

        if (data[key] instanceof Object) {

            Object.keys(data[key]).forEach((k2)=> {
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

class History {
    constructor() {
        this.state = {
            localStorage: false,
            timeStamp: false,
            serverUrl: false,
            sync: true
        };

        this.messages = [];
    }

    config(options) {
        this.state = Object.assign(this.state, options);
    }

    write(module, type, message, details, options) {
        checkLogDetails(details);

        let logData = {
            moduleName: module,
            type: type,
            message: message,
            details: details
        };

        this.messages.push(logData);

        if (options.sync == false) {
            return false;
        }

        const serverUrl = this.state.serverUrl;

        if (serverUrl && this.state.sync) {
            send(serverUrl, logData);
        }
    }

    getTrace() {
        if (this.state.localStorage) {
            console.log("read all from local storage [ not implemented ]");
            // return localstorage trace
        } else {
            return this.messages;
        }
    }
}

export default new History();