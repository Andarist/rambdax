"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function add(x, y) {
    if (y === undefined) {
        return (yHolder) => add(x, yHolder);
    }
    return x + y;
}
exports.add = add;
