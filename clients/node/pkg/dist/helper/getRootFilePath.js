"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getRootFilePath() {
    let argv = process === null || process === void 0 ? void 0 : process.argv;
    if (argv === undefined)
        return "";
    for (const arg of argv) {
        if (typeof arg !== "string" || arg.startsWith("-")) {
            break;
        }
        if (arg.endsWith(".js") || arg.endsWith(".ts")) {
            return arg;
        }
    }
    return "";
}
exports.default = getRootFilePath;
