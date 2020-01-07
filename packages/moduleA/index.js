"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const add_1 = require("lodash/add");
async function hello2() {
    return new Promise((rs, rj) => {
        rs("hello!!!" + add_1.default(1, 2));
    });
}
exports.hello2 = hello2;
//# sourceMappingURL=index.js.map