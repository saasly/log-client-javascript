"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var getRootFilePath_1 = require("./getRootFilePath");
var getRootFileName_1 = require("./getRootFileName");
var path_1 = require("path");
var saaslyLog_1 = require("./saaslyLog");
var stack_trace_1 = require("stack-trace");
function getTrace() {
    var trace = (0, stack_trace_1.get)();
    var final = [];
    trace.forEach(function (t) {
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
function log(_a) {
    var apiKey = _a.apiKey, source = _a.source, level = _a.level, identifier = _a.identifier, message = _a.message, stack = _a.stack;
    return (0, saaslyLog_1.default)({
        apiKey: apiKey,
        data: {
            at: new Date().toISOString(),
            source: source,
            level: level || "log",
            identifier: identifier || "",
            log: message || "no message",
            meta: JSON.stringify({
                rootFilePath: (0, getRootFilePath_1.default)() || "",
                rootFile: (0, getRootFileName_1.default)((0, getRootFilePath_1.default)()) || "",
                trace: getTrace() || [],
                pid: process.pid || -1,
            }),
        },
    });
}
exports.default = log;
