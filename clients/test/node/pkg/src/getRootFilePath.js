"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getRootFilePath() {
    var argv = process === null || process === void 0 ? void 0 : process.argv;
    if (argv === undefined)
        return "";
    for (var _i = 0, argv_1 = argv; _i < argv_1.length; _i++) {
        var arg = argv_1[_i];
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
