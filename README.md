# OutLog - Javascript logger for browser

* NOTE: Package still in alpha testing


## Install
```bash
npm install outlog --save-dev
```

## Usage example

```js
var Outlog = require("outlog");

Outlog.config({
  serverUrl: "https://outlog.sitename.com/api/collect/",
  debug: true
});

var logger = Outlog.init("Module name", {debug:true, sync: false});

logger.info("Initializing");
logger.info("refresh()");

logger.error("Something wrong going here...");
```


### Result
<img src='https://github.com/aclever/outlog/blob/master/images/outlog_example.png' width='378'/>