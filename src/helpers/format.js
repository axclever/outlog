export const getTimeStamp = (date)=> {
    return ((now.getMonth() + 1) + '/' +
    (now.getDate()) + '/' +
    now.getFullYear() + " " +
    now.getHours() + ':' +
    ((now.getMinutes() < 10)
        ? ("0" + now.getMinutes())
        : (now.getMinutes())) + ':' +
    ((now.getSeconds() < 10)
        ? ("0" + now.getSeconds())
        : (now.getSeconds())));
};

const symbols = {
    success: '✔︎ ',
    error: '✘ ',
    warn: '⚑ ',
    arrow: '➤ '
};

export const rawRender = (log)=> {
    console.log(log);
};

const isBrowser = ()=> {
    return !!global.Navigator;
};

const renderInBrowser = (log)=> {
    if (log.type == "info") {
        console.log('%c [' + log.moduleName + "] " + '%c ' + log.message +
            ' ', 'background: #24292e; color: #FFF', ' color: #fff; background: #8a939a');

        if (log.details) {
            // console.log('%c Details: ', 'background: #e5e5e5; color: #666');
            let detailsString = '%c';

            Object.keys(log.details).forEach((key)=> {
                detailsString += symbols.arrow + key + ": " + log.details[key] + " \n";
            });

            console.log(detailsString + '\n\n', ' color: #8a939a');
        }
    }

    if (log.type == "error") {
        console.log('%c [' + log.moduleName + "] " + ' %c ' + symbols.error + log.message + ' ',
            'background: #24292e; color: #FFF', 'background: #b90000; color: #fff');


        if (log.details) {
            let detailsString = '%c';
            Object.keys(log.details).forEach((key)=> {
                detailsString += symbols.arrow + key + ": " + log.details[key] + " \n";
            });
            console.log(detailsString + '\n\n', ' color: #b90000');
        }
    }

    if (log.type == "warning") {
        console.log('%c [' + log.moduleName + "] " + ' %c ' + symbols.warn + log.message + ' ',
            'background: #24292e; color: #FFF', 'background: #bf7121; color: #fff;');


        if (log.details) {
            let detailsString = '%c';
            Object.keys(log.details).forEach((key)=> {
                detailsString += symbols.arrow + key + ": " + log.details[key] + " \n";
            });
            console.log(detailsString + '\n\n', ' color: #bf7121');
        }
    }

    if (log.type == "success") {
        console.log('%c [' + log.moduleName + "] " + ' %c ' + symbols.success + log.message + ' ',
            'background: #24292e; color: #FFF', 'background: #1a9635; color: #fff;');


        if (log.details) {
            let detailsString = '%c';
            Object.keys(log.details).forEach((key)=> {
                detailsString += symbols.arrow + key + ": " + log.details[key] + " \n";
            });
            console.log(detailsString + '\n\n', ' color: #1a9635');
        }
    }
};

const renderInConsole = (log)=> {
    console.log(log.type.toUpperCase() + ":" + "[ " + log.moduleName + " ] " + log.message);
};

export const render = (log)=> {
    if (isBrowser()) {
        renderInBrowser(log);
    } else {
        renderInConsole(log);
    }
};
export const renderWithTime = (log)=> {
};