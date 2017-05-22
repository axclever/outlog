import History from './history'
import {render} from '../helpers/format'

export default class Module {
    constructor(name, opts) {
        this.options = opts;
        this.name = name;
    }

    info(message, details) {
        History.write(this.name, "info", message, details);

        if (this.options.debug) {
            render({
                moduleName: this.name,
                message: message,
                details: details,
                type: "info"
            });
        }
    }

    error(message, details) {
        History.write(this.name, "error", message, details);

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
