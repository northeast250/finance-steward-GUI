"use strict";
exports.__esModule = true;
var index_1 = require("./index");
var port = process.env.PORT || 3000;
index_1.app.listen(port, function () {
    return console.log("Express listening: http://localhost:" + port);
});
