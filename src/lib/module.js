import History from './history'
import {render} from '../helpers/format'
import {Cookie} from '../lib/utils'

export default class Module {
    constructor(name, opts) {
        const debugCookie = Cookie.getCookie(name);

        if (debugCookie) {
            opts.debug = true;
        }

        this.options = opts;
        this.name = name;
    }

    info(message, details) {
        History.write(this.name, "info", message, details, this.options);

        if (this.options.debug) {
            render({
                moduleName: this.name,
                message: message,
                details: details,
                type: "info"
            });
        }
    }

    warning(message, details) {
        History.write(this.name, "warning", message, details, this.options);

        if (this.options.debug) {
            render({
                moduleName: this.name,
                message: message,
                details: details,
                type: "warning"
            });
        }
    }

    success(message, details) {
        History.write(this.name, "success", message, details, this.options);

        if (this.options.debug) {
            render({
                moduleName: this.name,
                message: message,
                details: details,
                type: "success"
            });
        }
    }

    error(message, details) {
        History.write(this.name, "error", message, details, this.options);

        if (this.options.debug) {
            render({
                moduleName: this.name,
                message: message,
                details: details,
                type: "error"
            });
        }
    }

    trace(args) {
        let moduleHistory = History.getTrace(this.name);

        moduleHistory.forEach((log)=> {
            render(log);
        });
    }


    print(args) {
        if (args.debug) {
            Cookie.createCookie(this.name || "all", "debug");
        } else {
            Cookie.deleteCookie(this.name || "all");
        }
    }
}

