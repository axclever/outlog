/*
 * @author Alex Clever <axclever@gmail.com>
 *
 *  Outlog Library
 *
 * */

import ModuleFactory from './lib/module'
import History from './lib/history'
import {render} from './helpers/format'


const Modules = {};


class Outlog {
    constructor() {
        this.options = {
            debug: false,
            colors: true,
            serverUrl: false,
            memory: false
        };

        this.trace = {
            all: (args)=> {
                let allHistory = History.getTrace();

                allHistory.forEach((message)=> {
                    render(message);
                });
            }
        };
    }

    config(args) {
        // server
        // history
        // global debug mode
        if (Object.keys(Modules).length > 0) {
            throw new Error("Outlog Error: use .config() method before initializing modules");
        }

        this.options = Object.assign(this.options, args);
        History.config(this.options);
    }

    init(moduleName, args) {
        if (typeof moduleName != 'string') {
            throw new Error("init method: wrong parameter 'moduleName'. Should be string");
        }

        if ((!args instanceof Object)) {
            throw new Error("init method: wrong parameter 'args'. Should be an object");
        }

        let options = Object.assign(this.options, args);
        let trimmedName = moduleName.trim().replace(/\ /ig, "_");

        if (!Modules[trimmedName]) {
            let module = new ModuleFactory(trimmedName, options);
            Modules[trimmedName] = module;
            this.trace[trimmedName] = module.trace;
            return module;
        } else {
            throw new Error("Outlog Error: module already exist, use another name");
        }
    }
}

if (global.window) {
    window.Outlog = new Outlog();
}

module.exports = new Outlog();
