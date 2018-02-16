"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isX(input) {
    return true;
}
function add(x, y) {
    if (y === undefined) {
        return (yHolder) => {
            const result = add(x, yHolder);
            if (isX(result)) {
                return result;
            }
            return Infinity;
        };
    }
    return x + y;
}
exports.add = add;
