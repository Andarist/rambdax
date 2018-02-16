"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _confirm_1 = require("./_confirm");
function compose(...fns) {
    return result => {
        const list = fns.slice();
        while (list.length > 0) {
            const fn = list.pop();
            if (_confirm_1.confirm(fn)) {
                result = fn(result);
            }
        }
        return result;
    };
}
exports.compose = compose;
