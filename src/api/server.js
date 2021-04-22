"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
const port = process.env.PORT || 3002;
index_1.app.listen(port, () => {
    console.log(`Express listening: http://localhost:${port}`);
    console.log(`Visit OpenAPI @ http://localhost:${port}/docs`);
});
//# sourceMappingURL=server.js.map