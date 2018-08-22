# OutLog - Javascript logger for browser

* NOTE: Package still in alpha testing


## Install
```bash
npm install outlog --save-dev
```

## Default usage example

```js
var Outlog = require("outlog");

var logger = Outlog.init("Module1", {debug:true}); // print logs to console

logger.info("Initializing");
logger.info("refresh()");

logger.error("Something wrong going here...");
```

### Result
<img src='https://github.com/aclever/outlog/blob/master/images/outlog_example.png' width='378'/>


### Show trace by cookie marker
```js
var logger1 = Outlog.init("Module1");
    logger1.info("Info message", {users: 5, project: 7});
    logger1.warning("Error message");
    logger1.error("Error message", {reason: "Validation error"});

    var logger2 = Outlog.init("Module2");
    logger2.info("Second module info will not appeared");
   
```

Open browser console and call method `Outlog.logger.Module2`

```js
Outlog.print.Module1({debug: true})
```

And all logs from this module will appear only for you and only in your browser

### Result
<img src='https://github.com/aclever/outlog/blob/master/images/example2.png' width='378'/>