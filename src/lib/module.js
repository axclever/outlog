import History from './history'
import {render} from '../helpers/format'

export default class Module {
    constructor(name, opts) {
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
        let allHistory = History.getTrace();

        allHistory.forEach((log)=> {
            render(log);
        });
    }
}
