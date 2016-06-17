# OutLog
Fancy logger for javascript applications + sending logs to server.

This is simple script, for logging you application and sending all data to the server.

### How yo use?

```
var outlog = new OutLog({
    moduleName: "Header",
    serverUrl: "https://server.com/save-logs", // optional
    debug: false
});

outlog.info("Outlog works!");
```

### Params

**moduleName** - Header of your log

**serverUrl** (optional) - Server url where you want to send your logs

**debug** - (optinal) - In debug mode you can see logs in browser/server console immediately.

### Methods

*info* - Added field with type `info` in your log.

*error* - Added field with type `error` in your log.

*getHistory* - Show you all trace of log history. (it's works in debug:false, and debug:true).


 Hope it will be helpful for you ;)
