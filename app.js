var Outlog = require("./build/index");
var logger = Outlog.init("Example 1");

logger.info("hello!");

Outlog.trace.all();