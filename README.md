# OutLog - Javascript logger for browser

* NOTE: Package still in alpha testing


## Install
```bash
npm install outlog --save-dev
```

## Usage example

```js
var Outlog = require("outlog");
var logger = Outlog.init("Module name", {debug:true});

logger.info("Initializing");

logger.info("refresh()", {
    times: 5
});

logger.error("Something wrong going here...");
```

