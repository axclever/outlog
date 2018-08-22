/*
 * @author Alex Clever <axclever@gmail.com>
 *
 *  Outlog Library
 *
 * */

import ModuleFactory from './lib/module'
import History from './lib/history'
import {render} from './helpers/format'
import {Cookie} from './lib/utils'

class Outlog {
    constructor() {
        this.modules = {};
        this.options = {
            debug: false,
            colors: true,
            serverUrl: false,
            sync: true,
            memory: false,
            publicKey: null
        };

        this.trace = {
            all: (args)=> {
                let allHistory = History.getTrace();

                allHistory.forEach((message)=> {
                    render(message);
                });
            }
        };

        this.print = {
            all: (args)=> {
                if (args && args.debug) {
                    Cookie.createCookie("all", "debug");
                } else {
                    Cookie.deleteCookie("all");
                }


            }
        };
    }

    config(args) {
        this.options = Object.assign({}, this.options, args);
        History.config(this.options);
    }

    init(moduleName, args) {
        if (typeof moduleName != 'string') {
            throw new Error("init method: wrong parameter 'moduleName'. Should be string");
        }

        if ((!args instanceof Object)) {
            throw new Error("init method: wrong parameter 'args'. Should be an object");
        }

        let options = Object.assign({}, this.options, args);
        let trimmedName = moduleName.trim().replace(/\ /ig, "_");


        const component = this;

        if (!component.modules[trimmedName]) {
            const module = new ModuleFactory(trimmedName, options);
            component.modules[trimmedName] = module;
            this.trace[trimmedName] = module.trace.bind(module);
            this.print[trimmedName] = module.print.bind(module);
            return module;

        } else {
            throw new Error("Outlog Error: module already exist, use another name");
        }
    }
}

if (global.window) {
    if (!window.Outlog) {
        window.Outlog = new Outlog();
    }
}

module.exports = new Outlog();
