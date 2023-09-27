"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getRootFilePath_1 = __importDefault(require("./getRootFilePath"));
const getRootFileName_1 = __importDefault(require("./getRootFileName"));
const path_1 = require("path");
const saaslyLog_1 = __importDefault(require("./saaslyLog"));
const stackTrace = require("stack-trace");
function getTrace() {
    let trace = stackTrace.get();
    let final = [];
    trace.forEach((t) => {
        if (t.isNative() === false &&
            t.isConstructor() === false &&
            t.getFileName() !== __filename) {
            if ((0, path_1.relative)(__filename, t.getFileName()) !== "../index.js") {
                final.push(t.toString());
            }
        }
    });
    return final;
}
function log({ apiKey, source, level, identifier, message, stack, }) {
    (0, saaslyLog_1.default)({
        apiKey,
        data: {
            at: new Date().toISOString(),
            source,
            level: level || "log",
            identifier: identifier || "",
            log: message || "no message",
            meta: {
                rootFilePath: (0, getRootFilePath_1.default)() || "",
                rootFile: (0, getRootFileName_1.default)((0, getRootFilePath_1.default)()) || "",
                trace: getTrace() || [],
                pid: process.pid || -1,
            },
        },
    });
}
exports.default = log;
