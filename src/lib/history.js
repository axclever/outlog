import {getTimeStamp} from '../helpers/format'


const checkLogDetails = (data)=> {
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
        this.localStorage = false;
        this.showTimeStamps = false;
        this.messages = [];
    }

    config(options) {
        this.localStorage = options.useMemory;
        this.showTimeStamps = options.showTime;

    }

    write(module, type, message, details) {
        checkLogDetails(details);

        this.messages.push({
            module: module,
            type: type,
            message: message,
            details: details
        });
    }

    getTrace() {
        if (this.localStorage) {
            console.log("read all from local storage");
            // return localstorage trace
        } else {
            return this.messages;
        }
    }
}

export default new History();