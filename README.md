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


### Show trace by cookie marker
```js
var logger = Outlog.init("Module2");

logger.info("Show me only if you enable it via console!");
```

Open browser console and call method `Outlog.logger.Module2`

```js
Outlog.print.Module2({debug: true})
```

And all logs from this module will appear only for you and only in your browser


### Result
<img src='https://github.com/aclever/outlog/blob/master/images/outlog_example.png' width='378'/>